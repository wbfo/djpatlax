import EventCard from '@/components/EventCard';
import { upcomingEvents } from '@/lib/content';

export default function EventsSection() {
    return (
        <section className="py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">
                        Upcoming <span className="text-primary-green">Events</span>
                    </h2>
                    <p className="text-gray-400 text-lg">
                        Catch Pat Lax live at these shows
                    </p>
                </div>
                <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    {upcomingEvents.map((event) => (
                        <EventCard key={event.id} {...event} />
                    ))}
                </div>
            </div>
        </section>
    );
}
