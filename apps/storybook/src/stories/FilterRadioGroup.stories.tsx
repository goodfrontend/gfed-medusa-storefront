import { type ComponentProps, useEffect, useState } from 'react';

import { FilterRadioGroup } from '@gfed-medusa/sf-lib-ui/components/filter-radio-group';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'UI/Components/FilterRadioGroup',
  component: FilterRadioGroup,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  args: {
    title: 'Availability',
    items: [
      { value: 'all', label: 'All items' },
      { value: 'in-stock', label: 'In stock' },
      { value: 'backorder', label: 'Backorder' },
    ],
    value: 'all',
    handleChange: () => {},
  },
  argTypes: {
    handleChange: { action: 'changed' },
  },
} satisfies Meta<typeof FilterRadioGroup>;

export default meta;

type Story = StoryObj<typeof meta>;

const FilterRadioGroupStory = (
  args: ComponentProps<typeof FilterRadioGroup>
) => {
  const [value, setValue] = useState<string>(
    (args.value as string) ?? args.items?.[0]?.value ?? ''
  );

  useEffect(() => {
    if (typeof args.value === 'string') {
      setValue(args.value);
    }
  }, [args.value]);

  return (
    <FilterRadioGroup
      {...args}
      value={value}
      handleChange={(val: string) => {
        setValue(val);
        args.handleChange?.(val);
      }}
    />
  );
};

export const Default: Story = {
  render: (args) => <FilterRadioGroupStory {...args} />,
};
