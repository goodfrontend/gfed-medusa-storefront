import SkeletonCartPage from '@gfed-medusa/sf-lib-checkout/templates/skeleton-cart-page';

export default function Loading() {
  return (
    <div className="py-12">
      <div className="content-container">
        <SkeletonCartPage />
      </div>
    </div>
  );
}
