import { HeroCarousel } from '@/components/home/HeroCarousel';
import { LatestNews } from '@/components/home/LatestNews';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { GalleryPhoto, NewsArticle, SiteSettings } from '@/lib/types';
import { ArrowRight, Info, Sparkles } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Suspense } from 'react';

// Mock data fetching functions. Replace with actual Firebase calls.
async function getSiteSettings(): Promise<SiteSettings> {
  // In a real app, this would fetch from Firestore.
  const defaultHeaderImage = PlaceHolderImages.find(p => p.id === 'default-header');
  return {
    tagline: 'Membangun Bersama, Sejahtera Bersama',
    headerImageUrl: defaultHeaderImage?.imageUrl || 'https://picsum.photos/seed/header/1600/500',
    themeColor: 'light-pink',
  };
}

async function getSliderPhotos(): Promise<GalleryPhoto[]> {
  const carouselIds = ['carousel-1', 'carousel-2', 'carousel-3'];
  const photos = PlaceHolderImages.filter(p => carouselIds.includes(p.id));
  return photos.map(p => ({
    id: p.id,
    url: p.imageUrl,
    isSlider: true,
    createdAt: new Date() as any,
    name: p.description
  }));
}

async function getLatestNews(): Promise<NewsArticle[]> {
  const newsPlaceholders = [
    { id: "news-1", title: "Pembangunan Infrastruktur Desa", content: "Pemerintah desa memulai proyek perbaikan jalan utama untuk meningkatkan konektivitas.", hint: "village development" },
    { id: "news-2", title: "Festival Budaya Tahunan Meriah", content: "Festival budaya tahunan kembali digelar dengan meriah, menampilkan berbagai kesenian lokal.", hint: "cultural festival" },
    { id: "news-3", title: "Tim Sepak Bola Remaja Raih Juara", content: "Tim sepak bola remaja desa berhasil meraih juara pertama dalam turnamen antar kecamatan.", hint: "youth sports" },
  ];

  return newsPlaceholders.map(item => {
    const placeholder = PlaceHolderImages.find(p => p.id === item.id);
    return {
      id: item.id,
      title: item.title,
      content: item.content,
      thumbnailUrl: placeholder?.imageUrl || PlaceHolderImages.find(p => p.id === 'news-default')!.imageUrl,
      createdAt: new Date() as any,
    };
  });
}

export default async function HomePage() {
  const settings = await getSiteSettings();
  const sliderPhotos = await getSliderPhotos();

  return (
    <>
      <HeroCarousel photos={sliderPhotos} tagline={settings.tagline} />
      <section className="py-16 lg:py-24">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight">
              Selamat Datang di Website Resmi
              <span className="block text-primary">Desa Batumarta 1</span>
            </h1>
            <p className="mt-6 text-lg md:text-xl text-muted-foreground">
              Temukan informasi terbaru, kegiatan, dan potensi yang ada di desa kami. Bersama kita wujudkan desa yang maju, mandiri, dan sejahtera.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-muted py-16 lg:py-24">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">Berita Terbaru</h2>
            <p className="mt-2 text-lg text-muted-foreground">
              Ikuti perkembangan dan kegiatan terkini di Desa Batumarta 1.
            </p>
          </div>
          <Suspense fallback={<LatestNews.Skeleton />}>
             <LatestNews promise={getLatestNews()} />
          </Suspense>
          <div className="text-center mt-12">
            <Button asChild size="lg">
              <Link href="/berita">
                Lihat Semua Berita <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24">
         <div className="container">
            <div className="relative rounded-xl overflow-hidden bg-primary text-primary-foreground p-8 md:p-16">
              <div className="absolute inset-0 bg-black/20"></div>
              <Sparkles className="w-16 h-16 text-white/50 absolute -top-4 -left-4" />
              <Sparkles className="w-24 h-24 text-white/50 absolute -bottom-8 -right-8" />
              <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
                <div>
                   <h2 className="text-3xl md:text-4xl font-bold">Profil Desa</h2>
                    <p className="mt-4 text-lg text-primary-foreground/80">
                      Kenali lebih dekat sejarah, visi, misi, dan jajaran perangkat Desa Batumarta 1 yang berdedikasi untuk melayani masyarakat.
                    </p>
                    <Button asChild variant="secondary" size="lg" className="mt-6">
                      <Link href="/profil-desa">
                        <Info className="mr-2 h-5 w-5" />
                        Jelajahi Profil
                      </Link>
                    </Button>
                </div>
                <div className="hidden md:block">
                  <Card className="transform -rotate-2 hover:rotate-0 transition-transform">
                      <CardContent className="p-4">
                        <Image 
                          src={PlaceHolderImages.find(p => p.id === 'gallery-5')?.imageUrl!} 
                          alt="Kantor Desa" 
                          width={600} 
                          height={400} 
                          className="rounded-md"
                          data-ai-hint="office building"
                        />
                      </CardContent>
                  </Card>
                </div>
              </div>
            </div>
         </div>
      </section>
    </>
  );
}
