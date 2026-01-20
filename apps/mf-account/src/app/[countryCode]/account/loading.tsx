import { Spinner } from '@gfed-medusa/sf-lib-ui/icons/spinner';

export default function Loading() {
  return (
    <div className="text-ui-fg-base flex h-full w-full items-center justify-center">
      <Spinner size={36} />
    </div>
  );
}
