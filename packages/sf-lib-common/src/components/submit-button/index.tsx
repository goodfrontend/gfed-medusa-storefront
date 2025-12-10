'use client';

import React from 'react';

import { useFormStatus } from 'react-dom';

import { Button } from '@medusajs/ui';

function SubmitButton({
  children,
  variant = 'primary',
  className,
  'data-testid': dataTestId,
  isLoading, // this prop is needed to override `pending` from useFormStatus due to the ff unresolved issue: https://github.com/facebook/react/issues/30368
}: {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'transparent' | 'danger' | null;
  className?: string;
  'data-testid'?: string;
  isLoading?: boolean;
}) {
  const { pending } = useFormStatus();

  return (
    <Button
      size="large"
      className={className}
      type="submit"
      isLoading={isLoading ?? pending}
      variant={variant || 'primary'}
      data-testid={dataTestId}
    >
      {children}
    </Button>
  );
}

export { SubmitButton };
