import { cookies as nextCookies } from 'next/headers';

import { Order } from '@gfed-medusa/sf-lib-common/types/graphql';

import OrderCompletedClient from '../order-completed-client';

type OrderCompletedTemplateProps = {
  order: Order;
};

export default async function OrderCompletedTemplate({
  order,
}: OrderCompletedTemplateProps) {
  const cookies = await nextCookies();

  const isOnboarding = cookies.get('_medusa_onboarding')?.value === 'true';

  return (
    <div className="content-container py-10">
      <OrderCompletedClient order={order} isOnboarding={isOnboarding} />
    </div>
  );
}
