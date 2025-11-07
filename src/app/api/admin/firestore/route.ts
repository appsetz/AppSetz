import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { 
  collection, 
  getDocs, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  query, 
  orderBy, 
  where,
  limit,
  startAfter,
  getDoc,
  writeBatch
} from 'firebase/firestore';

// Admin token validation
function validateAdminToken(request: NextRequest): boolean {
  const adminToken = request.headers.get('x-admin-token');
  return adminToken === 'admin123';
}

// Generic CRUD operations for any collection
export async function GET(request: NextRequest) {
  try {
    if (!validateAdminToken(request)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const collectionName = searchParams.get('collection') || 'all';
    const limitCount = parseInt(searchParams.get('limit') || '50');
    const orderByField = searchParams.get('orderBy') || 'createdAt';
    const orderDirection = searchParams.get('orderDirection') || 'desc';

    if (collectionName === 'all') {
      // Get all collections data
      const collections = ['projects', 'testimonials', 'contact_messages', 'messages'] as const;
      type CollectionName = typeof collections[number];
      interface CollectionData {
        id: string;
        collection: CollectionName;
        [key: string]: any;
      }
      const allData: Record<CollectionName, CollectionData[]> = {} as Record<CollectionName, CollectionData[]>;

      for (const col of collections) {
        try {
          const ref = collection(db, col);
          const q = query(ref, orderBy(orderByField, orderDirection as any), limit(limitCount));
          const snapshot = await getDocs(q);
          allData[col] = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
            collection: col
          }));
        } catch (error) {
          console.warn(`Error fetching ${col}:`, error);
          allData[col] = [];
        }
      }

      return NextResponse.json(allData);
    } else {
      // Get specific collection
      const ref = collection(db, collectionName);
      const q = query(ref, orderBy(orderByField, orderDirection as any), limit(limitCount));
      const snapshot = await getDocs(q);
      
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        collection: collectionName
      }));

      return NextResponse.json(data);
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    if (!validateAdminToken(request)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { collection: collectionName, data } = body;

    if (!collectionName || !data) {
      return NextResponse.json({ error: 'Collection name and data are required' }, { status: 400 });
    }

    // Add timestamp
    const dataWithTimestamp = {
      ...data,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const docRef = await addDoc(collection(db, collectionName), dataWithTimestamp);
    
    return NextResponse.json({ 
      id: docRef.id, 
      ...dataWithTimestamp,
      collection: collectionName 
    });
  } catch (error) {
    console.error('Error creating document:', error);
    return NextResponse.json({ error: 'Failed to create document' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    if (!validateAdminToken(request)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { collection: collectionName, id, data } = body;

    if (!collectionName || !id || !data) {
      return NextResponse.json({ error: 'Collection name, ID, and data are required' }, { status: 400 });
    }

    const docRef = doc(db, collectionName, id);
    const updateData = {
      ...data,
      updatedAt: new Date()
    };

    await updateDoc(docRef, updateData);
    
    return NextResponse.json({ 
      id, 
      ...updateData,
      collection: collectionName 
    });
  } catch (error) {
    console.error('Error updating document:', error);
    return NextResponse.json({ error: 'Failed to update document' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    if (!validateAdminToken(request)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const collectionName = searchParams.get('collection');
    const id = searchParams.get('id');
    const bulk = searchParams.get('bulk') === 'true';

    if (!collectionName || !id) {
      return NextResponse.json({ error: 'Collection name and ID are required' }, { status: 400 });
    }

    if (bulk) {
      // Bulk delete multiple documents
      const ids = id.split(',');
      const batch = writeBatch(db);
      
      ids.forEach(docId => {
        const docRef = doc(db, collectionName, docId);
        batch.delete(docRef);
      });
      
      await batch.commit();
      return NextResponse.json({ deleted: ids.length, ids });
    } else {
      // Single document delete
      const docRef = doc(db, collectionName, id);
      await deleteDoc(docRef);
      return NextResponse.json({ deleted: 1, id });
    }
  } catch (error) {
    console.error('Error deleting document:', error);
    return NextResponse.json({ error: 'Failed to delete document' }, { status: 500 });
  }
}
