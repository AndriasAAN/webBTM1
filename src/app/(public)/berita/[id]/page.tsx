import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import type { NewsArticle } from '@/lib/types';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import { Calendar, Clock } from 'lucide-react';
import Image from 'next/image';
import { notFound } from 'next/navigation';

// Mock function to get a single news article. Replace with actual Firebase call.
async function getNewsArticle(articleId: string): Promise<NewsArticle | null> {
    const newsPlaceholders = [
    { id: "news-1", title: "Pembangunan Infrastruktur Desa", content: "Pemerintah desa memulai proyek perbaikan jalan utama untuk meningkatkan konektivitas. Proyek ini diharapkan selesai dalam 3 bulan ke depan dan akan sangat membantu mobilitas warga sehari-hari.", hint: "village development" },
    { id: "news-2", title: "Festival Budaya Tahunan Meriah", content: "Festival budaya tahunan kembali digelar dengan meriah, menampilkan berbagai kesenian lokal seperti tari-tarian, musik tradisional, dan pameran kerajinan tangan. Acara ini menarik banyak pengunjung dari luar desa.", hint: "cultural festival" },
    { id: "news-3", title: "Tim Sepak Bola Remaja Raih Juara", content: "Tim sepak bola remaja desa berhasil meraih juara pertama dalam turnamen antar kecamatan setelah mengalahkan tim dari desa tetangga di final yang dramatis. Kemenangan ini disambut gembira oleh seluruh warga.", hint: "youth sports" },
    { id: "news-4", title: "Program Pelatihan UMKM Sukses", content: "Program pelatihan untuk Usaha Mikro, Kecil, dan Menengah (UMKM) telah berhasil mencetak wirausahawan baru. Para peserta dibekali ilmu tentang manajemen keuangan, pemasaran digital, dan pengembangan produk.", hint: "small business" },
    { id: "news-5", title: "Gotong Royong Membersihkan Sungai", content: "Warga desa antusias mengikuti kegiatan gotong royong membersihkan area sungai untuk mencegah banjir. Kegiatan ini merupakan bagian dari program desa bersih dan sehat.", hint: "community service" },
    { id: "news-6", title: "Peringatan Hari Kemerdekaan ke-79", content: "Rangkaian acara peringatan hari kemerdekaan berlangsung khidmat dan meriah di lapangan desa. Acara diisi dengan upacara bendera, berbagai lomba tradisional, dan panggung hiburan rakyat.", hint: "independence day" },
  ];
  
  const foundArticle = newsPlaceholders.find(p => p.id === articleId);

  if (!foundArticle) {
    return null;
  }
  const placeholder = PlaceHolderImages.find(p => p.id === articleId) || PlaceHolderImages.find(p => p.id === 'news-default');

  return {
    ...foundArticle,
    thumbnailUrl: placeholder!.imageUrl,
    createdAt: new Date(),
  };
}


export async function generateMetadata({ params }: { params: { id: string } }) {
  const article = await getNewsArticle(params.id);
  if (!article) {
    return {
      title: 'Berita Tidak Ditemukan',
    };
  }
  return {
    title: `${article.title} - Desa Batumarta 1`,
    description: article.content.substring(0, 150),
  };
}


export default async function BeritaDetailPage({ params }: { params: { id: string } }) {
  const article = await getNewsArticle(params.id);

  if (!article) {
    notFound();
  }

  const articleDate = article.createdAt as Date;
  const formattedDate = format(articleDate, 'EEEE, dd MMMM yyyy', { locale: id });
  const formattedTime = format(articleDate, 'HH:mm', { locale: id });

  return (
    <div className="bg-background">
      <div className="container max-w-4xl mx-auto py-12 md:py-20">
        <article>
          <header className="mb-8">
            <Badge className="mb-4">Berita Desa</Badge>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight">
              {article.title}
            </h1>
            <div className="mt-4 flex items-center space-x-4 text-muted-foreground text-sm">
                <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                        <AvatarImage src="https://picsum.photos/seed/admin/40/40" alt="Admin Desa" />
                        <AvatarFallback>AD</AvatarFallback>
                    </Avatar>
                    <span>Admin Desa</span>
                </div>
                <span className="hidden md:inline">|</span>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{formattedDate}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>{formattedTime} WIB</span>
              </div>
            </div>
          </header>

          <div className="relative aspect-video rounded-xl overflow-hidden mb-8 shadow-lg">
            <Image
              src={article.thumbnailUrl}
              alt={article.title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 896px"
            />
          </div>

          <div className="prose prose-lg max-w-none prose-p:text-foreground/80 prose-headings:text-foreground prose-strong:text-foreground">
            <p>{article.content}</p>
            <p>Ini adalah konten tambahan untuk mencontohkan artikel yang lebih panjang. Di aplikasi sesungguhnya, bagian ini akan diisi dengan konten rich text dari editor di halaman admin. Konten bisa berisi paragraf, gambar, daftar, dan format teks lainnya untuk menyajikan informasi yang lengkap dan mudah dibaca oleh pengunjung website.</p>
            <h3>Sub-judul dalam Artikel</h3>
            <p>Bagian ini juga bisa menjelaskan detail lebih lanjut tentang topik berita. Misalnya, jika berita tentang pembangunan, sub-judul bisa berisi "Tahapan Proyek" atau "Manfaat bagi Warga".</p>
          </div>
        </article>
      </div>
    </div>
  );
}
