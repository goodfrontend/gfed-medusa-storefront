import { convertToLocale } from '@gfed-medusa/sf-lib-common/lib/utils/money';
import { Divider } from '@gfed-medusa/sf-lib-ui/components/divider';
import { isStripe, paymentInfoMap } from '@lib/constants';
import { Order } from '@lib/gql/generated-types/graphql';
import { Container, Heading, Text } from '@medusajs/ui';

type PaymentDetailsProps = {
  order: Order;
};

const PaymentDetails = ({ order }: PaymentDetailsProps) => {
  const payment = order.paymentCollections?.[0]?.payments?.[0];

  return (
    <div>
      <Heading level="h2" className="text-3xl-regular my-6 flex flex-row">
        Payment
      </Heading>
      <div>
        {payment && (
          <div className="flex w-full items-start gap-x-1">
            <div className="flex w-1/3 flex-col">
              <Text className="txt-medium-plus text-ui-fg-base mb-1">
                Payment method
              </Text>
              <Text
                className="txt-medium text-ui-fg-subtle"
                data-testid="payment-method"
              >
                {paymentInfoMap[payment.providerId]?.title}
              </Text>
            </div>
            <div className="flex w-2/3 flex-col">
              <Text className="txt-medium-plus text-ui-fg-base mb-1">
                Payment details
              </Text>
              <div className="txt-medium text-ui-fg-subtle flex items-center gap-2">
                <Container className="bg-ui-button-neutral-hover flex h-7 w-fit items-center p-2">
                  {paymentInfoMap[payment.providerId]?.icon}
                </Container>
                <Text data-testid="payment-amount">
                  {isStripe(payment.providerId) && payment.data?.card_last4
                    ? `**** **** **** ${payment.data.card_last4}`
                    : `${convertToLocale({
                        amount: payment.amount,
                        currency_code: order.currencyCode,
                      })} paid at ${new Date(
                        payment.createdAt ?? ''
                      ).toLocaleString()}`}
                </Text>
              </div>
            </div>
          </div>
        )}
      </div>

      <Divider className="mt-8" />
    </div>
  );
};

export default PaymentDetails;
