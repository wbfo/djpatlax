'use client';

import Image from 'next/image';
import { FaInstagram, FaCalendar } from 'react-icons/fa';
import EventCard from '@/components/EventCard';
import { outsideAgenda, upcomingEvents } from '@/lib/content';

export default function OutsideAgendaPage() {
    const galleryVideos = [
        { id: 1, src: '/videos/oa-1.mp4', caption: 'Outside Agenda Event Highlight 1' },
        { id: 2, src: '/videos/oa-2.mp4', caption: 'Outside Agenda Event Highlight 2' },
        { id: 3, src: '/videos/oa-3.mp4', caption: 'Outside Agenda Event Highlight 3' },
    ];

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="relative min-h-[35vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden py-10">
                {/* Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary-green via-orange-600 to-primary-green"></div>
                <div className="absolute inset-0 bg-black opacity-40"></div>

                <div className="relative z-10 text-center max-w-4xl mx-auto">
                    <div className="mb-6 flex justify-center">
                        <Image
                            src="/images/outside-agenda-logo.png"
                            alt="Outside Agenda"
                            width={800}
                            height={300}
                            className="w-full max-w-3xl h-auto"
                            priority
                        />
                    </div>
                    <p className="text-2xl md:text-3xl mb-4">
                        Immersive Afrobeats Experiences Across NYC
                    </p>
                    <p className="text-lg md:text-xl text-white text-opacity-90">
                        Created by DJ Pat Lax
                    </p>

                    <a
                        href="https://www.instagram.com/outsideagendanyc/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 mt-6 px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-sm transition-all text-white font-medium group"
                    >
                        <FaInstagram className="w-5 h-5 group-hover:scale-110 transition-transform" />
                        <span>@outsideagendanyc</span>
                    </a>
                </div>
            </section>

            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-20">
                {/* About Outside Agenda */}
                <section>
                    <h2 className="text-4xl font-bold mb-8">
                        About the <span className="text-primary-green">Movement</span>
                    </h2>
                    <div className="glass-effect rounded-card p-8 space-y-6">
                        <p className="text-lg text-gray-300 leading-relaxed">
                            {outsideAgenda.description}
                        </p>
                    </div>
                </section>

                {/* Mission */}
                <section>
                    <h2 className="text-4xl font-bold mb-8">
                        Our <span className="text-primary-green">Mission</span>
                    </h2>
                    <div className="glass-effect rounded-card p-8">
                        <p className="text-lg text-gray-300 leading-relaxed">
                            {outsideAgenda.mission}
                        </p>
                    </div>
                </section>

                {/* Past Events Gallery */}
                <section>
                    <h2 className="text-4xl font-bold mb-8">
                        Past <span className="text-primary-green">Events</span>
                    </h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {galleryVideos.map((video) => (
                            <div key={video.id} className="group glass-effect rounded-card overflow-hidden hover-lift">
                                <div className="aspect-square relative bg-black">
                                    <video
                                        src={video.src}
                                        controls
                                        autoPlay
                                        loop
                                        muted
                                        playsInline
                                        className="w-full h-full object-cover"
                                        preload="metadata"
                                    >
                                        Your browser does not support the video tag.
                                    </video>
                                </div>
                                <div className="p-4">
                                    <p className="text-sm font-medium text-gray-300">{video.caption}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Community Impact */}
                <section>
                    <h2 className="text-4xl font-bold mb-8">
                        Community <span className="text-primary-green">Impact</span>
                    </h2>
                    <div className="glass-effect rounded-card p-8">
                        <p className="text-lg text-gray-300 leading-relaxed mb-6">
                            {outsideAgenda.impact}
                        </p>
                        <div className="grid md:grid-cols-3 gap-6 mt-8">
                            <div className="text-center">
                                <div className="text-4xl font-bold text-primary-green mb-2">500+</div>
                                <div className="text-sm text-gray-400">Attendees Served</div>
                            </div>
                            <div className="text-center">
                                <div className="text-4xl font-bold text-primary-green mb-2">12+</div>
                                <div className="text-sm text-gray-400">Events Hosted</div>
                            </div>
                            <div className="text-center">
                                <div className="text-4xl font-bold text-primary-green mb-2">3</div>
                                <div className="text-sm text-gray-400">NYC Boroughs</div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Upcoming Outside Agenda Shows */}
                <section>
                    <div className="flex items-center gap-4 mb-8">
                        <FaCalendar className="w-8 h-8 text-primary-green" />
                        <h2 className="text-4xl font-bold">
                            Upcoming <span className="text-primary-green">Shows</span>
                        </h2>
                    </div>
                    <div className="grid md:grid-cols-2 gap-8">
                        {upcomingEvents.filter(event => event.title.includes('Outside Agenda') || event.title.includes('Afro')).length > 0 ? (
                            upcomingEvents
                                .filter(event => event.title.includes('Outside Agenda') || event.title.includes('Afro'))
                                .map((event) => <EventCard key={event.id} {...event} />)
                        ) : (
                            <div className="col-span-2 glass-effect rounded-card p-12 text-center">
                                <p className="text-lg text-gray-400 mb-4">
                                    New dates coming soon! Follow us for updates.
                                </p>
                                <a
                                    href="https://www.instagram.com/djpatlax"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full gradient-green text-white font-medium hover:scale-105 transition-transform"
                                >
                                    <FaInstagram className="w-5 h-5" />
                                    Follow on Instagram
                                </a>
                            </div>
                        )}
                    </div>
                </section>

                {/* CTA Section */}
                <section className="text-center glass-effect rounded-card p-12">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">
                        Want to bring Outside Agenda to your venue?
                    </h2>
                    <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
                        Partner with us to create an unforgettable Afrobeats experience for your community.
                    </p>
                    <a
                        href="mailto:bookings@patlax.com?subject=Outside%20Agenda%20Partnership"
                        className="inline-block px-8 py-4 rounded-full gradient-green text-white font-bold hover:scale-105 transition-transform"
                    >
                        Get in Touch
                    </a>
                </section>

                {/* Testimonials/Highlights */}
                <section>
                    <h2 className="text-4xl font-bold mb-8 text-center">
                        What People Are <span className="text-primary-green">Saying</span>
                    </h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="glass-effect rounded-card p-6">
                            <p className="text-gray-300 italic mb-4">
                                &quot;Outside Agenda brings the authentic Afrobeats experience. The energy is unmatched!&quot;
                            </p>
                            <div className="text-sm text-gray-400">- NYC Party Organizer</div>
                        </div>
                        <div className="glass-effect rounded-card p-6">
                            <p className="text-gray-300 italic mb-4">
                                &quot;More than just a party - it&apos;s a celebration of culture and community.&quot;
                            </p>
                            <div className="text-sm text-gray-400">- Event Attendee</div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
