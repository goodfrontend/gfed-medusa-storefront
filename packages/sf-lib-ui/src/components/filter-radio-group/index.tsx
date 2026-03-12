import { type KeyboardEvent, useId } from 'react';

import { EllipseMiniSolid } from '@medusajs/icons';
import { Text, clx } from '@medusajs/ui';

type FilterRadioGroupProps = {
  title: string;
  items: {
    value: string;
    label: string;
  }[];
  value: any;
  handleChange: (...args: any[]) => void;
  'data-testid'?: string;
};

const FilterRadioGroup = ({
  title,
  items,
  value,
  handleChange,
  'data-testid': dataTestId,
}: FilterRadioGroupProps) => {
  const groupId = useId();
  const titleId = `${groupId}-title`;

  const handleKeyDown = (
    event: KeyboardEvent<HTMLButtonElement>,
    index: number
  ) => {
    const direction =
      event.key === 'ArrowDown' || event.key === 'ArrowRight'
        ? 1
        : event.key === 'ArrowUp' || event.key === 'ArrowLeft'
          ? -1
          : 0;

    if (!direction) {
      return;
    }

    event.preventDefault();

    const nextIndex = (index + direction + items.length) % items.length;
    const nextValue = items[nextIndex]?.value;

    if (!nextValue) {
      return;
    }

    handleChange(nextValue);

    requestAnimationFrame(() => {
      document.getElementById(`${groupId}-${nextValue}`)?.focus();
    });
  };

  return (
    <div
      className="flex flex-col gap-x-3 gap-y-3"
      style={{ display: 'flex', flexDirection: 'column', rowGap: '0.75rem' }}
    >
      <Text
        id={titleId}
        className="txt-compact-small-plus text-ui-fg-muted"
      >
        {title}
      </Text>
      <div
        role="radiogroup"
        aria-labelledby={titleId}
        data-testid={dataTestId}
        className="grid gap-2"
        style={{ display: 'grid', rowGap: '0.5rem' }}
      >
        {items?.map((i, index) => {
          const isSelected = i.value === value;

          return (
            <button
              key={i.value}
              id={`${groupId}-${i.value}`}
              type="button"
              role="radio"
              aria-checked={isSelected}
              tabIndex={isSelected ? 0 : -1}
              className="flex items-center gap-x-2 text-left outline-none hover:cursor-pointer"
              style={{
                display: 'flex',
                alignItems: 'center',
                columnGap: '0.5rem',
                border: 0,
                background: 'transparent',
                marginLeft: 'calc(-1rem - 0.5rem)',
                padding: 0,
                textAlign: 'left',
              }}
              onClick={() => handleChange(i.value)}
              onKeyDown={(event) => handleKeyDown(event, index)}
            >
              <span
                aria-hidden="true"
                className="flex h-4 w-4 shrink-0 items-center justify-center"
                style={{
                  display: 'flex',
                  width: '1rem',
                  height: '1rem',
                  flexShrink: 0,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <EllipseMiniSolid
                  className={clx('h-4 w-4', {
                    invisible: !isSelected,
                  })}
                  style={!isSelected ? { visibility: 'hidden' } : undefined}
                />
              </span>
              <span
                className={clx(
                  'txt-compact-small !transform-none hover:cursor-pointer',
                  {
                    'text-ui-fg-base': isSelected,
                    'text-ui-fg-subtle': !isSelected,
                  }
                )}
                data-testid="radio-label"
                data-active={isSelected}
              >
                {i.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export { FilterRadioGroup };
