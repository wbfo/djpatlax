import Link from 'next/link';
import Image from 'next/image';
import ScrollReveal from '@/components/ui/ScrollReveal';

export default function OutsideAgendaSection() {
    return (
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary-green via-orange-600 to-primary-green relative overflow-hidden">
            <div className="absolute inset-0 bg-black opacity-40"></div>
            <div className="relative z-10 max-w-4xl mx-auto text-center">
                <ScrollReveal animation="scale-up" duration={0.8}>
                    <div className="mb-8 relative w-full flex justify-center">
                        <Image
                            src="/images/outside-agenda-logo.png"
                            alt="OUTSIDE AGENDA"
                            width={600}
                            height={200}
                            className="w-[280px] md:w-[500px] h-auto object-contain hover:scale-105 transition-transform drop-shadow-2xl"
                            priority
                        />
                    </div>
                </ScrollReveal>

                <ScrollReveal animation="fade-up" delay={0.3} duration={0.8}>
                    <p className="text-xl md:text-2xl mb-8 text-white text-opacity-90">
                        Immersive Afrobeats experiences across NYC
                    </p>
                </ScrollReveal>

                <ScrollReveal animation="fade-up" delay={0.5} duration={0.6}>
                    <Link
                        href="/outside-agenda"
                        className="inline-block px-8 py-4 rounded-full bg-white text-black font-bold hover:scale-105 transition-transform shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                    >
                        Explore the Movement
                    </Link>
                </ScrollReveal>
            </div>
        </section>
    );
}
