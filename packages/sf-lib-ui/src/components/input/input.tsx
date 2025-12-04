'use client';

import { forwardRef } from 'react';

import { type VariantProps, cva } from 'class-variance-authority';
import { Loader2 } from 'lucide-react';

import { BaseInput } from '@/components/input/base-input';
import { cn } from '@/lib';

const inputContainerVariants = cva(
  'relative flex flex-col-reverse w-full group/input',
  {
    variants: {
      variant: {
        default: '',
        error: '',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

const labelVariants = cva(
  'text-muted-foreground absolute transition-all duration-200 cursor-text select-none truncate text-sm peer-placeholder-shown:text-base peer-focus:text-sm px-1',
  {
    variants: {
      variant: {
        default: 'peer-focus:text-foreground',
        error:
          'text-destructive peer-placeholder-shown:text-destructive peer-focus:text-destructive',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputContainerVariants> {
  label: string;
  isLoading?: boolean;
  height?: string;
  containerClassName?: string;
  labelClassName?: string;
}

/* eslint-disable react/display-name */
export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      isLoading,
      height = 'h-14',
      className,
      containerClassName,
      labelClassName,
      variant,
      disabled,
      id,
      ...props
    },
    ref
  ) => {
    const hasValue = props.value != null && props.value !== '';
    const hasError = variant === 'error';

    return (
      <div
        className={cn(inputContainerVariants({ variant }), containerClassName)}
      >
        <div className="relative">
          {isLoading && (
            <div className="absolute top-1/2 right-3 -translate-y-1/2">
              <Loader2 className="text-muted-foreground h-4 w-4 animate-spin" />
            </div>
          )}
          <BaseInput
            {...props}
            ref={ref}
            id={id}
            data-testid={id}
            disabled={disabled || isLoading}
            placeholder=" " // Required for floating label behavior
            aria-invalid={hasError}
            className={cn(
              'peer',
              height,
              'px-4 pt-5 pb-2',
              hasError &&
                'border-destructive focus-visible:ring-destructive/50',
              isLoading && 'pr-10',
              className
            )}
          />
          <label
            htmlFor={id}
            className={cn(
              labelVariants({ variant }),
              'top-2 left-3 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-focus:top-2 peer-focus:translate-y-0',
              hasValue && '-top-2 translate-y-0',
              labelClassName
            )}
          >
            {label}
          </label>
        </div>
      </div>
    );
  }
);
