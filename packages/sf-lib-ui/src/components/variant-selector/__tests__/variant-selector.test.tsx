import { render } from '@testing-library/react';

import { VariantSelector } from '../variant-selector';

describe('VariantSelector component', () => {
  it('Displays correct number of items based on the provided options', () => {
    const element = render(
      <VariantSelector
        options={[
          { value: 'red', label: 'Red', color: '#ff0000' },
          { value: 'blue', label: 'Blue', color: '#0000ff' },
          { value: 'green', label: 'Green', color: '#00ff00' },
        ]}
        value="red"
        onChange={() => {}}
        type="color"
        size="md"
      />
    );

    expect(element.getAllByRole('button')).toHaveLength(3);
  });
});
