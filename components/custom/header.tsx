"use client";

import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react"; // Using a better icon library like lucide-react (commonly used with shadcn)
import { useRouter } from "next/navigation";

const Header = () => {
    const router = useRouter();
    return (
    // Outer container: sticky, elevated, clean background
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex justify-between items-center">
            
            {/* 1. Logo and Main Navigation */}
            <div className="flex items-center space-x-10">
                {/* Logo Section */}
                <div className="flex cursor-pointer items-center text-gray-900 font-extrabold text-2xl tracking-tight" onClick={()=>router.push('/')}>
                    <span className="text-indigo-600 mr-0.5">CURA</span>tors
                </div>
                
                {/* Navigation Links (Desktop) */}
                {/* Replaced <nav> with ul for semantic list, but kept hidden/flex for responsiveness */}
                <nav className="hidden md:flex items-center space-x-6">
                    <a href="#" className="text-sm font-medium text-gray-600 hover:text-indigo-700 transition-colors">Ажлын зар</a>
                    <a href="#" className="text-sm font-medium text-gray-600 hover:text-indigo-700 transition-colors">Трэнп контентууд</a>
                    <a href="#" className="text-sm font-medium text-gray-600 hover:text-indigo-700 transition-colors">Карьер зөвлөгөө</a>
                    <a href="#" className="text-sm font-medium text-gray-600 hover:text-indigo-700 transition-colors">АI туслах</a>
                </nav>
            </div>

            <div className="flex items-center space-x-3">
                
                <Button onClick={()=>router.push('/login')} variant="default" className="hidden sm:inline-flex bg-indigo-600 hover:bg-indigo-700 text-sm font-semibold h-9 px-4">
                    Нэвтрэх
                </Button>

                <div className="hidden lg:flex items-center text-sm font-medium text-gray-600 border border-gray-200 rounded-md p-1.5 cursor-pointer hover:bg-gray-50 transition-colors">
                    <span className="mr-1">🇲🇳</span> MN
                </div>

                <Button  variant="ghost" size="icon" className="md:hidden">
                    <Menu className="h-6 w-6 text-gray-600" />
                </Button>
            </div>
        </div>
    </header>
    );
}

export default Header;