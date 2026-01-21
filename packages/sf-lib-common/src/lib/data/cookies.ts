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

export const setCartId = async (id: string, ctx: StorefrontContext) => {
  if (ctx.setCartId) {
    await ctx.setCartId(id);
  }
};

export const removeCartId = async (ctx: StorefrontContext) => {
  if (ctx.removeCartId) {
    await ctx.removeCartId();
  }
};

export const setAuthToken = async (token: string, ctx: StorefrontContext) => {
  if (ctx.setAuthToken) {
    await ctx.setAuthToken(token);
  }
};

export const removeAuthToken = async (ctx: StorefrontContext) => {
  if (ctx.removeAuthToken) {
    await ctx.removeAuthToken();
  }
};
