import { Button } from '@gfed-medusa/sf-lib-ui/components/button';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'UI/Components/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  args: {
    children: 'Button',
    variant: 'default',
    size: 'default',
  },
  argTypes: {
    onClick: { action: 'clicked' },
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary',
  },
};

export const Destructive: Story = {
  args: {
    variant: 'destructive',
    children: 'Delete',
  },
};

export const Outline: Story = {
  args: {
    variant: 'outline',
    children: 'Outline',
  },
};

export const Sizes: Story = {
  args: {
    children: 'Button',
  },
  render: (args) => (
    <div className="flex items-center gap-3">
      <Button {...args} size="sm">
        Small
      </Button>
      <Button {...args} size="default">
        Default
      </Button>
      <Button {...args} size="lg">
        Large
      </Button>
      <Button {...args} size="icon">
        Icon
      </Button>
    </div>
  ),
  parameters: {
    controls: { exclude: ['children', 'size'] },
  },
};
