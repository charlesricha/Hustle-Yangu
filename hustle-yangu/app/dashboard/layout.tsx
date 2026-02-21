"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !user) {
            router.push("/login");
        }
    }, [user, loading, router]);

    if (loading) return <div className="h-screen w-screen bg-background flex items-center justify-center text-white">Loading...</div>;

    // Slight delay or null return to prevent flash before redirect could be handled better, 
    // but loading state covers most of it.
    if (!user) return null;

    return <>{children}</>;
}
