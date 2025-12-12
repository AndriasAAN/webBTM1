import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import type { NewsArticle } from '@/lib/types';
import Image from 'next/image';
import Link from 'next/link';
import { CalendarDays } from 'lucide-react';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import { Timestamp } from 'firebase/firestore';

interface NewsCardProps {
  article: NewsArticle;
}

export function NewsCard({ article }: NewsCardProps) {
  const getDate = () => {
    if (!article.createdAt) return new Date();
    if (article.createdAt instanceof Timestamp) {
      return article.createdAt.toDate();
    }
    return article.createdAt;
  }

  const formattedDate = article.createdAt
    ? format(getDate(), 'dd MMMM yyyy', { locale: id })
    : 'Tanggal tidak tersedia';

  const excerpt = article.content.substring(0, 100) + (article.content.length > 100 ? '...' : '');

  return (
    <Card className="flex flex-col h-full overflow-hidden transition-transform transform hover:-translate-y-2 hover:shadow-xl">
      <Link href={`/berita/${article.id}`} className="block h-full">
        <CardHeader className="p-0">
          <div className="aspect-video relative">
            <Image
              src={article.thumbnailUrl}
              alt={article.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        </CardHeader>
        <CardContent className="flex-grow p-6">
          <div className="flex items-center text-sm text-muted-foreground mb-2">
            <CalendarDays className="h-4 w-4 mr-2" />
            <span>{formattedDate}</span>
          </div>
          <CardTitle className="text-xl leading-tight font-bold mb-2 group-hover:text-primary transition-colors">
              {article.title}
          </CardTitle>
          <CardDescription>{excerpt}</CardDescription>
        </CardContent>
      </Link>
    </Card>
  );
}
