import { Medusa } from '@gfed-medusa/sf-lib-ui/icons/medusa';
import { NextJs } from '@gfed-medusa/sf-lib-ui/icons/nextjs';
import { Text } from '@medusajs/ui';

const MedusaCTA = () => {
  return (
    <Text className="txt-compact-small-plus flex items-center gap-x-2">
      Powered by
      <a href="https://www.medusajs.com" target="_blank" rel="noreferrer">
        <Medusa fill="#9ca3af" className="fill-[#9ca3af]" />
      </a>
      &
      <a href="https://nextjs.org" target="_blank" rel="noreferrer">
        <NextJs fill="#9ca3af" />
      </a>
    </Text>
  );
};

export default MedusaCTA;
