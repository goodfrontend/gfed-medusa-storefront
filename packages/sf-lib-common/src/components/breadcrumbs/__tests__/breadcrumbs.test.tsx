import { render } from '@testing-library/react';

import { Breadcrumbs } from '..';

jest.mock('next/navigation', () => ({
  usePathname: jest.fn().mockReturnValue('/products/shirts/casual-shirts'),
}));

describe('Breadcrumbs Component', () => {
  it('renders the correct number of breadcrumb items', () => {
    const element = render(<Breadcrumbs />);

    expect(element.getAllByRole('link')).toHaveLength(4);
  });
});
