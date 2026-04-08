import SkeletonProductPreview from '@/components/skeleton-product-preview';
import repeat from '@/lib/utils/repeat';

const SkeletonRelatedProducts = () => {
  return (
    <div className="product-page-constraint">
      <div className="mb-8 flex flex-col items-center gap-8 text-center">
        <div className="h-6 w-20 animate-pulse bg-gray-100"></div>
        <div className="mb-16 flex flex-col items-center gap-4 text-center">
          <div className="h-10 w-96 animate-pulse bg-gray-100"></div>
          <div className="h-10 w-48 animate-pulse bg-gray-100"></div>
        </div>
      </div>
      <ul className="grid flex-1 grid-cols-[repeat(auto-fill,_minmax(min(100%,_max(10rem,_calc((100%_-_4.5rem)_/_4))),_1fr))] gap-x-6 gap-y-8">
        {repeat(3).map((index) => (
          <li key={index}>
            <SkeletonProductPreview />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SkeletonRelatedProducts;
