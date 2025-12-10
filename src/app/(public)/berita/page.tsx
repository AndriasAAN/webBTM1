import { NewsCard } from '@/components/berita/NewsCard';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import type { NewsArticle } from '@/lib/types';

// Mock function to get all news. Replace with actual Firebase call.
async function getAllNews(): Promise<NewsArticle[]> {
  const newsPlaceholders = [
    { id: "news-1", title: "Pembangunan Infrastruktur Desa", content: "Pemerintah desa memulai proyek perbaikan jalan utama untuk meningkatkan konektivitas.", hint: "village development" },
    { id: "news-2", title: "Festival Budaya Tahunan Meriah", content: "Festival budaya tahunan kembali digelar dengan meriah, menampilkan berbagai kesenian lokal.", hint: "cultural festival" },
    { id: "news-3", title: "Tim Sepak Bola Remaja Raih Juara", content: "Tim sepak bola remaja desa berhasil meraih juara pertama dalam turnamen antar kecamatan.", hint: "youth sports" },
    { id: "news-4", title: "Program Pelatihan UMKM Sukses", content: "Program pelatihan untuk Usaha Mikro, Kecil, dan Menengah (UMKM) telah berhasil mencetak wirausahawan baru.", hint: "small business" },
    { id: "news-5", title: "Gotong Royong Membersihkan Sungai", content: "Warga desa antusias mengikuti kegiatan gotong royong membersihkan area sungai untuk mencegah banjir.", hint: "community service" },
    { id: "news-6", title: "Peringatan Hari Kemerdekaan ke-79", content: "Rangkaian acara peringatan hari kemerdekaan berlangsung khidmat dan meriah di lapangan desa.", hint: "independence day" },
  ];

  return newsPlaceholders.map((item, index) => {
    const placeholder = PlaceHolderImages.find(p => p.id === `news-${index + 1}`) || PlaceHolderImages.find(p => p.id === 'news-default');
    return {
      id: item.id,
      title: item.title,
      content: item.content,
      thumbnailUrl: placeholder!.imageUrl,
      createdAt: new Date(),
    };
  });
}

export const metadata = {
  title: 'Berita - Desa Batumarta 1',
  description: 'Kumpulan berita dan informasi terbaru dari Desa Batumarta 1.',
};

export default async function BeritaPage() {
  const allNews = await getAllNews();

  return (
    <>
      <header className="bg-muted py-12">
        <div className="container text-center">
          <h1 className="text-4xl font-bold tracking-tight">Berita Desa</h1>
          <p className="mt-2 text-lg text-muted-foreground max-w-2xl mx-auto">
            Ikuti terus informasi dan kegiatan terbaru yang berlangsung di Desa Batumarta 1.
          </p>
        </div>
      </header>
      <main className="py-16">
        <div className="container">
          {allNews.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {allNews.map((article) => (
                <NewsCard key={article.id} article={article} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 border rounded-lg">
              <h2 className="text-2xl font-semibold">Belum Ada Berita</h2>
              <p className="mt-2 text-muted-foreground">
                Saat ini belum ada berita yang dipublikasikan. Silakan kembali lagi nanti.
              </p>
            </div>
          )}
          {/* Simple pagination example */}
          <div className="flex justify-center mt-12 space-x-2">
            <Button variant="outline" disabled>Sebelumnya</Button>
            <Button>Selanjutnya</Button>
          </div>
        </div>
      </main>
    </>
  );
}
