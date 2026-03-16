import { LocalizedClientLink } from '@gfed-medusa/sf-lib-common/components/localized-client-link';
import { HomeBannerContent } from '@gfed-medusa/sf-lib-common/types/cms';
import { Button, Heading } from '@medusajs/ui';

type BannerAction = {
  href: string;
  label: string;
  openInNewTab?: boolean | null;
};

type HeroProps = {
  bannerContent?: HomeBannerContent | null;
};

type BannerActionLike = {
  href?: string | null;
  label?: string | null;
  openInNewTab?: boolean | null;
};

function isBannerAction(
  button: BannerActionLike | null | undefined
): button is BannerAction {
  return Boolean(button?.label && button.href);
}

function BannerButton({ action }: { action: BannerAction }) {
  const button = <Button variant="primary">{action.label}</Button>;
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
  const title = bannerContent?.title;
  const eyebrow = bannerContent?.eyebrow;
  const description = bannerContent?.description;
  const footerNote = bannerContent?.footerNote;
  const imageUrl = bannerContent?.image?.asset?.url;
  const hasContent = Boolean(
    imageUrl || eyebrow || title || description || footerNote || buttons.length
  );

  if (!hasContent) {
    return null;
  }

  return (
    <section className="border-ui-border-base border-b">
      <div className="bg-ui-bg-subtle relative isolate overflow-hidden">
        {imageUrl && (
          <img
            src={imageUrl}
            alt=""
            aria-hidden="true"
            loading="eager"
            fetchPriority="high"
            className="absolute inset-0 h-full w-full object-cover"
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
                  />
                ))}
              </div>
            )}
          </div>

          {footerNote && (
            <div className="w-full max-w-2xl pt-8 text-left">
              <p className="text-ui-fg-subtle text-sm [text-shadow:0_1px_10px_rgba(255,255,255,0.45)]">
                {footerNote}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
