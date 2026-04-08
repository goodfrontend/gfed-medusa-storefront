import { Container } from '@medusajs/ui';

const SkeletonProductPreview = () => {
  return (
    <div className="animate-pulse">
      <Container className="bg-ui-bg-subtle aspect-[29/34] w-full bg-gray-100" />
      <div className="mt-4 flex flex-col gap-y-2">
        <div className="h-6 w-4/5 bg-gray-100"></div>
        <div className="h-5 w-2/5 bg-gray-100"></div>
      </div>
    </div>
  );
};

export default SkeletonProductPreview;
