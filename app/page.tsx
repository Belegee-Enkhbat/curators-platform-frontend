"use client";

import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/authStore";
import { UserType } from "@/types/enums";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
// import {Loader} from "@/components/ui/loader";
import { Spinner } from "@/components/ui/spinner";

export default function Home() {
    const router = useRouter();
    const { user } = useAuthStore();
    useEffect(() => {
        // user state нь localStorage-аас уншигдаж дуусах хүртэл хүлээх
        if (user) {
            // Нэвтэрсэн бол хэрэглэгчийн төрлөөр нь шууд шилжүүлэх
            const redirectPath = user.type === UserType.Organization ? '/org-dashboard' : '/job-list';
            router.replace(redirectPath);
        }
    }, [user, router]);

    // Хэрэв redirect хийгдэж байгаа эсвэл user state ачааллагдаж байгаа бол
    if (user === undefined || user) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-50">
               <Spinner className="size-6" />
            </div>
        );
    }
    
    // Нэвтрээгүй хэрэглэгчдэд зориулсан Home Page
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <div className="text-center space-y-8 p-8 max-w-2xl">
                <h1 className="text-5xl font-extrabold text-gray-900 leading-tight">
                    <span className="text-indigo-600">CURATORS</span>: Development and Collaboration Platform
                </h1>
                <p className="text-xl text-gray-600">
                    Connect with top content creators and manage your projects effectively.
                </p>
                <Button
                    onClick={() => router.push('/login')}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-8 py-3 rounded-xl shadow-lg transition transform hover:scale-105"
                >
                    Эхлэх
                </Button>
            </div>
        </div>
    );
}