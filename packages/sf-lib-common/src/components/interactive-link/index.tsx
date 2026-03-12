import { ArrowUpRightMini } from '@medusajs/icons';
import { Text, clx } from '@medusajs/ui';

import { LocalizedClientLink } from '../localized-client-link';

type InteractiveLinkProps = React.ComponentPropsWithoutRef<
  typeof LocalizedClientLink
> & {
  textClassName?: string;
  iconClassName?: string;
};

const InteractiveLink = ({
  href,
  children,
  onClick,
  className,
  textClassName,
  iconClassName,
  ...props
}: InteractiveLinkProps) => {
  return (
    <LocalizedClientLink
      className={clx('text-ui-fg-interactive group flex items-center gap-x-1', className)}
      href={href}
      onClick={onClick}
      {...props}
    >
      <Text className={clx('text-current', textClassName)}>{children}</Text>
      <ArrowUpRightMini
        className={clx(
          'duration-150 ease-in-out group-hover:rotate-45',
          iconClassName
        )}
        color="currentColor"
      />
    </LocalizedClientLink>
  );
};

export { InteractiveLink };
