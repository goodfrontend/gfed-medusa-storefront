'use client';

import Item from '@components/item';
import SkeletonLineItem from '@components/skeleton-line-item';
import { Cart } from '@lib/gql/generated-types/graphql';
import repeat from '@lib/util/repeat';
import { Table, clx } from '@medusajs/ui';

type ItemsTemplateProps = {
  cart: Cart;
};

const ItemsPreviewTemplate = ({ cart }: ItemsTemplateProps) => {
  const items = cart.items;
  const hasOverflow = items && items.length > 4;

  return (
    <div
      className={clx({
        'no-scrollbar max-h-[420px] overflow-x-hidden overflow-y-scroll pl-[1px]':
          hasOverflow,
      })}
    >
      <Table>
        <Table.Body data-testid="items-table">
          {items
            ? items
                .sort((a, b) => {
                  return (a.createdAt ?? '') > (b.createdAt ?? '') ? -1 : 1;
                })
                .map((item) => {
                  return (
                    <Item
                      key={item.id}
                      item={item}
                      type="preview"
                      currencyCode={cart.currencyCode}
                    />
                  );
                })
            : repeat(5).map((i) => {
                return <SkeletonLineItem key={i} />;
              })}
        </Table.Body>
      </Table>
    </div>
  );
};

export default ItemsPreviewTemplate;
