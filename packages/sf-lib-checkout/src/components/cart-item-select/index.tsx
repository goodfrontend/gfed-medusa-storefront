'use client';

import {
  SelectHTMLAttributes,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';

import { ChevronDown } from '@gfed-medusa/sf-lib-ui/icons/chevron-down';
import { IconBadge, clx } from '@medusajs/ui';

type NativeSelectProps = {
  placeholder?: string;
  errors?: Record<string, unknown>;
  touched?: Record<string, unknown>;
} & Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size'>;

const CartItemSelect = forwardRef<HTMLSelectElement, NativeSelectProps>(
  ({ placeholder = 'Select...', className, children, ...props }, ref) => {
    const innerRef = useRef<HTMLSelectElement>(null);
    const [isPlaceholder, setIsPlaceholder] = useState(false);

    useImperativeHandle<HTMLSelectElement | null, HTMLSelectElement | null>(
      ref,
      () => innerRef.current
    );

    useEffect(() => {
      if (innerRef.current && innerRef.current.value === '') {
        setIsPlaceholder(true);
      } else {
        setIsPlaceholder(false);
      }
    }, [innerRef.current?.value]);

    return (
      <div>
        <IconBadge
          onFocus={() => innerRef.current?.focus()}
          onBlur={() => innerRef.current?.blur()}
          className={clx(
            'group txt-compact-small text-ui-fg-base relative flex items-center border',
            className,
            {
              'text-ui-fg-subtle': isPlaceholder,
            }
          )}
        >
          <select
            ref={innerRef}
            {...props}
            className="h-16 w-16 appearance-none items-center justify-center border-none bg-transparent px-4 transition-colors duration-150 outline-none focus:border-gray-700"
          >
            <option disabled value="">
              {placeholder}
            </option>
            {children}
          </select>
          <span className="pointer-events-none absolute flex w-8 justify-end group-hover:animate-pulse">
            <ChevronDown />
          </span>
        </IconBadge>
      </div>
    );
  }
);

CartItemSelect.displayName = 'CartItemSelect';

export default CartItemSelect;
