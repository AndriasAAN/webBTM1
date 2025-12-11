'use client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { doc, getDoc, Timestamp } from 'firebase/firestore';
import type { NewsArticle } from '@/lib/types';
import { format } from 'date-fns';
import { id as localeId } from 'date-fns/locale';
import { Calendar, Clock } from 'lucide-react';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useFirestore } from '@/firebase';


export default function BeritaDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params);
  const firestore = useFirestore();
  const [article, setArticle] = useState<NewsArticle | null>(null);

  useEffect(() => {
    if (!firestore || !id) return;

    const fetchArticle = async () => {
      const docRef = doc(firestore, 'news_articles', id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setArticle({ id: docSnap.id, ...docSnap.data() } as NewsArticle);
      } else {
        notFound();
      }
    };

    fetchArticle();
  }, [firestore, id]);


  if (!article) {
    // Render nothing or a minimal placeholder until data is fetched,
    // as the loading state is now handled by loading.tsx
    return null;
  }
  
  const articleDate = (article.createdAt as Timestamp).toDate();
  const formattedDate = format(articleDate, 'EEEE, dd MMMM yyyy', { locale: localeId });
  const formattedTime = format(articleDate, 'HH:mm', { locale: localeId });

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
