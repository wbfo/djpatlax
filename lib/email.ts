import sgMail from '@sendgrid/mail';
import type { BookingInquiry } from './claude';

const apiKey = process.env.SENDGRID_API_KEY;
const bookingEmail = process.env.BOOKING_EMAIL || 'bookings@patlax.com';

if (apiKey) {
    sgMail.setApiKey(apiKey);
} else {
    console.warn('SENDGRID_API_KEY is not set. Email functionality will not work.');
}

export function generateReferenceNumber(eventType: string, date: string): string {
    const eventCode = eventType.substring(0, 3).toUpperCase();
    const dateCode = date.replace(/-/g, '');
    const randomSuffix = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `${eventCode}-${dateCode}-${randomSuffix}`;
}

export async function sendBookingInquiry(inquiry: BookingInquiry): Promise<string> {
    if (!apiKey) {
        console.error('Cannot send email: SENDGRID_API_KEY not configured');
        // Return a reference number anyway for testing
        return generateReferenceNumber(inquiry.eventType, inquiry.date);
    }

    const referenceNumber = generateReferenceNumber(inquiry.eventType, inquiry.date);
    const currentDate = new Date().toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });

    // Email to booking team
    const bookingEmailContent = {
        to: bookingEmail,
        from: bookingEmail, // SendGrid requires verified sender
        subject: `Booking Inquiry - ${inquiry.eventType} - ${inquiry.date} - REF#${referenceNumber}`,
        text: `
NEW BOOKING INQUIRY

Reference: ${referenceNumber}
Date Received: ${currentDate}

CLIENT INFORMATION:
Name: ${inquiry.clientName}
Email: ${inquiry.clientEmail}
Phone: ${inquiry.clientPhone || 'Not provided'}

EVENT DETAILS:
Type: ${inquiry.eventType}
Date: ${inquiry.date}
Location: ${inquiry.location}
Venue: ${inquiry.venue || 'TBD'}
Guest Count: ${inquiry.guestCount}
Duration: ${inquiry.duration}
Budget Range: ${inquiry.budgetRange}

MUSIC PREFERENCES:
${inquiry.musicPreferences}

HOW THEY FOUND YOU:
${inquiry.howTheyFound}

ADDITIONAL NOTES:
${inquiry.additionalNotes || 'None'}

---

Reply to client directly at: ${inquiry.clientEmail}
    `.trim(),
        html: `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #F97316 0%, #EA580C 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
    .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
    .section { margin-bottom: 25px; }
    .section-title { font-weight: bold; color: #F97316; font-size: 14px; text-transform: uppercase; margin-bottom: 10px; }
    .info-row { margin: 5px 0; }
    .label { font-weight: 600; color: #666; }
    .ref-number { background: #F97316; color: white; padding: 8px 16px; border-radius: 4px; display: inline-block; font-family: monospace; font-size: 16px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>New Booking Inquiry</h1>
      <p style="margin: 10px 0 0 0;">DJ Pat Lax</p>
    </div>
    <div class="content">
      <div class="section">
        <div class="section-title">Reference Number</div>
        <span class="ref-number">${referenceNumber}</span>
        <p style="color: #666; font-size: 12px; margin-top: 8px;">Date Received: ${currentDate}</p>
      </div>
      
      <div class="section">
        <div class="section-title">Client Information</div>
        <div class="info-row"><span class="label">Name:</span> ${inquiry.clientName}</div>
        <div class="info-row"><span class="label">Email:</span> <a href="mailto:${inquiry.clientEmail}">${inquiry.clientEmail}</a></div>
        <div class="info-row"><span class="label">Phone:</span> ${inquiry.clientPhone || 'Not provided'}</div>
      </div>
      
      <div class="section">
        <div class="section-title">Event Details</div>
        <div class="info-row"><span class="label">Type:</span> ${inquiry.eventType}</div>
        <div class="info-row"><span class="label">Date:</span> ${inquiry.date}</div>
        <div class="info-row"><span class="label">Location:</span> ${inquiry.location}</div>
        <div class="info-row"><span class="label">Venue:</span> ${inquiry.venue || 'TBD'}</div>
        <div class="info-row"><span class="label">Guest Count:</span> ${inquiry.guestCount}</div>
        <div class="info-row"><span class="label">Duration:</span> ${inquiry.duration}</div>
        <div class="info-row"><span class="label">Budget Range:</span> ${inquiry.budgetRange}</div>
      </div>
      
      <div class="section">
        <div class="section-title">Music Preferences</div>
        <p>${inquiry.musicPreferences}</p>
      </div>
      
      <div class="section">
        <div class="section-title">How They Found You</div>
        <p>${inquiry.howTheyFound}</p>
      </div>
      
      ${inquiry.additionalNotes ? `
      <div class="section">
        <div class="section-title">Additional Notes</div>
        <p>${inquiry.additionalNotes}</p>
      </div>
      ` : ''}
    </div>
  </div>
</body>
</html>
    `.trim(),
    };

    // Auto-reply to client
    const clientEmailContent = {
        to: inquiry.clientEmail,
        from: bookingEmail,
        subject: `Booking Inquiry Received - DJ Pat Lax - REF#${referenceNumber}`,
        text: `
Hi ${inquiry.clientName},

Thank you for your interest in booking DJ Pat Lax for your ${inquiry.eventType} on ${inquiry.date}!

We've received your inquiry and will review the details. You can expect a response within 24 hours.

YOUR INQUIRY DETAILS:
Reference Number: ${referenceNumber}
Event Type: ${inquiry.eventType}
Date: ${inquiry.date}
Location: ${inquiry.location}

If you have any additional information or questions in the meantime, feel free to reply to this email.

Best regards,
DJ Pat Lax Booking Team
${bookingEmail}
    `.trim(),
        html: `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #F97316 0%, #EA580C 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
    .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
    .section { margin-bottom: 20px; }
    .ref-box { background: white; border-left: 4px solid #F97316; padding: 15px; margin: 20px 0; }
    .footer { text-align: center; color: #666; font-size: 12px; margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Booking Inquiry Received</h1>
      <p style="margin: 10px 0 0 0;">DJ Pat Lax</p>
    </div>
    <div class="content">
      <p>Hi ${inquiry.clientName},</p>
      
      <p>Thank you for your interest in booking DJ Pat Lax for your <strong>${inquiry.eventType}</strong> on <strong>${inquiry.date}</strong>!</p>
      
      <p>We've received your inquiry and will review the details. You can expect a response within <strong>24 hours</strong>.</p>
      
      <div class="ref-box">
        <strong>Your Inquiry Reference:</strong><br>
        <span style="font-family: monospace; font-size: 18px; color: #F97316;">${referenceNumber}</span>
      </div>
      
      <div class="section">
        <strong>Event Summary:</strong><br>
        Event Type: ${inquiry.eventType}<br>
        Date: ${inquiry.date}<br>
        Location: ${inquiry.location}
      </div>
      
      <p>If you have any additional information or questions in the meantime, feel free to reply to this email.</p>
      
      <p>Best regards,<br>
      <strong>DJ Pat Lax Booking Team</strong><br>
      <a href="mailto:${bookingEmail}">${bookingEmail}</a></p>
      
      <div class="footer">
        <p>Follow DJ Pat Lax: <a href="https://instagram.com/djpatlax">@djpatlax</a> | <a href="https://soundcloud.com/patlax">SoundCloud</a></p>
      </div>
    </div>
  </div>
</body>
</html>
    `.trim(),
    };

    try {
        await Promise.all([
            sgMail.send(bookingEmailContent),
            sgMail.send(clientEmailContent),
        ]);
        return referenceNumber;
    } catch (error) {
        console.error('Error sending emails:', error);
        throw error;
    }
}
