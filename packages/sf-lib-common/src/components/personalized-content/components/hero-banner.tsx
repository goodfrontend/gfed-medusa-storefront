'use client';

import Image from 'next/image';
import { Button, Heading, Text } from '@medusajs/ui';

import { LocalizedClientLink } from '../../localized-client-link';

interface HeroBannerProps {
  headline?: string;
  subheadline?: string;
  image?: { asset?: { url?: string } } | string;
  imageUrl?: string;
  cta?: { label?: string; href?: string };
  badge?: string;
  backgroundColor?: string;
}

function getImageUrl(image: HeroBannerProps['image'], imageUrl?: string): string | undefined {
  if (imageUrl) return imageUrl;
  if (!image) return undefined;
  if (typeof image === 'string') return image;
  return image.asset?.url ?? undefined;
}

function CtaButton({ cta }: { cta: NonNullable<HeroBannerProps['cta']> }) {
  const button = <Button variant="primary">{cta.label}</Button>;
  const isExternal =
    cta.href?.startsWith('http://') ||
    cta.href?.startsWith('https://') ||
    cta.href?.startsWith('//');

  if (isExternal) {
    return (
      <a href={cta.href} target="_blank" rel="noreferrer">
        {button}
      </a>
    );
  }

  return <LocalizedClientLink href={cta.href!}>{button}</LocalizedClientLink>;
}

export function HeroBanner({ headline, subheadline, image, imageUrl, cta, badge, backgroundColor }: HeroBannerProps) {
  const bannerImage = getImageUrl(image, imageUrl);

  if (!headline && !subheadline && !badge && !cta?.label) return null;

  return (
    <section className="border-ui-border-base relative isolate overflow-hidden border-b">
      {bannerImage && (
        <Image
          src={bannerImage}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover"
          fill
          sizes="100vw"
          priority
        />
      )}
      {bannerImage && (
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" aria-hidden="true" />
      )}
      <div
        className="content-container relative flex min-h-[420px] flex-col justify-center py-10 md:min-h-[540px]"
        style={backgroundColor && !bannerImage ? { backgroundColor } : undefined}
      >
        <div className="w-full max-w-2xl pt-8 text-left md:pt-14">
          {badge && (
            <Text
              as="span"
              size="xsmall"
              className="text-ui-fg-muted block font-medium uppercase tracking-[0.3em]"
            >
              {badge}
            </Text>
          )}
          {headline && (
            <Heading level="h1" className="text-ui-fg-base mt-2 text-3xl font-normal leading-tight md:text-4xl">
              {headline}
            </Heading>
          )}
          {subheadline && (
            <Text className="text-ui-fg-subtle mt-2 max-w-xl text-base leading-7">
              {subheadline}
            </Text>
          )}
          {cta?.label && cta?.href && (
            <div className="mt-6">
              <CtaButton cta={cta as NonNullable<HeroBannerProps['cta']>} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
