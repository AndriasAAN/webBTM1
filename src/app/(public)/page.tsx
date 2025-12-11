'use client';
import { HeroCarousel } from '@/components/home/HeroCarousel';
import { NewsCard } from '@/components/berita/NewsCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import type { GalleryPhoto, NewsArticle, SiteSettings } from '@/lib/types';
import { ArrowRight, Info, Sparkles } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useCollection, useDoc, useFirestore, useMemoFirebase } from '@/firebase';
import { collection, limit, orderBy, query, where, doc } from 'firebase/firestore';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function HomePage() {
  const firestore = useFirestore();

  // Fetch Site Settings
  const settingsRef = useMemoFirebase(() => 
    firestore ? doc(firestore, 'website_settings', 'default') : null,
    [firestore]
  );
  const { data: settings } = useDoc<SiteSettings>(settingsRef);
  
  // Fetch Slider Photos
  const sliderPhotosQuery = useMemoFirebase(() => 
    firestore 
      ? query(collection(firestore, 'gallery_photos'), where('isSlider', '==', true), limit(5)) 
      : null,
    [firestore]
  );
  const { data: sliderPhotos } = useCollection<GalleryPhoto>(sliderPhotosQuery);

  const latestNewsQuery = useMemoFirebase(() => 
    firestore 
      ? query(collection(firestore, 'news_articles'), orderBy('createdAt', 'desc'), limit(3)) 
      : null,
    [firestore]
  );
  const { data: latestNews } = useCollection<NewsArticle>(latestNewsQuery);

  const finalSettings = settings || {
      tagline: 'Membangun Bersama, Sejahtera Bersama',
      headerImageUrl: 'https://picsum.photos/seed/header/1600/500',
      themeColor: 'light-pink',
      taglineColor: 'white',
  };

  const finalSliderPhotos: GalleryPhoto[] = (sliderPhotos && sliderPhotos.length > 0)
    ? sliderPhotos
    : [{
        id: 'default-slider',
        url: finalSettings.headerImageUrl,
        isSlider: true,
        name: 'Selamat Datang di Desa Batumarta 1'
    }];


  return (
    <>
      <HeroCarousel photos={finalSliderPhotos} tagline={finalSettings.tagline} taglineColor={finalSettings.taglineColor} />
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
          {latestNews && latestNews.length > 0 ? (
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
                          src={"https://picsum.photos/seed/office/600/400"} 
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
