import { Fragment, ReactNode } from 'react';

import {
  FileBlock,
  IconLinkMark,
  ImageBlock,
  RichTextBlock,
  Span,
  TextBlock,
} from '@gfed-medusa/sf-lib-common/types/graphql';
import { Back } from '@gfed-medusa/sf-lib-ui/icons/back';
import { Bancontact } from '@gfed-medusa/sf-lib-ui/icons/bancontact';
import { ChevronDown } from '@gfed-medusa/sf-lib-ui/icons/chevron-down';
import { Eye } from '@gfed-medusa/sf-lib-ui/icons/eye';
import { EyeOff } from '@gfed-medusa/sf-lib-ui/icons/eye-off';
import { FastDelivery } from '@gfed-medusa/sf-lib-ui/icons/fast-delivery';
import { Ideal } from '@gfed-medusa/sf-lib-ui/icons/ideal';
import { MapPin } from '@gfed-medusa/sf-lib-ui/icons/map-pin';
import { Medusa } from '@gfed-medusa/sf-lib-ui/icons/medusa';
import { NextJs } from '@gfed-medusa/sf-lib-ui/icons/nextjs';
import { Package } from '@gfed-medusa/sf-lib-ui/icons/package';
import { PayPal } from '@gfed-medusa/sf-lib-ui/icons/paypal';
import { PlaceholderImage } from '@gfed-medusa/sf-lib-ui/icons/placeholder-image';
import { Refresh } from '@gfed-medusa/sf-lib-ui/icons/refresh';
import { Spinner } from '@gfed-medusa/sf-lib-ui/icons/spinner';
import { Trash } from '@gfed-medusa/sf-lib-ui/icons/trash';
import { User } from '@gfed-medusa/sf-lib-ui/icons/user';
import { X } from '@gfed-medusa/sf-lib-ui/icons/x';
import { ArrowUpRightMini } from '@medusajs/icons';
import { Heading, Text } from '@medusajs/ui';

type PortableTextProps = {
  value: RichTextBlock[];
};

const PortableText = ({ value }: PortableTextProps) => {
  if (!value || !Array.isArray(value)) {
    return null;
  }

  const getBlockType = (block: RichTextBlock): string => {
    if (block.__typename) {
      const typename = block.__typename.toLowerCase();
      if (typename === 'textblock') return 'block';
      return typename.replace('block', '');
    }
    return 'unknown';
  };

  const renderSpan = (
    span: Span,
    markDefs: TextBlock['markDefs']
  ): ReactNode => {
    if (!span.text) return null;

    let content: ReactNode = span.text;
    const marks = span.marks || [];

    marks.forEach((mark) => {
      if (typeof mark === 'string') {
        switch (mark) {
          case 'strong':
            content = <strong>{content}</strong>;
            break;
          case 'em':
            content = <em>{content}</em>;
            break;
          case 'code':
            content = (
              <code className="bg-ui-bg-subtle rounded px-1 py-0.5 font-mono text-sm">
                {content}
              </code>
            );
            break;
          case 'underline':
            content = <u>{content}</u>;
            break;
          case 'superscript':
            content = <sup>{content}</sup>;
            break;
          case 'subscript':
            content = <sub>{content}</sub>;
            break;
        }
      }
    });

    // Handle marks that reference markDefs by _key
    const getMarkByKey = (key: string) => {
      return markDefs?.find((def) => def._key === key);
    };

    // Find link marks (both direct objects and references)
    const linkMark = marks.find((mark) => {
      if (typeof mark === 'object') {
        return mark;
      }
      if (typeof mark === 'string') {
        const markDef = getMarkByKey(mark);
        return (
          markDef &&
          (markDef._type === 'link' || markDef.__typename === 'LinkMark')
        );
      }
      return false;
    });

    // Find icon link marks (both direct objects and references)
    const iconLinkMark = marks.find((mark) => {
      if (typeof mark === 'object') {
        return mark;
      }
      if (typeof mark === 'string') {
        const markDef = getMarkByKey(mark);
        return (
          markDef &&
          (markDef._type === 'iconlink' ||
            markDef.__typename === 'IconLinkMark')
        );
      }
      return false;
    });

    // Get the actual mark object (either direct or from markDefs)
    const resolvedIconLinkMark: IconLinkMark | undefined =
      typeof iconLinkMark === 'string'
        ? (() => {
            const mark = getMarkByKey(iconLinkMark);
            return mark &&
              (mark.__typename === 'IconLinkMark' || mark._type === 'iconlink')
              ? (mark as IconLinkMark)
              : undefined;
          })()
        : iconLinkMark
          ? (iconLinkMark as IconLinkMark)
          : undefined;
    const resolvedLinkMark =
      typeof linkMark === 'string' ? getMarkByKey(linkMark) : linkMark;

    if (resolvedIconLinkMark) {
      return renderIconLink(resolvedIconLinkMark, content);
    }

    if (resolvedLinkMark) {
      return (
        <a
          href={resolvedLinkMark.href}
          target={resolvedLinkMark.target ?? ''}
          className="text-ui-fg-interactive hover:underline"
        >
          {content}
        </a>
      );
    }

    return content;
  };

  const renderIconLink = (
    mark: IconLinkMark,
    children: ReactNode
  ): ReactNode => {
    const renderIcon = () => {
      switch (mark.iconType) {
        case 'class':
          return mark.iconClass ? <i className={mark.iconClass} /> : null;
        case 'component':
          switch (mark.iconComponent) {
            case 'ArrowUpRightMini':
              return (
                <ArrowUpRightMini
                  fill={mark.iconFill ?? ''}
                  className="h-4 w-4"
                />
              );
            case 'Back':
              return <Back size={16} fill={mark.iconFill ?? ''} />;
            case 'Bancontact':
              return <Bancontact size={16} fill={mark.iconFill ?? ''} />;
            case 'ChevronDown':
              return <ChevronDown size={16} fill={mark.iconFill ?? ''} />;
            case 'Eye':
              return <Eye size={16} fill={mark.iconFill ?? ''} />;
            case 'EyeOff':
              return <EyeOff size={16} fill={mark.iconFill ?? ''} />;
            case 'FastDelivery':
              return <FastDelivery size={16} fill={mark.iconFill ?? ''} />;
            case 'Ideal':
              return <Ideal size={16} fill={mark.iconFill ?? ''} />;
            case 'MapPin':
              return <MapPin size={16} fill={mark.iconFill ?? ''} />;
            case 'Medusa':
              return <Medusa size={16} fill={mark.iconFill ?? ''} />;
            case 'NextJs':
              return <NextJs size={16} fill={mark.iconFill ?? ''} />;
            case 'Package':
              return <Package size={16} fill={mark.iconFill ?? ''} />;
            case 'PayPal':
              return <PayPal />;
            case 'PlaceholderImage':
              return <PlaceholderImage size={16} fill={mark.iconFill ?? ''} />;
            case 'Refresh':
              return <Refresh size={16} fill={mark.iconFill ?? ''} />;
            case 'Spinner':
              return <Spinner size={16} fill={mark.iconFill ?? ''} />;
            case 'Trash':
              return <Trash size={16} fill={mark.iconFill ?? ''} />;
            case 'User':
              return <User size={16} fill={mark.iconFill ?? ''} />;
            case 'X':
              return <X size={16} fill={mark.iconFill ?? ''} />;
            default:
              return null;
          }
        case 'sanity':
          return mark.iconImage?.asset?.url ? (
            <img
              src={mark.iconImage.asset.url}
              alt={mark.iconImage.alt || 'Icon'}
              width={16}
              height={16}
              className="h-4 w-4"
            />
          ) : null;
        case 'url':
          return mark.iconUrl ? (
            <img
              src={mark.iconUrl}
              alt="Icon"
              width={16}
              height={16}
              className="h-4 w-4"
            />
          ) : null;
        default:
          return null;
      }
    };

    return (
      <a
        href={mark.href}
        target={mark.target ?? ''}
        className="text-ui-fg-interactive inline-flex items-center gap-1 hover:underline"
      >
        {children}
        {renderIcon()}
      </a>
    );
  };

  const renderTextBlock = (block: TextBlock): ReactNode => {
    const style = block.style || 'normal';
    const children = block.children || [];
    const markDefs = block.markDefs || [];

    const content = children.map((child, index) => (
      <Fragment key={child._key || index}>
        {renderSpan(child, markDefs)}
      </Fragment>
    ));

    switch (style) {
      case 'h1':
        return <h1 className="mb-6 mt-8 text-4xl font-bold">{content}</h1>;
      case 'h2':
        return (
          <Heading level="h2" className="mb-4 mt-6 text-3xl font-semibold">
            {content}
          </Heading>
        );
      case 'h3':
        return (
          <Heading level="h3" className="mb-4 mt-6 text-2xl font-semibold">
            {content}
          </Heading>
        );
      case 'h4':
        return <h4 className="mb-3 mt-4 text-xl font-semibold">{content}</h4>;
      case 'h5':
        return <h5 className="mb-3 mt-4 text-lg font-semibold">{content}</h5>;
      case 'h6':
        return <h6 className="mb-2 mt-4 text-base font-semibold">{content}</h6>;
      case 'blockquote':
        return (
          <blockquote className="border-ui-border-base my-4 border-l-4 py-2 pl-4 italic">
            <Text>{content}</Text>
          </blockquote>
        );
      default:
        return <Text className="mb-4 leading-relaxed">{content}</Text>;
    }
  };

  const renderImage = (image: ImageBlock): ReactNode => {
    if (!image.asset?.url) return null;

    return (
      <div className="my-6">
        <img
          src={image.asset.url}
          alt={image.alt || ''}
          width={800}
          height={400}
          className="h-auto w-full rounded-lg"
        />
      </div>
    );
  };

  const renderFileBlock = (file: FileBlock): ReactNode => {
    if (!file.asset?.url) return null;

    return (
      <div className="my-6">
        <a
          href={file.asset.url}
          target="_blank"
          rel="noopener noreferrer"
          className="border-ui-border-base text-ui-fg-interactive hover:bg-ui-bg-subtle inline-flex items-center gap-2 rounded-lg border p-4"
        >
          <span>📎</span>
          <span>{file.asset.originalFilename || 'Download file'}</span>
          {file.asset.size && (
            <span className="text-ui-fg-muted text-sm">
              ({Math.round(file.asset.size / 1024)} KB)
            </span>
          )}
        </a>
      </div>
    );
  };

  const renderList = (items: TextBlock[], listType: string): ReactNode => {
    const ListComponent = listType === 'bullet' ? 'ul' : 'ol';
    const listClass =
      listType === 'bullet'
        ? 'list-disc pl-6 mb-4 space-y-1'
        : 'list-decimal pl-6 mb-4 space-y-1';

    return (
      <ListComponent className={listClass}>
        {items.map((item) => {
          const markDefs = item.markDefs || [];
          return (
            <li key={item._key} className="leading-relaxed">
              {item.children?.map((child, childIndex) => (
                <Fragment key={child._key || childIndex}>
                  {renderSpan(child, markDefs)}
                </Fragment>
              ))}
            </li>
          );
        })}
      </ListComponent>
    );
  };

  const renderBlock = (block: RichTextBlock): ReactNode => {
    const blockType = getBlockType(block);

    if (
      blockType === 'block' ||
      blockType === 'textblock' ||
      blockType === 'text'
    ) {
      return renderTextBlock(block as TextBlock);
    }

    if (blockType === 'image' || blockType === 'imageblock') {
      return renderImage(block as ImageBlock);
    }

    if (blockType === 'file' || blockType === 'fileblock') {
      return renderFileBlock(block as FileBlock);
    }

    return null;
  };

  // Process blocks and group consecutive list items
  const processedContent: ReactNode[] = [];
  let currentListItems: TextBlock[] = [];
  let currentListType: string | null = null;

  value.forEach((block: RichTextBlock, index: number) => {
    const blockType = getBlockType(block);

    if (blockType === 'block' && (block as TextBlock).listItem) {
      const textBlock = block as TextBlock;
      const listItem = textBlock.listItem || null;
      if (currentListType !== listItem) {
        if (currentListItems.length > 0 && currentListType) {
          processedContent.push(
            <Fragment key={`list-${index}`}>
              {renderList(currentListItems, currentListType)}
            </Fragment>
          );
        }
        currentListItems = [textBlock];
        currentListType = listItem;
      } else {
        currentListItems.push(textBlock);
      }
    } else {
      if (currentListItems.length > 0 && currentListType) {
        processedContent.push(
          <Fragment key={`list-${index}`}>
            {renderList(currentListItems, currentListType)}
          </Fragment>
        );
        currentListItems = [];
        currentListType = null;
      }
      processedContent.push(
        <Fragment key={block._key || index}>{renderBlock(block)}</Fragment>
      );
    }
  });

  if (currentListItems.length > 0 && currentListType) {
    processedContent.push(
      <Fragment key="final-list">
        {renderList(currentListItems, currentListType)}
      </Fragment>
    );
  }

  return <div className="prose prose-ui max-w-none">{processedContent}</div>;
};

export { PortableText };
