'use client';

import { Fragment, useState } from 'react';

import { Region } from '@gfed-medusa/sf-lib-common/types/graphql';
import { Dialog, Transition } from '@headlessui/react';
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
  const [isOpen, setIsOpen] = useState(false);

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  return (
    <div className="h-full">
      <div className="flex h-full items-center">
        <div className="flex h-full">
          <div className="relative flex h-full">
            <button
              data-testid="nav-menu-button"
              className="hover:text-ui-fg-base relative flex h-full cursor-pointer items-center transition-all duration-200 ease-out focus:outline-none"
              onClick={open}
            >
              <span
                className="small:hidden text-ui-fg-subtle hover:text-ui-fg-base flex min-h-[32px] min-w-[32px] items-center justify-center"
                aria-label="Open menu"
                data-testid="mobile-menu-button"
              >
                <BarsThree className="h-5 w-5" />
              </span>
              <span className="small:flex hidden">Menu</span>
            </button>
          </div>

          <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={close}>
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-150"
                enterFrom="opacity-0"
                enterTo="opacity-100 backdrop-blur-2xl"
                leave="ease-in duration-150"
                leaveFrom="opacity-100 backdrop-blur-2xl"
                leaveTo="opacity-0"
              >
                <div className="fixed inset-0 bg-black/20 backdrop-blur-sm" />
              </Transition.Child>

              <div className="fixed inset-0 overflow-y-hidden">
                <div className="flex h-full min-h-full justify-start text-center">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-150"
                    enterFrom="opacity-0 -translate-x-full"
                    enterTo="opacity-100 translate-x-0"
                    leave="ease-in duration-150"
                    leaveFrom="opacity-100 translate-x-0"
                    leaveTo="opacity-0 -translate-x-full"
                  >
                    <Dialog.Panel className="text-ui-fg-base absolute inset-y-0 left-0 w-full transform flex-col text-sm sm:w-1/3 sm:min-w-min sm:pr-0 2xl:w-1/4">
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
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </div>
            </Dialog>
          </Transition>
        </div>
      </div>
    </div>
  );
};

export { SideMenu };
