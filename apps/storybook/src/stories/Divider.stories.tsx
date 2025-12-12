import { Divider } from '@gfed-medusa/sf-lib-ui/components/divider';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'UI/Components/Divider',
  component: Divider,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  args: {
    className: 'w-64',
  },
} satisfies Meta<typeof Divider>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div className="w-64 space-y-3 text-sm text-gray-700">
      <div>Section above</div>
      <Divider {...args} />
      <div>Section below</div>
    </div>
  ),
};
