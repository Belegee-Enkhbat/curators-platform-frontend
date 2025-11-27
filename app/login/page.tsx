'use client';
import AuthForm from '@/components/auth';
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
export default function LoginPage() {
    const user = useAuthStore((s) => s.user);
    const router = useRouter();
    useEffect(() => {
        if (user) {
            router.replace(user.type === 'organization' ? '/organization' : '/creator');
        }
    }, [user, router]);
    return (
        <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-white">
            <AuthForm />
        </main>
    );
}