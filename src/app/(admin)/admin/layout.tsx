'use client';

import { ReactNode, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import type { User } from 'firebase/auth';
import { auth, onAuthStateChanged } from '@/lib/firebase';
import { AdminNav } from '@/components/admin/AdminNav';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function AdminLayout({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged((currentUser: User | null) => {
      if (currentUser && currentUser.email === 'asse181086@gmail.com') {
        setUser(currentUser);
      } else {
        router.replace('/login');
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [router]);
  
  const handleLogout = async () => {
    await auth.signOut();
    router.push('/');
  };

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="ml-4 text-lg">Memverifikasi akses...</p>
      </div>
    );
  }

  if (!user) {
    return null; // Redirect is handled in useEffect
  }

  return (
    <div className="flex min-h-screen bg-muted/40">
      <AdminNav onLogout={handleLogout} />
      <main className="flex-1 flex flex-col">
         <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6 py-4">
            <h1 className="text-xl font-semibold">Admin Panel</h1>
             <div className="ml-auto">
               <Button variant="outline" onClick={handleLogout}>Logout</Button>
            </div>
         </header>
         <div className="p-4 sm:px-6 sm:py-0 flex-1 overflow-auto">
            {children}
         </div>
      </main>
    </div>
  );
}
