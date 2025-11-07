'use client';

import { useEffect } from 'react';
import Header from '@/components/Header';

export default function Error({ error, reset }: { error: Error & { digest?: string }, reset: () => void }) {
  useEffect(() => {
    console.error('Project details error:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-black">
      <Header />
      <main className="pt-24 px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-white text-2xl mb-2">Something went wrong</h1>
        <p className="text-gray-400 mb-6">We couldn't load this project right now.</p>
        <div className="flex gap-3 justify-center">
          <button onClick={() => reset()} className="px-4 py-2 bg-white text-black rounded-lg">Try again</button>
          <a href="/projects" className="px-4 py-2 border border-gray-600 text-gray-200 rounded-lg">Back to projects</a>
        </div>
      </main>
    </div>
  );
}


