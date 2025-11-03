'use client';
import { redirect } from 'next/navigation';
import { useEffect } from 'react';
import { Loader2 } from 'lucide-react';

export default function Home() {
  useEffect(() => {
    redirect('/dashboard');
  }, []);

  return (
    <div className="flex h-screen items-center justify-center">
      <Loader2 className="h-12 w-12 animate-spin" />
    </div>
  );
}
