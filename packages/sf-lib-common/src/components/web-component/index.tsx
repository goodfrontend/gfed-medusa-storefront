import React from 'react';

type WebComponentProps<T extends string> = React.HTMLAttributes<HTMLElement> & {
  tag: T;
  children?: React.ReactNode;
  'data-props'?: string;
  slot?: string;
};

function WebComponentInner<T extends string>(
  {
    tag,
    children,
    'data-props': dataProps,
    slot,
    ...rest
  }: WebComponentProps<T>,
  ref: React.Ref<HTMLElement>
) {
  return React.createElement(
    tag,
    {
      ...rest,
      ref,
      'data-props': dataProps,
      suppressHydrationWarning: true,
      slot,
    },
    children
  );
}

export const WebComponent = React.forwardRef(WebComponentInner) as <
  T extends string,
>(
  props: WebComponentProps<T> & React.RefAttributes<HTMLElement>
) => React.ReactElement | null;
