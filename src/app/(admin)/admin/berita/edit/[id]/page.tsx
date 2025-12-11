'use client';

import { NewsForm } from '@/components/admin/NewsForm';
import { notFound } from 'next/navigation';
import type { NewsArticle } from '@/lib/types';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useFirestore } from '@/firebase';
import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';

export default function EditBeritaPage({ params }: { params: Promise<{ id: string }> }) {
    // Menggunakan React.use() untuk mengekstrak nilai dari Promise params
    const { id } = React.use(params);
    const firestore = useFirestore();
    const [article, setArticle] = useState<NewsArticle | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    
    useEffect(() => {
        if (!firestore) {
            return;
        }

        const fetchArticle = async () => {
            setIsLoading(true);
            try {
                const docRef = doc(firestore, 'news_articles', id);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    setArticle({ id: docSnap.id, ...docSnap.data() } as NewsArticle);
                } else {
                    notFound();
                }
            } catch (error) {
                console.error("Error fetching article:", error);
                // Handle error state if necessary, e.g., show an error message
            } finally {
                setIsLoading(false);
            }
        };

        fetchArticle();
    }, [firestore, id]);

    if (isLoading) {
        return (
             <div className="flex h-screen w-full items-center justify-center">
                <p>Memuat editor...</p>
            </div>
        );
    }
    
    if (!article) {
        // This case will be handled by notFound() inside useEffect, 
        // but as a fallback, we can show a message or redirect.
        // It's better to let notFound() handle it for consistency.
        return null;
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
