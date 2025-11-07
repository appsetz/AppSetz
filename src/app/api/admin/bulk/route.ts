import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { collection, getDocs, writeBatch, doc } from 'firebase/firestore';

export async function POST(request: NextRequest) {
  try {
    const adminToken = request.headers.get('x-admin-token');
    if (!adminToken || adminToken !== 'admin123') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { operation, collection: collectionName, data, ids } = body;

    switch (operation) {
      case 'bulk_create':
        return await bulkCreate(collectionName, data);
      case 'bulk_update':
        return await bulkUpdate(collectionName, data);
      case 'bulk_delete':
        return await bulkDelete(collectionName, ids);
      case 'export_data':
        return await exportData(collectionName);
      case 'import_data':
        return await importData(collectionName, data);
      default:
        return NextResponse.json({ error: 'Invalid operation' }, { status: 400 });
    }
  } catch (error) {
    console.error('Error in bulk operation:', error);
    return NextResponse.json({ error: 'Failed to perform bulk operation' }, { status: 500 });
  }
}

async function bulkCreate(collectionName: string, dataArray: any[]) {
  const batch = writeBatch(db);
  
  dataArray.forEach(item => {
    const docRef = doc(collection(db, collectionName));
    batch.set(docRef, {
      ...item,
      createdAt: new Date(),
      updatedAt: new Date()
    });
  });
  
  await batch.commit();
  return NextResponse.json({ created: dataArray.length });
}

async function bulkUpdate(collectionName: string, updates: { id: string; data: any }[]) {
  const batch = writeBatch(db);
  
  updates.forEach(({ id, data }) => {
    const docRef = doc(db, collectionName, id);
    batch.update(docRef, {
      ...data,
      updatedAt: new Date()
    });
  });
  
  await batch.commit();
  return NextResponse.json({ updated: updates.length });
}

async function bulkDelete(collectionName: string, ids: string[]) {
  const batch = writeBatch(db);
  
  ids.forEach(id => {
    const docRef = doc(db, collectionName, id);
    batch.delete(docRef);
  });
  
  await batch.commit();
  return NextResponse.json({ deleted: ids.length });
}

async function exportData(collectionName: string) {
  const snapshot = await getDocs(collection(db, collectionName));
  const data = snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
  
  return NextResponse.json({ 
    collection: collectionName,
    count: data.length,
    data,
    exportedAt: new Date().toISOString()
  });
}

async function importData(collectionName: string, dataArray: any[]) {
  const batch = writeBatch(db);
  
  dataArray.forEach(item => {
    const docRef = doc(collection(db, collectionName));
    batch.set(docRef, {
      ...item,
      importedAt: new Date(),
      updatedAt: new Date()
    });
  });
  
  await batch.commit();
  return NextResponse.json({ imported: dataArray.length });
}
