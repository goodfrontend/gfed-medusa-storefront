'use client';

import {
  AnchorHTMLAttributes,
  DetailedHTMLProps,
  useEffect,
  useState,
} from 'react';

const LOCALE_REGEX = /^[a-z]{2}(?:-[A-Z]{2})?$/;

type LocalizedClientLinkProps = DetailedHTMLProps<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  HTMLAnchorElement
> & {
  locale?: string;
};

const LocalizedClientLink = ({
  children,
  href,
  locale,
  ...props
}: LocalizedClientLinkProps) => {
  const [pathname, setPathname] = useState('');

  useEffect(() => {
    setPathname(window.location.pathname);
  }, []);

  const getLocaleFromPathname = (pathname: string): string => {
    const pathLocale = pathname.split('/')[1];
    if (pathLocale && LOCALE_REGEX.test(pathLocale)) {
      return pathLocale;
    }
    return 'dk';
  };

  const activeLocale = locale || getLocaleFromPathname(pathname);

  const normalizeHref = (href?: string) => {
    if (!href) return '';
    return href.startsWith('/') ? href : `/${href}`;
  };

  if (href?.startsWith('http') || href?.startsWith('//')) {
    return (
      <a href={href} {...props}>
        {children}
      </a>
    );
  }

  return (
    <a
      href={`/${activeLocale}${normalizeHref(href)}`}
      suppressHydrationWarning
      {...props}
    >
      {children}
    </a>
  );
};

export { LocalizedClientLink };
