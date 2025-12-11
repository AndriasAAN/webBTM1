'use client';

import { NewsForm } from '@/components/admin/NewsForm';
import { notFound, useRouter } from 'next/navigation';
import type { NewsArticle } from '@/lib/types';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useDoc, useFirestore, useMemoFirebase } from '@/firebase';
import { doc } from 'firebase/firestore';
import React from 'react';


export default function EditBeritaPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = React.use(params);
    const firestore = useFirestore();
    const articleRef = useMemoFirebase(() => firestore ? doc(firestore, 'news_articles', id) : null, [firestore, id]);
    const { data: article, isLoading, error } = useDoc<NewsArticle>(articleRef);
    const router = useRouter();


    if (!article && !isLoading) {
        notFound();
    }
    
    if (error) {
        console.error(error);
        // Optionally show an error message to the user
        return <div>Error loading article. Please try again later.</div>
    }


    return (
        <div className="space-y-8">
            <div className="flex items-center gap-4">
                 <Button variant="outline" size="icon" className="h-7 w-7" asChild>
                    <Link href="/admin/berita">
                        <ArrowLeft className="h-4 w-4" />
                        <span className="sr-only">Kembali</span>
                    </Link>
                </Button>
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Edit Berita</h1>
                    <p className="text-muted-foreground max-w-xl truncate">
                        Anda sedang mengedit: "{article?.title}"
                    </p>
                </div>
            </div>
            {article && <NewsForm article={article} />}
        </div>
    );
}
