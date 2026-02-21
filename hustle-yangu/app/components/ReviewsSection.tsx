"use client";

import { useEffect, useState } from "react";
import { Review } from "../data/hustles";
import { motion, AnimatePresence } from "framer-motion";
import { db } from "../lib/firebase";
import { collection, addDoc, query, where, onSnapshot, orderBy } from "firebase/firestore";

interface ReviewsSectionProps {
    hustleId: string;
    existingReviews?: Review[];
}

export default function ReviewsSection({ hustleId, existingReviews = [] }: ReviewsSectionProps) {
    const [reviews, setReviews] = useState<Review[]>(existingReviews);
    const [user, setUser] = useState<string>("");
    const [comment, setComment] = useState("");
    const [isExpanded, setIsExpanded] = useState(false);
    const [loading, setLoading] = useState(false);

    // Real-time listener
    useEffect(() => {
        if (!hustleId) return;

        const q = query(
            collection(db, "reviews"),
            where("hustleId", "==", hustleId),
            orderBy("timestamp", "desc")
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const fetchedReviews: Review[] = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            } as Review));
            setReviews(fetchedReviews);
        }, (err) => {
            console.error("Firestore Error:", err);
            // Fallback to local if permission denied (e.g. no keys)
        });

        return () => unsubscribe();
    }, [hustleId]);

    const handlePost = async () => {
        if (!comment.trim() || !user.trim()) return;
        setLoading(true);

        try {
            await addDoc(collection(db, "reviews"), {
                hustleId,
                user,
                comment,
                rating: 5,
                timestamp: Date.now()
            });
            setComment("");
        } catch (err) {
            console.error("Failed to post:", err);
            alert("Could not post review. Check console.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="mt-4 border-t border-border pt-4">
            <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="text-xs text-foreground-muted hover:text-white flex items-center gap-2 w-full"
            >
                <span>💬 {reviews.length} Community Reviews</span>
                <span className="ml-auto">{isExpanded ? "▲" : "▼"}</span>
            </button>

            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                    >
                        <div className="mt-4 space-y-4">
                            {/* Input Area */}
                            <div className="bg-background/50 p-3 rounded text-sm mb-4">
                                <input
                                    type="text"
                                    placeholder="Your Alias (e.g. Kaka)"
                                    className="w-full bg-transparent border-b border-border mb-2 pb-1 focus:outline-none focus:border-accent text-white"
                                    value={user}
                                    onChange={(e) => setUser(e.target.value)}
                                />
                                <textarea
                                    placeholder="Share your experience..."
                                    className="w-full bg-transparent text-foreground-muted focus:text-white focus:outline-none resize-none"
                                    rows={2}
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                />
                                <div className="text-right mt-2">
                                    <button
                                        onClick={handlePost}
                                        disabled={!user || !comment || loading}
                                        className="px-3 py-1 bg-accent text-white text-xs rounded disabled:opacity-50"
                                    >
                                        {loading ? "Posting..." : "Post Review"}
                                    </button>
                                </div>
                            </div>

                            {/* List */}
                            <div className="space-y-3 max-h-40 overflow-y-auto custom-scrollbar">
                                {reviews.map(review => (
                                    <div key={review.id} className="text-sm border-l-2 border-border pl-3">
                                        <div className="flex justify-between text-xs text-foreground-muted mb-1">
                                            <span className="text-accent">{review.user}</span>
                                            <span>{new Date(review.timestamp).toLocaleDateString()}</span>
                                        </div>
                                        <p className="text-gray-300">{review.comment}</p>
                                    </div>
                                ))}
                                {reviews.length === 0 && <div className="text-xs text-center text-foreground-muted">Be the first to review this hustle.</div>}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
