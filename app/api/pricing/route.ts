import { NextRequest, NextResponse } from 'next/server';

const PORTAL_API = 'https://app.goarkan.uz:8001/api/v1/billing/plans';

// Fallback pricing loaded from Vercel env var PRICING_DATA_<LOCALE>
// Set these in Vercel dashboard when the Portal API is unreachable.
function getFallback(locale: string): NextResponse | null {
  const key = `PRICING_DATA_${locale.toUpperCase()}`;
  const raw = process.env[key];
  if (!raw) return null;
  try {
    return NextResponse.json(JSON.parse(raw));
  } catch {
    return null;
  }
}

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest): Promise<NextResponse> {
  const locale = req.nextUrl.searchParams.get('locale') ?? 'ru';
  if (!['ru', 'uz', 'en'].includes(locale)) {
    return NextResponse.json({ error: 'invalid locale' }, { status: 400 });
  }

  try {
    const upstream = await fetch(`${PORTAL_API}?locale=${locale}`, {
      headers: { Accept: 'application/json' },
      signal: AbortSignal.timeout(5000),
    });

    if (upstream.ok) {
      return NextResponse.json(await upstream.json());
    }
  } catch {
    // Portal unreachable — fall through to env var fallback
  }

  const fallback = getFallback(locale);
  if (fallback) return fallback;

  return NextResponse.json({ error: 'unreachable' }, { status: 502 });
}
