"use client";
import React from 'react';
import { Menu, Globe, LogOut, LogIn } from 'lucide-react';
import { Button } from '../ui/button';
import Link from "next/link";
import { useAuthStore } from '@/store/authStore';
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils"; // optional helper for class merging
import { useRouter } from 'next/navigation';

interface NavLinkProps {
  href: string;
  className?: string;
  children: React.ReactNode;
}


const NavLink: React.FC<NavLinkProps> = ({ href, className, children }) => {
    const pathname: string = usePathname();
    const active: boolean = pathname === href;

    return (
        <Link
            href={href}
            className={cn(
                "transition-colors",
                active ? "text-indigo-600 font-bold" : "text-gray-900",
                className
            )}
        >
            {children}
        </Link>
    );
};


const Header = () => {
    const { user, logout } = useAuthStore();
    const isAuthChecked = user !== undefined; 
    const router = useRouter();

    const handleLoginClick = () => {
        router.push('/login');
    };

    const handleLogout = () => {
        logout(); // Call the logout function from the auth store
        handleLoginClick(); // Redirect to login page after logout
    }


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
                                    <NavLink href="/org-dashboard">Dashboard</NavLink>
                                    <NavLink href="/active-creator">Active Creators</NavLink>
                                    <NavLink href="/trending">Trending Content</NavLink>
                                    <NavLink href="/ai-assistant">AI Assistant</NavLink>
                                </>
                            ) : user?.type === 'creator' ? (
                                <>
                                    <NavLink href="/user-dashboard">Dashboard</NavLink>
                                    <NavLink href="/job-list">Job Listings</NavLink>
                                    <NavLink href="/trending">Trending Content</NavLink>
                                    <NavLink href="/career-advice">Career Advice</NavLink>
                                    <NavLink href="/ai-assistant">AI Assistant</NavLink>
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
                                    Hello, {user.name}!
                                </span>
                                <Button
                                    onClick={handleLogout} // Call the logout function (mocked)
                                    variant="outline"
                                    className="hidden sm:inline-flex text-sm font-semibold h-9 px-4 border-red-400 text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors group"
                                >
                                    <LogOut className="h-4 w-4 mr-1 text-red-500 transition-transform group-hover:scale-110" />
                                    Logout
                                </Button>
                            </div>
                        ) : (
                            // Logged Out: Show Login Button
                            <Button
                                onClick={handleLoginClick} // This simulates routing to /login
                                className="hidden sm:inline-flex bg-indigo-600 hover:bg-indigo-700 text-sm font-semibold h-9 px-4"
                            >
                                <LogIn className="h-4 w-4 mr-2" />
                                Login
                            </Button>
                        )
                    }

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