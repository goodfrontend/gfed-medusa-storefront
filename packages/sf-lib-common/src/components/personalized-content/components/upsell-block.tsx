'use client';

interface UpsellBlockProps {
  title?: string;
  productIds?: string[];
  strategy?: string;
  message?: string;
}

export function UpsellBlock({ title, message, strategy }: UpsellBlockProps) {
  return (
    <section className="border-ui-border-base border-b py-8">
      <div className="content-container">
        {title && <h2 className="text-ui-fg-base text-2xl font-normal mb-2">{title}</h2>}
        {message && <p className="text-ui-fg-subtle text-sm mb-4">{message}</p>}
        {strategy && (
          <p className="text-ui-fg-muted text-xs">
            {strategy === 'frequently_bought_together' ? 'Frequently bought together' : 'You might also like'}
          </p>
        )}
      </div>
    </section>
  );
}
