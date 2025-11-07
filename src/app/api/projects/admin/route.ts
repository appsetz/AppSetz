import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/firebase'
import { collection, addDoc, doc, setDoc, updateDoc, deleteDoc } from 'firebase/firestore'

// Simple helper to check admin token passed as header 'x-admin-token'
function checkAdmin(request: NextRequest) {
  const header = request.headers.get('x-admin-token') || ''
  return header === 'admin123'
}

export async function POST(request: NextRequest) {
  if (!checkAdmin(request)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const body = await request.json()
    const projectsRef = collection(db, 'projects')
    const docRef = await addDoc(projectsRef, {
      title: body.title || '',
      description: body.description || '',
      techStack: body.techStack || [],
      images: body.images || [],
      githubUrl: body.githubUrl || '',
      liveDemoUrl: body.liveDemoUrl || '',
      isPublished: body.isPublished ?? true,
      createdAt: body.createdAt ? new Date(body.createdAt) : new Date(),
      updatedAt: body.updatedAt ? new Date(body.updatedAt) : new Date(),
    })

    return NextResponse.json({ id: docRef.id })
  } catch (err) {
    console.error('Admin create project error', err)
    return NextResponse.json({ error: 'Failed to create project' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  if (!checkAdmin(request)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const body = await request.json()
    if (!body.id) return NextResponse.json({ error: 'Missing id' }, { status: 400 })
    const projectDoc = doc(db, 'projects', body.id)
    const payload: any = { updatedAt: new Date() }
    if (typeof body.title !== 'undefined') payload.title = body.title
    if (typeof body.description !== 'undefined') payload.description = body.description
    if (typeof body.techStack !== 'undefined') payload.techStack = body.techStack
    if (typeof body.githubUrl !== 'undefined') payload.githubUrl = body.githubUrl
    if (typeof body.liveDemoUrl !== 'undefined') payload.liveDemoUrl = body.liveDemoUrl
    if (typeof body.isPublished !== 'undefined') payload.isPublished = body.isPublished
    if (typeof body.images !== 'undefined') payload.images = body.images
    await updateDoc(projectDoc, payload)
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Admin update project error', err)
    return NextResponse.json({ error: 'Failed to update project' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  if (!checkAdmin(request)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 })
    await deleteDoc(doc(db, 'projects', id))
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Admin delete project error', err)
    return NextResponse.json({ error: 'Failed to delete project' }, { status: 500 })
  }
}
