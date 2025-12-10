'use client';

import { ReactNode, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth, useUser } from '@/firebase';
import { AdminNav } from '@/components/admin/AdminNav';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { signOut } from 'firebase/auth';

export default function AdminLayout({ children }: { children: ReactNode }) {
  const { user, isUserLoading, userError } = useUser();
  const auth = useAuth();
  const router = useRouter();

  useEffect(() => {
    // If auth state is determined and there's no user, or user is not the admin, redirect.
    if (!isUserLoading && (user?.email !== 'asse181086@gmail.com')) {
      router.replace('/login');
    }
  }, [user, isUserLoading, router]);
  
  const handleLogout = async () => {
    if (auth) {
      await signOut(auth);
    }
    router.push('/');
  };

  if (isUserLoading || !user) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="ml-4 text-lg">Memverifikasi akses...</p>
      </div>
    );
  }
  
  if (user.email !== 'asse181086@gmail.com') {
      return null;
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
