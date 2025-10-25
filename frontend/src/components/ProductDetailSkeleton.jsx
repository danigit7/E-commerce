import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

function ProductDetailSkeleton() {
  return (
    <SkeletonTheme baseColor="#f0f0f0" highlightColor="#e0e0e0">
      <div className="min-h-screen bg-ivory py-12">
        <div className="container-custom">
          {/* Breadcrumb Skeleton */}
          <div className="flex items-center space-x-2 mb-8">
            <Skeleton width={60} height={16} />
            <span>/</span>
            <Skeleton width={60} height={16} />
            <span>/</span>
            <Skeleton width={120} height={16} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            {/* Images Section */}
            <div>
              <div className="relative aspect-square overflow-hidden rounded-xl bg-white mb-4">
                <Skeleton height="100%" />
              </div>
              <div className="grid grid-cols-4 gap-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="aspect-square">
                    <Skeleton height="100%" />
                  </div>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div>
              <Skeleton width={100} height={20} className="mb-4" />
              <Skeleton width="80%" height={40} className="mb-6" />
              <div className="flex items-center space-x-2 mb-6">
                <Skeleton width={120} height={20} />
                <Skeleton width={150} height={16} />
              </div>
              <div className="flex items-baseline space-x-3 mb-6">
                <Skeleton width={120} height={40} />
                <Skeleton width={80} height={24} />
              </div>
              <Skeleton count={4} height={16} className="mb-8" />
              <Skeleton width={200} height={24} className="mb-6" />
              <Skeleton width={150} height={48} className="mb-8" />
              <div className="flex space-x-4">
                <Skeleton width="70%" height={56} />
                <Skeleton width={56} height={56} />
              </div>
            </div>
          </div>

          {/* Reviews Section */}
          <div className="bg-white rounded-xl p-8">
            <div className="flex items-center justify-between mb-8">
              <Skeleton width={200} height={32} />
              <Skeleton width={150} height={40} />
            </div>
            {[1, 2, 3].map((i) => (
              <div key={i} className="border-b border-gray-200 pb-6 mb-6">
                <Skeleton width={120} height={16} className="mb-2" />
                <Skeleton width={100} height={16} className="mb-2" />
                <Skeleton count={2} height={14} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </SkeletonTheme>
  );
}

export default ProductDetailSkeleton;
