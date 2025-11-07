import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/firebase'
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore'

function checkAdmin(request: NextRequest) {
  const header = request.headers.get('x-admin-token') || ''
  return header === 'admin123'
}

export async function GET(request: NextRequest) {
  if (!checkAdmin(request)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    // Read from both `messages` and `contact_messages` so the admin sees all inbound messages
    const collectionsToRead = ['messages', 'contact_messages']
    const combined: any[] = []

    for (const colName of collectionsToRead) {
      try {
        const ref = collection(db, colName)
        const snapshot = await getDocs(ref)
        snapshot.forEach((d) => {
          const data = d.data()
          combined.push({ id: d.id, _collection: colName, ...data })
        })
      } catch (e) {
        // ignore missing collections or read failures for a single collection
        console.warn(`Failed reading ${colName}:`, e)
      }
    }

    // Sort by timestamp fields if present (submittedAt, createdAt, or fallback to now)
    combined.sort((a, b) => {
      const ta = a.submittedAt?.seconds ? a.submittedAt.seconds * 1000 : (a.submittedAt ? new Date(a.submittedAt).getTime() : (a.createdAt?.seconds ? a.createdAt.seconds*1000 : (a.createdAt ? new Date(a.createdAt).getTime() : 0)))
      const tb = b.submittedAt?.seconds ? b.submittedAt.seconds * 1000 : (b.submittedAt ? new Date(b.submittedAt).getTime() : (b.createdAt?.seconds ? b.createdAt.seconds*1000 : (b.createdAt ? new Date(b.createdAt).getTime() : 0)))
      return tb - ta
    })

    return NextResponse.json(combined)
  } catch (err) {
    console.error('Admin list messages error', err)
    return NextResponse.json({ error: 'Failed to list messages' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  if (!checkAdmin(request)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 })
    await deleteDoc(doc(db, 'messages', id))
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Admin delete message error', err)
    return NextResponse.json({ error: 'Failed to delete message' }, { status: 500 })
  }
}