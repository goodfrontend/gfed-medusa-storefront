import SkeletonProductPreview from '@/components/skeleton-product-preview';
import repeat from '@/lib/utils/repeat';

const SkeletonProductGrid = ({
  numberOfProducts = 8,
}: {
  numberOfProducts?: number;
}) => {
  return (
    <ul
      className="grid flex-1 grid-cols-[repeat(auto-fit,_minmax(min(100%,_max(10rem,_calc((100%_-_4.5rem)_/_4))),_1fr))] gap-x-6 gap-y-8"
      data-testid="products-list-loader"
    >
      {repeat(numberOfProducts).map((index) => (
        <li key={index}>
          <SkeletonProductPreview />
        </li>
      ))}
    </ul>
  );
};

export default SkeletonProductGrid;
