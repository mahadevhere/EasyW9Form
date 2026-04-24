import { NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';
import { cookies } from 'next/headers';
import { clearAllDrafts } from '@/lib/db';

export async function POST(req) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('admin_token')?.value;
    const user = verifyToken(token);

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { confirm } = await req.json();
    if (confirm !== 'RESET_ALL') {
      return NextResponse.json({ error: 'Invalid confirmation' }, { status: 400 });
    }

    await clearAllDrafts();

    return NextResponse.json({ success: true, message: 'All local drafts and lead activity cleared.' });
  } catch (error) {
    console.error('Reset error:', error);
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}
