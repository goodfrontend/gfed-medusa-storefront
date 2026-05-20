'use client';

interface CategoryGridProps {
  categories?: Array<{ title?: string; imageUrl?: string }>;
}

export function CategoryGrid({ categories }: CategoryGridProps) {
  if (!categories || categories.length === 0) return null;

  return (
    <section className="border-ui-border-base border-b py-8">
      <div className="content-container">
        <h2 className="text-ui-fg-base text-2xl font-normal mb-4">Shop by Category</h2>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {categories.map((cat) => (
            <div key={cat.title} className="bg-ui-bg-subtle border-ui-border-base rounded-lg border p-4 text-center">
              {cat.title && <span className="text-ui-fg-base text-sm font-medium">{cat.title}</span>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
