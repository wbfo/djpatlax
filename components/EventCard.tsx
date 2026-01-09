'use client';

import { FaCalendar, FaMapMarkerAlt, FaTicketAlt } from 'react-icons/fa';

interface EventCardProps {
    title: string;
    venue: string;
    date: string;
    city: string;
    ticketUrl: string;
}

export default function EventCard({ title, venue, date, city, ticketUrl }: EventCardProps) {
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };

    return (
        <div className="glass-effect rounded-card p-6 hover-lift hover:border-primary-green transition-all duration-300">
            <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                    <h3 className="font-bold text-lg mb-2">{title}</h3>
                    <div className="space-y-2 text-sm text-gray-400">
                        <div className="flex items-center gap-2">
                            <FaCalendar className="w-4 h-4 text-primary-green" />
                            <span>{formatDate(date)}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <FaMapMarkerAlt className="w-4 h-4 text-primary-green" />
                            <span>{venue}, {city}</span>
                        </div>
                    </div>
                </div>
            </div>

            <a
                href={ticketUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full gradient-green text-white text-sm font-medium hover:scale-105 transition-transform"
            >
                <FaTicketAlt className="w-4 h-4" />
                Get Tickets
            </a>
        </div>
    );
}
