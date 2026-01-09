'use client';

import Image from 'next/image';

export default function PastEventsPage() {
    const galleryImages = [
        { id: 1, src: '/images/outside-agenda-3.png', caption: 'Revolt House Party - Ice Palace Studios, Miami' },
        { id: 2, src: '/images/outside-agenda-1.jpg', caption: 'Afro Carnival Fest - Sept 4th, 2023' },
        { id: 3, src: '/images/outside-agenda-2.jpg', caption: 'Nigeria Independence Day Celebration - Oct 7th, 2023' },
        { id: 4, src: '/images/outside-agenda-4.jpg', caption: 'Jekajo Multi Floor Event - Hotel Chantelle, NYC' },
        { id: 5, src: '/images/outside-agenda-5.jpg', caption: 'Afrobeats in the City - Vault, Newark' },
        { id: 6, src: '/images/outside-agenda-6.jpg', caption: 'Afro Carnival Festival - Industry City, Brooklyn' },
    ];

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="relative min-h-[40vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden">
                {/* Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-primary-green"></div>
                <div className="absolute inset-0 bg-black opacity-60"></div>

                <div className="relative z-10 text-center max-w-4xl mx-auto pt-20">
                    <h1 className="text-4xl md:text-6xl font-bold mb-4">
                        Past <span className="text-primary-green">Events</span>
                    </h1>
                    <p className="text-lg md:text-xl text-white text-opacity-90 max-w-2xl mx-auto">
                        Highlights from our journey bringing authentic Afrobeats experiences to venues across the country.
                    </p>
                </div>
            </section>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-20">
                {/* Past Events Gallery */}
                <section>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {galleryImages.map((image) => (
                            <div key={image.id} className="group glass-effect rounded-card overflow-hidden hover-lift">
                                <div className="aspect-square relative">
                                    <Image
                                        src={image.src}
                                        alt={image.caption}
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300"></div>
                                </div>
                                <div className="p-4 bg-black bg-opacity-50">
                                    <p className="text-sm font-medium text-white">{image.caption}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Testimonials/Highlights (Optional Context) */}
                <section>
                    <h2 className="text-3xl font-bold mb-8 text-center">
                        Memorable <span className="text-primary-green">Moments</span>
                    </h2>
                    <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                        <div className="glass-effect rounded-card p-8 text-center">
                            <p className="text-gray-300 italic mb-4 text-lg">
                                &quot;Outside Agenda brings the authentic Afrobeats experience. The energy is unmatched!&quot;
                            </p>
                            <div className="text-sm text-primary-green font-bold">- NYC Party Organizer</div>
                        </div>
                        <div className="glass-effect rounded-card p-8 text-center">
                            <p className="text-gray-300 italic mb-4 text-lg">
                                &quot;More than just a party - it&apos;s a celebration of culture and community.&quot;
                            </p>
                            <div className="text-sm text-primary-green font-bold">- Event Attendee</div>
                        </div>
                    </div>
                </section>

                {/* Check Other Events CTA */}
                <section className="text-center py-8">
                    <p className="text-gray-400 mb-6">Looking for what&apos;s next?</p>
                    <a
                        href="/outside-agenda"
                        className="inline-flex items-center gap-2 px-8 py-3 rounded-full border border-primary-green text-primary-green hover:bg-primary-green hover:text-white transition-all font-medium"
                    >
                        View Upcoming Events
                    </a>
                </section>
            </div>
        </div>
    );
}
