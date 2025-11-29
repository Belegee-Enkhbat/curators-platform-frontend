"use client";
import React, { useState, useEffect } from 'react';
import { Menu, Globe, LogOut, LogIn } from 'lucide-react';
import { Button } from '../ui/button';
import { useAuthStore } from '@/store/authStore';

// This mock replaces 'next/link'
// Note: Changed type definition to avoid TS errors in the mock environment
type NavLinkProps = {
    href: string;
    children: React.ReactNode;
    className?: string;
};

const NavLink: React.FC<NavLinkProps> = ({ href, children, className }) => (
    <a
        href={href}
        // Simulating Next.js Link behavior with anchor tag for demonstration
        onClick={(e) => { e.preventDefault(); console.log(`Navigating to ${href}`); }}
        className={className ?? "text-sm font-medium text-gray-600 hover:text-indigo-700 transition-colors cursor-pointer"}
    >
        {children}
    </a>
);

// This mock replaces 'next/navigation' useRouter
const useRouter = () => ({
    push: (path: string) => {
        // Simulating Next.js router push
        console.log(`Routing to: ${path}`);
        alert(`Simulating route push to: ${path}. Check console for details.`);
    }
});

// This mock replaces '@/store/authStore'


const Header = () => {
    // useAuthStore-оос user болон logout функцийг авч байна.
    const { user, logout } = useAuthStore();
    const isAuthChecked = user !== undefined; // Ensures state check is done
    const router = useRouter();

    const handleLoginClick = () => {
        router.push('/login');
    };
    
  


    return (
        <header className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex justify-between items-center">
                {/* 1. Logo and Main Navigation */}
                <div className="flex items-center space-x-10">
                    {/* Logo Section */}
                    <NavLink
                        href="/" // Using NavLink as mock for Link
                        className="flex cursor-pointer items-center text-gray-900 font-extrabold text-2xl tracking-tight"
                    >
                        <span className="text-indigo-600 mr-0.5">CURA</span>tors
                    </NavLink>
                    {/* Navigation Links (Desktop) */}
                    <nav className="hidden md:flex items-center space-x-6">
                        {
                            user?.type === 'organization' ? (
                                <>
                                    <NavLink href="/dashboard">Дашбоард</NavLink>
                                    <NavLink href="/trending">Трэнп контентууд</NavLink>
                                    <NavLink href="/ai-assistant">АI туслах</NavLink>
                                </>
                            ) : user?.type === 'creator' ? (
                                <>
                                    <NavLink href="/job-list">Ажлын зар</NavLink>
                                    <NavLink href="/trending">Трэнп контентууд</NavLink>
                                    <NavLink href="/careers">Карьер зөвлөгөө</NavLink>
                                    <NavLink href="/ai-assistant">АI туслах</NavLink>
                                </>
                            ) : null
                        }
                    </nav>
                </div>
                {/* 2. Actions (Login, Logout, Language, Menu) */}
                <div className="flex items-center space-x-3">
                    {/* Authentication Status / Action Buttons */}
                    {
                        isAuthChecked && user ? (
                            // Logged In: Show Greeting and Logout Button
                            <div className="flex items-center space-x-3">
                                <span className="hidden sm:inline text-sm font-medium text-gray-700">
                                    Сайн байна уу, {user.name}!
                                </span>
                                <Button
                                    onClick={logout} // Call the logout function (mocked)
                                    variant="outline"
                                    className="hidden sm:inline-flex text-sm font-semibold h-9 px-4 border-red-400 text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors group"
                                >
                                    <LogOut className="h-4 w-4 mr-1 text-red-500 transition-transform group-hover:scale-110" />
                                    Гарах
                                </Button>
                            </div>
                        ) : (
                            // Logged Out: Show Login Button
                            <Button
                                onClick={handleLoginClick} // This simulates routing to /login
                                className="hidden sm:inline-flex bg-indigo-600 hover:bg-indigo-700 text-sm font-semibold h-9 px-4"
                            >
                                <LogIn className="h-4 w-4 mr-2" />
                                Нэвтрэх
                            </Button>
                        )
                    }

                    {/* Language Selector */}
                    <Button
                        onClick={() => {}} // Added empty handler to satisfy required prop
                        variant="outline"
                        size="sm"
                        className="hidden lg:flex items-center text-sm font-medium text-gray-600 border-gray-200 h-9 px-3"
                    >
                        <Globe className="h-4 w-4 mr-1 text-gray-500" />
                        <span>🇲🇳 MN</span>
                    </Button>
                    {/* Mobile Menu Button */}
                    <Button
                     onClick={() => {}}
                        variant="ghost"
                        size="icon"
                        className="md:hidden"
                    >
                        <Menu className="h-6 w-6 text-gray-600" />
                    </Button>
                </div>
            </div>
        </header>
    );
}

export default Header;