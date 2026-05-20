'use client';

interface ReviewCarouselProps {
  reviewIds?: string[];
}

export function ReviewCarousel({}: ReviewCarouselProps) {
  return (
    <section className="border-ui-border-base border-b py-8">
      <div className="content-container">
        <h2 className="text-ui-fg-base text-2xl font-normal mb-4">What Our Customers Say</h2>
        <p className="text-ui-fg-subtle text-sm">Real reviews from verified buyers</p>
      </div>
    </section>
  );
}
