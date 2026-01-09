'use client';

import HeroSection from '@/components/sections/Hero';
import CredentialsSection from '@/components/sections/Credentials';
import AboutSection from '@/components/sections/About';
import MixesSection from '@/components/sections/Mixes';
import EventsSection from '@/components/sections/Events';
import OutsideAgendaSection from '@/components/sections/OutsideAgenda';
import BookingSection from '@/components/sections/Booking';
import FooterSection from '@/components/sections/Footer';

export default function HomePage() {
    return (
        <div className="min-h-screen">
            <HeroSection />
            <CredentialsSection />
            <AboutSection />
            <MixesSection />
            <EventsSection />
            <OutsideAgendaSection />
            <BookingSection />
            <FooterSection />
        </div>
    );
}
