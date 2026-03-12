import { render } from '@testing-library/react';

import { FilterRadioGroup } from '..';

describe('FilterRadioGroup component', () => {
  const items = [
    { value: 'created_at', label: 'Latest Arrivals' },
    { value: 'price_asc', label: 'Price: Low -> High' },
    { value: 'price_desc', label: 'Price: High -> Low' },
  ];

  it('renders stable radio buttons without hydration-only inputs', () => {
    const { container, getAllByTestId, getByRole } = render(
      <FilterRadioGroup
        title="Sort by"
        items={items}
        value="created_at"
        handleChange={() => {}}
      />
    );

    const labels = getAllByTestId('radio-label');
    const rows = labels.map((label) => label.parentElement);
    const radios = Array.from(container.querySelectorAll('[role="radio"]'));
    const icons = Array.from(container.querySelectorAll('svg'));

    expect(getByRole('radiogroup')).toBeInTheDocument();
    expect(container.querySelectorAll('input[type="radio"]')).toHaveLength(0);

    rows.forEach((row) => {
      expect(row).toHaveStyle({
        display: 'flex',
        alignItems: 'center',
      });
      expect(row).toHaveStyle('margin-left: calc(-1rem - 0.5rem)');
    });

    expect(radios).toHaveLength(items.length);
    expect(radios[0]).toHaveAttribute('aria-checked', 'true');
    expect(radios[1]).toHaveAttribute('aria-checked', 'false');
    expect(radios[2]).toHaveAttribute('aria-checked', 'false');
    expect(icons).toHaveLength(items.length);
    expect(icons[0]).not.toHaveStyle({ visibility: 'hidden' });
    expect(icons[1]).toHaveStyle({ visibility: 'hidden' });
    expect(icons[2]).toHaveStyle({ visibility: 'hidden' });
  });
});
