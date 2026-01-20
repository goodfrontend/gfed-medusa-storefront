import { type ComponentProps, useEffect, useState } from 'react';

import { VariantSelector } from '@gfed-medusa/sf-lib-ui/components/variant-selector';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'UI/Components/VariantSelector',
  component: VariantSelector,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  args: {
    type: 'box',
    size: 'md',
    value: 'm',
    options: [
      { value: 's', label: 'S' },
      { value: 'm', label: 'M' },
      { value: 'l', label: 'L' },
      { value: 'xl', label: 'XL', disabled: true },
    ],
    onChange: () => {},
  },
  argTypes: {
    onChange: { action: 'changed' },
    type: {
      control: 'select',
      options: ['box', 'color'],
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg'],
    },
  },
} satisfies Meta<typeof VariantSelector>;

export default meta;

type Story = StoryObj<typeof meta>;

const VariantSelectorStory = (args: ComponentProps<typeof VariantSelector>) => {
  const [value, setValue] = useState<string>(
    args.value ?? args.options?.[0]?.value ?? ''
  );

  useEffect(() => {
    if (typeof args.value === 'string') {
      setValue(args.value);
    }
  }, [args.value]);

  return (
    <VariantSelector
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
  render: (args) => <VariantSelectorStory {...args} />,
};

export const ColorSwatches: Story = {
  args: {
    type: 'color',
    size: 'sm',
    value: 'forest',
    options: [
      { value: 'black', color: '#0B0B0B' },
      { value: 'sand', color: '#E6D5B8' },
      { value: 'forest', color: '#3C7A47' },
      { value: 'royal', color: '#1F3F80' },
      { value: 'storm', color: '#69747C', disabled: true },
    ],
    onChange: () => {},
  },
  render: (args) => <VariantSelectorStory {...args} />,
};

const AllSizesExample = () => {
  const [boxValue, setBoxValue] = useState('m');
  const [colorValue, setColorValue] = useState('forest');

  const sizeOptions = ['xs', 'sm', 'md', 'lg'] as const;

  const boxOptions = [
    { value: 's', label: 'S' },
    { value: 'm', label: 'M' },
    { value: 'l', label: 'L' },
  ];

  const colorOptions = [
    { value: 'forest', color: '#3C7A47' },
    { value: 'royal', color: '#1F3F80' },
    { value: 'sand', color: '#E6D5B8' },
  ];

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="text-sm font-medium text-gray-800">Box type</div>
        <div className="flex flex-col gap-3">
          {sizeOptions.map((size) => (
            <VariantSelector
              key={`box-${size}`}
              type="box"
              size={size}
              options={boxOptions}
              value={boxValue}
              onChange={setBoxValue}
            />
          ))}
        </div>
      </div>
      <div className="space-y-2">
        <div className="text-sm font-medium text-gray-800">Color type</div>
        <div className="flex flex-col gap-3">
          {sizeOptions.map((size) => (
            <VariantSelector
              key={`color-${size}`}
              type="color"
              size={size}
              options={colorOptions}
              value={colorValue}
              onChange={setColorValue}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export const AllSizes: Story = {
  render: () => <AllSizesExample />,
};
