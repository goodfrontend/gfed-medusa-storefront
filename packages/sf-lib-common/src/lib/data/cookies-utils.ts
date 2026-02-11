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
