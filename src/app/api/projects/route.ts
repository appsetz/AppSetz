export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { collection, getDocs, query, where, orderBy } from 'firebase/firestore';
import { Project } from '@/types';

export async function GET(request: NextRequest) {
  try {
    const projectsRef = collection(db, 'projects');

    // Fetch all documents and perform filtering/sorting server-side in JS.
    // This avoids Firestore index errors (orderBy combined with where) and
    // handles documents that might not have a `createdAt` timestamp.
    const snapshot = await getDocs(projectsRef);
    const projects: Project[] = [];

    snapshot.forEach((doc) => {
      const data = doc.data();

      // Only include published projects
      const isPublished = data.isPublished ?? true;
      if (!isPublished) return;

      // Normalize createdAt/updatedAt which may be Firestore Timestamps or raw values
      const toDate = (val: any) => {
        if (!val) return null;
        if (typeof val.toDate === 'function') return val.toDate();
        if (typeof val === 'number') return new Date(val);
        if (typeof val === 'string') return new Date(val);
        return null;
      };

      projects.push({
        id: doc.id,
        title: data.title,
        description: data.description,
        techStack: data.techStack || [],
        media: '',
        images: data.images || (data.media ? [data.media] : []),
        githubUrl: data.githubUrl,
        liveDemoUrl: data.liveDemoUrl,
        isPublished,
        createdAt: toDate(data.createdAt) || new Date(0),
        updatedAt: toDate(data.updatedAt) || new Date(0),
      });
    });

    // Sort by createdAt desc
    projects.sort((a, b) => (b.createdAt.getTime() || 0) - (a.createdAt.getTime() || 0));

    return new NextResponse(JSON.stringify(projects), {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
        'Surrogate-Control': 'no-store'
      }
    });
  } catch (error) {
    console.error('Error fetching projects:', error);
    return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 });
  }
}
