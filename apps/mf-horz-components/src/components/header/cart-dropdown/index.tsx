'use client';

import { Fragment, useCallback, useEffect, useRef, useState } from 'react';

import { DeleteButton } from '@gfed-medusa/sf-lib-common/components/delete-button';
import { LineItemOptions } from '@gfed-medusa/sf-lib-common/components/line-item-options';
import { LineItemPrice } from '@gfed-medusa/sf-lib-common/components/line-item-price';
import { convertToLocale } from '@gfed-medusa/sf-lib-common/lib/utils/money';
import { Cart } from '@gfed-medusa/sf-lib-common/types/graphql';
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from '@headlessui/react';
import { CheckCircleMiniSolid, ShoppingCart, XMark } from '@medusajs/icons';
import { Button } from '@medusajs/ui';

import { Link } from '../../link';
import { Thumbnail } from '../thumbnail';

const MINI_CART_CLOSE_DELAY_MS = 5000;

const CartDropdown = ({ cart: cartState }: { cart?: Cart | null }) => {
  const [cartDropdownOpen, setCartDropdownOpen] = useState(false);
  const previousTotalItemsRef = useRef<number | null>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const touchInteractionRef = useRef(false);

  const totalItems =
    cartState?.items?.reduce((acc, item) => {
      return acc + item.quantity;
    }, 0) || 0;

  const subtotal = cartState?.subtotal ?? 0;

  useEffect(() => {
    return () => {
      if (closeTimerRef.current) {
        clearTimeout(closeTimerRef.current);
      }
    };
  }, []);

  const startCloseTimer = useCallback(() => {
    clearCloseTimer();

    closeTimerRef.current = setTimeout(() => {
      setCartDropdownOpen(false);
      closeTimerRef.current = null;
    }, MINI_CART_CLOSE_DELAY_MS);
  }, []);

  useEffect(() => {
    if (cartState === undefined) {
      return;
    }

    const previousTotalItems = previousTotalItemsRef.current;
    previousTotalItemsRef.current = totalItems;

    if (previousTotalItems === null) {
      return;
    }

    const pathname = window.location.pathname;
    const itemCountIncreased = totalItems > previousTotalItems;

    if (!itemCountIncreased || totalItems === 0 || pathname.includes('/cart')) {
      return;
    }

    setCartDropdownOpen(true);
    startCloseTimer();
  }, [cartState, startCloseTimer, totalItems]);

  const clearCloseTimer = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  };

  const closeMiniCart = () => {
    clearCloseTimer();
    setCartDropdownOpen(false);
  };

  const handleTouchInteractionStart = () => {
    touchInteractionRef.current = true;
    clearCloseTimer();
  };

  const handleTouchInteractionEnd = () => {
    window.setTimeout(() => {
      touchInteractionRef.current = false;

      const activeElement = document.activeElement;

      if (activeElement && panelRef.current?.contains(activeElement)) {
        return;
      }

      startCloseTimer();
    }, 150);
  };

  return (
    <>
      <div className="relative z-50 flex h-[30px] items-center">
        <Link
          href="/cart"
          className="text-ui-fg-subtle hover:text-ui-fg-base flex min-h-[32px] min-w-[32px] cursor-pointer items-center justify-center focus:outline-none"
          aria-label={`Cart, ${totalItems} items`}
          data-testid="cart-button"
        >
          <ShoppingCart width={16} height={16} />
          {totalItems > 0 && (
            <span className="absolute -right-1 -top-1 flex min-h-4 min-w-4 items-center justify-center rounded-full bg-gray-900 px-1 text-[10px] font-semibold leading-none text-white">
              {totalItems}
            </span>
          )}
        </Link>
      </div>

      <Transition appear show={cartDropdownOpen} as={Fragment}>
        <Dialog as="div" className="relative z-[75]" onClose={closeMiniCart}>
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-200"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-150"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" />
          </TransitionChild>

          <div className="fixed inset-0">
            <div className="small:items-stretch flex h-full items-end justify-end">
              <TransitionChild
                as={Fragment}
                enter="transform transition ease-out duration-200"
                enterFrom="translate-y-full opacity-0 small:translate-x-full small:translate-y-0"
                enterTo="translate-x-0 translate-y-0 opacity-100"
                leave="transform transition ease-in duration-150"
                leaveFrom="translate-x-0 translate-y-0 opacity-100"
                leaveTo="translate-y-full opacity-0 small:translate-x-full small:translate-y-0"
              >
                <DialogPanel
                  ref={panelRef}
                  className="text-ui-fg-base flex max-h-[460px] w-full transform flex-col overflow-hidden overflow-x-hidden rounded-t-2xl bg-white text-left shadow-2xl small:h-full small:max-h-none small:max-w-[440px] small:rounded-none"
                  data-testid="nav-cart-dropdown"
                  onMouseEnter={clearCloseTimer}
                  onMouseLeave={() => {
                    if (touchInteractionRef.current) {
                      return;
                    }

                    const activeElement = document.activeElement;

                    if (
                      activeElement &&
                      panelRef.current?.contains(activeElement)
                    ) {
                      return;
                    }

                    startCloseTimer();
                  }}
                  onTouchStart={handleTouchInteractionStart}
                  onTouchMove={handleTouchInteractionStart}
                  onTouchEnd={handleTouchInteractionEnd}
                  onTouchCancel={handleTouchInteractionEnd}
                  onFocusCapture={clearCloseTimer}
                  onBlurCapture={(event) => {
                    const nextFocusedElement =
                      event.relatedTarget as Node | null;

                    if (
                      nextFocusedElement &&
                      panelRef.current?.contains(nextFocusedElement)
                    ) {
                      return;
                    }

                    startCloseTimer();
                  }}
                >
                  <div className="small:px-6 flex items-center justify-between border-b border-gray-200 px-4 py-4">
                    <div>
                      <DialogTitle className="text-large-semi">
                        Cart
                      </DialogTitle>
                      <p className="text-small-regular text-ui-fg-subtle mt-1">
                        {totalItems} {totalItems === 1 ? 'item' : 'items'}
                      </p>
                      {totalItems > 0 && (
                        <p className="mt-2 flex items-center gap-1.5 text-xs font-medium uppercase tracking-[0.16em] text-green-600">
                          <CheckCircleMiniSolid className="h-4 w-4 shrink-0" />
                          <span>Added to bag</span>
                        </p>
                      )}
                    </div>
                    <button
                      type="button"
                      className="text-ui-fg-subtle hover:text-ui-fg-base flex min-h-[32px] min-w-[32px] items-center justify-center"
                      onClick={closeMiniCart}
                      data-testid="close-cart-button"
                      aria-label="Close cart"
                    >
                      <XMark width={20} height={20} />
                    </button>
                  </div>

                  {cartState && cartState.items?.length ? (
                    <>
                      <div className="no-scrollbar small:px-6 flex-1 overflow-y-auto overflow-x-hidden px-4 py-4">
                        <div className="grid grid-cols-1 gap-y-6">
                          {[...cartState.items]
                            .sort((a, b) => {
                              return (a.createdAt ?? '') > (b.createdAt ?? '')
                                ? -1
                                : 1;
                            })
                            .map((item) => (
                              <div
                                className="small:grid-cols-[122px_1fr] grid grid-cols-[96px_1fr] gap-x-4"
                                key={item.id}
                                data-testid="cart-item"
                              >
                                <Link
                                  href={`/products/${item.productHandle}`}
                                  className="w-24"
                                  onClick={closeMiniCart}
                                >
                                  <Thumbnail
                                    thumbnail={item.thumbnail}
                                    images={item.variant?.product?.images}
                                    size="square"
                                  />
                                </Link>
                                <div className="flex min-w-0 flex-1 flex-col justify-between">
                                  <div className="flex flex-1 flex-col">
                                    <div className="flex items-start justify-between gap-x-4">
                                      <div className="min-w-0 flex-1">
                                        <h3 className="text-base-regular min-w-0">
                                          <Link
                                            href={`/products/${item.productHandle}`}
                                            data-testid="product-link"
                                            onClick={closeMiniCart}
                                            className="block truncate"
                                          >
                                            {item.title}
                                          </Link>
                                        </h3>
                                        <LineItemOptions
                                          variant={item.variant}
                                          data-testid="cart-item-variant"
                                          data-value={item.variant}
                                        />
                                        <span
                                          data-testid="cart-item-quantity"
                                          data-value={item.quantity}
                                        >
                                          Quantity: {item.quantity}
                                        </span>
                                      </div>
                                      <div className="flex justify-end">
                                        <LineItemPrice
                                          item={item}
                                          style="tight"
                                          currencyCode={cartState.currencyCode}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                  <DeleteButton
                                    id={item.id}
                                    className="mt-2"
                                    data-testid="cart-item-remove-button"
                                  >
                                    Remove
                                  </DeleteButton>
                                </div>
                              </div>
                            ))}
                        </div>
                      </div>

                      <div className="text-small-regular small:p-6 border-t border-gray-200 p-4">
                        <div className="mb-4 flex items-center justify-between">
                          <span className="text-ui-fg-base font-semibold">
                            Subtotal{' '}
                            <span className="font-normal">(excl. taxes)</span>
                          </span>
                          <span
                            className="text-large-semi"
                            data-testid="cart-subtotal"
                            data-value={subtotal}
                          >
                            {convertToLocale({
                              amount: subtotal,
                              currency_code: cartState.currencyCode,
                            })}
                          </span>
                        </div>
                        <Link href="/cart" onClick={closeMiniCart}>
                          <Button
                            className="w-full"
                            size="large"
                            data-testid="go-to-cart-button"
                          >
                            Go to cart
                          </Button>
                        </Link>
                        <Link
                          href="/checkout?step=address"
                          onClick={closeMiniCart}
                          className="mt-3 block"
                        >
                          <Button
                            className="border-ui-border-base text-ui-fg-base hover:bg-ui-bg-subtle w-full border bg-white"
                            size="large"
                            data-testid="go-to-checkout-button"
                          >
                            Go to checkout
                          </Button>
                        </Link>
                      </div>
                    </>
                  ) : (
                    <div className="small:px-6 flex flex-1 flex-col items-center justify-center gap-y-4 px-4 py-16 text-center">
                      <div className="text-small-regular flex h-6 w-6 items-center justify-center rounded-full bg-gray-900 text-white">
                        <span>0</span>
                      </div>
                      <span>Your shopping bag is empty.</span>
                      <Link href="/store" onClick={closeMiniCart}>
                        <span className="sr-only">Go to all products page</span>
                        <Button>Explore products</Button>
                      </Link>
                    </div>
                  )}
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export { CartDropdown };
