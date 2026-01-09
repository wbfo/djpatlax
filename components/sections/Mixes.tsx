import { FaSoundcloud } from 'react-icons/fa';
import MixCard from '@/components/MixCard';
import { featuredMixes, socialLinks } from '@/lib/content';
import ScrollReveal from '@/components/ui/ScrollReveal';

export default function MixesSection() {
    return (
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-transparent to-black">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <ScrollReveal animation="fade-up" duration={0.6}>
                        <h2 className="text-4xl md:text-5xl font-bold mb-4">
                            Featured <span className="text-primary-green">Mixes</span>
                        </h2>
                    </ScrollReveal>
                    <ScrollReveal animation="fade-up" delay={0.2} duration={0.6}>
                        <p className="text-gray-400 text-lg">
                            Experience the sound that moves the crowd
                        </p>
                    </ScrollReveal>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {featuredMixes.map((mix, index) => (
                        <ScrollReveal
                            key={mix.id}
                            animation="fade-up"
                            delay={0.2 + (index * 0.1)}
                            duration={0.5}
                            className="h-full"
                        >
                            <MixCard {...mix} />
                        </ScrollReveal>
                    ))}
                </div>
                <div className="text-center mt-12">
                    <a
                        href={socialLinks.soundcloud}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-full glass-effect border border-white border-opacity-20 hover:border-primary-green transition-all"
                    >
                        <FaSoundcloud className="w-5 h-5" />
                        View All Mixes on SoundCloud
                    </a>
                </div>
            </div>
        </section>
    );
}
