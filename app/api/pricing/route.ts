// app/api/pricing/route.ts
// Lightweight Next.js API proxy for Portal billing/plans.
// This route is intentionally simple — it passes the request through to
// the Portal and lets the browser's own SSL/CORS stack handle the connection.
// The primary cache layer is sessionStorage in PricingSection (client side).
//
// This route exists for cases where a server-side fetch is preferred (e.g.
// pre-rendering, SSR). For now the website uses client-side fetch directly.
// The route is kept in case we need it for ISR in the future.

import { NextRequest, NextResponse } from 'next/server';

const PORTAL_API = 'https://app.goarkan.uz/api/v1/billing/plans';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest): Promise<NextResponse> {
  const locale = req.nextUrl.searchParams.get('locale') ?? 'ru';
  if (!['ru', 'uz', 'en'].includes(locale)) {
    return NextResponse.json({ error: 'invalid locale' }, { status: 400 });
  }

  try {
    const upstream = await fetch(`${PORTAL_API}?locale=${locale}`, {
      headers: { Accept: 'application/json' },
      // No revalidate — client-side sessionStorage is the cache layer
    });

    if (!upstream.ok) {
      return NextResponse.json({ error: 'upstream', status: upstream.status }, { status: 502 });
    }

    return NextResponse.json(await upstream.json());
  } catch {
    return NextResponse.json({ error: 'unreachable' }, { status: 502 });
  }
}
