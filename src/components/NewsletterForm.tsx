"use client";

import { useState } from "react";
import { ArrowRight, Check, Loader2 } from "lucide-react";

export default function NewsletterForm() {
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;

        setStatus("loading");
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500));
        console.log("Email captured:", email);
        setStatus("success");
        setEmail("");
    };

    return (
        <div className="w-full max-w-md mx-auto">
            <form onSubmit={handleSubmit} className="relative">
                <input
                    type="email"
                    placeholder="Enter your email for free prompts..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={status === "loading" || status === "success"}
                    className="w-full rounded-full bg-white/10 border border-white/20 px-6 py-4 pr-14 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all backdrop-blur-sm"
                />
                <button
                    type="submit"
                    disabled={status === "loading" || status === "success"}
                    className="absolute right-2 top-2 bottom-2 aspect-square rounded-full bg-purple-600 hover:bg-purple-500 text-white flex items-center justify-center transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {status === "loading" ? (
                        <Loader2 className="animate-spin" size={20} />
                    ) : status === "success" ? (
                        <Check size={20} />
                    ) : (
                        <ArrowRight size={20} />
                    )}
                </button>
            </form>
            {status === "success" && (
                <p className="mt-2 text-sm text-green-400 text-center animate-fade-in">
                    You&apos;re in! Check your inbox soon.
                </p>
            )}
        </div>
    );
}
