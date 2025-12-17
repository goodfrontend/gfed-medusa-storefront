import TransferImage from '@gfed-medusa/sf-lib-checkout/components/transfer-image';
import { declineTransferRequest } from '@gfed-medusa/sf-lib-checkout/lib/data/orders';
import { Heading, Text } from '@medusajs/ui';

export default async function TransferPage({
  params,
}: {
  params: { id: string; token: string };
}) {
  const { id, token } = params;

  const { success, error } = await declineTransferRequest(id, token);

  return (
    <div className="mx-auto mb-20 mt-10 flex w-2/5 flex-col items-start gap-y-4">
      <TransferImage />
      <div className="flex flex-col gap-y-6">
        {success && (
          <>
            <Heading level="h1" className="text-xl text-zinc-900">
              Order transfer declined!
            </Heading>
            <Text className="text-zinc-600">
              Transfer of order {id} has been successfully declined.
            </Text>
          </>
        )}
        {!success && (
          <>
            <Text className="text-zinc-600">
              There was an error declining the transfer. Please try again.
            </Text>
            {error && (
              <Text className="text-red-500">Error message: {error}</Text>
            )}
          </>
        )}
      </div>
    </div>
  );
}
