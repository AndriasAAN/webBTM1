'use client';

import { NewsForm } from '@/components/admin/NewsForm';
import { notFound, useRouter } from 'next/navigation';
import type { NewsArticle } from '@/lib/types';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useDoc, useFirestore } from '@/firebase';
import { doc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';

export default function EditBeritaPage({ params }: { params: { id: string } }) {
    const { id } = params;
    const firestore = useFirestore();
    const [article, setArticle] = useState<NewsArticle | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);
    
    useEffect(() => {
        if (!firestore || !id) {
            setIsLoading(false);
            return;
        };

        const articleRef = doc(firestore, 'news_articles', id);
        const { data, isLoading: docIsLoading, error: docError } = useDoc<NewsArticle>(articleRef);
        
        // This is a workaround to sync useDoc with local state.
        // A better approach might be to directly use useDoc's return values, but this is safer for now.
        if (!docIsLoading) {
            if (docError) {
                setError(docError);
            } else if (data) {
                setArticle(data);
            }
            setIsLoading(false);
        }

    }, [firestore, id, useDoc]);

    useEffect(() => {
        if (!isLoading && !article) {
           // To ensure `useDoc` has had a chance to fetch, we check after loading.
           const docRef = firestore ? doc(firestore, 'news_articles', id) : null;
           const { data: currentData } = useDoc<NewsArticle>(docRef);
           if (!currentData) {
               notFound();
           } else {
               setArticle(currentData);
           }
        }
    }, [isLoading, article, firestore, id]);


    if (error) {
        console.error(error);
        return <div>Error loading article. Please try again later.</div>
    }

    if (isLoading || !article) {
        // You can use the loading.tsx file for a better loading UI
        return (
            <div className="flex h-screen w-full items-center justify-center">
                <p>Memuat editor...</p>
            </div>
        );
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
                        Anda sedang mengedit: "{article.title}"
                    </p>
                </div>
            </div>
            <NewsForm article={article} />
        </div>
    );
}
