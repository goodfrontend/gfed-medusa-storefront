import React from 'react';

import { Text, clx } from '@medusajs/ui';
import * as AccordionPrimitive from '@radix-ui/react-accordion';

type AccordionItemProps = AccordionPrimitive.AccordionItemProps & {
  title: string;
  subtitle?: string;
  description?: string;
  required?: boolean;
  tooltip?: string;
  forceMountContent?: true;
  headingSize?: 'small' | 'medium' | 'large';
  customTrigger?: React.ReactNode;
  complete?: boolean;
  active?: boolean;
  triggerable?: boolean;
  children: React.ReactNode;
};

type AccordionProps =
  | (AccordionPrimitive.AccordionSingleProps &
      React.RefAttributes<HTMLDivElement>)
  | (AccordionPrimitive.AccordionMultipleProps &
      React.RefAttributes<HTMLDivElement>);

const Accordion: React.FC<AccordionProps> & {
  Item: React.FC<AccordionItemProps>;
} = ({ children, ...props }) => {
  return (
    <AccordionPrimitive.Root {...props}>{children}</AccordionPrimitive.Root>
  );
};

const Item: React.FC<AccordionItemProps> = ({
  title,
  subtitle,
  description,
  children,
  className,
  headingSize = 'large',
  customTrigger = undefined,
  forceMountContent = undefined,
  triggerable,
  ...props
}) => {
  const titleId = React.useId();

  return (
    <AccordionPrimitive.Item
      {...props}
      className={clx(
        'border-grey-20 group border-t last:mb-0 last:border-b',
        'py-3',
        className
      )}
    >
      <AccordionPrimitive.Header className="px-1">
        <div className="flex flex-col">
          <div className="flex w-full items-center justify-between">
            <div className="flex items-center gap-4">
              <Text id={titleId} className="text-ui-fg-subtle text-sm">
                {title}
              </Text>
            </div>
            <AccordionPrimitive.Trigger aria-labelledby={titleId}>
              {customTrigger || <MorphingTrigger />}
            </AccordionPrimitive.Trigger>
          </div>
          {subtitle && (
            <Text as="span" size="small" className="mt-1">
              {subtitle}
            </Text>
          )}
        </div>
      </AccordionPrimitive.Header>
      <AccordionPrimitive.Content
        forceMount={forceMountContent}
        className={clx(
          'radix-state-closed:pointer-events-none radix-state-closed:animate-accordion-close radix-state-open:animate-accordion-open px-1'
        )}
      >
        <div className="inter-base-regular group-radix-state-closed:animate-accordion-close">
          {description && <Text>{description}</Text>}
          <div className="w-full">{children}</div>
        </div>
      </AccordionPrimitive.Content>
    </AccordionPrimitive.Item>
  );
};

Accordion.Item = Item;

const MorphingTrigger = () => {
  return (
    <div className="relative h-5 w-5">
      <span className="bg-grey-50 absolute inset-x-[15%] top-1/2 h-[1.5px] -translate-y-1/2" />
      <span className="bg-grey-50 absolute inset-y-[15%] left-1/2 w-[1.5px] -translate-x-1/2 group-data-[state=open]:hidden" />
    </div>
  );
};

export default Accordion;
