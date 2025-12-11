'use client';

import { PhotoGrid } from '@/components/galeri/PhotoGrid';
import type { GalleryPhoto } from '@/lib/types';
import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { collection, query, orderBy } from 'firebase/firestore';

export default function GaleriPage() {
  const firestore = useFirestore();
  const photosQuery = useMemoFirebase(() => 
    firestore 
      ? query(collection(firestore, 'gallery_photos'), orderBy('createdAt', 'desc')) 
      : null,
    [firestore]
  );
  const { data: photos, isLoading } = useCollection<GalleryPhoto>(photosQuery);

  // loading.tsx handles the loading state
  if (isLoading) {
    return null;
  }

  return (
    <>
      <header className="bg-muted py-12">
        <div className="container text-center">
          <h1 className="text-4xl font-bold tracking-tight">Galeri Foto</h1>
          <p className="mt-2 text-lg text-muted-foreground max-w-2xl mx-auto">
            Desa Batumarta 1 dalam Foto / Tangkapan Layar
          </p>
        </div>
      </header>
      <main className="py-16">
        <div className="container">
          {photos && photos.length > 0 ? (
            <PhotoGrid photos={photos} />
          ) : (
             <div className="text-center py-16 border rounded-lg">
              <h2 className="text-2xl font-semibold uppercase text-destructive">
                BELUM ADA FOTO PADA HALAMAN INI
              </h2>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
