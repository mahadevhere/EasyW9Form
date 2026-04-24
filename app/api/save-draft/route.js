import { NextResponse } from 'next/server';
import { saveDraft, getDraft } from '@/lib/db';

export async function POST(req) {
  try {
    const { formId, formData, email } = await req.json();
    if (!formId) return NextResponse.json({ error: 'Missing formId' }, { status: 400 });

    const ip = req.headers.get('x-forwarded-for') || 'unknown';
    await saveDraft(formId, {}, email, ip);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Save draft error:', error.message);
    // Return success even if DB is down — form data is saved in sessionStorage client-side
    // The DB save is best-effort for lead tracking only
    return NextResponse.json({ success: true, dbOffline: true });
  }
}

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const formId = searchParams.get('formId');
    if (!formId) return NextResponse.json({ error: 'Missing formId' }, { status: 400 });

    const draft = await getDraft(formId);
    return NextResponse.json({ formData: draft ? draft.formData : null, isPaid: draft ? draft.isPaid : false });
  } catch (error) {
    console.error('Get draft error:', error.message);
    // If DB is down, return empty — client will use sessionStorage data
    return NextResponse.json({ formData: null, isPaid: false });
  }
}
