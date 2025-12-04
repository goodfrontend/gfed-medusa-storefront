'use client';

import { type VariantProps, cva } from 'class-variance-authority';

import { cn } from '@/lib';

const variantSelector = cva('flex gap-1', {
  variants: {
    type: {
      box: 'flex flex-wrap',
      color: 'flex flex-wrap',
    },
    size: {
      xs: 'text-[10px] gap-1',
      sm: 'text-xs gap-1.5',
      md: 'text-sm gap-2',
      lg: 'text-base gap-3',
    },
  },
  defaultVariants: {
    type: 'box',
    size: 'md',
  },
});

const variantOption = cva(
  'cursor-pointer border rounded-md flex items-center justify-center transition disabled:opacity-50 disabled:cursor-not-allowed',
  {
    variants: {
      type: {
        box: `
          hover:border-foreground 
          data-[selected=true]:border-foreground
        `,
        color: `
          rounded-full 
          hover:outline-1 hover:outline-foreground 
          data-[selected=true]:outline-foreground 
          data-[selected=true]:outline-2 outline-offset-1
        `,
      },
      size: {
        xs: 'px-1.5 py-0.5 text-[10px] min-w-[18px] min-h-[18px]',
        sm: 'px-2 py-1 text-xs min-w-[22px] min-h-[22px]',
        md: 'px-3 py-2 text-sm min-w-[28px] min-h-[28px]',
        lg: 'px-4 py-3 text-base min-w-[36px] min-h-[36px]',
      },
    },
    defaultVariants: {
      type: 'box',
      size: 'md',
    },
    compoundVariants: [
      { type: 'color', size: 'xs', className: 'w-4 h-4 p-0' },
      { type: 'color', size: 'sm', className: 'w-5 h-5 p-0' },
      { type: 'color', size: 'md', className: 'w-7 h-7 p-0' },
      { type: 'color', size: 'lg', className: 'w-9 h-9 p-0' },
    ],
  }
);

export interface VariantSelectorProps
  extends VariantProps<typeof variantSelector> {
  options: {
    value: string;
    label?: string;
    imageSrc?: string;
    color?: string;
    disabled?: boolean;
  }[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export function VariantSelector({
  options,
  value,
  onChange,
  type,
  size,
  className,
}: VariantSelectorProps) {
  return (
    <div className={cn(variantSelector({ type, size }), className)}>
      {options.map((option) => {
        const isSelected = option.value === value;

        return (
          <button
            key={option.value}
            type="button"
            onClick={() => !option.disabled && onChange(option.value)}
            className={cn(
              variantOption({ type, size }),
              isSelected && 'data-[selected=true]'
            )}
            data-selected={isSelected}
            disabled={option.disabled}
            style={
              type === 'color' && option.color
                ? { backgroundColor: option.color }
                : undefined
            }
          >
            {type !== 'color' && option.imageSrc && (
              <img
                src={option.imageSrc}
                alt={option.label}
                className="h-4 w-4 rounded object-cover md:h-6 md:w-6"
              />
            )}

            {type !== 'color' && !option.imageSrc && option.label && (
              <span>{option.label}</span>
            )}
          </button>
        );
      })}
    </div>
  );
}
