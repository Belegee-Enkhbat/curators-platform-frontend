'use client';

import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/store/authStore';
import { UserType } from '@/types/enums';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Spinner } from '@/components/ui/spinner';

export default function LoginPage() {
    const router = useRouter();
    const [type, setType] = useState<UserType>(UserType.Creator);
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const user = useAuthStore((s) => s.user); // Get current user state
    const login = useAuthStore((s) => s.login);

    // Redirect logic: If already logged in, redirect to the appropriate page
    useEffect(() => {
        if (user) {
            const redirectPath = user.type === UserType.Organization ? '/org-dashboard' : '/job-list';
            // Use router.replace to prevent going back to login page after successful login
            router.replace(redirectPath); 
        }
    }, [user, router]);
    
    // Show a loading state if user is being redirected
    if (user) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-50">
                <div className="text-lg font-semibold text-indigo-600">  <Spinner className="size-6" /></div>
            </div>
        );
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        
        const ok = login(type, name, password);
        
        if (!ok) {
            setError('Нэр эсвэл нууц үг буруу байна. Туршилтын нууц үгийг ашиглана уу.');
        } 
        // Successful login handles redirection via useEffect
    };
    
    // Determine redirect path for display hint
    const successRedirectPath = type === UserType.Organization ? '/org-dashboard' : '/job-list';

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <form
                onSubmit={handleSubmit}
                className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md space-y-6 border border-gray-100"
            >
                <h2 className="text-3xl font-extrabold text-center text-gray-900">Нэвтрэх</h2>
                
                {/* User Type Selection */}
                <div className="flex space-x-2 p-1 bg-gray-100 rounded-lg">
                    <Button
                        type="button"
                        variant={type === UserType.Creator ? 'default' : 'ghost'}
                        onClick={() => setType(UserType.Creator)}
                        className="flex-1 transition-all duration-200 h-10 shadow-sm"
                    >
                        Контент Бүтээгч
                    </Button>
                    <Button
                        type="button"
                        variant={type === UserType.Organization ? 'default' : 'ghost'}
                        onClick={() => setType(UserType.Organization)}
                        className="flex-1 transition-all duration-200 h-10 shadow-sm"
                    >
                        Байгууллага
                    </Button>
                </div>

                {/* Input Fields */}
                <input
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm transition"
                    placeholder="Нэр (Name)"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <input
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm transition"
                    placeholder="Нууц үг (Password)"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                
                {/* Error Display */}
                {error && <div className="text-red-600 bg-red-50 p-3 rounded-lg text-sm font-medium text-center">{error}</div>}
                
                {/* Login Button */}
                <Button 
                    type="submit" 
                    className="w-full bg-indigo-600 hover:bg-indigo-700 h-11 text-lg font-semibold shadow-md"
                >
                    Нэвтрэх
                </Button>
                
                {/* Static Credentials Hint */}
                <div className="text-xs text-gray-500 text-center pt-2 border-t border-gray-100">
                    <p className="font-semibold text-gray-600 mb-1">Туршилтын Нууц Үг:</p>
                    <p>Байгууллага: <code className="font-mono text-indigo-500">orgpass</code> <span className="text-gray-400">|</span> Бүтээгч: <code className="font-mono text-indigo-500">creatorpass</code></p>
                    <p className="mt-1 text-xs text-gray-400">Амжилттай нэвтэрвэл <span className="font-medium text-indigo-500">{successRedirectPath}</span> руу үсэрнэ.</p>
                </div>
            </form>
        </div>
    );
}