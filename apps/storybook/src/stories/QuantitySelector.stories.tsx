import { useEffect, useState, type ComponentProps } from 'react';

import { QuantitySelector } from '@gfed-medusa/sf-lib-ui/components/quantity-selector';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'UI/Components/QuantitySelector',
  component: QuantitySelector,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  args: {
    min: 1,
    max: 10,
    step: 1,
    defaultValue: 2,
    buttonVariant: 'default',
  },
  argTypes: {
    onChange: { action: 'changed' },
    buttonVariant: {
      control: 'select',
      options: [
        'default',
        'secondary',
        'destructive',
        'outline',
        'ghost',
        'link',
      ],
    },
  },
} satisfies Meta<typeof QuantitySelector>;

export default meta;

type Story = StoryObj<typeof meta>;

const QuantitySelectorStory = (
  args: ComponentProps<typeof QuantitySelector>
) => {
  const [value, setValue] = useState<number>(
    (args.value as number | undefined) ?? (args.defaultValue as number) ?? 1
  );

  useEffect(() => {
    if (typeof args.value === 'number') {
      setValue(args.value);
    }
  }, [args.value]);

  useEffect(() => {
    if (args.value === undefined && typeof args.defaultValue === 'number') {
      setValue(args.defaultValue);
    }
  }, [args.defaultValue, args.value]);

  return (
    <QuantitySelector
      {...args}
      value={value}
      onChange={(val) => {
        setValue(val);
        args.onChange?.(val);
      }}
    />
  );
};

export const Default: Story = {
  render: (args) => <QuantitySelectorStory {...args} />,
};

export const WithLimits: Story = {
  args: {
    min: 0,
    max: 3,
    defaultValue: 1,
  },
  render: (args) => <QuantitySelectorStory {...args} />,
};
