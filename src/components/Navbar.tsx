"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";

const navLinks = [
    { name: "Work", href: "/#work" },
    { name: "About", href: "/#about" },
    { name: "Blog", href: "/blog" },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "glass py-2" : "bg-transparent py-4"}`}>
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    <Link href="/" className="flex items-center gap-3 group">
                        <div className="relative h-9 w-9 transition-transform group-hover:scale-110">
                            <Image
                                src="/logo.svg"
                                alt="Logo"
                                fill
                                className="object-contain dark:invert"
                            />
                        </div>
                        <span className="font-display text-xl font-bold tracking-tight text-foreground">
                            Jaden Raats
                        </span>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="font-display text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                            >
                                {link.name}
                            </Link>
                        ))}
                        <Link
                            href="/#contact"
                            className="font-display text-sm font-medium bg-foreground text-background px-5 py-2.5 rounded-full hover:opacity-90 transition-opacity"
                        >
                            Contact
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                            aria-label="Toggle menu"
                        >
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Nav */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden glass overflow-hidden"
                    >
                        <div className="px-4 py-8 space-y-6">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className="font-display text-2xl font-medium text-foreground hover:text-primary transition-colors"
                                    onClick={() => setIsOpen(false)}
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <Link
                                href="/#contact"
                                onClick={() => setIsOpen(false)}
                                className="font-display block w-full text-center text-lg font-medium bg-foreground text-background px-4 py-4 rounded-full hover:opacity-90 transition-opacity mt-4"
                            >
                                Contact
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
