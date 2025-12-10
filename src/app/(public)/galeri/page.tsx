'use client';

import { PhotoGrid } from '@/components/galeri/PhotoGrid';
import type { GalleryPhoto } from '@/lib/types';
import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { collection, query, orderBy } from 'firebase/firestore';
import { Skeleton } from '@/components/ui/skeleton';

function GallerySkeleton() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="space-y-2">
            <Skeleton className="aspect-square w-full rounded-lg" />
            <Skeleton className="h-4 w-3/4" />
        </div>
      ))}
    </div>
  )
}

export default function GaleriPage() {
  const firestore = useFirestore();
  const photosQuery = useMemoFirebase(() => 
    firestore 
      ? query(collection(firestore, 'gallery_photos'), orderBy('createdAt', 'desc')) 
      : null,
    [firestore]
  );
  const { data: photos, isLoading } = useCollection<GalleryPhoto>(photosQuery);

  return (
    <>
      <header className="bg-muted py-12">
        <div className="container text-center">
          <h1 className="text-4xl font-bold tracking-tight">Galeri Foto</h1>
          <p className="mt-2 text-lg text-muted-foreground max-w-2xl mx-auto">
            Momen dan keindahan Desa Batumarta 1 yang terekam dalam gambar.
          </p>
        </div>
      </header>
      <main className="py-16">
        <div className="container">
          {isLoading ? (
            <GallerySkeleton />
          ) : photos && photos.length > 0 ? (
            <PhotoGrid photos={photos} />
          ) : (
             <div className="text-center py-16 border rounded-lg">
              <h2 className="text-2xl font-semibold">Galeri Masih Kosong</h2>
              <p className="mt-2 text-muted-foreground">
                Saat ini belum ada foto yang diunggah. Silakan kembali lagi nanti.
              </p>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
