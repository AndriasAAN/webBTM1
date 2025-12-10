import { NewsForm } from '@/components/admin/NewsForm';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export const metadata = {
    title: 'Tambah Berita Baru - Admin',
};

export default function TambahBeritaPage() {
    return (
        <div className="space-y-8">
            <div className="flex items-center gap-4">
                 <Button variant="outline" size="icon" className="h-7 w-7" asChild>
                    <Link href="/admin/berita">
                        <ArrowLeft className="h-4 w-4" />
                        <span className="sr-only">Kembali</span>
                    </Link>
                </Button>
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Tambah Berita Baru</h1>
                    <p className="text-muted-foreground">
                        Isi formulir di bawah ini untuk mempublikasikan artikel baru.
                    </p>
                </div>
            </div>
            <NewsForm />
        </div>
    );
}
