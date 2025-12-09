import { VariantProps, cva } from 'class-variance-authority';
import { Star } from 'lucide-react';

import { cn } from '@/lib/utils';

const iconVariant = cva([], {
  variants: {
    iconSize: {
      default: 'w-3 h-3',
      md: 'w-4 h-4',
      lg: 'w-5 h-5',
      xl: 'w-6 h-6',
    },
  },
  defaultVariants: {
    iconSize: 'default',
  },
});

const textVariant = cva([], {
  variants: {
    textSize: {
      default: 'text-xs',
      sm: 'text-sm',
      md: 'text-base',
    },
  },
  defaultVariants: {
    textSize: 'default',
  },
});

type StarDisplay = 'minimal' | 'compact' | 'detailed';

type BaseProps = {
  average: number;
  ratingCount?: number;
  starColor?: string;
};

type IconVariant = VariantProps<typeof iconVariant>;
type TextVariant = VariantProps<typeof textVariant>;

type RatingCountProps = BaseProps &
  TextVariant &
  IconVariant & {
    display?: StarDisplay;
    iconClassName?: string;
    textClassName?: string;
  };

function formatRatingCount(count: number) {
  return new Intl.NumberFormat('en', {
    notation: 'compact',
    maximumFractionDigits: 1,
  }).format(count);
}

function Stars({
  iconSize,
  average,
  starColor,
  iconClassName,
}: Pick<BaseProps, 'average' | 'starColor'> &
  IconVariant & { iconClassName?: string }) {
  return (
    <div role="img" className="relative w-fit">
      <div className="flex gap-0.5">
        {Array(5)
          .fill(0)
          .map((_, idx) => (
            <Star
              className={cn(iconVariant({ iconSize }), iconClassName)}
              key={idx}
            />
          ))}
      </div>
      <div
        style={{ width: `${(average / 5) * 100}%` }}
        className="absolute top-0 bottom-0 flex gap-0.5 overflow-hidden"
      >
        {Array(5)
          .fill(0)
          .map((_, idx) => (
            <Star
              className={cn(
                iconVariant({ iconSize }),
                'shrink-0',
                iconClassName
              )}
              style={{ color: starColor }}
              key={idx}
              fill={starColor}
            />
          ))}
      </div>
    </div>
  );
}

function StarCompact({
  ratingCount,
  average,
  starColor,
  iconSize,
  textSize,
  iconClassName,
  textClassName,
}: RatingCountProps) {
  return (
    <div className="flex items-center gap-1">
      <Stars
        average={average}
        starColor={starColor}
        iconSize={iconSize}
        iconClassName={iconClassName}
      />
      {ratingCount ? (
        <span className={cn(textVariant({ textSize }), textClassName)}>
          {formatRatingCount(ratingCount)}
        </span>
      ) : null}
    </div>
  );
}
function StarDetailed({
  average,
  iconSize,
  starColor,
  textSize,
  ratingCount,
  textClassName,
  iconClassName,
}: RatingCountProps) {
  return (
    <div className="relative flex items-center gap-1">
      <div className={cn('flex items-center gap-1')}>
        <span className={cn(textVariant({ textSize }))}>{average}</span>
        <Stars
          average={average}
          iconSize={iconSize}
          starColor={starColor}
          iconClassName={iconClassName}
        />
      </div>
      {ratingCount ? (
        <>
          <div className="leading-none">|</div>
          <span className={cn(textVariant({ textSize }), textClassName)}>
            {formatRatingCount(ratingCount)} ratings
          </span>
        </>
      ) : null}
    </div>
  );
}
function StarMinimal({
  average,
  starColor,
  textSize,
  iconSize,
  textClassName,
  iconClassName,
}: BaseProps &
  IconVariant &
  TextVariant & {
    textClassName?: string;
    iconClassName?: string;
  }) {
  return (
    <div className={cn('flex items-center gap-0.5')}>
      <span className={cn(textVariant({ textSize }), textClassName)}>
        {average}
      </span>
      <Star
        className={cn(iconVariant({ iconSize }), iconClassName)}
        style={{ color: starColor }}
        fill={starColor}
      />
    </div>
  );
}

function RatingCount({
  average,
  ratingCount,
  starColor = '#EDC001',
  display = 'compact',
  iconSize,
  textSize,
  iconClassName,
  textClassName,
}: RatingCountProps) {
  const label = `Rate ${average} out of 5 ${ratingCount ? `from ${ratingCount} ratings` : ''} 
    
  `;
  switch (display) {
    case 'minimal':
      return (
        <div data-testid="rating-count-minimal" aria-label={label}>
          <StarMinimal
            iconClassName={iconClassName}
            textClassName={textClassName}
            average={average}
            starColor={starColor}
            textSize={textSize}
            iconSize={iconSize}
          />
        </div>
      );
    case 'detailed':
      return (
        <div data-testid="rating-count-detailed" aria-label={label}>
          <StarDetailed
            iconClassName={iconClassName}
            textClassName={textClassName}
            average={average}
            ratingCount={ratingCount}
            starColor={starColor}
            textSize={textSize}
            iconSize={iconSize}
          />
        </div>
      );
    default:
      return (
        <div data-testid="rating-count-default" aria-label={label}>
          <StarCompact
            iconClassName={iconClassName}
            textClassName={textClassName}
            average={average}
            ratingCount={ratingCount}
            starColor={starColor}
            textSize={textSize}
            iconSize={iconSize}
          />
        </div>
      );
  }
}

export { RatingCount, iconVariant, textVariant };
