'use client';

import { forwardRef } from 'react';

import { type VariantProps, cva } from 'class-variance-authority';
import { Loader2 } from 'lucide-react';

import { BaseInput } from '@/components/input/base-input';
import { cn } from '@/lib/utils';

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
  'absolute left-3 top-0 z-10 flex items-center bg-background px-1 text-xs text-muted-foreground transition-all duration-200 cursor-text select-none truncate -translate-y-1/2 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:-translate-y-1/2 peer-focus:text-xs',
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
const Input = forwardRef<HTMLInputElement, InputProps>(
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
              hasValue && 'top-0 -translate-y-1/2 text-xs',
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

export { Input, BaseInput };
