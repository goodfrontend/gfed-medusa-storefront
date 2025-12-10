import { useEffect, useState, type ComponentProps } from 'react';

import { Input } from '@gfed-medusa/sf-lib-ui/components/input';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'UI/Components/Input',
  component: Input,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  args: {
    id: 'email',
    label: 'Email address',
    type: 'email',
    value: 'jane@example.com',
    variant: 'default',
    isLoading: false,
    disabled: false,
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'error'],
    },
  },
} satisfies Meta<typeof Input>;

export default meta;

type Story = StoryObj<typeof meta>;

const InputStory = (args: ComponentProps<typeof Input>) => {
  const [value, setValue] = useState(args.value ?? '');

  useEffect(() => {
    if (typeof args.value === 'string') {
      setValue(args.value);
    }
  }, [args.value]);

  return (
    <div className="w-80">
      <Input
        {...args}
        value={value}
        onChange={(event) => setValue(event.target.value)}
      />
    </div>
  );
};

export const Default: Story = {
  render: (args) => <InputStory {...args} />,
};

export const ErrorState: Story = {
  args: {
    variant: 'error',
    value: '',
  },
  render: (args) => <InputStory {...args} />,
};
