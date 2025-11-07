import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { collection, getDocs, query, orderBy, addDoc } from 'firebase/firestore';
import { Testimonial } from '@/types';

export async function GET(request: NextRequest) {
  try {
    const testimonialsRef = collection(db, 'testimonials');
    const q = query(testimonialsRef, orderBy('submittedAt', 'desc'));
    
    const snapshot = await getDocs(q);
    const testimonials: Testimonial[] = [];
    
    snapshot.forEach((doc) => {
      const data = doc.data();
      testimonials.push({
        id: doc.id,
        name: data.name,
        role: data.role,
        content: data.content,
        rating: data.rating,
        submittedAt: data.submittedAt?.toDate() || new Date(),
        source: data.source || 'portfolio_website',
      });
    });
    
    return NextResponse.json(testimonials);
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    return NextResponse.json(
      { error: 'Failed to fetch testimonials' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, role, content, rating } = body;
    
    if (!name || !role || !content || !rating) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    const testimonialData: Omit<Testimonial, 'id'> = {
      name,
      role,
      content,
      rating: parseInt(rating),
      submittedAt: new Date(),
      source: 'portfolio_website',
    };
    
    const docRef = await addDoc(collection(db, 'testimonials'), {
      ...testimonialData,
      submittedAt: new Date(),
    });
    
    return NextResponse.json({ id: docRef.id, ...testimonialData });
  } catch (error) {
    console.error('Error creating testimonial:', error);
    return NextResponse.json(
      { error: 'Failed to create testimonial' },
      { status: 500 }
    );
  }
}
