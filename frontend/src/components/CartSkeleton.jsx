import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

function CartSkeleton() {
  return (
    <SkeletonTheme baseColor="#f0f0f0" highlightColor="#e0e0e0">
      <div className="min-h-screen bg-ivory py-12">
        <div className="container-custom">
          {/* Title */}
          <Skeleton width={200} height={48} className="mb-8" />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <Skeleton width={150} height={32} className="mb-6" />
                
                {/* Cart Item Skeletons */}
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex gap-6 pb-6 mb-6 border-b border-gray-200 last:border-0">
                    {/* Image */}
                    <Skeleton width={120} height={120} />
                    
                    {/* Content */}
                    <div className="flex-1">
                      <Skeleton width="70%" height={24} className="mb-2" />
                      <Skeleton width="50%" height={20} className="mb-4" />
                      
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                          <Skeleton width={30} height={30} />
                          <Skeleton width={40} height={20} />
                          <Skeleton width={30} height={30} />
                        </div>
                        <Skeleton width={80} height={32} />
                      </div>
                    </div>
                    
                    {/* Price */}
                    <div className="text-right">
                      <Skeleton width={80} height={24} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-lg p-6 sticky top-4">
                <Skeleton width={150} height={32} className="mb-6" />
                
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <Skeleton width={80} height={20} />
                    <Skeleton width={60} height={20} />
                  </div>
                  <div className="flex justify-between">
                    <Skeleton width={80} height={20} />
                    <Skeleton width={60} height={20} />
                  </div>
                  <div className="flex justify-between">
                    <Skeleton width={80} height={20} />
                    <Skeleton width={60} height={20} />
                  </div>
                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex justify-between">
                      <Skeleton width={80} height={24} />
                      <Skeleton width={80} height={24} />
                    </div>
                  </div>
                  <Skeleton width="100%" height={48} className="mt-6" />
                  <Skeleton width="100%" height={40} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SkeletonTheme>
  );
}

export default CartSkeleton;
