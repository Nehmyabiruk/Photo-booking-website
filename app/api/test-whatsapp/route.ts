import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  const WHATSAPP_TOKEN = process.env.WHATSAPP_TOKEN;
  const WHATSAPP_PHONE_NUMBER_ID = process.env.WHATSAPP_PHONE_NUMBER_ID;
  const ADMIN_PHONE_NUMBER = process.env.ADMIN_PHONE_NUMBER;

  if (!WHATSAPP_TOKEN || !WHATSAPP_PHONE_NUMBER_ID || !ADMIN_PHONE_NUMBER) {
    return NextResponse.json({ 
      error: "Missing WhatsApp environment variables" 
    }, { status: 400 });
  }

  try {
    const response = await fetch(
      `https://graph.facebook.com/v20.0/${WHATSAPP_PHONE_NUMBER_ID}/messages`,
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${WHATSAPP_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messaging_product: "whatsapp",
          to: ADMIN_PHONE_NUMBER,
          type: "text",
          text: { 
            body: "✅ Test Message from Amen Pictures Website!\n\nYour WhatsApp integration is working successfully." 
          }
        }),
      }
    );

    const result = await response.json();

    if (response.ok) {
      return NextResponse.json({ 
        success: true, 
        message: "Test WhatsApp message sent successfully!",
        result 
      });
    } else {
      return NextResponse.json({ 
        success: false, 
        error: result.error || "Failed to send message",
        status: response.status 
      }, { status: response.status });
    }
  } catch (error: any) {
    return NextResponse.json({ 
      success: false, 
      error: error.message 
    }, { status: 500 });
  }
}