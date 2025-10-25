import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

function ProductSkeleton() {
  return (
    <SkeletonTheme baseColor="#f0f0f0" highlightColor="#e0e0e0">
      <div className="bg-white overflow-hidden">
        {/* Image Skeleton */}
        <div className="aspect-square">
          <Skeleton height="100%" />
        </div>
        
        {/* Content Skeleton */}
        <div className="p-6">
          {/* Title */}
          <Skeleton height={24} width="80%" className="mb-2" />
          <Skeleton height={24} width="60%" className="mb-3" />
          
          {/* Rating */}
          <Skeleton height={16} width="30%" className="mb-3" />
          
          {/* Price */}
          <Skeleton height={28} width="40%" />
        </div>
      </div>
    </SkeletonTheme>
  );
}

// Grid skeleton for multiple products
export function ProductSkeletonGrid({ count = 8 }) {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <ProductSkeleton key={index} />
      ))}
    </>
  );
}

export default ProductSkeleton;
