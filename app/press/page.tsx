'use client';

import Image from 'next/image';
import { useState } from 'react';
import { FaDownload, FaCopy, FaCheck, FaInstagram, FaSoundcloud } from 'react-icons/fa';
import { bio, stats, pastVenues, technicalRider, pressMentions, siteInfo } from '@/lib/content';

export default function PressKitPage() {
    const [copiedBio, setCopiedBio] = useState<string | null>(null);

    const copyToClipboard = (text: string, bioType: string) => {
        navigator.clipboard.writeText(text);
        setCopiedBio(bioType);
        setTimeout(() => setCopiedBio(null), 2000);
    };

    const bioVersions = [
        { type: 'short', title: 'Short Bio (50 words)', content: bio.short },
        { type: 'medium', title: 'Medium Bio (150 words)', content: bio.medium },
        { type: 'long', title: 'Long Bio (500 words)', content: bio.long },
    ];

    return (
        <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
            {/* Header */}
            <div className="max-w-6xl mx-auto mb-16 text-center">
                <h1 className="text-5xl md:text-6xl font-bold mb-6">
                    Press & Media <span className="text-primary-green">Kit</span>
                </h1>
                <p className="text-xl text-gray-400">
                    Everything you need to feature DJ Pat Lax
                </p>
            </div>

            <div className="max-w-6xl mx-auto space-y-16">
                {/* Quick Stats */}
                <section>
                    <h2 className="text-3xl font-bold mb-8">Quick Stats</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div className="glass-effect rounded-card p-6">
                            <div className="text-sm text-gray-400 mb-2">📍 Based</div>
                            <div className="text-lg font-medium">New York City (Brooklyn/Staten Island)</div>
                        </div>
                        <div className="glass-effect rounded-card p-6">
                            <div className="text-sm text-gray-400 mb-2">🎵 Genres</div>
                            <div className="text-lg font-medium">{stats.genres.join(', ')}</div>
                        </div>
                        <div className="glass-effect rounded-card p-6">
                            <div className="text-sm text-gray-400 mb-2">📱 Following</div>
                            <div className="text-lg font-medium">{stats.instagramFollowers} on Instagram</div>
                        </div>
                        <div className="glass-effect rounded-card p-6">
                            <div className="text-sm text-gray-400 mb-2">🎤 Notable</div>
                            <div className="text-lg font-medium">Hot97, Revolt TV, Art Basel Miami</div>
                        </div>
                        <div className="glass-effect rounded-card p-6">
                            <div className="text-sm text-gray-400 mb-2">🎪 Creator</div>
                            <div className="text-lg font-medium">Outside Agenda Event Series</div>
                        </div>
                        <div className="glass-effect rounded-card p-6">
                            <div className="text-sm text-gray-400 mb-2">⚡ Experience</div>
                            <div className="text-lg font-medium">{stats.experience}</div>
                        </div>
                    </div>
                </section>

                {/* Downloadable Photos */}
                <section>
                    <h2 className="text-3xl font-bold mb-8">Downloadable Photos</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            { num: 1, title: 'Professional Portrait', src: '/images/epk-1.jpg' },
                            { num: 2, title: 'Live Performance', src: '/images/epk-2.jpg' },
                            { num: 3, title: 'Studio Session', src: '/images/epk-3.jpg' },
                        ].map(({ num, title, src }) => (
                            <div key={num} className="glass-effect rounded-card overflow-hidden group">
                                <div className="aspect-square relative">
                                    <Image
                                        src={src}
                                        alt={title}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div className="p-4">
                                    <div className="text-sm font-medium mb-2">{title}</div>
                                    <a
                                        href={src}
                                        download
                                        className="w-full px-4 py-2 rounded-lg glass-effect hover:border-primary-green transition-all flex items-center justify-center gap-2 text-sm"
                                    >
                                        <FaDownload className="w-4 h-4" />
                                        Download High-Res
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="mt-6 text-center">
                        <p className="text-sm text-gray-400">
                            High-resolution photos available in JPG and PNG formats
                        </p>
                    </div>
                </section>

                {/* Bio Versions */}
                <section>
                    <h2 className="text-3xl font-bold mb-8">Biography Versions</h2>
                    <div className="space-y-6">
                        {bioVersions.map(({ type, title, content }) => (
                            <div key={type} className="glass-effect rounded-card p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-xl font-bold">{title}</h3>
                                    <button
                                        onClick={() => copyToClipboard(content, type)}
                                        className="flex items-center gap-2 px-4 py-2 rounded-lg glass-effect hover:border-primary-green transition-all text-sm"
                                    >
                                        {copiedBio === type ? (
                                            <>
                                                <FaCheck className="w-4 h-4 text-primary-green" />
                                                Copied!
                                            </>
                                        ) : (
                                            <>
                                                <FaCopy className="w-4 h-4" />
                                                Copy
                                            </>
                                        )}
                                    </button>
                                </div>
                                <p className="text-gray-300 leading-relaxed whitespace-pre-line">
                                    {content}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Technical Rider */}
                <section>
                    <h2 className="text-3xl font-bold mb-8">Technical Rider</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="glass-effect rounded-card p-6">
                            <h3 className="text-xl font-bold mb-4 text-primary-green">Equipment Requirements</h3>
                            <ul className="space-y-2 text-gray-300">
                                {technicalRider.equipment.map((item, index) => (
                                    <li key={index} className="flex items-start gap-2">
                                        <span className="text-primary-green mt-1">•</span>
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="glass-effect rounded-card p-6">
                            <h3 className="text-xl font-bold mb-4 text-primary-green">Sound System</h3>
                            <ul className="space-y-2 text-gray-300">
                                {technicalRider.soundSystem.map((item, index) => (
                                    <li key={index} className="flex items-start gap-2">
                                        <span className="text-primary-green mt-1">•</span>
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="glass-effect rounded-card p-6">
                            <h3 className="text-xl font-bold mb-4 text-primary-green">Booth Setup</h3>
                            <ul className="space-y-2 text-gray-300">
                                {technicalRider.booth.map((item, index) => (
                                    <li key={index} className="flex items-start gap-2">
                                        <span className="text-primary-green mt-1">•</span>
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="glass-effect rounded-card p-6">
                            <h3 className="text-xl font-bold mb-4 text-primary-green">Hospitality</h3>
                            <ul className="space-y-2 text-gray-300">
                                {technicalRider.hospitality.map((item, index) => (
                                    <li key={index} className="flex items-start gap-2">
                                        <span className="text-primary-green mt-1">•</span>
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className="mt-6 text-center">
                        <button className="px-6 py-3 rounded-full gradient-green text-white font-medium hover:scale-105 transition-transform inline-flex items-center gap-2">
                            <FaDownload className="w-4 h-4" />
                            Download Full Tech Rider (PDF)
                        </button>
                    </div>
                </section>

                {/* Past Venues & Events */}
                <section>
                    <h2 className="text-3xl font-bold mb-8">Past Venues & Events</h2>
                    <div className="glass-effect rounded-card p-6">
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {pastVenues.map((venue, index) => (
                                <div key={index} className="flex items-start gap-2 text-gray-300">
                                    <span className="text-primary-green mt-1">✓</span>
                                    <span>{venue}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Press Mentions */}
                <section>
                    <h2 className="text-3xl font-bold mb-8">Press Mentions</h2>
                    <div className="space-y-4">
                        {pressMentions.map((mention, index) => (
                            <a
                                key={index}
                                href={mention.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block glass-effect rounded-card p-6 hover:border-primary-green transition-all"
                            >
                                <div className="font-bold text-lg mb-1">{mention.outlet}</div>
                                <div className="text-gray-400">{mention.title}</div>
                            </a>
                        ))}
                    </div>
                </section>

                {/* Social Media Stats */}
                <section>
                    <h2 className="text-3xl font-bold mb-8">Social Media</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        <a
                            href="https://www.instagram.com/djpatlax"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="glass-effect rounded-card p-6 hover:border-primary-green transition-all group"
                        >
                            <div className="flex items-center gap-4 mb-4">
                                <FaInstagram className="w-8 h-8 text-primary-green" />
                                <div className="text-2xl font-bold">@djpatlax</div>
                            </div>
                            <div className="text-3xl font-bold text-primary-green mb-1">{stats.instagramFollowers}</div>
                            <div className="text-sm text-gray-400">Followers</div>
                        </a>

                        <a
                            href="https://soundcloud.com/patlax"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="glass-effect rounded-card p-6 hover:border-primary-green transition-all group"
                        >
                            <div className="flex items-center gap-4 mb-4">
                                <FaSoundcloud className="w-8 h-8 text-primary-green" />
                                <div className="text-2xl font-bold">patlax</div>
                            </div>
                            <div className="text-3xl font-bold text-primary-green mb-1">40K+</div>
                            <div className="text-sm text-gray-400">Total Plays</div>
                        </a>
                    </div>
                </section>

                {/* Contact */}
                <section>
                    <h2 className="text-3xl font-bold mb-8">Contact</h2>
                    <div className="glass-effect rounded-card p-8 text-center">
                        <h3 className="text-xl font-bold mb-4">For Press & Booking Inquiries</h3>
                        <a
                            href={`mailto:${siteInfo.bookingEmail}`}
                            className="inline-block px-8 py-4 rounded-full gradient-green text-white font-bold hover:scale-105 transition-transform"
                        >
                            {siteInfo.bookingEmail}
                        </a>
                    </div>
                </section>

                {/* Download Full Press Kit */}
                <section className="text-center">
                    <button className="px-10 py-5 rounded-full gradient-green text-white font-bold text-lg hover:scale-105 transition-transform inline-flex items-center gap-3">
                        <FaDownload className="w-5 h-5" />
                        Download Complete Press Kit (ZIP)
                    </button>
                    <p className="text-sm text-gray-400 mt-4">
                        Includes all photos, bios, tech rider, and logo files
                    </p>
                </section>
            </div>
        </div>
    );
}
