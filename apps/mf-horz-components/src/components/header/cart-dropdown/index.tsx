'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

import { DeleteButton } from '@gfed-medusa/sf-lib-common/components/delete-button';
import { LineItemOptions } from '@gfed-medusa/sf-lib-common/components/line-item-options';
import { LineItemPrice } from '@gfed-medusa/sf-lib-common/components/line-item-price';
import { convertToLocale } from '@gfed-medusa/sf-lib-common/lib/utils/money';
import { Cart } from '@gfed-medusa/sf-lib-common/types/graphql';
import { CheckCircleMiniSolid, ShoppingCart, XMark } from '@medusajs/icons';
import { Button } from '@medusajs/ui';

import { Link } from '../../link';
import { Thumbnail } from '../thumbnail';

const MINI_CART_CLOSE_DELAY_MS = 5000;

interface CartDropdownProps {
  cart?: Cart | null;
  initialCartItemCount?: number;
}

const CartDropdown = ({
  cart: cartState,
  initialCartItemCount,
}: CartDropdownProps) => {
  const [cartDropdownOpen, setCartDropdownOpen] = useState(false);
  const previousTotalItemsRef = useRef<number | null>(
    initialCartItemCount ?? null
  );
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const touchInteractionRef = useRef(false);
  const bodyOverflowRef = useRef<string | null>(null);
  const bodyPaddingRightRef = useRef<string | null>(null);

  const isLoading = cartState === undefined;
  const clientSideTotalItems =
    cartState?.items?.reduce((acc, item) => {
      return acc + item.quantity;
    }, 0) || 0;
  const totalItems =
    isLoading && initialCartItemCount
      ? initialCartItemCount
      : clientSideTotalItems;

  const subtotal = cartState?.subtotal ?? 0;

  const clearCloseTimer = useCallback(() => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  }, []);

  const startCloseTimer = useCallback(() => {
    clearCloseTimer();

    closeTimerRef.current = setTimeout(() => {
      setCartDropdownOpen(false);
      closeTimerRef.current = null;
    }, MINI_CART_CLOSE_DELAY_MS);
  }, [clearCloseTimer]);

  const lockBodyScroll = useCallback(() => {
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;

    bodyOverflowRef.current = document.body.style.overflow;
    bodyPaddingRightRef.current = document.body.style.paddingRight;

    document.body.style.overflow = 'hidden';

    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }
  }, []);

  const unlockBodyScroll = useCallback(() => {
    document.body.style.overflow = bodyOverflowRef.current ?? '';
    document.body.style.paddingRight = bodyPaddingRightRef.current ?? '';
  }, []);

  useEffect(() => {
    return () => {
      clearCloseTimer();
      unlockBodyScroll();
    };
  }, [clearCloseTimer, unlockBodyScroll]);

  useEffect(() => {
    const dialog = dialogRef.current;
    const panel = panelRef.current;

    if (!dialog || !panel) {
      return;
    }

    if (cartDropdownOpen && !dialog.open) {
      lockBodyScroll();
      dialog.showModal();
      requestAnimationFrame(() => {
        dialog.setAttribute('data-visible', '');
      });
      return;
    }

    if (!cartDropdownOpen && dialog.open) {
      dialog.removeAttribute('data-visible');
      dialog.setAttribute('data-closing', '');

      const finish = () => {
        panel.removeEventListener('transitionend', finish);
        dialog.removeAttribute('data-closing');
        dialog.close();
        unlockBodyScroll();
      };

      panel.addEventListener('transitionend', finish, { once: true });
      setTimeout(finish, 250);
    }
  }, [cartDropdownOpen, lockBodyScroll, unlockBodyScroll]);

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

  const closeMiniCart = useCallback(() => {
    clearCloseTimer();
    setCartDropdownOpen(false);
  }, [clearCloseTimer]);

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
    <div className="relative z-50 flex h-[30px] items-center">
      <Link
        href="/cart"
        className="text-ui-fg-subtle hover:text-ui-fg-base flex min-h-[32px] min-w-[32px] cursor-pointer items-center justify-center focus:outline-none"
        aria-label={`Cart, ${totalItems} items`}
        data-testid="cart-button"
      >
        <ShoppingCart width={16} height={16} />
        {totalItems >= 1 && (
          <span className="absolute -right-1 -top-1 flex min-h-4 min-w-4 items-center justify-center rounded-full bg-gray-900 px-1 text-[10px] font-semibold leading-none text-white">
            {totalItems}
          </span>
        )}
      </Link>

      <dialog
        ref={dialogRef}
        className="mini-cart-dialog"
        onCancel={(event) => {
          event.preventDefault();
          closeMiniCart();
        }}
        onClick={(event) => {
          if (event.target === dialogRef.current) {
            closeMiniCart();
          }
        }}
        aria-label="Mini cart"
      >
        <div
          ref={panelRef}
          className="mini-cart-panel text-ui-fg-base small:h-full small:max-h-none small:max-w-[440px] small:rounded-none flex max-h-[min(520px,82dvh)] w-full flex-col overflow-hidden overflow-x-hidden rounded-t-2xl bg-white text-left shadow-2xl"
          data-testid="nav-cart-dropdown"
          onMouseEnter={clearCloseTimer}
          onMouseLeave={() => {
            if (touchInteractionRef.current) {
              return;
            }

            const activeElement = document.activeElement;

            if (activeElement && panelRef.current?.contains(activeElement)) {
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
            const nextFocusedElement = event.relatedTarget as Node | null;

            if (
              nextFocusedElement &&
              panelRef.current?.contains(nextFocusedElement)
            ) {
              return;
            }

            startCloseTimer();
          }}
        >
          <div className="mini-cart-header small:px-6 flex items-center justify-between border-b border-gray-200 px-4 py-4">
            <div className="min-w-0">
              <h2 className="mini-cart-title text-large-semi">Cart</h2>
              <p className="mini-cart-count text-small-regular text-ui-fg-subtle mt-1">
                {totalItems} {totalItems === 1 ? 'item' : 'items'}
              </p>
              {totalItems > 0 && (
                <p className="mini-cart-status mt-2 flex items-center gap-1.5 text-xs font-medium uppercase tracking-[0.16em] text-green-600">
                  <CheckCircleMiniSolid className="h-4 w-4 shrink-0" />
                  <span>Added to cart</span>
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
              <div className="no-scrollbar small:px-6 min-h-0 flex-1 overflow-y-auto overflow-x-hidden px-4 py-4">
                <div className="grid grid-cols-1 gap-y-6">
                  {[...cartState.items]
                    .sort((a, b) => {
                      return (a.createdAt ?? '') > (b.createdAt ?? '') ? -1 : 1;
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

              <div className="text-small-regular small:p-6 shrink-0 border-t border-gray-200 bg-white p-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-ui-fg-base font-semibold">
                    Subtotal <span className="font-normal">(excl. taxes)</span>
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
        </div>
      </dialog>
    </div>
  );
};

export { CartDropdown };
