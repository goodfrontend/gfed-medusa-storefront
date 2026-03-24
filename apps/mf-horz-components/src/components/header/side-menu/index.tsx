'use client';

import { useCallback, useRef, useState } from 'react';

import { Region } from '@gfed-medusa/sf-lib-common/types/graphql';
import { BarsThree, XMark } from '@medusajs/icons';
import { Text } from '@medusajs/ui';

import { Link } from '../../link';
import { CountrySelect } from '../country-select';

const SideMenuItems = {
  Home: '/',
  Store: '/store',
  Account: '/account',
  Cart: '/cart',
};

const SideMenu = ({ regions }: { regions: Region[] | null }) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const [, setIsOpen] = useState(false);

  const open = useCallback(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    document.body.style.overflow = 'hidden';
    dialog.showModal();
    requestAnimationFrame(() => {
      dialog.setAttribute('data-visible', '');
    });
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    const dialog = dialogRef.current;
    const panel = panelRef.current;
    if (!dialog || !dialog.open) return;

    dialog.removeAttribute('data-visible');
    dialog.setAttribute('data-closing', '');
    setIsOpen(false);

    const onEnd = () => {
      panel?.removeEventListener('transitionend', onEnd);
      dialog.removeAttribute('data-closing');
      dialog.close();
      document.body.style.overflow = '';
    };

    panel?.addEventListener('transitionend', onEnd, { once: true });
    setTimeout(onEnd, 200);
  }, []);

  const handleCancel = useCallback(
    (e: React.SyntheticEvent<HTMLDialogElement>) => {
      e.preventDefault();
      close();
    },
    [close]
  );

  const handleDialogClick = useCallback(
    (e: React.MouseEvent<HTMLDialogElement>) => {
      if (e.target === dialogRef.current) {
        close();
      }
    },
    [close]
  );

  return (
    <div className="h-full">
      <div className="flex h-full items-center">
        <div className="flex h-full">
          <div className="relative flex h-full">
            <button
              data-testid="nav-menu-button"
              className="hover:text-ui-fg-base text-ui-fg-subtle relative flex min-h-[32px] min-w-[32px] cursor-pointer items-center justify-center transition-all duration-200 ease-out focus:outline-none"
              onClick={open}
              aria-label="Menu"
            >
              <BarsThree width={16} height={16} />
            </button>
          </div>

          <dialog
            ref={dialogRef}
            className="side-menu-dialog"
            onCancel={handleCancel}
            onClick={handleDialogClick}
            aria-label="Navigation menu"
          >
            <div
              ref={panelRef}
              className="side-menu-panel text-ui-fg-base absolute inset-y-0 left-0 w-full text-sm sm:w-1/3 sm:min-w-min sm:pr-0 2xl:w-1/4"
            >
              <div
                data-testid="nav-menu-popup"
                className="rounded-rounded flex h-full flex-col justify-between bg-white p-6 pt-16"
              >
                <div className="flex justify-end" id="xmark">
                  <button
                    data-testid="close-menu-button"
                    onClick={close}
                  >
                    <XMark />
                  </button>
                </div>
                <ul className="flex flex-col items-start justify-start gap-6">
                  {Object.entries(SideMenuItems).map(([name, href]) => {
                    return (
                      <li key={name}>
                        <Link
                          href={href}
                          className="hover:text-ui-fg-disabled text-3xl leading-10"
                          onClick={close}
                          data-testid={`${name.toLowerCase()}-link`}
                        >
                          {name}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
                <div className="flex flex-col gap-y-6">
                  {regions && <CountrySelect regions={regions} />}
                  <Text className="txt-compact-small text-ui-fg-base flex justify-between">
                    © {new Date().getFullYear()} JustGood Store. All
                    rights reserved.
                  </Text>
                </div>
              </div>
            </div>
          </dialog>
        </div>
      </div>
    </div>
  );
};

export { SideMenu };
