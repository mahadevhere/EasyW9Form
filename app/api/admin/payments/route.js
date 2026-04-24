import { NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';
import { cookies } from 'next/headers';
import { getRevenueStartTime } from '@/lib/db';

export async function GET(req) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('admin_token')?.value;
    const user = verifyToken(token);

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Fetch payments from Razorpay API
    const keyId = process.env.RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;
    const auth = Buffer.from(`${keyId}:${keySecret}`).toString('base64');

    const paymentsRes = await fetch('https://api.razorpay.com/v1/payments?count=50', {
      headers: { 'Authorization': `Basic ${auth}` },
      cache: 'no-store',
    });

    let startTime = 0;
    try {
      startTime = await getRevenueStartTime();
    } catch (dbErr) {
      console.warn('DB offline — showing all payments (no reset filter):', dbErr.message);
    }
    let payments = [];
    let totalRevenue = 0;
    let totalCount = 0;
    let capturedCount = 0;

    if (paymentsRes.ok) {
      const data = await paymentsRes.json();
      payments = (data.items || [])
        .map(p => ({
          id: p.id,
          amount: p.amount / 100,
          currency: p.currency,
          status: p.status,
          method: p.method,
          email: p.email || '—',
          contact: p.contact || '—',
          created_at: p.created_at * 1000, // MS
        }))
        .filter(p => p.created_at >= startTime); // FILTER BY RESET TIME

      totalCount = payments.length;
      capturedCount = payments.filter(p => p.status === 'captured').length;
      totalRevenue = payments
        .filter(p => p.status === 'captured')
        .reduce((sum, p) => sum + p.amount, 0);
      
      // Convert dates back to string for UI
      payments = payments.map(p => ({
        ...p,
        created_at: new Date(p.created_at).toISOString()
      }));
    }

    return NextResponse.json({
      payments,
      stats: {
        totalPayments: totalCount,
        capturedPayments: capturedCount,
        totalRevenue: totalRevenue.toFixed(2),
        currency: 'USD',
      },
    });
  } catch (error) {
    console.error('Payments fetch error:', error);
    return NextResponse.json({ error: 'Failed to fetch payments' }, { status: 500 });
  }
}
