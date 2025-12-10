import { type ComponentProps, useEffect, useState } from 'react';

import NativeSelect from '@gfed-medusa/sf-lib-ui/components/native-select';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'UI/Components/NativeSelect',
  component: NativeSelect,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  args: {
    placeholder: 'Select a size',
    defaultValue: '',
  },
} satisfies Meta<typeof NativeSelect>;

export default meta;

type Story = StoryObj<typeof meta>;

const NativeSelectStory = (args: ComponentProps<typeof NativeSelect>) => {
  const [value, setValue] = useState(args.defaultValue ?? '');

  useEffect(() => {
    if (typeof args.defaultValue === 'string') {
      setValue(args.defaultValue);
    }
  }, [args.defaultValue]);

  return (
    <div className="w-64">
      <NativeSelect
        {...args}
        value={value}
        onChange={(event) => {
          setValue(event.target.value);
          args.onChange?.(event);
        }}
      >
        <option value="xs">Extra Small</option>
        <option value="s">Small</option>
        <option value="m">Medium</option>
        <option value="l">Large</option>
        <option value="xl">Extra Large</option>
      </NativeSelect>
    </div>
  );
};

export const Default: Story = {
  render: (args) => <NativeSelectStory {...args} />,
};

export const Disabled: Story = {
  args: {
    placeholder: 'Choose an option',
    defaultValue: '',
    disabled: true,
  },
  render: (args) => <NativeSelectStory {...args} />,
};
