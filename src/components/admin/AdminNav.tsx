'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  Newspaper,
  GalleryHorizontal,
  Palette,
  LogOut,
  Flower2,
  Phone,
} from 'lucide-react';
import { Button } from '../ui/button';

const navItems = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/berita', label: 'Kelola Berita', icon: Newspaper },
  { href: '/admin/galeri', label: 'Kelola Galeri', icon: GalleryHorizontal },
  { href: '/admin/tampilan', label: 'Edit Tampilan', icon: Palette },
  { href: '/admin/kontak', label: 'Pengaturan Kontak', icon: Phone },
];

interface AdminNavProps {
    onLogout: () => void;
}

export function AdminNav({ onLogout }: AdminNavProps) {
  const pathname = usePathname();

  return (
    <aside className="hidden w-64 flex-col border-r bg-background sm:flex">
      <div className="flex flex-col gap-2">
        <div className="flex h-16 items-center border-b px-6">
          <Link href="/admin/dashboard" className="flex items-center gap-2 font-semibold">
            <Flower2 className="h-6 w-6 text-primary" />
            <span>Admin Desa</span>
          </Link>
        </div>
        <nav className="flex-1 grid items-start px-4 text-sm font-medium">
          {navItems.map((item) => {
            const isActive = pathname.startsWith(item.href);
            return (
              <Link
                key={item.label}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary',
                  isActive && 'bg-muted text-primary'
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
      <div className="mt-auto p-4">
        <Button variant="ghost" className="w-full justify-start" onClick={onLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </div>
    </aside>
  );
}
