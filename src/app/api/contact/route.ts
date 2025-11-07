import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { ContactMessage } from '@/types';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, message } = body;
    
    if (!name || !email || !phone || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    const contactData: Omit<ContactMessage, 'id'> = {
      name,
      email,
      phone,
      message,
      submittedAt: new Date(),
      source: 'portfolio_website',
    };
    
    const docRef = await addDoc(collection(db, 'contact_messages'), {
      ...contactData,
      submittedAt: new Date(),
    });
    
    return NextResponse.json({ id: docRef.id, ...contactData });
  } catch (error) {
    console.error('Error creating contact message:', error);
    return NextResponse.json(
      { error: 'Failed to create contact message' },
      { status: 500 }
    );
  }
}
