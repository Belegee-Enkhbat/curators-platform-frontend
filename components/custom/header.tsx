"use client";

import { Button } from "@/components/ui/button";
import { Menu, Globe } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuthStore } from "@/store/authStore";

// NavLink компонентыг Header компонентын ГАДНА зарлаж байна.
const NavLink = ({ href, children }: { href: string, children: React.ReactNode }) => (
    <Link
        href={href}
        className="text-sm font-medium text-gray-600 hover:text-indigo-700 transition-colors"
    >
        {children}
    </Link>
);


const Header = () => {
    const { user } = useAuthStore();
    const isAuthChecked = user !== undefined;
    const router = useRouter();

    return (
        // Outer container: sticky, elevated, clean background
        <header className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
            {/* Асуудлын эх үүсвэр болоогүй хэдий ч таны өгсөн class-ыг хадгалав */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex justify-between items-center">

                {/* 1. Logo and Main Navigation */}
                <div className="flex items-center space-x-10">
                    {/* Logo Section */}
                    <Link
                        href="/"
                        className="flex cursor-pointer items-center text-gray-900 font-extrabold text-2xl tracking-tight"
                    >
                        <span className="text-indigo-600 mr-0.5">CURA</span>tors
                    </Link>

                    {/* Navigation Links (Desktop) */}
                    <nav className="hidden md:flex items-center space-x-6">
                        {/* NavLink-ийг одоо зөв ашиглаж байна */}
                        {
                            user?.type === 'organization' ? (
                                <>
                                    <NavLink href="/">Дашбоард</NavLink>
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

                {/* 2. Actions (Login, Language, Menu) */}
                <div className="flex items-center space-x-3">

                    {/* Login Button */}
                    {
                        isAuthChecked && user ? (
                            <p >
                                Сайн байна уу, {user.name}!
                            </p>
                        ) : <Button
                            onClick={() => router.push('/login')}
                            className="hidden sm:inline-flex bg-indigo-600 hover:bg-indigo-700 text-sm font-semibold h-9 px-4"
                        >
                            Нэвтрэх
                        </Button>
                    }
                    {/* Language Selector (using a standard button for consistency) */}
                    <Button
                        variant="outline"
                        size="sm"
                        className="hidden lg:flex items-center text-sm font-medium text-gray-600 border-gray-200 h-9 px-3"
                    >
                        <Globe className="h-4 w-4 mr-1 text-gray-500" />
                        <span>🇲🇳 MN</span>
                    </Button>

                    {/* Mobile Menu Button */}
                    <Button
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