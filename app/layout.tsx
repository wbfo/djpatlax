import type { Metadata } from "next";
import "./globals.css";
import Navigation from "@/components/Navigation";
import ChatWidget from "@/components/ChatWidget";

export const metadata: Metadata = {
    metadataBase: new URL('https://djpatlax.com'), // Replace with actual domain if different
    title: {
        default: "DJ Pat Lax | Nigerian-American DJ | Afrobeats & Amapiano",
        template: "%s | DJ Pat Lax"
    },
    description: "NYC-based Nigerian-American DJ specializing in Afrobeats, Amapiano, Dancehall, Soca, Hip Hop, and Reggaeton. Creator of Outside Agenda.",
    keywords: ["DJ", "Afrobeats", "Amapiano", "Nigerian DJ", "NYC DJ", "Pat Lax", "Outside Agenda", "Dancehall", "Soca", "Wedding DJ", "Corporate Events"],
    authors: [{ name: "DJ Pat Lax" }],
    creator: "DJ Pat Lax",
    openGraph: {
        title: "DJ Pat Lax | Nigerian-American DJ",
        description: "NYC-based Nigerian-American DJ specializing in Afrobeats, Amapiano, and more.",
        url: 'https://djpatlax.com',
        siteName: 'DJ Pat Lax',
        locale: 'en_US',
        type: "website",
    },
    twitter: {
        card: 'summary_large_image',
        title: 'DJ Pat Lax | Nigerian-American DJ',
        description: "NYC-based Nigerian-American DJ specializing in Afrobeats, Amapiano, Dancehall, and more. Creator of Outside Agenda.",
        creator: '@DJPATLAX',
    },
    robots: {
        index: true,
        follow: true,
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className="antialiased" suppressHydrationWarning>
                <Navigation />
                <main className="pt-16">
                    {children}
                </main>
                <ChatWidget />
            </body>
        </html>
    );
}
