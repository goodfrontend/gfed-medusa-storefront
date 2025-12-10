import { queryByTestId, render } from '@testing-library/react';

import { ProductCard } from '..';

const product = {
  id: '1',
  image: {
    src: '/assets/images/missing-img.webp',
    alt: 'sample image',
  },
  price: { current: '19.99', old: '29.99' },
  title: 'Sample Product',
  href: '/product/sample-product',
  localize: { currency: 'USD', locale: 'en-US' },
};

describe('ProductCard component', () => {
  it('Renders product card in default', () => {
    const element = render(
      <ProductCard
        variant="default"
        product={product}
        rating={{ average: 4.7, count: 1231 }}
      />
    );

    expect(element.queryByRole('button')).not.toBeInTheDocument();
    expect(element.getByRole('heading', { level: 3 })).toHaveTextContent(
      product.title
    );
  });

  it('Renders product card as add to card variant', () => {
    const element = render(
      <ProductCard
        variant="withAddToCart"
        product={product}
        rating={{ average: 4.7, count: 1231 }}
      />
    );

    expect(element.getByRole('button')).toBeInTheDocument();
    expect(element.getByRole('heading', { level: 3 })).toHaveTextContent(
      product.title
    );
  });

  it('Renders product card without rating', () => {
    const element = render(<ProductCard variant="default" product={product} />);

    expect(
      queryByTestId(element.container, 'product-card-rating')
    ).not.toBeInTheDocument();
  });
});
