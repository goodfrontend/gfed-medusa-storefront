import { AccountLayout } from '@gfed-medusa/sf-lib-account/components/account-layout';
import { retrieveCustomer } from '@gfed-medusa/sf-lib-common/lib/data/customer';
import { Toaster } from '@medusajs/ui';

export default async function AccountPageLayout({
  dashboard,
  login,
}: {
  dashboard?: React.ReactNode;
  login?: React.ReactNode;
}) {
  const customer = await retrieveCustomer().catch(() => null);

  return (
    <AccountLayout customer={customer}>
      {customer ? dashboard : login}
      <Toaster />
    </AccountLayout>
  );
}
