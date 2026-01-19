import { AnchorHTMLAttributes, DetailedHTMLProps } from 'react';

const DEFAULT_LOCALE = 'dk';

const normalizeHref = (href?: string) => {
  if (!href) return '';

  return href.startsWith('/') ? href : `/${href}`;
};

type LinkProps = DetailedHTMLProps<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  HTMLAnchorElement
>;

/**
 * Use this component to create an anchor link that persists the current country code in the url,
 * without having to explicitly pass it as a prop. This component also accepts absolute URLs,
 * no country code added.
 */
const Link = ({ children, href, ...props }: LinkProps) => {
  const localeRegex = new RegExp('^[a-z]{2}(?:-[A-Z]{2})?$');
  const pathname = window.location.pathname;
  const locale = pathname.split('/')[0];
  const isLocale = localeRegex.test(locale);

  if (href?.startsWith('http'))
    return (
      <a href={href} {...props}>
        {children}
      </a>
    );

  if (isLocale)
    return (
      <a href={`/${locale}${normalizeHref(href)}`} {...props}>
        {children}
      </a>
    );

  // Return default locale: dk
  return (
    <a href={`/${DEFAULT_LOCALE}${normalizeHref(href)}`} {...props}>
      {children}
    </a>
  );
};

export { Link };
