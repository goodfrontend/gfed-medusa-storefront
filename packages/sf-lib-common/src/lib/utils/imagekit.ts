const EXTERNAL_STORAGES = [
  'cdn.sanity.io',
  'cdn.shopify.com',
];

export function getImageKitUrl(
  src: string,
  options?: { width?: number; height?: number; quality?: number }
): string {
  if (!src) return src;

  const publicEndpoint = 'https://ik.imagekit.io/94rjnwlop';
  const normalizedEndpoint = publicEndpoint.replace(/\/$/, '');

  if (src.includes('ik.imagekit.io')) {
    return src;
  }

  const params: string[] = [];
  if (options?.width) params.push(`w-${options.width}`);
  if (options?.height) params.push(`h-${options.height}`);
  if (options?.quality) params.push(`q-${options.quality}`);
  params.push('f-auto');

  const transformStr = params.length > 0 ? `tr:${params.join(',')}` : '';

  if (src.startsWith('http://') || src.startsWith('https://')) {
    let urlPath = src.replace(/^https?:\/\//, '');
    for (const domain of EXTERNAL_STORAGES) {
      urlPath = urlPath.replace(new RegExp(`^${domain}/`), '');
    }
    return transformStr
      ? `${normalizedEndpoint}/${transformStr}/${urlPath}`
      : `${normalizedEndpoint}/${urlPath}`;
  }

  const normalizedSrc = src.startsWith('/') ? src.slice(1) : src;
  return transformStr
    ? `${normalizedEndpoint}/${transformStr}/${normalizedSrc}`
    : `${normalizedEndpoint}/${normalizedSrc}`;
}
