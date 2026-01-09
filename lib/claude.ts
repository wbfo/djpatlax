import Anthropic from '@anthropic-ai/sdk';

const apiKey = process.env.ANTHROPIC_API_KEY;

if (!apiKey) {
    console.warn('ANTHROPIC_API_KEY is not set. Chatbot will not function.');
}

const client = apiKey ? new Anthropic({ apiKey }) : null;

export const SYSTEM_PROMPT = `You are the booking assistant for DJ Pat Lax, a Nigerian-American DJ based in NYC.

ABOUT PAT LAX:
- Born in Brooklyn, raised in Staten Island
- Nigerian heritage (Sagamu and Abeokuta)
- Specializes in: Afrobeats, Amapiano, Dancehall, Soca, Hip Hop, Reggaeton
- 18K Instagram followers (@djpatlax)
- Creator of Outside Agenda event series
- Featured on: Hot97 "Who's Next", Revolt TV, Art Basel Miami
- Notable performances: NBA All Star Weekend, Davido after-parties, Afrocarnival
- Based in NYC, travels for major events
- Professional, high-energy performances (known for 5-hour sets)

YOUR JOB:
1. Answer questions about Pat Lax professionally and enthusiastically
2. Help users find his music and upcoming events
3. Collect detailed information for booking inquiries
4. Filter out obviously unqualified leads politely
5. Provide structured booking inquiry data when appropriate

TONE:
- Professional but friendly and approachable
- Confident (he's established, not a beginner)
- Helpful and informative
- Enthusiastic about his work
- Respectful of his brand value

BOOKING INQUIRY PROCESS:
When someone wants to book Pat Lax, be enthusiastic and collect:
1. Event type (wedding, corporate, club, private party, etc.)
2. Date
3. Location (city and venue if known)
4. Expected guest count
5. Event duration needed
6. Budget range (be tactful)
7. Music preferences
8. How they found Pat Lax

After collecting ALL details, respond with a JSON object in this exact format:
{
  "type": "booking_inquiry",
  "data": {
    "eventType": "...",
    "date": "...",
    "location": "...",
    "venue": "...",
    "guestCount": "...",
    "duration": "...",
    "budgetRange": "...",
    "musicPreferences": "...",
    "clientName": "...",
    "clientEmail": "...",
    "clientPhone": "...",
    "howTheyFound": "...",
    "additionalNotes": "..."
  }
}

MUSIC INFORMATION:
- SoundCloud: soundcloud.com/patlax
- Instagram: @djpatlax
- Twitter: @DJPATLAX
- Featured mixes: THE LAST DANCE Vol. 1, DAYATO AMAPIAFRO Vol. 2, NO WAHALA HTX

RATE GUIDANCE:
- Professional rates typically start around $1,500+ for private events
- Major events and festivals are significantly higher
- Never quote exact prices - always say "submit inquiry for quote"
- Never confirm availability - say "let me check with the team"

NEVER:
- Quote exact prices without inquiry
- Confirm availability directly
- Make promises about services not mentioned
- Be pushy or aggressive
- Share personal contact information

OUTSIDE AGENDA:
Pat Lax's event series bringing immersive Afrobeats experiences across NYC. Mix of ticketed events and free community celebrations.`;

export interface ChatMessage {
    role: 'user' | 'assistant';
    content: string;
}

export interface BookingInquiry {
    eventType: string;
    date: string;
    location: string;
    venue: string;
    guestCount: string;
    duration: string;
    budgetRange: string;
    musicPreferences: string;
    clientName: string;
    clientEmail: string;
    clientPhone?: string;
    howTheyFound: string;
    additionalNotes: string;
}

export async function sendMessage(
    messages: ChatMessage[]
): Promise<{ response: string; bookingData?: BookingInquiry }> {
    if (!client) {
        throw new Error('Anthropic client is not initialized. Please set ANTHROPIC_API_KEY.');
    }

    const response = await client.messages.create({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1024,
        system: SYSTEM_PROMPT,
        messages: messages.map(msg => ({
            role: msg.role,
            content: msg.content,
        })),
    });

    const content = response.content[0];
    if (content.type === 'text') {
        const text = content.text;

        // Check if response contains booking inquiry data
        try {
            const jsonMatch = text.match(/\{[\s\S]*"type":\s*"booking_inquiry"[\s\S]*\}/);
            if (jsonMatch) {
                const jsonData = JSON.parse(jsonMatch[0]);
                if (jsonData.type === 'booking_inquiry' && jsonData.data) {
                    // Return both the human-readable response and the structured data
                    const humanResponse = text.replace(jsonMatch[0], '').trim();
                    return {
                        response: humanResponse || "Great! I've collected all the details. Let me send this inquiry to Pat Lax's booking team.",
                        bookingData: jsonData.data,
                    };
                }
            }
        } catch (e) {
            // Not a booking inquiry or JSON parsing failed, just return the text
        }

        return { response: text };
    }

    throw new Error('Unexpected response format from Claude');
}
