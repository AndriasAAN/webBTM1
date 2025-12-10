import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">
      <h1 className="text-9xl font-bold text-primary">404</h1>
      <h2 className="mt-4 text-4xl font-semibold text-foreground">Halaman Tidak Ditemukan</h2>
      <p className="mt-2 text-lg text-muted-foreground">
        Maaf, halaman yang Anda cari tidak ada atau telah dipindahkan.
      </p>
      <Button asChild className="mt-8">
        <Link href="/">
          <Home className="mr-2 h-4 w-4" />
          Kembali ke Beranda
        </Link>
      </Button>
    </div>
  );
}
