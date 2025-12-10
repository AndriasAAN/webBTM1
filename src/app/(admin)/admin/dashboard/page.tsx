import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Newspaper, GalleryHorizontal, Users, BarChart } from 'lucide-react';

// Mock data fetching. Replace with Firebase calls.
async function getStats() {
  return {
    newsCount: 6,
    galleryCount: 6,
    visits: 1250,
  };
}

export const metadata = {
    title: 'Dashboard - Admin Desa Batumarta 1',
};

export default async function DashboardPage() {
  const stats = await getStats();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Ringkasan aktivitas dan konten website Desa Batumarta 1.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Jumlah Berita</CardTitle>
            <Newspaper className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.newsCount}</div>
            <p className="text-xs text-muted-foreground">Total artikel yang dipublikasikan</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Jumlah Foto Galeri</CardTitle>
            <GalleryHorizontal className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.galleryCount}</div>
            <p className="text-xs text-muted-foreground">Total foto di galeri</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pengunjung Bulan Ini</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.visits.toLocaleString('id-ID')}</div>
            <p className="text-xs text-muted-foreground">+5.2% dari bulan lalu</p>
          </CardContent>
        </Card>
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
