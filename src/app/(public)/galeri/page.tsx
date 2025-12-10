import { PhotoGrid } from '@/components/galeri/PhotoGrid';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import type { GalleryPhoto } from '@/lib/types';

// Mock function to get all gallery photos. Replace with actual Firebase call.
async function getGalleryPhotos(): Promise<GalleryPhoto[]> {
  const photoIds = ['gallery-1', 'gallery-2', 'gallery-3', 'gallery-4', 'gallery-5', 'gallery-6'];
  const photos = PlaceHolderImages.filter(p => photoIds.includes(p.id));
  
  return photos.map(p => ({
    id: p.id,
    url: p.imageUrl,
    isSlider: false,
    createdAt: new Date() as any,
    name: p.description,
  }));
}

export const metadata = {
  title: 'Galeri - Desa Batumarta 1',
  description: 'Dokumentasi foto kegiatan dan keindahan Desa Batumarta 1.',
};

export default async function GaleriPage() {
  const photos = await getGalleryPhotos();

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
          {photos.length > 0 ? (
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
