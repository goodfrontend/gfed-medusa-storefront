import React from 'react';

import { getImageKitUrl } from '../../lib/utils/imagekit';
import { PlaceholderImage } from '@gfed-medusa/sf-lib-ui/icons/placeholder-image';
import { Container, clx } from '@medusajs/ui';

type ThumbnailProps = {
  thumbnail?: string | null;
  // TODO: Fix image typings
  images?: any[] | null;
  size?: 'small' | 'medium' | 'large' | 'full' | 'square';
  isFeatured?: boolean;
  imageFetchPriority?: 'auto' | 'high' | 'low';
  className?: string;
  'data-testid'?: string;
};

const Thumbnail: React.FC<ThumbnailProps> = ({
  thumbnail,
  images,
  size = 'small',
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
        imageFetchPriority={imageFetchPriority}
      />
    </Container>
  );
};

const ImageOrPlaceholder = ({
  image,
  size,
  imageFetchPriority,
}: Pick<
  ThumbnailProps,
  'size' | 'imageFetchPriority'
> & { image?: string }) => {
  return image ? (
    <img
      src={getImageKitUrl(image, { width: 800, quality: 40 })}
      alt="Thumbnail"
      className="absolute inset-0 object-cover object-center"
      draggable={false}
      {...(imageFetchPriority ? { fetchPriority: imageFetchPriority } : {})}
    />
  ) : (
    <div className="absolute inset-0 flex h-full w-full items-center justify-center">
      <PlaceholderImage size={size === 'small' ? 16 : 24} />
    </div>
  );
};

export { Thumbnail };
