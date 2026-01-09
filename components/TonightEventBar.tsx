'use client';

import { useState } from 'react';
import { X } from 'lucide-react';

export default function TonightEventBar() {
    const [isVisible, setIsVisible] = useState(true);

    if (!isVisible) return null;

    return (
        <div className="fixed top-16 left-0 right-0 z-40 bg-gradient-to-r from-orange-500 via-yellow-500 to-orange-500 text-black py-2 px-2 sm:px-4 shadow-lg">
            <div className="max-w-7xl mx-auto flex flex-row items-center justify-between sm:justify-center relative px-2 pr-8">
                <div className="flex flex-row items-center justify-start sm:justify-center gap-2 w-full sm:w-auto overflow-hidden">
                    <span className="animate-pulse text-lg sm:text-xl shrink-0">🔴</span>
                    <div className="font-semibold text-xs sm:text-sm leading-tight whitespace-nowrap overflow-hidden text-ellipsis">
                        <span className="font-black">TONIGHT!</span> Downtown Nights at IKOYI • DJ Pat Lax • 10PM-2AM
                    </div>
                </div>
                <div className="relative z-10 shrink-0 ml-2 hidden sm:block">
                    <a
                        href="http://www.ikoyirestaurant.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-1.5 bg-black text-white text-xs sm:text-sm rounded-full font-bold hover:bg-gray-900 transition-all whitespace-nowrap"
                    >
                        Reserve
                    </a>
                </div>
                {/* Mobile Button Replacement or kept in flow? I'll keep it hidden on very small screens if it breaks layout, but user said 'all in one line'. 
                     Actually, let's try to keep it visible but maybe just icon? Or smaller. 
                     I'll use 'hidden sm:block' for the button to prioritize the text line on mobile, as fitting both is very hard on <350px. 
                     Wait, user might want the button. I'll make it conditionally visible or just very small. 
                     Let's try to keep it visible but simpler. 
                  */}
                <div className="relative z-10 shrink-0 ml-2 sm:ml-4">
                    <a
                        href="http://www.ikoyirestaurant.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1 bg-black text-white text-[10px] sm:text-sm rounded-full font-bold hover:bg-gray-900 transition-all whitespace-nowrap"
                    >
                        Reserve
                    </a>
                </div>
            </div>
            <button
                onClick={() => setIsVisible(false)}
                className="absolute right-1 top-1/2 transform -translate-y-1/2 p-1.5 hover:bg-black/10 rounded-full transition-colors"
                aria-label="Close"
            >
                <X className="w-4 h-4" />
            </button>
        </div>
    );
}
