import { Text } from '@medusajs/ui';

import { Maybe, ProductVariant } from '@/types/graphql';

type LineItemOptionsProps = {
  variant?: Maybe<ProductVariant>;
  'data-testid'?: string;
  'data-value'?: Maybe<ProductVariant>;
};

const LineItemOptions = ({
  variant,
  'data-testid': dataTestid,
  'data-value': dataValue,
}: LineItemOptionsProps) => {
  return (
    <Text
      data-testid={dataTestid}
      data-value={dataValue}
      className="txt-medium text-ui-fg-subtle inline-block w-full overflow-hidden text-ellipsis"
    >
      Variant: {variant?.title}
    </Text>
  );
};

export { LineItemOptions };
