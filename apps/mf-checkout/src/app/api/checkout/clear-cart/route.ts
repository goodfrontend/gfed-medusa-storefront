import { NextResponse } from 'next/server';

import { cookies } from 'next/headers';

export async function POST() {
  const isProd = process.env.NODE_ENV === 'production';
  const cookieStore = await cookies();

  cookieStore.set('_medusa_cart_id', '', {
    maxAge: -1,
    httpOnly: true,
    sameSite: isProd ? 'none' : 'lax',
    secure: isProd,
    domain: isProd ? '.justgood.win' : undefined,
  });

  return NextResponse.json({ success: true });
}
