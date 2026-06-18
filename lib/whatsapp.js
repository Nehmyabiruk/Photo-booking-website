// amen-nextjs/lib/whatsapp.js
export async function sendWhatsAppNotification(bookingData) {
  const url = `https://graph.facebook.com/v19.0/${process.env.WHATSAPP_PHONE_NUMBER_ID}/messages`;

  const payload = {
    messaging_product: "whatsapp",
    to: process.env.ADMIN_PHONE_NUMBER,
    type: "template",
    template: {
      name: "new_booking_alert", // You must create this template in Meta Developer Portal
      language: { code: "en_US" },
      components: [
        {
          type: "body",
          parameters: [
            { type: "text", text: `${bookingData.firstName} ${bookingData.lastName}` },
            { type: "text", text: bookingData.eventType },
            { type: "text", text: bookingData.eventDate },
          ],
        },
      ],
    },
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.WHATSAPP_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const result = await response.json();
    if (!response.ok) {
      console.error('WhatsApp API Error Response:', result);
      throw new Error(result.error?.message || 'WhatsApp API Error');
    }
    
    return { success: true, result };
  } catch (error) {
    console.error('WhatsApp Notification Failed:', error);
    return { success: false, error: error.message };
  }
}
