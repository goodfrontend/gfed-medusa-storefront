import { RatingCount } from '@gfed-medusa/sf-lib-ui/components/rating-count';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'UI/Components/RatingCount',
  component: RatingCount,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  args: {
    average: 4.4,
    ratingCount: 1867,
    starColor: '#EDC001',
    display: 'compact',
    iconSize: 'md',
    textSize: 'sm',
  },
  argTypes: {
    display: {
      control: 'select',
      options: ['minimal', 'compact', 'detailed'],
    },
    iconSize: {
      control: 'select',
      options: ['default', 'md', 'lg', 'xl'],
    },
    textSize: {
      control: 'select',
      options: ['default', 'sm', 'md'],
    },
  },
} satisfies Meta<typeof RatingCount>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div className="space-y-4">
      <RatingCount {...args} />
    </div>
  ),
};

export const Minimal: Story = {
  args: {
    display: 'minimal',
    iconSize: 'lg',
    textSize: 'md',
  },
};

export const Detailed: Story = {
  args: {
    display: 'detailed',
  },
};

export const IconSizes: Story = {
  args: {
    display: 'compact',
    ratingCount: 1234,
  },
  render: (args) => (
    <div className="space-y-3">
      {['default', 'md', 'lg', 'xl'].map((size) => (
        <div className="flex items-center gap-2" key={size}>
          <span className="w-16 text-sm text-gray-700">icon {size}</span>
          <RatingCount {...args} iconSize={size as typeof args.iconSize} />
        </div>
      ))}
    </div>
  ),
};

export const TextSizes: Story = {
  args: {
    display: 'compact',
    ratingCount: 5678,
  },
  render: (args) => (
    <div className="space-y-3">
      {['default', 'sm', 'md'].map((size) => (
        <div className="flex items-center gap-2" key={size}>
          <span className="w-16 text-sm text-gray-700">text {size}</span>
          <RatingCount {...args} textSize={size as typeof args.textSize} />
        </div>
      ))}
    </div>
  ),
};
