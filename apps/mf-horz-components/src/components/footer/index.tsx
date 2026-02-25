import type { RichTextBlock } from '@gfed-medusa/sf-lib-common/types/cms';
import type {
  Collection,
  Footer as FooterType,
  ProductCategory,
} from '@gfed-medusa/sf-lib-common/types/graphql';
import { Text, clx } from '@medusajs/ui';

import { Link } from '../link';
import { PortableText } from './portable-text';

interface FooterProps {
  collections?: Collection[];
  productCategories?: ProductCategory[];
  footerContent?: FooterType | null;
}

function Footer({
  collections = [],
  productCategories = [],
  footerContent = null,
}: FooterProps) {
  return (
    <footer className="border-ui-border-base w-full border-t">
      <div className="content-container flex w-full flex-col">
        <div className="xsmall:flex-row flex flex-col items-start justify-between gap-y-6 py-40">
          <div>
            <Link
              href="/"
              className="txt-compact-xlarge-plus text-ui-fg-subtle hover:text-ui-fg-base uppercase"
            >
              {footerContent?.storeName || 'Medusa Store'}
            </Link>
          </div>
          <div className="text-small-regular grid grid-cols-2 gap-10 sm:grid-cols-3 md:gap-x-16">
            {productCategories && productCategories?.length > 0 && (
              <div className="flex flex-col gap-y-2">
                <span className="txt-ui-fg-base txt-small-plus">
                  Categories
                </span>
                <ul
                  className="grid grid-cols-1 gap-2"
                  data-testid="footer-categories"
                >
                  {productCategories?.slice(0, 6).map((c) => {
                    if (c.parentCategory) {
                      return;
                    }

                    const children =
                      c.categoryChildren?.map((child) => ({
                        name: child.name,
                        handle: child.handle,
                        id: child.id,
                      })) || null;

                    return (
                      <li
                        className="txt-small text-ui-fg-subtle flex flex-col gap-2"
                        key={c.id}
                      >
                        <Link
                          className={clx(
                            'hover:text-ui-fg-base',
                            children && 'txt-small-plus'
                          )}
                          href={`/categories/${c.handle}`}
                          data-testid="category-link"
                        >
                          {c.name}
                        </Link>
                        {children && (
                          <ul className="ml-3 grid grid-cols-1 gap-2">
                            {children &&
                              children.map((child) => (
                                <li key={child.id}>
                                  <Link
                                    className="hover:text-ui-fg-base"
                                    href={`/categories/${child.handle}`}
                                    data-testid="category-link"
                                  >
                                    {child.name}
                                  </Link>
                                </li>
                              ))}
                          </ul>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
            {collections && collections.length > 0 && (
              <div className="flex flex-col gap-y-2">
                <span className="txt-ui-fg-base txt-small-plus">
                  Collections
                </span>
                <ul
                  className={clx(
                    'txt-small text-ui-fg-subtle grid grid-cols-1 gap-2',
                    {
                      'grid-cols-2': (collections?.length || 0) > 3,
                    }
                  )}
                >
                  {collections?.slice(0, 6).map((c) => (
                    <li key={c.id}>
                      <Link
                        className="hover:text-ui-fg-base"
                        href={`/collections/${c.handle}`}
                      >
                        {c.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <div className="flex flex-col gap-y-2">
              <span className="txt-ui-fg-base txt-small-plus">Medusa</span>
              <ul className="txt-small text-ui-fg-subtle grid grid-cols-1 gap-y-2">
                {footerContent?.social &&
                  footerContent?.social.map(
                    (social: { text: string; url: string }, index: number) => (
                      <li key={index}>
                        <a
                          href={social.url}
                          target="_blank"
                          rel="noreferrer"
                          className="hover:text-ui-fg-base capitalize"
                        >
                          {social.text}
                        </a>
                      </li>
                    )
                  )}
              </ul>
            </div>
          </div>
        </div>
        <div className="text-ui-fg-muted mb-16 flex w-full flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <Text className="txt-compact-small">
            ©{`${new Date().getFullYear()} ${footerContent?.copyright}`}
          </Text>
          <div className="flex items-center gap-4">
            {footerContent?.poweredByCta && (
              <PortableText
                value={footerContent.poweredByCta.text as RichTextBlock[]}
              />
            )}
            <Text className="txt-compact-small opacity-60">
              horz deploy check 2026-02-25
            </Text>
          </div>
        </div>
      </div>
    </footer>
  );
}

export { Footer };
