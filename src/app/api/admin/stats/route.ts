import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';

export async function GET(request: NextRequest) {
  try {
    const adminToken = request.headers.get('x-admin-token');
    if (!adminToken || adminToken !== 'admin123') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const collections = ['projects', 'testimonials', 'contact_messages', 'messages'] as const;
    type CollectionName = typeof collections[number];
    
    interface CollectionStats {
      total: number;
      recent: number;
      lastUpdated?: string;
      error?: string;
    }

    // Initialize stats object with default values for all collections
    const stats = collections.reduce((acc, col) => ({
      ...acc,
      [col]: {
        total: 0,
        recent: 0
      }
    }), {} as Record<CollectionName, CollectionStats>);

    for (const col of collections) {
      try {
        const ref = collection(db, col);
        const snapshot = await getDocs(ref);
        
        // Get recent documents (last 7 days)
        const recentQuery = query(ref, orderBy('createdAt', 'desc'), limit(100));
        const recentSnapshot = await getDocs(recentQuery);
        
        const recentDocs = recentSnapshot.docs.filter(doc => {
          const createdAt = doc.data().createdAt;
          if (!createdAt) return false;
          
          const docDate = createdAt.seconds ? new Date(createdAt.seconds * 1000) : new Date(createdAt);
          const weekAgo = new Date();
          weekAgo.setDate(weekAgo.getDate() - 7);
          
          return docDate > weekAgo;
        });

        const collectionStats: CollectionStats = {
          total: snapshot.size,
          recent: recentDocs.length,
          lastUpdated: new Date().toISOString()
        };
        stats[col as CollectionName] = collectionStats;
      } catch (error: unknown) {
        console.warn(`Error getting stats for ${col}:`, error);
        const errorStats: CollectionStats = {
          total: 0,
          recent: 0,
          error: error instanceof Error ? error.message : 'Unknown error'
        };
        stats[col as CollectionName] = errorStats;
      }
    }

    // Calculate totals
    const totals = {
      totalDocuments: Object.values(stats).reduce((sum, stat) => sum + stat.total, 0),
      recentDocuments: Object.values(stats).reduce((sum, stat) => sum + stat.recent, 0),
      collections: Object.keys(stats).length
    };

    return NextResponse.json({
      stats,
      totals,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error getting database stats:', error);
    return NextResponse.json({ error: 'Failed to get database stats' }, { status: 500 });
  }
}
