"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Review } from "../data/hustles";
import ReviewsSection from "./ReviewsSection";

interface HustleProps {
    id: string; // Needed for reviews
    name: string;
    cost: number;
    risk: number;
    profit: number;
    description: string;
    category?: "Grind" | "Gamble" | "Unique";
    challenges?: string[];
    vibe?: string;
    reviews?: Review[];
    isAi?: boolean;
}

export default function HustleCard({ id, name, cost, risk, profit, description, category, challenges, vibe, reviews, isAi }: HustleProps) {
    const [showChallenges, setShowChallenges] = useState(false);

    const getCategoryColor = (cat?: string) => {
        switch (cat) {
            case "Gamble": return "text-purple-400 border-purple-400/30 bg-purple-400/10";
            case "Unique": return "text-amber-400 border-amber-400/30 bg-amber-400/10";
            default: return "text-blue-400 border-blue-400/30 bg-blue-400/10";
        }
    };

    return (
        <div
            className="group relative glass hover:bg-white/5 border border-white/5 p-5 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10 hover:border-blue-500/20"
        >
            <div className="flex justify-between items-start mb-3">
                <div className="flex flex-col">
                    <h3 className="font-bold text-lg text-white tracking-tight group-hover:text-blue-400 transition-colors flex items-center gap-2">
                        {name}
                        {isAi && <span className="text-[10px] bg-gradient-to-r from-blue-500 to-purple-500 text-white px-2 py-0.5 rounded-full flex items-center shadow-sm">✨ AI Generated</span>}
                    </h3>
                    {category && <span className={`text-[10px] px-2 py-0.5 border rounded-full w-fit mt-1.5 font-medium ${getCategoryColor(category)}`}>{category.toUpperCase()}</span>}
                </div>
                <div className={`text-xs px-2.5 py-1 rounded-full font-bold border ${risk > 50 ? 'bg-red-500/10 text-red-400 border-red-500/20' : 'bg-green-500/10 text-green-400 border-green-500/20'}`}>
                    Risk: {risk}%
                </div>
            </div>

            <p className="text-sm text-gray-400 mb-4 leading-relaxed line-clamp-3">
                {description}
            </p>

            {vibe && <div className="text-xs text-blue-400/80 italic mb-4 pl-3 border-l-2 border-blue-500/30">"{vibe}"</div>}

            <div className="grid grid-cols-2 gap-3 mb-4 bg-black/20 p-3 rounded-lg border border-white/5">
                <div>
                    <span className="block text-[10px] uppercase tracking-wider text-gray-500 mb-1">Capital</span>
                    <span className="font-mono text-sm text-white">KES {cost.toLocaleString()}</span>
                </div>
                <div>
                    <span className="block text-[10px] uppercase tracking-wider text-gray-500 mb-1">Est. Profit</span>
                    <span className="font-mono text-sm text-green-400">+{profit.toLocaleString()}</span>
                </div>
            </div>

            {/* Challenges Toggle */}
            {challenges && challenges.length > 0 && (
                <div className="mb-4">
                    <button
                        onClick={() => setShowChallenges(!showChallenges)}
                        className="text-xs flex items-center gap-1 text-red-400 hover:text-red-300 transition-colors"
                    >
                        {showChallenges ? 'Hide Challenges' : `⚠️ View ${challenges.length} Challenges`}
                    </button>
                    <AnimatePresence>
                        {showChallenges && (
                            <motion.ul
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="mt-3 space-y-2 overflow-hidden"
                            >
                                {challenges.map((c, i) => (
                                    <li key={i} className="text-xs text-gray-400 pl-2 border-l-2 border-red-500/30 bg-red-500/5 p-2 rounded-r-md">{c}</li>
                                ))}
                            </motion.ul>
                        )}
                    </AnimatePresence>
                </div>
            )}

            {/* Community Reviews */}
            <ReviewsSection hustleId={id} existingReviews={reviews} />

        </div>
    );
}
