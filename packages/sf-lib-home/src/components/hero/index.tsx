import Image from 'next/image';

import { LocalizedClientLink } from '@gfed-medusa/sf-lib-common/components/localized-client-link';
import { HomeBannerContent } from '@gfed-medusa/sf-lib-common/types/cms';
import { Button, Heading } from '@medusajs/ui';

type BannerAction = {
  href: string;
  label: string;
  openInNewTab?: boolean | null;
};

type SecondaryBannerCard = {
  button?: BannerAction | null;
  description?: string | null;
  imageUrl?: string | null;
  showPoweredBy?: boolean | null;
  title?: string | null;
};

type HeroProps = {
  bannerContent?: HomeBannerContent | null;
};

type BannerActionLike = {
  href?: string | null;
  label?: string | null;
  openInNewTab?: boolean | null;
};

type SecondaryBannerLike = {
  button?: BannerActionLike | null;
  description?: string | null;
  image?: {
    asset?: {
      url?: string | null;
    } | null;
  } | null;
  showPoweredBy?: boolean | null;
  title?: string | null;
};

const SANITY_CMS_URL = 'https://www.sanity.io/';
const MAIN_BANNER_IMAGE_SIZES = '(max-width: 1600px) 100vw, 1600px';
const SECONDARY_BANNER_IMAGE_SIZES =
  '(max-width: 768px) 100vw, (max-width: 1600px) 50vw, 800px';
const MAIN_BANNER_IMAGE_QUALITY = 70;
const SECONDARY_BANNER_IMAGE_QUALITY = 65;

function PoweredBySanity({
  className,
}: {
  className: string;
}) {
  return (
    <p className={className}>
      Powered by{' '}
      <a
        href={SANITY_CMS_URL}
        target="_blank"
        rel="noreferrer"
        className="underline underline-offset-2"
      >
        Sanity CMS
      </a>
    </p>
  );
}

function isBannerAction(
  button: BannerActionLike | null | undefined
): button is BannerAction {
  return Boolean(button?.label && button.href);
}

function hasSecondaryBannerContent(
  banner: SecondaryBannerLike | null | undefined
): banner is SecondaryBannerLike {
  return Boolean(
    banner &&
      (banner.title ||
        banner.description ||
        banner.image?.asset?.url ||
        banner.showPoweredBy ||
        isBannerAction(banner.button))
  );
}

function BannerButton({
  action,
  variant,
}: {
  action: BannerAction;
  variant: 'primary' | 'secondary';
}) {
  const button = <Button variant={variant}>{action.label}</Button>;
  const rel = action.openInNewTab ? 'noreferrer' : undefined;
  const target = action.openInNewTab ? '_blank' : undefined;
  const isExternalLink =
    action.href.startsWith('http://') ||
    action.href.startsWith('https://') ||
    action.href.startsWith('//');

  if (isExternalLink) {
    return (
      <a
        href={action.href}
        target={target}
        rel={rel}
      >
        {button}
      </a>
    );
  }

  return (
    <LocalizedClientLink
      href={action.href}
      target={target}
      rel={rel}
    >
      {button}
    </LocalizedClientLink>
  );
}

export function Hero({ bannerContent }: HeroProps) {
  const buttons = bannerContent?.buttons?.filter(isBannerAction).slice(0, 2) ?? [];
  const secondaryBanners: SecondaryBannerCard[] =
    bannerContent?.secondaryBanners
      ?.filter(hasSecondaryBannerContent)
      .slice(0, 2)
      .map((banner) => ({
        description: banner.description,
        imageUrl: banner.image?.asset?.url ?? null,
        showPoweredBy: banner.showPoweredBy,
        title: banner.title,
        button: isBannerAction(banner.button) ? banner.button : null,
      })) ?? [];
  const title = bannerContent?.title;
  const eyebrow = bannerContent?.eyebrow;
  const description = bannerContent?.description;
  const showPoweredBy = bannerContent?.showPoweredBy;
  const imageUrl = bannerContent?.image?.asset?.url;
  const hasMainContent = Boolean(
    imageUrl || eyebrow || title || description || showPoweredBy || buttons.length
  );
  const hasSecondaryContent = secondaryBanners.length > 0;

  if (!hasMainContent && !hasSecondaryContent) {
    return null;
  }

  return (
    <section className="border-ui-border-base border-b">
      {hasMainContent && (
        <div className="bg-ui-bg-subtle relative isolate overflow-hidden">
          {imageUrl && (
            <Image
              src={imageUrl}
              alt=""
              aria-hidden="true"
              priority
              fetchPriority="high"
              className="absolute inset-0 h-full w-full object-cover"
              quality={MAIN_BANNER_IMAGE_QUALITY}
              sizes={MAIN_BANNER_IMAGE_SIZES}
              fill
            />
          )}

          <div className="content-container relative flex min-h-[420px] flex-col justify-between py-10 md:min-h-[540px] md:py-14">
            <div className="w-full max-w-2xl pt-8 text-left md:pt-14">
              {eyebrow && (
                <p className="text-ui-fg-muted text-xs font-medium uppercase tracking-[0.3em] [text-shadow:0_1px_10px_rgba(255,255,255,0.45)]">
                  {eyebrow}
                </p>
              )}
              {(title || description) && (
                <div className="mt-4 flex flex-col gap-3">
                  {title && (
                    <Heading
                      level="h1"
                      className="text-ui-fg-base text-4xl leading-tight font-normal [text-shadow:0_1px_14px_rgba(255,255,255,0.4)] md:text-5xl"
                    >
                      {title}
                    </Heading>
                  )}
                  {description && (
                    <p className="text-ui-fg-subtle max-w-xl text-base leading-7 [text-shadow:0_1px_10px_rgba(255,255,255,0.38)]">
                      {description}
                    </p>
                  )}
                </div>
              )}
              {buttons.length > 0 && (
                <div className="mt-6 flex flex-wrap gap-3">
                  {buttons.map((button, index) => (
                    <BannerButton
                      key={`${button.label}-${button.href}-${index}`}
                      action={button}
                      variant="primary"
                    />
                  ))}
                </div>
              )}
            </div>

            {showPoweredBy && (
              <div className="mt-8 w-full">
                <PoweredBySanity className="text-ui-fg-subtle w-fit text-left text-[11px] [text-shadow:0_1px_10px_rgba(255,255,255,0.45)]" />
              </div>
            )}
          </div>
        </div>
      )}

      {hasSecondaryContent && (
        <div className="content-container py-6 md:py-8">
          <div className="grid gap-4 md:grid-cols-2">
            {secondaryBanners.map((banner, index) => (
              <article
                key={`${banner.title || 'secondary-banner'}-${index}`}
                className="bg-ui-bg-subtle border-ui-border-base relative isolate flex h-full min-h-[220px] flex-col justify-end overflow-hidden rounded-2xl border p-5 sm:min-h-[240px] sm:p-6 md:min-h-[clamp(240px,calc((100vw-4rem)*9/32),387px)] lg:p-8"
              >
                {banner.imageUrl && (
                  <Image
                    src={banner.imageUrl}
                    alt=""
                    aria-hidden="true"
                    className="absolute inset-0 h-full w-full object-cover"
                    quality={SECONDARY_BANNER_IMAGE_QUALITY}
                    sizes={SECONDARY_BANNER_IMAGE_SIZES}
                    fill
                  />
                )}

                <div
                  className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/24 to-black/12"
                  aria-hidden="true"
                />

                <div className="relative flex flex-col items-start gap-2.5 sm:gap-3">
                  {banner.title && (
                    <Heading
                      level="h2"
                      className="text-ui-fg-on-color text-xl leading-tight font-normal [text-shadow:0_2px_18px_rgba(0,0,0,0.45)] sm:text-2xl md:text-3xl"
                    >
                      {banner.title}
                    </Heading>
                  )}
                  {banner.description && (
                    <p className="text-ui-fg-on-color/90 max-w-xl text-sm leading-6 [text-shadow:0_2px_14px_rgba(0,0,0,0.42)] sm:text-base sm:leading-7">
                      {banner.description}
                    </p>
                  )}
                  {(banner.button || banner.showPoweredBy) && (
                    <div className="mt-2 flex w-full flex-wrap items-end justify-between gap-3 sm:mt-3 sm:gap-4">
                      <div>
                        {banner.button && (
                          <BannerButton
                            action={banner.button}
                            variant="secondary"
                          />
                        )}
                      </div>
                      {banner.showPoweredBy && (
                        <PoweredBySanity className="text-ui-fg-on-color/75 ml-auto text-right text-[10px] [text-shadow:0_2px_14px_rgba(0,0,0,0.42)] md:text-[11px]" />
                      )}
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
