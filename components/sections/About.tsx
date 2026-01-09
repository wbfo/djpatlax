import Image from 'next/image';
import { bio, stats } from '@/lib/content';
import ScrollReveal from '@/components/ui/ScrollReveal';

export default function AboutSection() {
    return (
        <section className="py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6">
                        <ScrollReveal animation="fade-in" duration={0.6}>
                            <h2 className="text-4xl md:text-5xl font-bold">
                                About <span className="text-primary-green">Pat Lax</span>
                            </h2>
                        </ScrollReveal>

                        <ScrollReveal animation="fade-up" delay={0.2} duration={0.6}>
                            <p className="text-gray-300 leading-relaxed">
                                {bio.medium}
                            </p>
                        </ScrollReveal>

                        <div className="grid grid-cols-2 gap-4">
                            <ScrollReveal animation="fade-up" delay={0.3} duration={0.5} className="h-full">
                                <div className="glass-effect rounded-card p-4 h-full">
                                    <div className="text-3xl font-bold text-primary-green mb-1">
                                        {stats.instagramFollowers}
                                    </div>
                                    <div className="text-sm text-gray-400">Instagram Followers</div>
                                </div>
                            </ScrollReveal>
                            <ScrollReveal animation="fade-up" delay={0.4} duration={0.5} className="h-full">
                                <div className="glass-effect rounded-card p-4 h-full">
                                    <div className="text-3xl font-bold text-primary-green mb-1">
                                        {stats.experience}
                                    </div>
                                    <div className="text-sm text-gray-400">Experience</div>
                                </div>
                            </ScrollReveal>
                            <ScrollReveal animation="fade-up" delay={0.5} duration={0.5} className="h-full">
                                <div className="glass-effect rounded-card p-4 h-full">
                                    <div className="text-3xl font-bold text-primary-green mb-1">
                                        {stats.events}
                                    </div>
                                    <div className="text-sm text-gray-400">Events</div>
                                </div>
                            </ScrollReveal>
                            <ScrollReveal animation="fade-up" delay={0.6} duration={0.5} className="h-full">
                                <div className="glass-effect rounded-card p-4 h-full">
                                    <div className="text-3xl font-bold text-primary-green mb-1">
                                        {stats.genres.length}
                                    </div>
                                    <div className="text-sm text-gray-400">Genres</div>
                                </div>
                            </ScrollReveal>
                        </div>
                    </div>

                    <ScrollReveal animation="scale-up" duration={0.8} delay={0.2} className="h-full">
                        <div className="relative aspect-square glass-effect rounded-card overflow-hidden w-full">
                            <Image
                                src="/images/pat-lax-about.jpg"
                                alt="DJ Pat Lax"
                                fill
                                className="object-cover hover:scale-105 transition-transform duration-500"
                            />
                        </div>
                    </ScrollReveal>
                </div>
            </div>
        </section>
    );
}
