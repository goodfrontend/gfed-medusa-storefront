'use client';

import { useCart } from '@gfed-medusa/sf-lib-common/lib/hooks/use-cart';
import { Heading, Table } from '@medusajs/ui';

import Item from '@/components/item';
import SkeletonLineItem from '@/components/skeleton-line-item';
import repeat from '@/lib/util/repeat';

const ItemsTemplate = () => {
  const { cart, isLoading } = useCart();
  const items = cart?.items;
  return (
    <div>
      <div className="flex items-center pb-3">
        <Heading className="text-[2rem] leading-[2.75rem]">Cart</Heading>
      </div>
      <Table>
        <Table.Header className="border-t-0">
          <Table.Row className="txt-medium-plus text-ui-fg-subtle">
            <Table.HeaderCell className="!pl-0">Item</Table.HeaderCell>
            <Table.HeaderCell></Table.HeaderCell>
            <Table.HeaderCell>Quantity</Table.HeaderCell>
            <Table.HeaderCell className="small:table-cell hidden">
              Price
            </Table.HeaderCell>
            <Table.HeaderCell className="!pr-0 text-right">
              Total
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {isLoading
            ? repeat(5).map((i) => {
                return <SkeletonLineItem key={i} />;
              })
            : items
              ? [...items]
                  .sort((a, b) => {
                    return (a.createdAt ?? '') > (b.createdAt ?? '') ? -1 : 1;
                  })
                  .map((item) => {
                    return (
                      <Item
                        key={item.id}
                        item={item}
                        currencyCode={cart?.currencyCode}
                      />
                    );
                  })
              : null}
        </Table.Body>
      </Table>
    </div>
  );
};

export default ItemsTemplate;
