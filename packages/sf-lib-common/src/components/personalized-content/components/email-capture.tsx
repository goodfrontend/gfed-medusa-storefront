'use client';

import { type FormEvent, useState } from 'react';
import { Button, Text, Heading } from '@medusajs/ui';

interface EmailCaptureProps {
  incentive?: string;
  headline?: string;
  subheadline?: string;
  ctaLabel?: string;
}

export function EmailCapture({ incentive, headline, subheadline, ctaLabel = 'Subscribe' }: EmailCaptureProps) {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!email) return;
    // TODO: Wire up to actual email capture mutation
  };

  return (
    <section className="border-ui-border-base border-b bg-ui-bg-subtle py-12">
      <div className="content-container mx-auto max-w-md text-center">
        {headline && (
          <Heading level="h2" className="text-ui-fg-base mb-2 text-2xl font-normal">
            {headline}
          </Heading>
        )}
        {subheadline && (
          <Text className="text-ui-fg-subtle mb-4 text-sm">{subheadline}</Text>
        )}
        {incentive && (
          <Text size="xsmall" className="text-ui-fg-interactive mb-5 font-medium">
            {incentive}
          </Text>
        )}
        <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row sm:items-start">
          <div className="flex-1">
            <label htmlFor="email-capture-input" className="sr-only">
              Email address
            </label>
            <input
              id="email-capture-input"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="border-ui-border-base w-full rounded-full border px-4 py-2 text-sm"
              autoComplete="email"
            />
          </div>
          <Button type="submit" variant="primary" className="shrink-0">
            {ctaLabel}
          </Button>
        </form>
      </div>
    </section>
  );
}
