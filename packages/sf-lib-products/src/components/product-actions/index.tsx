'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

import { useParams } from 'next/navigation';

import { isEqual } from 'lodash';

import { Product } from '@/types/graphql';
import { useIntersection } from '@/lib/hooks/use-intersection';
import { addToCart } from '@/lib/data/cart';
import { HttpTypes } from '@medusajs/types';
import { Button } from '@medusajs/ui';
import { ErrorMessage } from '@gfed-medusa/sf-lib-common/components/error-message';
import { Divider } from '@gfed-medusa/sf-lib-ui/components/divider';
import OptionSelect from '@/components/product-actions/option-select';

import ProductPrice from '../product-price';
import MobileActions from './mobile-actions';

export type ProductActionsProps = {
  product: Product;
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
  variantOptions: HttpTypes.StoreProductVariant['options']
) => {
  return variantOptions?.reduce((acc: Record<string, string>, varopt: any) => {
    acc[varopt.optionId] = varopt.value;
    return acc;
  }, {});
};

export default function ProductActions({
  product,
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
  const inStock = useMemo(() => {
    // If we don't manage inventory, we can always add to cart
    if (selectedVariant && !selectedVariant.manageInventory) {
      return true;
    }

    // If we allow back orders on the variant, we can add to cart
    if (selectedVariant?.allowBackorder) {
      return true;
    }

    // If there is inventory available, we can add to cart
    if (
      selectedVariant?.manageInventory &&
      (selectedVariant?.inventoryQuantity || 0) > 0
    ) {
      return true;
    }

    // Otherwise, we can't add to cart
    return false;
  }, [selectedVariant]);

  const actionsRef = useRef<HTMLDivElement>(null);

  const inView = useIntersection(actionsRef, '0px');

  // add the selected variant to the cart
  const handleAddToCart = async () => {
    if (!selectedVariant?.id) return null;

    setStatus(AddToCartStatus.ADDING);

    try {
      await addToCart({
        variantId: selectedVariant.id,
        quantity: 1,
        countryCode,
      });

      setStatus(AddToCartStatus.SUCCESS);
    } catch {
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

        <ProductPrice product={product} variant={selectedVariant} />

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
            !isValidVariant
          }
          variant="primary"
          className="h-10 w-full"
          isLoading={status === AddToCartStatus.ADDING}
          data-testid="add-product-button"
        >
          {!selectedVariant
            ? 'Select variant'
            : !inStock || !isValidVariant
              ? 'Out of stock'
              : 'Add to cart'}
        </Button>
        {enableMobileActions && (
          <MobileActions
            product={product}
            variant={selectedVariant}
            options={options}
            updateOptions={setOptionValue}
            inStock={inStock}
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
