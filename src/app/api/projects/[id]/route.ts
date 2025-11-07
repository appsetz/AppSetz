import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';

export const dynamic = 'force-dynamic';

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = params?.id;
    if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });
    const ref = doc(db, 'projects', id);
    const snap = await getDoc(ref);
    if (!snap.exists()) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    const data = snap.data();

    const toDate = (val: any) => {
      if (!val) return null;
      if (typeof val.toDate === 'function') return val.toDate();
      if (typeof val === 'number') return new Date(val);
      if (typeof val === 'string') return new Date(val);
      return null;
    };

    const project = {
      id,
      title: data.title,
      description: data.description,
      techStack: data.techStack || [],
      media: '',
      images: data.images || (data.media ? [data.media] : []),
      githubUrl: data.githubUrl || '',
      liveDemoUrl: data.liveDemoUrl || '',
      isPublished: data.isPublished ?? true,
      createdAt: toDate(data.createdAt) || new Date(0),
      updatedAt: toDate(data.updatedAt) || new Date(0),
    };

    return NextResponse.json(project, {
      headers: { 'Cache-Control': 'no-store' }
    });
  } catch (err) {
    console.error('GET /api/projects/[id] failed', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}


