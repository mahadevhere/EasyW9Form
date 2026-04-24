import { NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';
import { cookies } from 'next/headers';
import { getProfiles } from '@/lib/db';

export async function GET(req) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('admin_token')?.value;
    const user = verifyToken(token);
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    let profiles = [];
    try {
      profiles = await getProfiles();
    } catch (dbErr) {
      console.warn('DB offline — returning empty profiles:', dbErr.message);
    }
    
    // Revenue & Date grouping
    let docTypes = { SSN: 0, EIN: 0 };
    let recentGrowth = {}; // simple date strings -> count
    
    profiles.forEach(p => {
      if (p.paidDocs && p.paidDocs.length > 0) {
        p.paidDocs.forEach(d => {
          const type = d.formData?.taxIdType || 'SSN';
          docTypes[type] = (docTypes[type] || 0) + 1;
          
          const day = new Date(d.date).toISOString().split('T')[0];
          recentGrowth[day] = (recentGrowth[day] || 0) + 1;
        });
      }
    });

    // Sort growth by date
    const sortedGrowth = Object.entries(recentGrowth)
      .sort((a,b) => a[0].localeCompare(b[0]))
      .slice(-7) // Last 7 days of activity
      .map(([date, count]) => ({ date, count }));

    return NextResponse.json({
      profileCount: profiles.length,
      docTypeDistribution: docTypes,
      chartData: sortedGrowth,
      topCustomers: profiles
        .sort((a,b) => b.paidDocs.length - a.paidDocs.length || a.email.localeCompare(b.email))
        .slice(0, 100)
        .map(p => ({ 
          email: p.email, 
          count: p.paidDocs.length, 
          tag: p.userTag,
          status: p.paidDocs.length > 0 ? 'Customer' : 'Lead'
        }))
    });
  } catch (error) {
    console.error('Detailed stats error:', error.message);
    // Return valid empty structure so frontend doesn't crash
    return NextResponse.json({
      profileCount: 0,
      docTypeDistribution: { SSN: 0, EIN: 0 },
      chartData: [],
      topCustomers: []
    });
  }
}
