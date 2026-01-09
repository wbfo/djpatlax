import { FaEnvelope } from 'react-icons/fa';
import { siteInfo } from '@/lib/content';

export default function BookingSection() {
    return (
        <section id="booking" className="py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto text-center">
                <h2 className="text-4xl md:text-5xl font-bold mb-6">
                    Book <span className="text-primary-green">Pat Lax</span>
                </h2>
                <p className="text-gray-300 text-lg mb-8">
                    Ready to bring authentic Afrobeats energy to your event? Get in touch for bookings and inquiries.
                </p>
                <div className="glass-effect rounded-card p-8">
                    <p className="text-gray-400 mb-6">
                        For booking inquiries, reach out via email or use the chat assistant below for instant responses.
                    </p>
                    <a
                        href={`mailto:${siteInfo.bookingEmail}`}
                        className="inline-flex items-center gap-2 px-8 py-4 rounded-full gradient-green text-white font-bold hover:scale-105 transition-transform"
                    >
                        <FaEnvelope className="w-5 h-5" />
                        {siteInfo.bookingEmail}
                    </a>
                </div>
            </div>
        </section>
    );
}
