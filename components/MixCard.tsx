'use client';

import Image from 'next/image';
import { FaPlay, FaClock, FaHeadphones } from 'react-icons/fa';

interface MixCardProps {
    title: string;
    plays: string;
    duration: string;
    url: string;
    genre: string;
    artwork?: string;
}

export default function MixCard({ title, plays, duration, url, genre, artwork }: MixCardProps) {
    return (
        <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="group glass-effect rounded-card p-6 hover-lift hover:border-primary-green transition-all duration-300"
        >
            {/* Artwork/Thumbnail */}
            <div className="relative aspect-square mb-4 rounded-lg overflow-hidden bg-gradient-to-br from-primary-green to-primary-green">
                {artwork ? (
                    <Image src={artwork} alt={title} fill className="object-cover" />
                ) : (
                    <div className="w-full h-full flex items-center justify-center">
                        <FaHeadphones className="w-16 h-16 text-white opacity-50" />
                    </div>
                )}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-primary-green opacity-0 group-hover:opacity-100 flex items-center justify-center transform scale-75 group-hover:scale-100 transition-all duration-300">
                        <FaPlay className="w-5 h-5 text-white ml-1" />
                    </div>
                </div>
            </div>

            {/* Info */}
            <div className="space-y-2">
                <div className="flex items-center gap-2">
                    <span className="text-xs px-2 py-1 rounded-full gradient-green text-white">
                        {genre}
                    </span>
                </div>
                <h3 className="font-bold text-lg group-hover:text-primary-green transition-colors line-clamp-2">
                    {title}
                </h3>
                <div className="flex items-center justify-between text-sm text-gray-400">
                    <div className="flex items-center gap-1">
                        <FaHeadphones className="w-4 h-4" />
                        <span>{plays}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <FaClock className="w-4 h-4" />
                        <span>{duration}</span>
                    </div>
                </div>
            </div>
        </a>
    );
}
