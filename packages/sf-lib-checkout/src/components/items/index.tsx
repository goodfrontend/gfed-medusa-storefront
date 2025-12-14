import Item from '@components/item';
import SkeletonLineItem from '@components/skeleton-line-item';
import { Divider } from '@gfed-medusa/sf-lib-ui/components/divider';
import { Order } from '@lib/gql/generated-types/graphql';
import repeat from '@lib/util/repeat';
import { Table } from '@medusajs/ui';

type ItemsProps = {
  order: Order;
};

const Items = ({ order }: ItemsProps) => {
  const items = order.items;

  return (
    <div className="flex flex-col">
      <Divider className="!mb-0" />
      <Table>
        <Table.Body data-testid="products-table">
          {items?.length
            ? items
                .sort((a, b) => {
                  return (a.createdAt ?? '') > (b.createdAt ?? '') ? -1 : 1;
                })
                .map((item) => {
                  return (
                    <Item
                      key={item.id}
                      item={item}
                      currencyCode={order.currencyCode}
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

export default Items;
