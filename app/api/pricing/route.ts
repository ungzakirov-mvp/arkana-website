// app/api/pricing/route.ts
// Server-side proxy for Portal billing/plans API.
// Caches the response at the Next.js edge/node layer (revalidate: 3600).
// Website never calls Portal API directly from the browser — all fetches
// go through this route. This ensures:
//   1. No CORS dependency on Portal in production
//   2. Next.js ISR cache as the authoritative server-side layer
//   3. Browser only talks to same-origin /api/pricing

import { NextRequest, NextResponse } from 'next/server';

const PORTAL_API = 'https://app.goarkan.uz/api/v1/billing/plans';

export const dynamic = 'force-dynamic'; // locale param differs per request

export async function GET(req: NextRequest): Promise<NextResponse> {
  const locale = req.nextUrl.searchParams.get('locale') ?? 'ru';
  if (!['ru', 'uz', 'en'].includes(locale)) {
    return NextResponse.json({ error: 'invalid locale' }, { status: 400 });
  }

  try {
    const upstream = await fetch(`${PORTAL_API}?locale=${locale}`, {
      next: { revalidate: 3600 }, // Next.js cache: 1 hour
      headers: { 'Accept': 'application/json' },
    });

    if (!upstream.ok) {
      return NextResponse.json(
        { error: 'Portal API unavailable', status: upstream.status },
        { status: 502 },
      );
    }

    const data = await upstream.json();

    return NextResponse.json(data, {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      },
    });
  } catch {
    return NextResponse.json(
      { error: 'Portal API unreachable' },
      { status: 502 },
    );
  }
}
