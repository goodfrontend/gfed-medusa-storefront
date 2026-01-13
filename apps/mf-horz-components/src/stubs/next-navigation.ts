import { useState, useEffect, useMemo } from 'react';

const isBrowser = typeof window !== 'undefined';

export enum RedirectType {
  push = 'push',
  replace = 'replace',
}

export const redirect = (url: string, type?: RedirectType) => {
  if (isBrowser) {
    if (type === RedirectType.push) {
      window.history.pushState({}, '', url);
    } else {
      window.location.replace(url);
    }
  }
    throw Error("redirect error");
};

export const permanentRedirect = (url: string, type?: RedirectType) => {
  if (isBrowser) window.location.replace(url);
    throw Error("redirect error");
};

export const notFound = () => {
    throw Error("not foundd");
};

export const useRouter = () => useMemo(() => ({
  push: (href: string) => {
    if (!isBrowser) return;
    window.history.pushState({}, '', href);
    window.dispatchEvent(new PopStateEvent('popstate'));
  },
  replace: (href: string) => {
    if (!isBrowser) return;
    window.history.replaceState({}, '', href);
    window.dispatchEvent(new PopStateEvent('popstate'));
  },
  back: () => isBrowser && window.history.back(),
  forward: () => isBrowser && window.history.forward(),
  refresh: () => isBrowser && window.location.reload(),
  prefetch: () => undefined,
}), []);

export const usePathname = () => {
  const [p, setP] = useState(isBrowser ? window.location.pathname : '/');
  
  useEffect(() => {
    if (!isBrowser) return;
    const cb = () => setP(window.location.pathname);
    window.addEventListener('popstate', cb);
    return () => window.removeEventListener('popstate', cb);
  }, []);
  
  return p;
};

export const useSearchParams = () => {
  const [s, setS] = useState(() => 
    isBrowser ? new URLSearchParams(window.location.search) : new URLSearchParams()
  );

  useEffect(() => {
    if (!isBrowser) return;
    const cb = () => setS(new URLSearchParams(window.location.search));
    window.addEventListener('popstate', cb);
    return () => window.removeEventListener('popstate', cb);
  }, []);

  return s;
};

export const useParams = () => ({});
export const useSelectedLayoutSegment = () => null;
export const useSelectedLayoutSegments = () => [];

export default {
  redirect,
  permanentRedirect,
  notFound,
  useRouter,
  usePathname,
  useSearchParams,
  useParams,
};
