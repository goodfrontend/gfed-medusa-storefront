import repeat from '@/lib/util/repeat';

const SkeletonCartPage = () => {
  return (
    <div className="small:grid-cols-[1fr_360px] grid gap-x-40 gap-y-6">
      {/* Left column — cart items */}
      <div className="flex flex-col gap-y-6 bg-white py-6">
        {/* Sign-in prompt skeleton */}
        <div className="flex items-start justify-between gap-x-4">
          <div className="h-14 flex-1 animate-pulse bg-gray-200" />
          <div className="h-9 w-24 shrink-0 animate-pulse bg-gray-200" />
        </div>

        {/* Cart heading */}
        <div className="h-8 w-20 animate-pulse bg-gray-200" />

        {/* Cart items */}
        <div className="flex flex-col gap-y-2">
          {repeat(3).map((index) => (
            <div key={index} className="h-20 w-full animate-pulse bg-gray-200" />
          ))}
        </div>
      </div>

      {/* Right column — summary */}
      <div className="relative">
        <div className="sticky top-12 flex flex-col gap-y-8">
          <div className="bg-white py-6">
            <div className="flex flex-col gap-y-4">
              {/* Summary heading */}
              <div className="h-8 w-24 animate-pulse bg-gray-200" />

              {/* Summary content */}
              <div className="h-44 w-full animate-pulse bg-gray-200" />

              {/* Checkout button */}
              <div className="h-10 w-full animate-pulse bg-gray-200" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonCartPage;
