'use client';

import { useEffect, useState } from 'react';

interface UrgencyBannerProps {
  headline?: string;
  deadline?: string;
  message?: string;
}

function Countdown({ deadline }: { deadline: string }) {
  const [display, setDisplay] = useState('');

  useEffect(() => {
    const target = new Date(deadline).getTime();

    function tick() {
      const diff = target - Date.now();
      if (diff <= 0) {
        setDisplay('Offer ended');
        return;
      }
      const hours = Math.floor(diff / 3_600_000);
      const minutes = Math.floor((diff % 3_600_000) / 60_000);
      const seconds = Math.floor((diff % 60_000) / 1000);

      if (hours > 48) {
        const days = Math.floor(hours / 24);
        setDisplay(`${days}d ${hours % 24}h remaining`);
      } else {
        setDisplay(`${hours}h ${minutes}m ${seconds}s remaining`);
      }
    }

    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [deadline]);

  return <span className="font-mono font-bold">{display}</span>;
}

export function UrgencyBanner({ headline, deadline, message }: UrgencyBannerProps) {
  if (!headline && !message && !deadline) return null;

  return (
    <section
      className="border-ui-border-base border-b bg-gradient-to-r from-amber-50 to-amber-100 py-3 dark:from-amber-950/30 dark:to-amber-900/20"
      role="alert"
      aria-live="polite"
    >
      <div className="content-container flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-center">
        {headline && (
          <p className="text-ui-fg-base text-sm font-medium">{headline}</p>
        )}
        {deadline && (
          <p className="text-ui-fg-base text-sm">
            <Countdown deadline={deadline} />
          </p>
        )}
        {message && (
          <p className="text-ui-fg-subtle w-full text-xs">{message}</p>
        )}
      </div>
    </section>
  );
}
