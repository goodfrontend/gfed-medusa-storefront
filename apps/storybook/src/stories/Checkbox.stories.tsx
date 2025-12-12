import {
  useEffect,
  useState,
  type ChangeEventHandler,
  type ComponentProps,
} from 'react';

import { CheckboxWithLabel } from '@gfed-medusa/sf-lib-ui/components/checkbox';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'UI/Components/Checkbox',
  component: CheckboxWithLabel,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  args: {
    label: 'Subscribe to product updates',
    checked: false,
    name: 'updates',
  },
  argTypes: {
    onChange: { action: 'toggled' },
  },
} satisfies Meta<typeof CheckboxWithLabel>;

export default meta;

type Story = StoryObj<typeof meta>;

const CheckboxStory = (args: ComponentProps<typeof CheckboxWithLabel>) => {
  const [checked, setChecked] = useState<boolean>(args.checked ?? false);

  useEffect(() => {
    setChecked(args.checked ?? false);
  }, [args.checked]);

  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const next = event.target.checked;
    setChecked(next);
    args.onChange?.(event);
  };

  return (
    <CheckboxWithLabel {...args} checked={checked} onChange={handleChange} />
  );
};

export const Default: Story = {
  render: (args) => <CheckboxStory {...args} />,
};

export const Prechecked: Story = {
  args: {
    label: 'Keep me signed in',
    checked: true,
    name: 'keep-signed-in',
  },
  render: (args) => <CheckboxStory {...args} />,
};
