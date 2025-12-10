import React from 'react';

import { Label, clx } from '@medusajs/ui';
import { Check } from 'lucide-react';

type CheckboxProps = {
  checked?: boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  label: string;
  name?: string;
  'data-testid'?: string;
};

const CheckboxWithLabel: React.FC<CheckboxProps> = ({
  checked = true,
  onChange,
  label,
  name,
  'data-testid': dataTestId,
}) => {
  const generatedId = React.useId();
  const inputId = name || generatedId;

  return (
    <label
      htmlFor={inputId}
      className="flex cursor-pointer items-center gap-x-2"
    >
      <input
        id={inputId}
        name={name}
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="peer sr-only"
        data-testid={dataTestId}
      />
      <span
        aria-hidden
        className={clx(
          'flex h-5 w-5 items-center justify-center rounded transition-all',
          'border border-ui-border-base bg-ui-bg-base shadow-borders-base',
          'peer-focus-visible:shadow-borders-interactive-with-focus',
          checked &&
            'border-ui-border-strong bg-ui-bg-interactive text-ui-bg-base shadow-borders-interactive'
        )}
      >
        <Check
          className={clx(
            'h-3 w-3 text-ui-bg-base transition-opacity',
            checked ? 'opacity-100' : 'opacity-0'
          )}
          strokeWidth={2.5}
        />
      </span>
      <Label htmlFor={inputId} className="!txt-medium !transform-none" size="large">
        {label}
      </Label>
    </label>
  );
};

export { CheckboxWithLabel };
