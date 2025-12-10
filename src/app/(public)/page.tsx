'use client';
import { HeroCarousel } from '@/components/home/HeroCarousel';
import { NewsCard } from '@/components/berita/NewsCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import type { GalleryPhoto, NewsArticle, SiteSettings } from '@/lib/types';
import { ArrowRight, Info, Sparkles } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useCollection, useDoc, useFirestore, useMemoFirebase } from '@/firebase';
import { collection, limit, orderBy, query, where, doc } from 'firebase/firestore';
import { LatestNews } from '@/components/home/LatestNews';
import { Skeleton } from '@/components/ui/skeleton';

function HomePageSkeleton() {
  return (
    <>
      <Skeleton className="w-full h-[50vh] md:h-[calc(100vh-4rem)]" />
      <section className="py-16 lg:py-24">
        <div className="container text-center max-w-3xl mx-auto">
          <Skeleton className="h-10 md:h-14 w-3/4 mx-auto mb-4" />
          <Skeleton className="h-10 md:h-14 w-1/2 mx-auto" />
          <div className="mt-6 space-y-2">
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-5/6 mx-auto" />
          </div>
        </div>
      </section>
      <section className="bg-muted py-16 lg:py-24">
        <div className="container">
          <div className="text-center mb-12">
            <Skeleton className="h-10 w-64 mx-auto mb-2" />
            <Skeleton className="h-5 w-80 mx-auto" />
          </div>
          <LatestNews.Skeleton />
        </div>
      </section>
    </>
  );
}


export default function HomePage() {
  const firestore = useFirestore();

  // Fetch Site Settings
  const settingsRef = useMemoFirebase(() => 
    firestore ? doc(firestore, 'website_settings', 'default') : null,
    [firestore]
  );
  const { data: settings, isLoading: isSettingsLoading } = useDoc<SiteSettings>(settingsRef);
  
  // Fetch Slider Photos
  const sliderPhotosQuery = useMemoFirebase(() => 
    firestore 
      ? query(collection(firestore, 'gallery_photos'), where('isSlider', '==', true), limit(5)) 
      : null,
    [firestore]
  );
  const { data: sliderPhotos, isLoading: isPhotosLoading } = useCollection<GalleryPhoto>(sliderPhotosQuery);

  const latestNewsQuery = useMemoFirebase(() => 
    firestore 
      ? query(collection(firestore, 'news_articles'), orderBy('createdAt', 'desc'), limit(3)) 
      : null,
    [firestore]
  );
  const { data: latestNews, isLoading: isNewsLoading } = useCollection<NewsArticle>(latestNewsQuery);

  if (isSettingsLoading || isPhotosLoading) {
      return <HomePageSkeleton />;
  }
  
  const finalSettings = settings || {
      tagline: 'Membangun Bersama, Sejahtera Bersama',
      headerImageUrl: PlaceHolderImages.find(p => p.id === 'default-header')?.imageUrl || 'https://picsum.photos/seed/header/1600/500',
      themeColor: 'light-pink',
  };

  const finalSliderPhotos = sliderPhotos && sliderPhotos.length > 0
    ? sliderPhotos
    : [{
        id: 'default-slider',
        url: finalSettings.headerImageUrl,
        isSlider: true,
        createdAt: new Date(),
        name: 'Selamat Datang di Desa Batumarta 1'
    }];


  return (
    <>
      <HeroCarousel photos={finalSliderPhotos} tagline={finalSettings.tagline} />
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
          {isNewsLoading ? (
            <LatestNews.Skeleton />
          ) : latestNews && latestNews.length > 0 ? (
             <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {latestNews.map((article) => (
                <NewsCard key={article.id} article={article} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 border rounded-lg bg-background">
              <h2 className="text-2xl font-semibold">Belum Ada Berita</h2>
              <p className="mt-2 text-muted-foreground">
                Saat ini belum ada berita yang dipublikasikan.
              </p>
            </div>
          )}
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
  )
}
