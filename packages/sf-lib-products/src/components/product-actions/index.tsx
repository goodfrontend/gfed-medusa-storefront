'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

import { useParams } from 'next/navigation';

import { isEqual } from 'lodash';

import { ErrorMessage } from '@gfed-medusa/sf-lib-common/components/error-message';
import { useStorefrontContext } from '@gfed-medusa/sf-lib-common/lib/data/context';
import { mutateCart } from '@gfed-medusa/sf-lib-common/lib/hooks/use-cart';
import { Divider } from '@gfed-medusa/sf-lib-ui/components/divider';
import { HttpTypes } from '@medusajs/types';
import { Button } from '@medusajs/ui';

import OptionSelect from '@/components/product-actions/option-select';
import { addToCart } from '@/lib/data/cart';
import { useIntersection } from '@/lib/hooks/use-intersection';
import { useProductPrice } from '@/lib/hooks/use-product-price';
import { Product, ProductVariant } from '@/types/graphql';

import ProductPrice from '../product-price';
import MobileActions from './mobile-actions';

export type ProductActionsProps = {
  product: Product;
  regionId: string;
  disabled?: boolean;
  enableMobileActions?: boolean;
};

enum AddToCartStatus {
  IDLE = 'idle',
  ADDING = 'adding',
  SUCCESS = 'success',
  ERROR = 'error',
}

const optionsAsKeymap = (
  variantOptions:
    | HttpTypes.StoreProductVariant['options']
    | ProductVariant['options']
    | null
    | undefined
) => {
  return variantOptions?.reduce((acc: Record<string, string>, varopt: any) => {
    acc[varopt.optionId] = varopt.value;
    return acc;
  }, {});
};

export default function ProductActions({
  product,
  regionId,
  disabled,
  enableMobileActions = true,
}: ProductActionsProps) {
  const [options, setOptions] = useState<Record<string, string | undefined>>(
    {}
  );
  const [status, setStatus] = useState<AddToCartStatus>(AddToCartStatus.IDLE);
  const countryCode = useParams().countryCode as string;

  // If there is only 1 variant, preselect the options
  useEffect(() => {
    if (product?.variants && product.variants.length === 1) {
      const variantOptions = optionsAsKeymap(
        product.variants[0]?.options || null
      );
      setOptions(variantOptions ?? {});
    }
  }, [product.variants]);

  const selectedVariant = useMemo(() => {
    if (!product.variants || product.variants.length === 0) {
      return;
    }

    return product.variants.find((v) => {
      const variantOptions = optionsAsKeymap(v.options);
      return isEqual(variantOptions, options);
    });
  }, [product.variants, options]);

  // update the options when a variant is selected
  const setOptionValue = (optionId: string, value: string) => {
    setOptions((prev) => ({
      ...prev,
      [optionId]: value,
    }));
  };

  //check if the selected options produce a valid variant
  const isValidVariant = useMemo(() => {
    return product.variants?.some((v) => {
      const variantOptions = optionsAsKeymap(v.options);
      return isEqual(variantOptions, options);
    });
  }, [product.variants, options]);

  // check if the selected variant is in stock
  const { product: pricingProduct, isLoading: pricingLoading } =
    useProductPrice(product.id, regionId);

  const pricingVariant = useMemo(() => {
    if (!selectedVariant?.id) {
      return null;
    }
    return (pricingProduct?.variants ?? []).find(
      (v: any) => v.id === selectedVariant.id
    );
  }, [pricingProduct?.variants, selectedVariant?.id]);

  const stockStatus = useMemo(() => {
    if (!selectedVariant) {
      return 'unknown' as const;
    }

    if (!selectedVariant.manageInventory) {
      return 'in_stock' as const;
    }

    if (selectedVariant.allowBackorder) {
      return 'in_stock' as const;
    }

    const qty = pricingVariant?.inventoryQuantity;

    if (pricingLoading && typeof qty !== 'number') {
      return 'checking' as const;
    }

    if (typeof qty !== 'number') {
      return 'in_stock' as const;
    }

    return qty > 0 ? ('in_stock' as const) : ('out_of_stock' as const);
  }, [selectedVariant, pricingVariant?.inventoryQuantity, pricingLoading]);

  const inStock = useMemo(() => {
    // If we don't manage inventory, we can always add to cart
    if (selectedVariant && !selectedVariant.manageInventory) {
      return true;
    }

    // If we allow back orders on the variant, we can add to cart
    if (selectedVariant?.allowBackorder) {
      return true;
    }

    if (selectedVariant?.manageInventory) {
      const qty = pricingVariant?.inventoryQuantity;
      if (typeof qty === 'number') {
        return qty > 0;
      }
      // If we don't have a numeric quantity, don't block add-to-cart
      return true;
    }

    // Otherwise, we can't add to cart
    return false;
  }, [selectedVariant, pricingVariant?.inventoryQuantity]);

  const actionsRef = useRef<HTMLDivElement>(null);

  const inView = useIntersection(actionsRef, '0px');
  const ctx = useStorefrontContext();

  // add the selected variant to the cart
  const handleAddToCart = async () => {
    if (!selectedVariant?.id) return null;

    setStatus(AddToCartStatus.ADDING);

    try {
      await addToCart(
        {
          variantId: selectedVariant.id,
          quantity: 1,
          countryCode,
        },
        ctx
      );

      mutateCart();

      setStatus(AddToCartStatus.SUCCESS);
    } catch (error) {
      console.log(error);
      setStatus(AddToCartStatus.ERROR);
    }
  };

  return (
    <>
      <div className="flex flex-col gap-y-2" ref={actionsRef}>
        <div>
          {(product.variants?.length ?? 0) > 1 && (
            <div className="flex flex-col gap-y-4">
              {(product.options || []).map((option) => {
                return (
                  <div key={option.id}>
                    <OptionSelect
                      option={option}
                      current={options[option.id]}
                      updateOption={setOptionValue}
                      title={option.title ?? ''}
                      data-testid="product-options"
                      disabled={!!disabled || status === AddToCartStatus.ADDING}
                    />
                  </div>
                );
              })}
              <Divider />
            </div>
          )}
        </div>

        <ProductPrice
          product={product}
          variant={selectedVariant}
          regionId={regionId}
        />

        {status === AddToCartStatus.ERROR && (
          <ErrorMessage error="Failed adding product to cart. Please try again." />
        )}
        {status === AddToCartStatus.SUCCESS && (
          <div className="text-small-regular pt-2 text-green-700">
            Successfully added product to cart
          </div>
        )}
        <Button
          onClick={handleAddToCart}
          disabled={
            !inStock ||
            !selectedVariant ||
            !!disabled ||
            status === AddToCartStatus.ADDING ||
            !isValidVariant ||
            stockStatus === 'checking'
          }
          variant="primary"
          className="h-10 w-full"
          isLoading={status === AddToCartStatus.ADDING}
          data-testid="add-product-button"
        >
          {!selectedVariant
            ? 'Select variant'
            : stockStatus === 'checking'
              ? 'Checking stock'
              : !inStock || !isValidVariant
                ? 'Out of stock'
                : 'Add to cart'}
        </Button>
        {enableMobileActions && (
          <MobileActions
            product={product}
            variant={selectedVariant}
            regionId={regionId}
            options={options}
            updateOptions={setOptionValue}
            inStock={inStock}
            stockStatus={stockStatus}
            handleAddToCart={handleAddToCart}
            isAdding={status === AddToCartStatus.ADDING}
            show={!inView}
            optionsDisabled={!!disabled || status === AddToCartStatus.ADDING}
          />
        )}
      </div>
    </>
  );
}
