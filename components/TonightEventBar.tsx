'use client';

import { useState } from 'react';
import { X } from 'lucide-react';

export default function TonightEventBar() {
    const [isVisible, setIsVisible] = useState(true);

    if (!isVisible) return null;

    return (
        <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-orange-500 via-yellow-500 to-orange-500 text-black py-3 px-4 shadow-lg">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-center relative px-4 text-center pr-10">
                <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 md:absolute md:left-1/2 md:transform md:-translate-x-1/2 w-full md:w-auto mb-3 md:mb-0">
                    <span className="animate-pulse text-xl sm:text-2xl">🔴</span>
                    <div className="font-semibold text-sm sm:text-base leading-tight">
                        <span className="font-black">TONIGHT!</span> Downtown Nights at IKOYI • DJ Pat Lax • 10PM-2AM
                    </div>
                </div>
                <div className="md:ml-auto relative z-10 w-full md:w-auto flex justify-center">
                    <a
                        href="http://www.ikoyirestaurant.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-2 bg-black text-white text-sm sm:text-base rounded-full font-bold hover:bg-gray-900 transition-all whitespace-nowrap"
                    >
                        Reserve Now
                    </a>
                </div>
            </div>
            <button
                onClick={() => setIsVisible(false)}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 hover:bg-black/10 rounded-full transition-colors"
                aria-label="Close"
            >
                <X className="w-5 h-5" />
            </button>
        </div>
    );
}
