import { AnchorHTMLAttributes, DetailedHTMLProps } from 'react';

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
  return (
    <a href={`/dk${href}`} {...props}>
      {children}
    </a>
  );
};

export { LocalizedClientLink };
