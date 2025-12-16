import { NextRequest } from 'next/server';

const BFF_URL =
  process.env.NEXT_PUBLIC_BFF_URL ?? 'http://localhost:4000/graphql';

export async function POST(req: NextRequest) {
  const bodyText = await req.text();

  const bffRes = await fetch(BFF_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      cookie: req.headers.get('cookie') || '',
    },
    body: bodyText,
    credentials: 'include',
  });

  const setCookie = bffRes.headers.get('set-cookie');

  return new Response(await bffRes.text(), {
    status: bffRes.status,
    headers: {
      'Content-Type': 'application/json',
      ...(setCookie ? { 'Set-Cookie': setCookie } : {}),
    },
  });
}

export async function GET(req: NextRequest) {
  const bodyText = await req.text();

  const bffRes = await fetch(BFF_URL, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      cookie: req.headers.get('cookie') || '',
    },
    body: bodyText,
    credentials: 'include',
  });

  const setCookie = bffRes.headers.get('set-cookie');

  return new Response(await bffRes.text(), {
    status: bffRes.status,
    headers: {
      'Content-Type': 'application/json',
      ...(setCookie ? { 'Set-Cookie': setCookie } : {}),
    },
  });
}
