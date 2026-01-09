import { NextRequest, NextResponse } from 'next/server';
import { sendMessage, type ChatMessage } from '@/lib/claude';
import { sendBookingInquiry } from '@/lib/email';

export async function POST(request: NextRequest) {
    try {
        const { messages } = await request.json();

        if (!messages || !Array.isArray(messages)) {
            return NextResponse.json(
                { error: 'Invalid request: messages array required' },
                { status: 400 }
            );
        }

        // Send to Claude
        const { response, bookingData } = await sendMessage(messages as ChatMessage[]);

        // If booking data was extracted, send emails
        if (bookingData) {
            try {
                const referenceNumber = await sendBookingInquiry(bookingData);
                return NextResponse.json({
                    message: response,
                    bookingConfirmation: {
                        referenceNumber,
                        sent: true,
                    },
                });
            } catch (emailError) {
                console.error('Email sending failed:', emailError);
                // Return response but indicate email failed
                return NextResponse.json({
                    message: response + "\n\nNote: There was an issue sending the email. Please contact bookings@patlax.com directly.",
                    bookingConfirmation: {
                        sent: false,
                        error: 'Email service unavailable',
                    },
                });
            }
        }

        return NextResponse.json({ message: response });
    } catch (error) {
        console.error('Chat API error:', error);
        return NextResponse.json(
            {
                error: 'Failed to process message',
                details: error instanceof Error ? error.message : 'Unknown error'
            },
            { status: 500 }
        );
    }
}
