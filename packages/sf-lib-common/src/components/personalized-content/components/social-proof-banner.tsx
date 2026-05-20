'use client';

interface SocialProofBannerProps {
  message?: string;
  count?: number;
}

export function SocialProofBanner({ message, count }: SocialProofBannerProps) {
  return (
    <section className="border-ui-border-base border-b bg-ui-bg-subtle py-3">
      <div className="content-container text-center">
        <p className="text-ui-fg-subtle text-sm">
          {count ? `${count}+ people` : 'Shoppers'} {message ?? 'have purchased recently'}
        </p>
      </div>
    </section>
  );
}
