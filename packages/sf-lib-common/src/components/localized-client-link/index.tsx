'use client';

import { AnchorHTMLAttributes, DetailedHTMLProps } from 'react';

import { useParams } from 'next/navigation';

type LocalizedClientLinkProps = DetailedHTMLProps<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  HTMLAnchorElement
>;

/**
 * Use this component to create an anchor link that persists the current country code in the url,
 * without having to explicitly pass it as a prop.
 */
const LocalizedClientLink = ({
  children,
  href,
  ...props
}: LocalizedClientLinkProps) => {
  const { countryCode } = useParams();

  return (
    <a href={`/${countryCode}${href}`} {...props}>
      {children}
    </a>
  );
};

export { LocalizedClientLink };
