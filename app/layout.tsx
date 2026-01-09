import type { Metadata } from "next";
import "./globals.css";
import Navigation from "@/components/Navigation";
import ChatWidget from "@/components/ChatWidget";

export const metadata: Metadata = {
    title: "DJ Pat Lax | Nigerian-American DJ | Afrobeats & Amapiano",
    description: "NYC-based Nigerian-American DJ specializing in Afrobeats, Amapiano, Dancehall, Soca, Hip Hop, and Reggaeton. Creator of Outside Agenda. Featured on Hot97 and Revolt TV.",
    keywords: ["DJ", "Afrobeats", "Amapiano", "Nigerian DJ", "NYC DJ", "Pat Lax", "Outside Agenda", "Dancehall", "Soca"],
    openGraph: {
        title: "DJ Pat Lax | Nigerian-American DJ",
        description: "NYC-based Nigerian-American DJ specializing in Afrobeats, Amapiano, and more.",
        type: "website",
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
