import { fireEvent, getByTestId, render } from '@testing-library/react';

import { QuantitySelector } from '../quantity-selector';

describe('Quantity-Selector component', () => {
  it('renders the correct default value', () => {
    const element = render(<QuantitySelector defaultValue={5} />);
    expect(element.getByTestId('quantity-input')).toHaveValue('5');
  });

  it('increments and decrements the quantity correctly', () => {
    const element = render(<QuantitySelector defaultValue={5} />);

    expect(element.getByTestId('quantity-input')).toHaveValue('5');

    fireEvent.click(getByTestId(element.container, 'increment-button'));
    expect(element.getByTestId('quantity-input')).toHaveValue('6');

    fireEvent.click(getByTestId(element.container, 'decrement-button'));
    fireEvent.click(getByTestId(element.container, 'decrement-button'));
    fireEvent.click(getByTestId(element.container, 'decrement-button'));
    expect(element.getByTestId('quantity-input')).toHaveValue('3');
  });

  it('disables the increment button when reaching the max value', () => {
    const element = render(<QuantitySelector defaultValue={99} max={100} />);

    fireEvent.click(getByTestId(element.container, 'increment-button'));
    expect(element.getByTestId('quantity-input')).toHaveValue('100');
    expect(getByTestId(element.container, 'increment-button')).toBeDisabled();
  });

  it('disables the decrement button when reaching the min value', () => {
    const element = render(<QuantitySelector defaultValue={2} max={1} />);

    fireEvent.click(getByTestId(element.container, 'decrement-button'));
    expect(element.getByTestId('quantity-input')).toHaveValue('1');
    expect(getByTestId(element.container, 'decrement-button')).toBeDisabled();
  });
});
