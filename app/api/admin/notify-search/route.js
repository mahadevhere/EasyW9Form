import { NextResponse } from 'next/server';

/**
 * Pings IndexNow (Bing/Yandex) to notify them of site updates.
 * This helps fix 'Discovered but not crawled' issues.
 */
export async function POST(req) {
  try {
    const host = 'www.easyw9form.com';
    const key = 'B4AF113BE1B98DFC9A6A3204AFC5F0E9';
    const keyLocation = `https://${host}/${key}.txt`;
    
    const urlList = [
      `https://${host}/`,
      `https://${host}/fill-w9-form-online`,
      `https://${host}/guides/how-to-fill-w9`,
      `https://${host}/guides/tax-difference-w9-vs-w4`,
      `https://${host}/guides/w9-for-independent-contractors`,
      `https://${host}/guides/secure-w9-generation`,
    ];

    const response = await fetch('https://www.bing.com/indexnow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        host,
        key,
        keyLocation,
        urlList,
      }),
    });

    if (response.ok) {
      return NextResponse.json({ success: true, message: 'IndexNow notification sent successfully' });
    } else {
      const errorText = await response.text();
      return NextResponse.json({ success: false, error: errorText }, { status: 500 });
    }
  } catch (error) {
    console.error('IndexNow Error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
