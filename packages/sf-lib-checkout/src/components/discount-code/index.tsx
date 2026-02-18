'use client';

import React, { useActionState } from 'react';

import { ErrorMessage } from '@gfed-medusa/sf-lib-common/components/error-message';
import { SubmitButton } from '@gfed-medusa/sf-lib-common/components/submit-button';
import { useStorefrontContext } from '@gfed-medusa/sf-lib-common/lib/data/context';
import { convertToLocale } from '@gfed-medusa/sf-lib-common/lib/utils/money';
import { Trash } from '@gfed-medusa/sf-lib-ui/icons/trash';
import { Badge, Heading, Input, Label, Text } from '@medusajs/ui';

import { applyPromotions, submitPromotionForm } from '@/lib/data/cart';
import { Cart } from '@/lib/gql/generated-types/graphql';

type DiscountCodeProps = {
  cart: Cart;
};

const DiscountCode: React.FC<DiscountCodeProps> = ({ cart }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const ctx = useStorefrontContext();

  const { promotions = [] } = cart;
  const removePromotionCode = async (code: string) => {
    const validPromotions = promotions.filter(
      (promotion) => promotion?.code !== code
    );

    if (validPromotions)
      await applyPromotions(
        validPromotions
          .filter((p) => p?.code === undefined)
          .map((p) => p?.code ?? ''),
        ctx
      );
  };

  const addPromotionCode = async (formData: FormData) => {
    const code = formData.get('code');
    if (!code) {
      return;
    }
    const input = document.getElementById(
      'promotion-input'
    ) as HTMLInputElement;
    const codes = promotions
      .filter((p) => p?.code === undefined)
      .map((p) => p?.code ?? '');
    codes.push(code.toString());

    await applyPromotions(codes, ctx);

    if (input) {
      input.value = '';
    }
  };

  const handleSubmitPromotionForm = async (
    currentState: unknown,
    formData: FormData
  ) => {
    return submitPromotionForm(currentState, formData, ctx);
  };

  const [message, formAction] = useActionState(handleSubmitPromotionForm, null);

  return (
    <div className="flex w-full flex-col bg-white">
      <div className="txt-medium">
        <form action={(a) => addPromotionCode(a)} className="mb-5 w-full">
          <Label className="my-2 flex items-center gap-x-1">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="txt-medium text-ui-fg-interactive hover:text-ui-fg-interactive-hover"
              data-testid="add-discount-button"
            >
              Add Promotion Code(s)
            </button>

            {/* <Tooltip content="You can add multiple promotion codes">
              <InformationCircleSolid color="var(--fg-muted)" />
            </Tooltip> */}
          </Label>

          {isOpen && (
            <>
              <div className="flex w-full gap-x-2">
                <Input
                  className="size-full"
                  id="promotion-input"
                  name="code"
                  type="text"
                  autoFocus={false}
                  data-testid="discount-input"
                />
                <SubmitButton
                  variant="secondary"
                  data-testid="discount-apply-button"
                >
                  Apply
                </SubmitButton>
              </div>

              <ErrorMessage
                error={message}
                data-testid="discount-error-message"
              />
            </>
          )}
        </form>

        {!!promotions?.length && promotions.length > 0 && (
          <div className="flex w-full items-center">
            <div className="flex w-full flex-col">
              <Heading className="txt-medium mb-2">
                Promotion(s) applied:
              </Heading>

              {promotions?.map((promotion) => {
                return (
                  <div
                    key={promotion?.id}
                    className="mb-2 flex w-full max-w-full items-center justify-between"
                    data-testid="discount-row"
                  >
                    <Text className="txt-small-plus flex w-4/5 items-baseline gap-x-1 pr-1">
                      <span className="truncate" data-testid="discount-code">
                        <Badge
                          color={promotion?.isAutomatic ? 'green' : 'grey'}
                          size="small"
                        >
                          {promotion?.code}
                        </Badge>{' '}
                        (
                        {promotion?.applicationMethod?.value !== undefined &&
                          promotion.applicationMethod.currencyCode !==
                            undefined && (
                            <>
                              {promotion.applicationMethod.type === 'percentage'
                                ? `${promotion.applicationMethod.value}%`
                                : convertToLocale({
                                    amount: parseInt(
                                      promotion.applicationMethod.value
                                    ),
                                    currency_code:
                                      promotion.applicationMethod.currencyCode,
                                  })}
                            </>
                          )}
                        )
                        {/* {promotion.is_automatic && (
                          <Tooltip content="This promotion is automatically applied">
                            <InformationCircleSolid className="inline text-zinc-400" />
                          </Tooltip>
                        )} */}
                      </span>
                    </Text>
                    {!promotion?.isAutomatic && (
                      <button
                        className="flex items-center"
                        onClick={() => {
                          if (!promotion?.code) {
                            return;
                          }

                          removePromotionCode(promotion.code);
                        }}
                        data-testid="remove-discount-button"
                      >
                        <Trash size={14} />
                        <span className="sr-only">
                          Remove discount code from order
                        </span>
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DiscountCode;
