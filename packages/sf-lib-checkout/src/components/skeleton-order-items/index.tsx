const SkeletonOrderItems = () => {
  const item = (
    <div className="grid w-full grid-cols-[minmax(80px,_122px)_1fr] gap-x-4 overflow-hidden">
      <div className="aspect-[29/34] w-full bg-gray-100"></div>
      <div className="flex min-w-0 items-start justify-between gap-x-2">
        <div className="flex min-w-0 flex-1 flex-col gap-y-2">
          <div className="h-6 w-32 bg-gray-100 sm:w-48"></div>
          <div className="h-4 w-24 bg-gray-100"></div>
          <div className="h-4 w-32 bg-gray-100"></div>
        </div>
        <div className="h-6 w-20 shrink-0 bg-gray-100 sm:w-32"></div>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col gap-y-4 border-y border-gray-200 py-10">
      {item}
      {item}
      {item}
    </div>
  );
};

export default SkeletonOrderItems;
