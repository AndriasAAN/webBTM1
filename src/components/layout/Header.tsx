'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Flower2, Home, Newspaper, GalleryHorizontal, User, Menu, LogIn } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';

const navLinks = [
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
          <Flower2 className="h-7 w-7 text-primary" />
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
                  <Flower2 className="h-7 w-7 text-primary" />
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
