'use client';

import { useState } from 'react';

import { VariantProps, cva } from 'class-variance-authority';
import { Minus, Plus } from 'lucide-react';

import { Button } from '@/components/button';
import { BaseInput } from '@/components/input/base-input';
import { cn } from '@/lib/utils';

type QuantitySelectorProps = VariantProps<typeof quantitySelectorVariants> &
  VariantProps<typeof buttonVariants> &
  VariantProps<typeof inputVariants> & {
    min?: number;
    max?: number;
    step?: number;
    buttonVariant?: React.ComponentProps<typeof Button>['variant'];
    className?: string;
    inputClassName?: string;
    buttonClassName?: string;
    value?: number;
    defaultValue?: number;
    onChange?: (val: number) => void;
  };

const buttonVariants = cva(['cursor-pointer', 'rounded-none'], {
  variants: {
    controlVariant: {},
  },
});

const quantitySelectorVariants = cva(['flex', 'items-center'], {
  variants: {
    variant: {
      default: {},
    },
    size: {},
  },
});

const inputVariants = cva(
  ['rounded-none', 'min-w-11', 'max-w-15', 'text-center'],
  {
    variants: {
      inputVariant: {},
    },
  }
);

function QuantitySelector({
  size,
  variant,
  controlVariant,
  inputVariant,
  min = 1,
  max = 100,
  step = 1,
  className,
  buttonClassName,
  buttonVariant,
  inputClassName,
  value,
  defaultValue = 1,
  onChange,
}: QuantitySelectorProps) {
  const [internalValue, setInternalValue] = useState<number>(defaultValue);
  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : internalValue;
  const clamp = (val: number) => Math.min(Math.max(val, min), max);

  const updateValue = (newVal: number) => {
    const clamped = clamp(newVal);
    if (!isControlled) setInternalValue(clamped);
    onChange?.(clamped);
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const parsed = parseInt(e.target.value, 10);
    if (isNaN(parsed)) {
      updateValue(min);
      return;
    }
    updateValue(parsed);
  };

  const decreaseValue = () => updateValue(currentValue - step);
  const increaseValue = () => updateValue(currentValue + step);

  return (
    <div className={cn(quantitySelectorVariants({ variant, size }), className)}>
      <Button
        data-testid="decrement-button"
        variant={buttonVariant ?? 'default'}
        type="button"
        className={cn(buttonVariants({ controlVariant }), buttonClassName)}
        disabled={currentValue <= min}
        aria-label="Decrease quantity"
        onClick={decreaseValue}
      >
        <Minus />
      </Button>
      <BaseInput
        data-testid="quantity-input"
        className={cn(inputVariants({ inputVariant }), inputClassName)}
        type="text"
        inputMode="numeric"
        value={currentValue}
        onChange={handleOnChange}
        onBlur={() => updateValue(currentValue)}
      />
      <Button
        data-testid="increment-button"
        variant={buttonVariant ?? 'default'}
        type="button"
        className={cn(buttonVariants({ controlVariant }), buttonClassName)}
        disabled={currentValue >= max}
        aria-label="Increase quantity"
        onClick={increaseValue}
      >
        <Plus />
      </Button>
    </div>
  );
}

export { QuantitySelector };
