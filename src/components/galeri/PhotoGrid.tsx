'use client';

import { useState } from 'react';
import Image from 'next/image';
import {
  Dialog,
  DialogContent,
} from '@/components/ui/dialog';
import { Card, CardContent } from '@/components/ui/card';
import type { GalleryPhoto } from '@/lib/types';
import { Maximize } from 'lucide-react';

interface PhotoGridProps {
  photos: GalleryPhoto[];
}

export function PhotoGrid({ photos }: PhotoGridProps) {
  const [selectedImage, setSelectedImage] = useState<GalleryPhoto | null>(null);

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {photos.map((photo) => (
          <Card
            key={photo.id}
            className="overflow-hidden cursor-pointer group relative bg-blue-100"
            onClick={() => setSelectedImage(photo)}
          >
            <CardContent className="p-0 aspect-w-1 aspect-h-1">
              <Image
                src={photo.url}
                alt={photo.name || 'Gallery photo'}
                fill
                className="object-cover transform transition-transform duration-300 group-hover:scale-110"
                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
              />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Maximize className="w-8 h-8 text-white" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-2">
                <p className="text-white text-sm truncate">{photo.name}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-4xl p-2 bg-transparent border-none shadow-none">
          {selectedImage && (
            <div className="relative aspect-video w-full h-auto">
                <Image
                    src={selectedImage.url}
                    alt={selectedImage.name || 'Selected gallery photo'}
                    fill
                    className="object-contain"
                />
                 <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                    <p className="text-white text-lg font-bold drop-shadow-md">{selectedImage.name}</p>
                </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
