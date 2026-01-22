import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { ProfileBillingAddress } from '@gfed-medusa/sf-lib-account/components/profile-billing-address';
import { ProfileEmail } from '@gfed-medusa/sf-lib-account/components/profile-email';
import { ProfileName } from '@gfed-medusa/sf-lib-account/components/profile-name';
// TODO: Rename this component to ProfilePhone
// Requires major version update for sf-lib-account
import { ProfileEmail as ProfilePhone } from '@gfed-medusa/sf-lib-account/components/profile-phone';
import { retrieveCustomer } from '@gfed-medusa/sf-lib-common/lib/data/customer';
import { resolveNextContext } from '@gfed-medusa/sf-lib-common/lib/data/next-context';
import { listRegions } from '@gfed-medusa/sf-lib-common/lib/data/regions';

export const metadata: Metadata = {
  title: 'Profile',
  description: 'View and edit your Medusa Store profile.',
};

export default async function Profile() {
  const ctx = await resolveNextContext();
  const customer = await retrieveCustomer(ctx);
  const regions = await listRegions(ctx);

  if (!customer || !regions) {
    notFound();
  }

  return (
    <div className="w-full" data-testid="profile-page-wrapper">
      <div className="mb-8 flex flex-col gap-y-4">
        <h1 className="text-2xl-semi">Profile</h1>
        <p className="text-base-regular">
          View and update your profile information, including your name, email,
          and phone number. You can also update your billing address, or change
          your password.
        </p>
      </div>
      <div className="flex w-full flex-col gap-y-8">
        <ProfileName customer={customer} />
        <Divider />
        <ProfileEmail customer={customer} />
        <Divider />
        <ProfilePhone customer={customer} />
        <Divider />
        {/* <ProfilePassword customer={customer} />
        <Divider /> */}
        <ProfileBillingAddress customer={customer} regions={regions} />
      </div>
    </div>
  );
}

const Divider = () => {
  return <div className="h-px w-full bg-gray-200" />;
};
