'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'; // Added for React Query
import { UserType } from '@/types/enums';

interface ClientLayoutProps {
    children: React.ReactNode;
}

// Хамгаалагдсан хуудсууд (Authentication шаардлагатай)
// Таны төслийн бүтцээр: /organization болон /job-list
const PROTECTED_ROUTES = ['/organization', '/job-list'];

export default function ClientLayout({ children }: ClientLayoutProps) {
    // React Query Setup: Initialize QueryClient once
    const [queryClient] = useState(() => new QueryClient());
    
    const router = useRouter();
    const pathname = usePathname();
    const { user } = useAuthStore();
    
    // Auth төлөв ачаалагдаж дууссан эсэхийг шалгах.
    // user state нь localStorage-аас уншигдах хүртэл (component mount) null байж болно.
    // Бид "user" нь нэгэнт уншигдсан уу үгүй юу гэдгийг тодорхойлохын тулд "isReady" төлөвийг ашиглана.
    // Энэ нь zustand store-ийн initialization-тай холбоотой тул шууд setState ашиглахгүйгээр user-ийн эхний утгыг хүлээж авна.
    // Auth төлөв ачаалагдаж дууссан эсэхийг шалгах.
    // user state нь localStorage-аас уншигдах хүртэл (component mount) null байж болно.
    // isAuthChecked нь user-ийн утга undefined биш үед true болно.
    const isAuthChecked = user !== undefined;

    // Authentication ба Redirection логик
    useEffect(() => {
        if (!isAuthChecked) {
            // Түр зуурын null утга дээр router-ийг ажиллуулахаас сэргийлнэ.
            return;
        }

        const isProtected = PROTECTED_ROUTES.some(route => pathname.startsWith(route));
        
        if (isProtected && !user) {
            // 1. Хэрэглэгч нэвтрээгүй бөгөөд хамгаалагдсан хуудас руу орохыг оролдож байна
            console.log(`Access denied for ${pathname}: Redirecting to /login`);
            router.replace('/login');
        } else if (user && pathname === '/login') {
             // 2. Хэрэглэгч нэвтэрсэн бөгөөд /login хуудас руу орохыг оролдож байна
             // user.type is a string from the store (e.g., 'Organization' or 'Creator')
             const redirectPath = user.type === UserType.Organization ? '/organization' : '/job-list';
             console.log(`Already logged in: Redirecting from /login to ${redirectPath}`);
             router.replace(redirectPath);
        }
    // user-ийн өөрчлөлт, pathname-ийн өөрчлөлт, router-ийн шилжилт болон auth шалгалт хийгдсэн үед ажиллана.
    }, [user, pathname, router, isAuthChecked]);

    // Ачааллах үеийн UI (Auth check хийгдэж дуусах хүртэл)
    if (!isAuthChecked) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-50">
                <div className="text-xl font-semibold text-indigo-600 animate-pulse">Төлөвийг шалгаж байна...</div>
            </div>
        );
    }
    
    // Хэрэглэгч нэвтрээгүй, хамгаалагдсан хуудсан дээр байвал шилжүүлэх хүртэл хүлээлгэнэ
    const isProtected = PROTECTED_ROUTES.some(route => pathname.startsWith(route));
    if (isProtected && !user) {
        // Redirection логик useEffect дотор ажиллаж байгаа тул энд зөвхөн хүлээлгийн UI үзүүлнэ.
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-50">
                <div className="text-gray-500">Нэвтрэх хуудас руу шилжиж байна...</div>
            </div>
        );
    }

    // Хэрэглэгч нэвтэрсэн эсвэл хамгаалагдаагүй хуудас руу орсон бол үндсэн контентыг QueryClientProvider-оор боож үзүүлнэ
    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    );
}