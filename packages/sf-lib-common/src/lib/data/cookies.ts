'use server';

import type { StorefrontContext } from './context';

export const getAuthHeaders = (
  ctx: StorefrontContext
): { authorization: string } | {} => {
  const token = ctx.customerToken;

  if (!token) {
    return {};
  }

  return { authorization: `Bearer ${token}` };
};

export const getCacheTag = (tag: string, ctx: StorefrontContext): string => {
  const cacheId = ctx.cacheId;

  if (!cacheId) {
    return '';
  }

  return `${tag}-${cacheId}`;
};

export const getCacheOptions = (
  tag: string,
  ctx: StorefrontContext
): { tags: string[] } | {} => {
  if (typeof window !== 'undefined') {
    return {};
  }

  const cacheTag = getCacheTag(tag, ctx);

  if (!cacheTag) {
    return {};
  }

  return { tags: [`${cacheTag}`] };
};

export const getCartId = (ctx: StorefrontContext) => {
  return ctx.cartId;
};

export async function setCartIdAction(id: string) {
  const { cookies } = await import('next/headers');
  const c = await cookies();
  c.set('_medusa_cart_id', id, {
    maxAge: 60 * 60 * 24 * 7,
    httpOnly: true,
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production',
  });
}

export async function removeCartIdAction() {
  const { cookies } = await import('next/headers');
  const c = await cookies();
  c.set('_medusa_cart_id', '', { maxAge: -1 });
}

export async function setAuthTokenAction(token: string) {
  const { cookies } = await import('next/headers');
  const c = await cookies();
  c.set('_medusa_jwt', token, {
    maxAge: 60 * 60 * 24 * 7,
    httpOnly: true,
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production',
  });
}

export async function removeAuthTokenAction() {
  const { cookies } = await import('next/headers');
  const c = await cookies();
  c.set('_medusa_jwt', '', { maxAge: -1 });
}
