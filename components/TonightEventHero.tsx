'use client';

import Image from 'next/image';

export default function TonightEventHero() {
    return (
        <section className="py-16 px-6 bg-gradient-to-br from-orange-500 via-yellow-500 to-orange-600">
            <div className="max-w-6xl mx-auto">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                    {/* Flyer Image */}
                    <div className="relative rounded-3xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-300">
                        <Image
                            src="/images/downtown-nights-ikoyi.jpg"
                            alt="Downtown Nights at IKOYI - Tonight"
                            width={800}
                            height={1000}
                            className="w-full h-auto object-cover"
                            priority
                        />
                        {/* Pulse effect overlay */}
                        <div className="absolute top-4 left-4">
                            <div className="px-4 py-2 bg-red-600 text-white rounded-full font-bold text-sm flex items-center gap-2 animate-pulse">
                                <span className="w-3 h-3 bg-white rounded-full animate-ping"></span>
                                LIVE TONIGHT
                            </div>
                        </div>
                    </div>

                    {/* Event Details */}
                    <div className="text-white">
                        <div className="inline-block px-4 py-2 bg-black rounded-full text-sm font-bold mb-4">
                            🔴 HAPPENING TONIGHT
                        </div>

                        <h2 className="text-4xl md:text-6xl font-black mb-6 text-black leading-tight">
                            DOWNTOWN NIGHTS<br />AT IKOYI
                        </h2>

                        <div className="space-y-4 text-black text-lg font-medium mb-8">
                            <div className="flex items-start gap-3">
                                <span className="text-2xl">📅</span>
                                <div>
                                    <div className="font-bold">Tonight, Friday January 9th</div>
                                    <div className="text-black/80">Late Night Vibe: 10PM - 2AM</div>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <span className="text-2xl">🎵</span>
                                <div>
                                    <div className="font-bold">Music by DJ Pat Lax + DJ Hushbravo</div>
                                    <div className="text-black/80">Afrobeats, Amapiano, Hip Hop</div>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <span className="text-2xl">📍</span>
                                <div>
                                    <div className="font-bold">IKOYI Restaurant & Lounge</div>
                                    <div className="text-black/80">11 Clinton Street, Newark, NJ</div>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <span className="text-2xl">🍹</span>
                                <div>
                                    <div className="font-bold">Happy Hour 4-7PM</div>
                                    <div className="text-black/80">$7 Cocktails • $4 Beer • 50% Off Small Bites</div>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <span className="text-2xl">🎉</span>
                                <div>
                                    <div className="font-bold">$150 Bottle Special</div>
                                    <div className="text-black/80">Don Julio Bottle Special Available</div>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <a
                                href="http://www.ikoyirestaurant.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-8 py-4 bg-black text-white rounded-full font-bold text-lg hover:bg-gray-900 transition-all text-center"
                            >
                                Make Reservation
                            </a>
                            <a
                                href="tel:9082751495"
                                className="px-8 py-4 border-2 border-black text-black rounded-full font-bold text-lg hover:bg-black hover:text-white transition-all text-center"
                            >
                                Call: (908) 275-1495
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
