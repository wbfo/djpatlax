# DJ Pat Lax Official Website

Professional DJ website with AI-powered booking assistant for DJ Pat Lax, a Nigerian-American DJ based in NYC specializing in Afrobeats, Amapiano, Dancehall, Soca, Hip Hop, and Reggaeton.

![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8?logo=tailwindcss)
![AI Powered](https://img.shields.io/badge/AI-Claude%20Sonnet%204-orange)

## 🎵 Features

- **Landing Page** - Hero section, about, featured mixes, upcoming events
- **Press Kit** - Downloadable media assets, multiple bio versions, technical rider
- **Outside Agenda** - Dedicated page for Pat's event series
- **AI Chatbot** - 24/7 booking assistant powered by Claude AI
- **Email Automation** - Automatic booking inquiry notifications
- **Responsive Design** - Beautiful on all devices
- **Glassmorphism UI** - Modern, premium aesthetic

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ installed
- Anthropic API key (for AI chatbot)
- SendGrid API key (for emails)

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd djpatlax

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local

# Add your API keys to .env.local
# ANTHROPIC_API_KEY=your_key_here
# SENDGRID_API_KEY=your_key_here
# BOOKING_EMAIL=bookings@patlax.com

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## 📁 Project Structure

```
├── app/
│   ├── layout.tsx              # Root layout
│   ├── page.tsx                # Landing page
│   ├── press/page.tsx          # Press kit
│   ├── outside-agenda/page.tsx # Outside Agenda
│   └── api/chat/route.ts       # Chat API
├── components/
│   ├── Navigation.tsx          # Header nav
│   ├── ChatWidget.tsx          # AI chat widget
│   ├── MixCard.tsx            # Mix display
│   └── EventCard.tsx          # Event card
├── lib/
│   ├── content.ts             # Site content
│   ├── claude.ts              # AI integration
│   └── email.ts               # Email service
└── public/images/             # Assets
```

## 🎨 Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **AI:** Anthropic Claude Sonnet 4
- **Email:** SendGrid
- **Icons:** React Icons
- **Animations:** Framer Motion (ready)

## 🤖 AI Chatbot Capabilities

The AI booking assistant can:

- Answer questions about DJ Pat Lax
- Share information about music and performances
- Provide links to mixes on SoundCloud
- List upcoming events
- Collect booking inquiry details:
  - Event type, date, location
  - Guest count, duration, budget
  - Music preferences
  - Contact information
- Send structured emails to booking team
- Qualify leads professionally
- Auto-reply to clients with reference numbers

## 📧 Email System

When a booking inquiry is submitted via the chatbot:

1. **Booking Team Email** - Detailed inquiry sent to `bookings@patlax.com`
2. **Client Auto-Reply** - Confirmation with reference number
3. **Reference Tracking** - Format: `[TYPE]-[DATE]-[###]` (e.g., `WED-20260815-001`)

## 🛠️ Configuration

### Environment Variables

Create `.env.local` file:

```env
# Required
ANTHROPIC_API_KEY=sk-ant-xxxxx
SENDGRID_API_KEY=SG.xxxxx
BOOKING_EMAIL=bookings@patlax.com
```

### Content Updates

All content is centralized in `lib/content.ts`:

```typescript
// Update mixes
export const featuredMixes = [
  {
    id: 1,
    title: "Your Mix Title",
    plays: "10K",
    duration: "60 min",
    url: "https://soundcloud.com/patlax/your-mix",
    genre: "Afrobeats",
  },
  // Add more...
];

// Update events
export const upcomingEvents = [
  {
    id: 1,
    title: "Event Name",
    venue: "Venue Name",
    date: "2026-08-15",
    city: "NYC",
    ticketUrl: "https://...",
  },
  // Add more...
];
```

### Replace Placeholder Images

1. Add images to `public/images/`
2. Update image paths in:
   - Landing page About section
   - Press kit photos
   - Outside Agenda gallery

## 🚢 Deployment

### Vercel (Recommended - FREE)

1. Push code to GitHub
2. Import project to [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Deploy!

### Build for Production

```bash
npm run build
npm start
```

## 📊 Monthly Costs

| Service | Cost | Notes |
|---------|------|-------|
| Hosting (Vercel) | $0 | Free tier |
| Claude API | $20-50 | Usage-based |
| SendGrid | $15-35 | Essentials plan |
| **Total** | **$35-85/month** | Very affordable |

## 🔒 Important Setup Steps

### SendGrid Verification

Before emails will send, verify the sender email:

1. Log into [SendGrid dashboard](https://app.sendgrid.com)
2. Settings → Sender Authentication
3. Verify single sender: `bookings@patlax.com`
4. Click verification link in email

### Test the Chatbot

1. Run dev server: `npm run dev`
2. Click orange chat button (bottom right)
3. Type: "I want to book DJ Pat Lax"
4. Follow the conversation flow
5. Check emails are sent (if configured)

## 📝 Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm start        # Start production server
npm run lint     # Run ESLint
```

## 🎯 Next Steps

1. **Get API Keys**
   - [Anthropic](https://console.anthropic.com) - Claude AI
   - [SendGrid](https://signup.sendgrid.com) - Email service

2. **Add Content**
   - Replace placeholder images
   - Update mix URLs
   - Add real event dates

3. **Deploy**
   - Push to GitHub
   - Deploy to Vercel
   - Configure custom domain

4. **Promote**
   - Share on social media
   - Update Instagram bio link
   - Add to email signature

## 🐛 Troubleshooting

**Chat doesn't work:**
- Verify `ANTHROPIC_API_KEY` in `.env.local`
- Check browser console for errors

**Emails not sending:**
- Verify `SENDGRID_API_KEY` in `.env.local`
- Confirm sender email is verified in SendGrid
- Check SendGrid dashboard for errors

**Build errors:**
- Delete `.next` folder: `rm -rf .next`
- Reinstall dependencies: `rm -rf node_modules && npm install`

## 📞 Contact

- **Booking Inquiries:** bookings@patlax.com
- **Instagram:** [@djpatlax](https://instagram.com/djpatlax)
- **SoundCloud:** [patlax](https://soundcloud.com/patlax)
- **Twitter:** [@DJPATLAX](https://twitter.com/DJPATLAX)

## 📄 License

Copyright © 2026 DJ Pat Lax. All rights reserved.

---

**Built with ❤️ using Next.js, TypeScript, and Claude AI**
