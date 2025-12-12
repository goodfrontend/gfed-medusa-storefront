import { type ComponentProps, useEffect, useState } from 'react';

import { MedusaInput } from '@gfed-medusa/sf-lib-ui/components/medusa-input';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'UI/Components/MedusaInput',
  component: MedusaInput,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  args: {
    label: 'Full name',
    name: 'fullName',
    type: 'text',
    value: 'Jane Doe',
    required: false,
  },
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'email', 'password'],
    },
  },
} satisfies Meta<typeof MedusaInput>;

export default meta;

type Story = StoryObj<typeof meta>;

const MedusaInputStory = (args: ComponentProps<typeof MedusaInput>) => {
  const [value, setValue] = useState(args.value ?? '');

  useEffect(() => {
    if (typeof args.value === 'string') {
      setValue(args.value);
    }
  }, [args.value]);

  return (
    <div className="w-96">
      <MedusaInput
        {...args}
        value={value}
        onChange={(event) => setValue(event.target.value)}
      />
    </div>
  );
};

export const Default: Story = {
  render: (args) => <MedusaInputStory {...args} />,
};

export const PasswordField: Story = {
  args: {
    label: 'Password',
    name: 'password',
    type: 'password',
    required: true,
    value: 'supersecret',
  },
  render: (args) => <MedusaInputStory {...args} />,
};
