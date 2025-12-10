'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Newspaper, GalleryHorizontal, Users, Loader2 } from 'lucide-react';
import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { collection } from 'firebase/firestore';
import type { NewsArticle, GalleryPhoto } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';

function StatCardSkeleton() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <Skeleton className="h-5 w-24" />
        <Skeleton className="h-4 w-4" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-7 w-12 mb-2" />
        <Skeleton className="h-4 w-32" />
      </CardContent>
    </Card>
  )
}

export default function DashboardPage() {
  const firestore = useFirestore();

  const newsCollectionRef = useMemoFirebase(() => firestore ? collection(firestore, 'news_articles') : null, [firestore]);
  const { data: newsData, isLoading: isLoadingNews } = useCollection<NewsArticle>(newsCollectionRef);

  const galleryCollectionRef = useMemoFirebase(() => firestore ? collection(firestore, 'gallery_photos') : null, [firestore]);
  const { data: galleryData, isLoading: isLoadingGallery } = useCollection<GalleryPhoto>(galleryCollectionRef);
  
  const isLoading = isLoadingNews || isLoadingGallery;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Ringkasan aktivitas dan konten website Desa Batumarta 1.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {isLoading ? (
          <>
            <StatCardSkeleton />
            <StatCardSkeleton />
            <StatCardSkeleton />
          </>
        ) : (
          <>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Jumlah Berita</CardTitle>
                <Newspaper className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{newsData?.length || 0}</div>
                <p className="text-xs text-muted-foreground">Total artikel yang dipublikasikan</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Jumlah Foto Galeri</CardTitle>
                <GalleryHorizontal className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{galleryData?.length || 0}</div>
                <p className="text-xs text-muted-foreground">Total foto di galeri</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pengunjung Bulan Ini</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,250</div>
                <p className="text-xs text-muted-foreground">Data kunjungan belum aktif</p>
              </CardContent>
            </Card>
          </>
        )}
      </div>
      <Card>
        <CardHeader>
            <CardTitle>Selamat Datang!</CardTitle>
            <CardDescription>Gunakan menu navigasi di samping untuk mengelola konten website Anda.</CardDescription>
        </CardHeader>
        <CardContent>
            <p>Anda dapat menambah, mengubah, dan menghapus berita, mengelola foto di galeri, serta menyesuaikan beberapa tampilan di halaman utama.</p>
        </CardContent>
      </Card>
    </div>
  );
}
