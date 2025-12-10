import { useState } from 'react';

import { Radio } from '@gfed-medusa/sf-lib-ui/components/radio';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'UI/Components/Radio',
  component: Radio,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Radio>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [selected, setSelected] = useState<'standard' | 'express'>(
      'standard'
    );

    const options = [
      { value: 'standard', label: 'Standard shipping' },
      { value: 'express', label: 'Express shipping' },
    ];

    return (
      <div className="space-y-3">
        {options.map((option) => (
          <div
            key={option.value}
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => setSelected(option.value as typeof selected)}
          >
            <Radio checked={selected === option.value} />
            <span className="text-sm text-gray-800">{option.label}</span>
          </div>
        ))}
      </div>
    );
  },
};
