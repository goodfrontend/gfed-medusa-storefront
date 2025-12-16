import { cookies as nextCookies } from 'next/headers';

import 'server-only';

export const getCacheTag = async (tag: string): Promise<string> => {
  try {
    const cookies = await nextCookies();
    const cacheId = cookies.get('_medusa_cache_id')?.value;

    if (!cacheId) {
      return '';
    }

    return `${tag}-${cacheId}`;
  } catch {
    return '';
  }
};

export const getCacheOptions = async (
  tag: string
): Promise<{ tags: string[] } | null> => {
  if (typeof window !== 'undefined') {
    return null;
  }

  const cacheTag = await getCacheTag(tag);

  if (!cacheTag) {
    return null;
  }

  return { tags: [`${cacheTag}`] };
};
