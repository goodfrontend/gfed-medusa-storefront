import { StorefrontContext, getEmptyContext } from './context';

export const getAuthHeaders = (
  ctx: StorefrontContext = getEmptyContext()
): { authorization: string } | {} => {
  const token = ctx.customerToken;

  if (!token) {
    return {};
  }

  return { authorization: `Bearer ${token}` };
};

export const getCacheTag = (
  tag: string, 
  ctx: StorefrontContext = getEmptyContext()
): string => {
  const cacheId = ctx.cacheId;

  if (!cacheId) {
    return '';
  }

  return `${tag}-${cacheId}`;
};

export const getCacheOptions = (
  tag: string,
  ctx: StorefrontContext = getEmptyContext()
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

export const getCartId = (ctx: StorefrontContext = getEmptyContext()) => {
  return ctx.cartId;
};

export const setCartId = async (id: string, ctx: StorefrontContext = getEmptyContext()) => {
  if (ctx.setCartId) {
    await ctx.setCartId(id);
  }
};

export const removeCartId = async (ctx: StorefrontContext = getEmptyContext()) => {
  if (ctx.removeCartId) {
    await ctx.removeCartId();
  }
};

export const setAuthToken = async (token: string, ctx: StorefrontContext = getEmptyContext()) => {
  if (ctx.setAuthToken) {
    await ctx.setAuthToken(token);
  }
};

export const removeAuthToken = async (ctx: StorefrontContext = getEmptyContext()) => {
  if (ctx.removeAuthToken) {
    await ctx.removeAuthToken();
  }
};
