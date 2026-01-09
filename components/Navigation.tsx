'use client';

import Link from 'next/link';
import { useState } from 'react';
import { FaInstagram, FaTwitter, FaSoundcloud, FaBars, FaTimes } from 'react-icons/fa';
import { socialLinks } from '@/lib/content';

export default function Navigation() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const navLinks = [
        { href: '/', label: 'Home' },
        { href: '/press', label: 'Press Kit' },
        { href: '/outside-agenda', label: 'Outside Agenda' },
        { href: '/past-events', label: 'Past Events' },
    ];

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 glass-effect border-b border-white border-opacity-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link href="/" className="text-xl font-bold hover:text-primary-green transition-colors">
                        DJ PAT LAX
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="text-sm hover:text-primary-green transition-colors"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    {/* Social Icons */}
                    <div className="hidden md:flex items-center space-x-4">
                        <a
                            href={socialLinks.instagram}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-primary-green transition-colors"
                            aria-label="Instagram"
                        >
                            <FaInstagram className="w-5 h-5" />
                        </a>
                        <a
                            href={socialLinks.twitter}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-primary-green transition-colors"
                            aria-label="Twitter"
                        >
                            <FaTwitter className="w-5 h-5" />
                        </a>
                        <a
                            href={socialLinks.soundcloud}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-primary-green transition-colors"
                            aria-label="SoundCloud"
                        >
                            <FaSoundcloud className="w-5 h-5" />
                        </a>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        {mobileMenuOpen ? (
                            <FaTimes className="w-6 h-6" />
                        ) : (
                            <FaBars className="w-6 h-6" />
                        )}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="md:hidden glass-effect border-t border-white border-opacity-10">
                    <div className="px-4 py-4 space-y-4">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="block text-sm hover:text-primary-green transition-colors"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                {link.label}
                            </Link>
                        ))}
                        <div className="flex items-center space-x-4 pt-4 border-t border-white border-opacity-10">
                            <a
                                href={socialLinks.instagram}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-primary-green transition-colors"
                                aria-label="Instagram"
                            >
                                <FaInstagram className="w-5 h-5" />
                            </a>
                            <a
                                href={socialLinks.twitter}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-primary-green transition-colors"
                                aria-label="Twitter"
                            >
                                <FaTwitter className="w-5 h-5" />
                            </a>
                            <a
                                href={socialLinks.soundcloud}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-primary-green transition-colors"
                                aria-label="SoundCloud"
                            >
                                <FaSoundcloud className="w-5 h-5" />
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
}
