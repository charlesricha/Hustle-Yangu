"use client";

import { useState, useRef } from "react";
import GoogleMapContainer from "../components/GoogleMapContainer";
import HustleCard from "../components/HustleCard";
import { County } from "../data/counties";
import { HUSTLES, Hustle } from "../data/hustles";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function Dashboard() {
    const [selectedCounty, setSelectedCounty] = useState<County | null>(null);
    const [activeHustles, setActiveHustles] = useState<Hustle[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const containerRef = useRef<HTMLDivElement>(null);
    const listRef = useRef<HTMLDivElement>(null);

    // GSAP Animation for Sidebar Entrance
    useGSAP(() => {
        if (selectedCounty) {
            gsap.fromTo(containerRef.current,
                { x: -50, opacity: 0 },
                { x: 0, opacity: 1, duration: 0.6, ease: "power3.out" }
            );

            if (activeHustles.length > 0) {
                gsap.fromTo(".hustle-card-item",
                    { y: 20, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.4, stagger: 0.1, delay: 0.2, ease: "back.out(1.7)" }
                );
            }
        }
    }, [selectedCounty, activeHustles]);

    const handleCountySelect = async (county: County) => {
        setSelectedCounty(county);
        setIsLoading(true);

        // 1. Static Hustles
        const staticHustles = HUSTLES[county.id] || [];
        setActiveHustles(staticHustles);

        // 2. AI Hustles
        try {
            const res = await fetch('/api/hustles/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ county: county.name })
            });

            if (res.ok) {
                const data = await res.json();
                if (data.hustles && Array.isArray(data.hustles)) {
                    setActiveHustles([...staticHustles, ...data.hustles]);
                }
            }
        } catch (err) {
            console.error("Failed to fetch AI hustles", err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <main className="h-screen w-screen bg-background flex text-foreground overflow-hidden font-sans relative">

            {/* Background Ambient Glow */}
            <div className="absolute inset-0 pointer-events-none z-0">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500/10 rounded-full blur-[100px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/10 rounded-full blur-[100px]" />
            </div>

            {/* Sidebar / Hustle Panel */}
            <AnimatePresence mode="wait">
                {selectedCounty ? (
                    <div
                        ref={containerRef}
                        className="absolute left-4 top-4 bottom-4 w-full md:w-[450px] glass rounded-2xl p-6 flex flex-col z-20 shadow-2xl border border-white/10"
                    >
                        <div className="flex justify-between items-center mb-6 border-b border-white/5 pb-4">
                            <div>
                                <h2 className="text-2xl font-bold tracking-tight text-white mb-1 drop-shadow-md">
                                    {selectedCounty.name.toUpperCase()}
                                </h2>
                                <span className="text-xs text-blue-400 uppercase tracking-widest font-semibold">Region Analysis</span>
                            </div>
                            {isLoading ? (
                                <div className="w-5 h-5 rounded-full border-2 border-blue-500 border-t-transparent animate-spin"></div>
                            ) : (
                                <button
                                    onClick={() => setSelectedCounty(null)}
                                    className="text-white/50 hover:text-white transition-colors"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            )}
                        </div>

                        <div ref={listRef} className="flex-1 overflow-y-auto pr-2 space-y-4 custom-scrollbar">
                            {activeHustles.length > 0 ? (
                                activeHustles.map((hustle, idx) => (
                                    <div key={`${hustle.id}-${idx}`} className="hustle-card-item">
                                        <HustleCard {...hustle} />
                                    </div>
                                ))
                            ) : (
                                <div className="text-foreground-muted text-sm italic text-center mt-10">
                                    No active hustles found in this sector.
                                </div>
                            )}
                        </div>
                    </div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="absolute top-6 left-6 z-10 glass px-6 py-4 rounded-xl border border-white/10 max-w-sm backdrop-blur-xl shadow-2xl"
                    >
                        <h1 className="text-2xl font-bold text-white mb-1 tracking-tight">Hustle Yangu <span className="text-blue-500">.</span></h1>
                        <p className="text-sm text-gray-400 leading-relaxed">
                            Select a region on the map to analyze potential revenue streams and risks.
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Map Area */}
            <div className="flex-1 h-full relative z-0">
                <GoogleMapContainer onSelectCounty={handleCountySelect} />
            </div>

        </main>
    );
}
