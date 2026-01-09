import Link from 'next/link';
import { FaSoundcloud, FaInstagram, FaTwitter } from 'react-icons/fa';
import { siteInfo, socialLinks } from '@/lib/content';

export default function FooterSection() {
    return (
        <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-white border-opacity-10">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="text-center md:text-left">
                        <div className="text-2xl font-bold mb-2">DJ PAT LAX</div>
                        <div className="text-gray-400 text-sm">{siteInfo.description}</div>
                    </div>

                    <div className="flex gap-6">
                        <a
                            href={socialLinks.instagram}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-primary-green transition-colors"
                            aria-label="Instagram"
                        >
                            <FaInstagram className="w-6 h-6" />
                        </a>
                        <a
                            href={socialLinks.twitter}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-primary-green transition-colors"
                            aria-label="Twitter"
                        >
                            <FaTwitter className="w-6 h-6" />
                        </a>
                        <a
                            href={socialLinks.soundcloud}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-primary-green transition-colors"
                            aria-label="SoundCloud"
                        >
                            <FaSoundcloud className="w-6 h-6" />
                        </a>
                    </div>
                </div>

                <div className="mt-8 pt-8 border-t border-white border-opacity-10 text-center text-sm text-gray-400">
                    <div className="flex flex-wrap justify-center gap-4 mb-4">
                        <Link href="/press" className="hover:text-primary-green transition-colors">
                            Press Kit
                        </Link>
                        <Link href="/outside-agenda" className="hover:text-primary-green transition-colors">
                            Outside Agenda
                        </Link>
                    </div>
                    <p>&copy; {new Date().getFullYear()} DJ Pat Lax. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
