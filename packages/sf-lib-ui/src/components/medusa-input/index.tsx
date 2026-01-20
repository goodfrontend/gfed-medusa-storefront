import React, { useEffect, useImperativeHandle, useState } from 'react';

import { Label } from '@medusajs/ui';

import { Eye } from '@/icons/eye';
import { EyeOff } from '@/icons/eye-off';

type InputProps = Omit<
  Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
  'placeholder'
> & {
  label: string;
  errors?: Record<string, unknown>;
  touched?: Record<string, unknown>;
  name: string;
  topLabel?: string;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ type, name, label, touched, required, topLabel, ...props }, ref) => {
    const inputRef = React.useRef<HTMLInputElement>(null);
    const [showPassword, setShowPassword] = useState(false);
    const [inputType, setInputType] = useState(type);

    useEffect(() => {
      if (type === 'password' && showPassword) {
        setInputType('text');
      }

      if (type === 'password' && !showPassword) {
        setInputType('password');
      }
    }, [type, showPassword]);

    useImperativeHandle(ref, () => inputRef.current!);

    return (
      <div className="flex w-full flex-col">
        {topLabel && (
          <Label className="txt-compact-medium-plus mb-2">{topLabel}</Label>
        )}
        <div className="txt-compact-medium relative z-0 flex w-full">
          <input
            type={inputType}
            id={name}
            name={name}
            placeholder=" "
            required={required}
            className="border-ui-border-base bg-ui-bg-field hover:bg-ui-bg-field-hover focus:shadow-borders-interactive-with-active peer mt-0 block h-11 w-full appearance-none rounded-md border px-4 pb-1 pt-4 placeholder-transparent focus:outline-none focus:ring-0"
            {...props}
            ref={inputRef}
          />
          <label
            htmlFor={name}
            onClick={() => inputRef.current?.focus()}
            className="origin-0 text-ui-fg-subtle bg-ui-bg-field peer-focus:text-ui-fg-base absolute left-3 top-0 z-10 flex -translate-y-1/2 cursor-text items-center px-1 text-xs transition-all duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:-translate-y-1/2 peer-focus:text-xs"
          >
            {label}
            {required && <span className="text-rose-500">*</span>}
          </label>
          {type === 'password' && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-ui-fg-subtle focus:text-ui-fg-base absolute right-0 top-3 px-4 outline-none transition-all duration-150 focus:outline-none"
            >
              {showPassword ? <Eye /> : <EyeOff />}
              <span className="sr-only">Toggle password visibility</span>
            </button>
          )}
        </div>
      </div>
    );
  }
);

Input.displayName = 'Input';

export { Input as MedusaInput };
