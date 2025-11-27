'use client';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/store/authStore';
import { UserType } from '@/types/enums';
import { useState } from 'react';
export default function AuthForm() {
    const [type, setType] = useState<UserType>(UserType.Organization);
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const login = useAuthStore((s) => s.login);
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const ok = login(type, name, password);
        if (!ok) setError('Invalid credentials');
        else setError('');
    };
    return (
        <form
            onSubmit={handleSubmit}
            className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md space-y-6"
        >
            <h2 className="text-2xl font-bold text-center">Sign In</h2>
            <div className="flex space-x-2">
                <Button
                    type="button"
                    variant={type === UserType.Organization ? 'default' : 'outline'}
                    onClick={() => setType(UserType.Organization)}
                    className="flex-1"
                >
                    Organization
                </Button>
                <Button
                    type="button"
                    variant={type === UserType.Creator ? 'default' : 'outline'}
                    onClick={() => setType(UserType.Creator)}
                    className="flex-1"
                >
                    Content Creator
                </Button>
            </div>
            <input
                className="w-full border rounded px-3 py-2"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />
            <input
                className="w-full border rounded px-3 py-2"
                placeholder="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            {error && <div className="text-red-500 text-sm">{error}</div>}
            <Button type="submit" className="w-full">Login</Button>
            <div className="text-xs text-gray-400 text-center">
                Organization password: <b>orgpass</b> | Creator password: <b>creatorpass</b>
            </div>
        </form>
    );
}