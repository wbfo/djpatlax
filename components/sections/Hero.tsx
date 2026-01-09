import Image from 'next/image';
import { siteInfo, stats, socialLinks } from '@/lib/content';
import ScrollReveal from '@/components/ui/ScrollReveal';

export default function HeroSection() {
    return (
        <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden bg-black">
            {/* Background Video */}
            <div className="absolute inset-0 z-0">
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover opacity-50"
                >
                    <source src="/videos/hero-bg.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-black/60 z-10"></div>
            </div>

            <div className="relative z-10 text-center max-w-[126rem] mx-auto">
                <ScrollReveal animation="fade-up" duration={0.8}>
                    <div className="mb-0 flex justify-center">
                        <Image
                            src="/images/patlax-logo.png"
                            alt="DJ Pat Lax"
                            width={2362}
                            height={787}
                            className="w-full max-w-[120rem] h-auto drop-shadow-[0_0_30px_rgba(34,197,94,0.3)] transition-transform hover:scale-[1.02] duration-500"
                            priority
                        />
                    </div>
                </ScrollReveal>

                <ScrollReveal animation="fade-up" delay={0.2} duration={0.8}>
                    <p className="text-xl md:text-2xl text-gray-300 mb-8">
                        {siteInfo.tagline}
                    </p>
                </ScrollReveal>

                <ScrollReveal animation="fade-up" delay={0.4} duration={0.8}>
                    <div className="flex flex-wrap justify-center gap-4 mb-12">
                        {stats.genres.map((genre, index) => (
                            <span
                                key={index}
                                className="px-4 py-2 glass-effect rounded-full text-sm hover:bg-white/10 transition-colors cursor-default"
                            >
                                {genre}
                            </span>
                        ))}
                    </div>
                </ScrollReveal>

                {/* CTA Buttons */}
                <ScrollReveal animation="scale-up" delay={0.6} duration={0.5}>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a
                            href="#booking"
                            className="px-8 py-4 rounded-full gradient-green text-white font-bold hover:scale-105 transition-transform shadow-[0_0_20px_rgba(34,197,94,0.4)] hover:shadow-[0_0_30px_rgba(34,197,94,0.6)]"
                        >
                            Book Now
                        </a>
                        <a
                            href={socialLinks.soundcloud}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-8 py-4 rounded-full glass-effect border border-white border-opacity-20 hover:border-primary-green hover:bg-white/5 font-bold transition-all"
                        >
                            Listen on SoundCloud
                        </a>
                    </div>
                </ScrollReveal>
            </div>

            {/* Scroll indicator */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
                <div className="w-6 h-10 rounded-full border-2 border-white border-opacity-30 flex items-start justify-center p-2">
                    <div className="w-1 h-2 bg-white rounded-full"></div>
                </div>
            </div>
        </section>
    );
}
