import { useState } from 'react';

import { Spinner, Trash } from '@medusajs/icons';
import { clx } from '@medusajs/ui';

import { deleteLineItem } from '@/lib/data/cart';
import { useStorefrontContext } from '@/lib/data/context';

const DeleteButton = ({
  id,
  children,
  className,
}: {
  id: string;
  children?: React.ReactNode;
  className?: string;
}) => {
  const ctx = useStorefrontContext();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async (id: string) => {
    setIsDeleting(true);
    await deleteLineItem(id, ctx).catch((err) => {
      setIsDeleting(false);
    });
  };

  return (
    <div
      className={clx(
        'text-small-regular flex items-center justify-between',
        className
      )}
    >
      <button
        className="text-ui-fg-subtle hover:text-ui-fg-base flex cursor-pointer gap-x-1"
        onClick={() => handleDelete(id)}
      >
        {isDeleting ? <Spinner className="animate-spin" /> : <Trash />}
        <span>{children}</span>
      </button>
    </div>
  );
};

export { DeleteButton };
