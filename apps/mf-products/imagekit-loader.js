const EXTERNAL_STORAGES = [
  'cdn.shopify.com',
  'medusa-public-images.s3.eu-west-1.amazonaws.com',
];

export default function imagekitLoader({ src, width, quality }) {
  const publicEndpoint = 'https://ik.imagekit.io/94rjnwlop';
  const normalizedEndpoint = publicEndpoint.replace(/\/$/, '');

  if (src.includes('ik.imagekit.io')) {
    return src;
  }

  const transforms = [];
  if (width) transforms.push(`w-${width}`);
  if (quality) transforms.push(`q-${quality}`);
  transforms.push('f-auto');

  const transformStr =
    transforms.length > 0 ? `tr:${transforms.join(',')}` : '';

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
