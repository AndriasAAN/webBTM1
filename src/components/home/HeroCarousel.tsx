'use client';

import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import type { GalleryPhoto } from '@/lib/types';
import Image from 'next/image';
import Autoplay from 'embla-carousel-autoplay';

interface HeroCarouselProps {
  photos: GalleryPhoto[];
  tagline: string;
}

export function HeroCarousel({ photos, tagline }: HeroCarouselProps) {
  return (
    <section className="relative w-full h-[50vh] md:h-[calc(100vh-4rem)] overflow-hidden">
      <Carousel
        className="w-full h-full"
        plugins={[Autoplay({ delay: 5000, stopOnInteraction: true })]}
        opts={{ loop: true }}
      >
        <CarouselContent className="h-full">
          {photos.map((photo) => (
            <CarouselItem key={photo.id} className="h-full">
              <Card className="h-full w-full border-none rounded-none">
                <CardContent className="relative flex h-full w-full items-center justify-center p-0">
                  <Image
                    src={photo.url}
                    alt={photo.name || 'Village photo'}
                    fill
                    className="object-cover"
                    priority={photos.indexOf(photo) === 0}
                    sizes="100vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="absolute bottom-12 md:bottom-20 left-1/2 -translate-x-1/2 z-10 text-center px-4">
           <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white drop-shadow-lg">
             {tagline}
           </h1>
           <p className="mt-4 text-lg md:text-xl text-white/90 drop-shadow-md max-w-2xl mx-auto">
             Website Resmi Desa Batumarta 1
           </p>
         </div>
        <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 z-10 hidden md:inline-flex" />
        <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 z-10 hidden md:inline-flex" />
      </Carousel>
    </section>
  );
}
