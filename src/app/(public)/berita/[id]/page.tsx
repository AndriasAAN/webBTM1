'use client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { doc, getDoc, Timestamp } from 'firebase/firestore';
import type { NewsArticle } from '@/lib/types';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import { Calendar, Clock, Loader2 } from 'lucide-react';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useFirestore } from '@/firebase';
import { Skeleton } from '@/components/ui/skeleton';


function BeritaDetailSkeleton() {
  return (
     <div className="container max-w-4xl mx-auto py-12 md:py-20">
        <header className="mb-8">
            <Skeleton className="h-6 w-24 mb-4" />
            <Skeleton className="h-10 md:h-14 w-full mb-2" />
            <Skeleton className="h-10 md:h-14 w-3/4" />
            <div className="mt-6 flex items-center space-x-4">
                <Skeleton className="h-8 w-8 rounded-full" />
                <Skeleton className="h-5 w-24" />
                <Skeleton className="h-5 w-32" />
            </div>
        </header>
        <Skeleton className="relative aspect-video rounded-xl mb-8 shadow-lg" />
        <div className="space-y-4">
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-5/6" />
        </div>
    </div>
  )
}

export default function BeritaDetailPage({ params }: { params: { id: string } }) {
  const firestore = useFirestore();
  const [article, setArticle] = useState<NewsArticle | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!firestore || !params.id) return;

    const fetchArticle = async () => {
      setLoading(true);
      const docRef = doc(firestore, 'news_articles', params.id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setArticle({ id: docSnap.id, ...docSnap.data() } as NewsArticle);
      } else {
        notFound();
      }
      setLoading(false);
    };

    fetchArticle();
  }, [firestore, params.id]);


  if (loading) {
    return <BeritaDetailSkeleton />;
  }

  if (!article) {
    // This case should be handled by notFound() inside useEffect, but as a fallback
    return notFound();
  }
  
  const articleDate = (article.createdAt as Timestamp).toDate();
  const formattedDate = format(articleDate, 'EEEE, dd MMMM yyyy', { locale: id });
  const formattedTime = format(articleDate, 'HH:mm', { locale: id });

  return (
    <div className="bg-background">
      <div className="container max-w-4xl mx-auto py-12 md:py-20">
        <article>
          <header className="mb-8">
            <Badge className="mb-4">Berita Desa</Badge>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight">
              {article.title}
            </h1>
            <div className="mt-4 flex items-center space-x-4 text-muted-foreground text-sm">
                <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                        <AvatarImage src="https://picsum.photos/seed/admin/40/40" alt="Admin Desa" />
                        <AvatarFallback>AD</AvatarFallback>
                    </Avatar>
                    <span>Admin Desa</span>
                </div>
                <span className="hidden md:inline">|</span>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{formattedDate}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>{formattedTime} WIB</span>
              </div>
            </div>
          </header>

          <div className="relative aspect-video rounded-xl overflow-hidden mb-8 shadow-lg">
            <Image
              src={article.thumbnailUrl}
              alt={article.title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 896px"
            />
          </div>

          <div className="prose prose-lg max-w-none prose-p:text-foreground/80 prose-headings:text-foreground prose-strong:text-foreground">
            <p>{article.content}</p>
          </div>
        </article>
      </div>
    </div>
  );
}
