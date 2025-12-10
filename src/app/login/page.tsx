'use client';
import { LoginForm } from '@/components/auth/LoginForm';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Flower2 } from 'lucide-react';
import Link from 'next/link';

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/50 p-4">
      <div className="w-full max-w-md">
        <div className="mx-auto flex flex-col items-center text-center mb-8">
          <div className="bg-primary text-primary-foreground rounded-full p-3 mb-4">
            <Flower2 className="h-8 w-8" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Admin Login
          </h1>
          <p className="text-muted-foreground">
            Website Desa Batumarta 1
          </p>
        </div>
        <LoginForm />
        <div className="mt-6 text-center">
          <Button variant="ghost" asChild>
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Kembali ke Beranda
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
