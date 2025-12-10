'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Home, Newspaper, GalleryHorizontal, User, Menu, LogIn } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import Image from 'next/image';

const navLinks = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/berita', label: 'Berita', icon: Newspaper },
  { href: '/galeri', label: 'Galeri', icon: GalleryHorizontal },
  { href: '/profil-desa', label: 'Profil Desa', icon: User },
];

const logoSrc = "data:image/jpeg;base64,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";
const navItems = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/berita', label: 'Berita', icon: Newspaper },
  { href: '/galeri', label: 'Galeri', icon: GalleryHorizontal },
  { href: '/profil-desa', label: 'Profil Desa', icon: User },
];

export function Header() {
  const pathname = usePathname();
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const NavLink = ({ href, label, icon: Icon, isMobile = false }: { href: string; label: string; icon: React.ElementType; isMobile?: boolean }) => {
    const isActive = pathname === href;
    return (
      <Link href={href} passHref>
        <Button
          variant={isActive ? 'secondary' : 'ghost'}
          className={cn('w-full justify-start', isMobile ? 'text-lg p-6' : '')}
          onClick={() => isMobile && setIsSheetOpen(false)}
        >
          <Icon className="mr-3 h-5 w-5" />
          {label}
        </Button>
      </Link>
    );
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link href="/" className="mr-8 flex items-center gap-2" passHref>
          <Image src={logoSrc} alt="Logo Desa Batumarta 1" width={28} height={28} className="h-7 w-7" />
          <span className="hidden font-bold sm:inline-block text-lg">
            Desa Batumarta 1
          </span>
        </Link>

        <nav className="hidden items-center gap-2 md:flex">
          {navLinks.map((link) => (
            <NavLink key={link.href} {...link} />
          ))}
        </nav>

        <div className="flex flex-1 items-center justify-end gap-2">
          <Button asChild className="hidden md:flex">
            <Link href="/login">
              <LogIn className="mr-2 h-4 w-4" /> Admin
            </Link>
          </Button>
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Buka menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-full max-w-sm">
              <div className="p-4">
                <Link
                  href="/"
                  className="mb-8 flex items-center gap-2"
                  onClick={() => setIsSheetOpen(false)}
                  passHref
                >
                  <Image src={logoSrc} alt="Logo Desa Batumarta 1" width={28} height={28} className="h-7 w-7" />
                  <span className="font-bold text-lg">Desa Batumarta 1</span>
                </Link>
                <div className="flex flex-col gap-2">
                  {navLinks.map((link) => (
                    <NavLink key={link.href} {...link} isMobile />
                  ))}
                  <div className="mt-4 border-t pt-4">
                    <Link href="/login" passHref>
                      <Button className="w-full justify-start text-lg p-6" onClick={() => setIsSheetOpen(false)}>
                        <LogIn className="mr-3 h-5 w-5" /> Admin Login
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
