import { credentials } from '@/lib/content';

export default function CredentialsSection() {
    return (
        <section className="py-12 glass-effect border-y border-white border-opacity-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
                    {credentials.map((credential, index) => (
                        <div
                            key={index}
                            className="text-sm md:text-base font-medium text-gray-300 hover:text-primary-green transition-colors"
                        >
                            {credential}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
