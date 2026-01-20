import type { ComponentType, FC } from 'react';

import { Back } from '@gfed-medusa/sf-lib-ui/icons/back';
import { Bancontact } from '@gfed-medusa/sf-lib-ui/icons/bancontact';
import { ChevronDown } from '@gfed-medusa/sf-lib-ui/icons/chevron-down';
import { Eye } from '@gfed-medusa/sf-lib-ui/icons/eye';
import { EyeOff } from '@gfed-medusa/sf-lib-ui/icons/eye-off';
import { FastDelivery } from '@gfed-medusa/sf-lib-ui/icons/fast-delivery';
import { Ideal } from '@gfed-medusa/sf-lib-ui/icons/ideal';
import { MapPin } from '@gfed-medusa/sf-lib-ui/icons/map-pin';
import { Medusa } from '@gfed-medusa/sf-lib-ui/icons/medusa';
import { NextJs } from '@gfed-medusa/sf-lib-ui/icons/nextjs';
import { Package } from '@gfed-medusa/sf-lib-ui/icons/package';
import { PayPal } from '@gfed-medusa/sf-lib-ui/icons/paypal';
import { PlaceholderImage } from '@gfed-medusa/sf-lib-ui/icons/placeholder-image';
import { Refresh } from '@gfed-medusa/sf-lib-ui/icons/refresh';
import { Spinner } from '@gfed-medusa/sf-lib-ui/icons/spinner';
import { Trash } from '@gfed-medusa/sf-lib-ui/icons/trash';
import { User } from '@gfed-medusa/sf-lib-ui/icons/user';
import { X } from '@gfed-medusa/sf-lib-ui/icons/x';
import type { IconProps } from '@gfed-medusa/sf-lib-ui/types/icon';
import type { Meta, StoryObj } from '@storybook/react-vite';

type IconExample = {
  name: string;
  slug: string;
  Icon: ComponentType<IconProps>;
};

// PayPal icon does not accept props in the library, so wrap it to align with IconProps for the story.
const PayPalIcon: FC<IconProps> = () => <PayPal />;

const ICONS: IconExample[] = [
  { name: 'Back', slug: 'back', Icon: Back },
  { name: 'Bancontact', slug: 'bancontact', Icon: Bancontact },
  { name: 'Chevron Down', slug: 'chevron-down', Icon: ChevronDown },
  { name: 'Eye', slug: 'eye', Icon: Eye },
  { name: 'Eye Off', slug: 'eye-off', Icon: EyeOff },
  { name: 'Fast Delivery', slug: 'fast-delivery', Icon: FastDelivery },
  { name: 'Ideal', slug: 'ideal', Icon: Ideal },
  { name: 'Map Pin', slug: 'map-pin', Icon: MapPin },
  { name: 'Medusa', slug: 'medusa', Icon: Medusa },
  { name: 'Next.js', slug: 'nextjs', Icon: NextJs },
  { name: 'Package', slug: 'package', Icon: Package },
  { name: 'PayPal', slug: 'paypal', Icon: PayPalIcon },
  {
    name: 'Placeholder Image',
    slug: 'placeholder-image',
    Icon: PlaceholderImage,
  },
  { name: 'Refresh', slug: 'refresh', Icon: Refresh },
  { name: 'Spinner', slug: 'spinner', Icon: Spinner },
  { name: 'Trash', slug: 'trash', Icon: Trash },
  { name: 'User', slug: 'user', Icon: User },
  { name: 'X', slug: 'x', Icon: X },
];

const meta = {
  title: 'UI/Icons',
  component: Back,
  tags: ['autodocs'],
  args: {
    color: '#111827',
  },
  argTypes: {
    color: { control: 'color' },
  },
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Back>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Gallery: Story = {
  render: (args) => (
    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
      {ICONS.map(({ name, slug, Icon }) => (
        <div
          key={name}
          className="flex items-center gap-3 rounded-lg border border-gray-200 bg-white p-4"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-md bg-gray-50 text-gray-900">
            <Icon {...args} className="h-6 w-6" />
          </div>
          <div className="space-y-1">
            <div className="text-sm font-medium text-gray-900">{name}</div>
            <div className="text-xs text-gray-500">
              @gfed-medusa/sf-lib-ui/icons/{slug}
            </div>
          </div>
        </div>
      ))}
    </div>
  ),
  parameters: {
    controls: { exclude: ['className'] },
  },
};
