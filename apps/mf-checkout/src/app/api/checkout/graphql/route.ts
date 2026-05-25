import { NextRequest } from 'next/server';

const BFF_URL =
  process.env.NEXT_PUBLIC_BFF_URL ?? 'http://localhost:4000/graphql';

const allowedOrigin = process.env.API_GRAPHQL_CORS ?? 'http://localhost:8000';

function corsHeaders(origin: string) {
  return {
    'Access-Control-Allow-Origin': origin,
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Cookie',
    'Access-Control-Allow-Credentials': 'true',
  };
}

export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: corsHeaders(allowedOrigin),
  });
}

export async function POST(req: NextRequest) {
  const bodyText = await req.text();

  // Use incoming API key if present (server-originated requests), otherwise inject from env
  const bffApiKey = req.headers.get('x-bff-api-key') || process.env.BFF_API_KEY;

  const bffRes = await fetch(BFF_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      cookie: req.headers.get('cookie') || '',
      ...(bffApiKey ? { 'x-bff-api-key': bffApiKey } : {}),
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
      ...corsHeaders(allowedOrigin),
    },
  });
}
