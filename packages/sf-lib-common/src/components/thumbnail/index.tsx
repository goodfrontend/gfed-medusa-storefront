import React from 'react';

import Image from 'next/image';

import { PlaceholderImage } from '@gfed-medusa/sf-lib-ui/icons/placeholder-image';
import { Container, clx } from '@medusajs/ui';

type ThumbnailProps = {
  thumbnail?: string | null;
  // TODO: Fix image typings
  images?: any[] | null;
  size?: 'small' | 'medium' | 'large' | 'full' | 'square';
  isFeatured?: boolean;
  imagePriority?: boolean;
  imageFetchPriority?: 'auto' | 'high' | 'low';
  className?: string;
  'data-testid'?: string;
};

const Thumbnail: React.FC<ThumbnailProps> = ({
  thumbnail,
  images,
  size = 'small',
  imagePriority = false,
  imageFetchPriority,
  className,
  'data-testid': dataTestid,
}) => {
  const initialImage = thumbnail || images?.[0]?.url;

  return (
    <Container
      className={clx(
        'rounded-large bg-ui-bg-subtle shadow-elevation-card-rest group-hover:shadow-elevation-card-hover relative w-full overflow-hidden p-4 transition-shadow duration-150 ease-in-out',
        className,
        {
          'aspect-[29/34]': size !== 'square',
          'aspect-[1/1]': size === 'square',
          'w-[180px]': size === 'small',
          'w-[290px]': size === 'medium',
          'w-[440px]': size === 'large',
          'w-full': size === 'full',
        }
      )}
      data-testid={dataTestid}
    >
      <ImageOrPlaceholder
        image={initialImage}
        size={size}
        imagePriority={imagePriority}
        imageFetchPriority={imageFetchPriority}
      />
    </Container>
  );
};

const ImageOrPlaceholder = ({
  image,
  size,
  imagePriority,
  imageFetchPriority,
}: Pick<
  ThumbnailProps,
  'size' | 'imagePriority' | 'imageFetchPriority'
> & { image?: string }) => {
  return image ? (
    <Image
      src={image}
      alt="Thumbnail"
      className="absolute inset-0 object-cover object-center"
      draggable={false}
      priority={imagePriority}
      {...(imageFetchPriority ? { fetchPriority: imageFetchPriority } : {})}
      quality={40}
      sizes="(max-width: 576px) 280px, (max-width: 768px) 360px, (max-width: 992px) 480px, 800px"
      fill
    />
  ) : (
    <div className="absolute inset-0 flex h-full w-full items-center justify-center">
      <PlaceholderImage size={size === 'small' ? 16 : 24} />
    </div>
  );
};

export { Thumbnail };
