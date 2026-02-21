"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { counties, County } from "../data/counties";
import { clsx } from "clsx";

interface MapContainerProps {
    onSelectCounty: (county: County) => void;
}

export default function MapContainer({ onSelectCounty }: MapContainerProps) {
    const [hovered, setHovered] = useState<string | null>(null);

    return (
        <div className="relative w-full max-w-3xl aspect-[1.2] mx-auto bg-black/20 rounded-xl border border-neon-green/30 backdrop-blur-sm p-4 overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--neon-green)_0%,_transparent_10%)] opacity-5 pointer-events-none"></div>

            <svg
                viewBox="0 0 600 600"
                className="w-full h-full drop-shadow-[0_0_15px_rgba(57,255,20,0.3)] filter"
            >
                {/* Abstract Kenya Shape/Background - Placeholder */}
                <path
                    d="M 100 100 L 500 100 L 500 500 L 100 500 Z"
                    fill="none"
                    stroke="#333"
                    strokeWidth="0.5"
                    className="opacity-20"
                    style={{ display: "none" }} // Hide box, just conceptual
                />
                {/* Rough Kenya outline for context */}
                {/* Rough Kenya outline for context */}
                <path
                    d="M 150 350 L 200 100 L 550 100 L 580 400 L 450 500 L 200 550 Z"
                    fill="none"
                    stroke="var(--neon-green)"
                    strokeWidth="1"
                    className="opacity-30"
                />

                {counties.map((county) => (
                    <motion.g
                        key={county.id}
                        onMouseEnter={() => setHovered(county.id)}
                        onMouseLeave={() => setHovered(null)}
                        onClick={() => onSelectCounty(county)}
                        initial={{ scale: 1, opacity: 0.8 }}
                        whileHover={{ scale: 1.1, opacity: 1, zIndex: 10 }}
                        className="cursor-pointer"
                    >
                        <path
                            d={county.path}
                            className={clsx(
                                "transition-colors duration-300 ease-out",
                                hovered === county.id
                                    ? "fill-neon-green stroke-white stroke-2"
                                    : "fill-gray-800 stroke-neon-green/50 stroke-1"
                            )}
                        />
                        {/* Label */}
                        <text
                            x={county.cx}
                            y={county.cy - 10}
                            textAnchor="middle"
                            className={clsx(
                                "text-[10px] font-mono fill-white pointer-events-none",
                                hovered === county.id ? "opacity-100 font-bold" : "opacity-0"
                            )}
                        >
                            {county.name}
                        </text>
                    </motion.g>
                ))}
            </svg>

            <div className="absolute bottom-4 left-4 text-electric-yellow font-mono text-sm animate-pulse">
                {hovered ? `TARGETING: ${counties.find(c => c.id === hovered)?.name.toUpperCase()}` : "SCANNING REGIONS..."}
            </div>
        </div>
    );
}
