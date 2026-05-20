'use client';

import { getImageKitUrl } from '../../../lib/utils/imagekit';

interface BadgeIcon {
  asset?: { url?: string };
  url?: string;
}

interface BadgeItem {
  label: string;
  icon?: BadgeIcon | string;
}

interface TrustBarProps {
  badges?: BadgeItem[];
  message?: string;
}

function getIconUrl(icon?: BadgeIcon | string): string | undefined {
  if (!icon) return undefined;
  if (typeof icon === 'string') return icon;
  return icon.asset?.url ?? icon.url;
}

export function TrustBar({ badges, message }: TrustBarProps) {
  if (!badges || badges.length === 0) return null;

  return (
    <section className="border-ui-border-base border-b bg-ui-bg-subtle py-4">
      <div className="content-container flex flex-wrap items-center justify-center gap-x-8 gap-y-2">
        {message && <p className="text-ui-fg-subtle text-sm">{message}</p>}
        {badges.map((badge, idx) => {
          const iconUrl = getIconUrl(badge.icon);
          return (
            <span
              key={`${badge.label}-${idx}`}
              className="text-ui-fg-muted inline-flex items-center gap-x-1.5 text-xs font-medium uppercase tracking-wide"
            >
              {iconUrl && (
                <img
                  src={getImageKitUrl(iconUrl, { width: 20, height: 20 })}
                  alt=""
                  aria-hidden="true"
                  width={20}
                  height={20}
                  className="h-5 w-5 object-contain"
                />
              )}
              {badge.label}
            </span>
          );
        })}
      </div>
    </section>
  );
}