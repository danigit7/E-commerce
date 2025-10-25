import { useState } from 'react';
import { ProductSkeletonGrid } from '../components/ProductSkeleton';
import ProductDetailSkeleton from '../components/ProductDetailSkeleton';
import CartSkeleton from '../components/CartSkeleton';

function SkeletonDemo() {
  const [demoType, setDemoType] = useState('products');

  return (
    <div className="min-h-screen bg-ivory py-12">
      <div className="container-custom">
        <h1 className="text-4xl font-serif font-bold mb-8">Skeleton Loading Demo</h1>
        
        {/* Demo Type Selector */}
        <div className="flex space-x-4 mb-8">
          <button
            onClick={() => setDemoType('products')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              demoType === 'products' ? 'bg-primary text-ivory' : 'bg-white text-charcoal hover:bg-primary-100'
            }`}
          >
            Product Grid
          </button>
          <button
            onClick={() => setDemoType('detail')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              demoType === 'detail' ? 'bg-primary text-ivory' : 'bg-white text-charcoal hover:bg-primary-100'
            }`}
          >
            Product Detail
          </button>
          <button
            onClick={() => setDemoType('cart')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              demoType === 'cart' ? 'bg-primary text-ivory' : 'bg-white text-charcoal hover:bg-primary-100'
            }`}
          >
            Cart
          </button>
        </div>

        {/* Skeleton Demos */}
        {demoType === 'products' && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Product Grid Skeleton</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <ProductSkeletonGrid count={6} />
            </div>
          </div>
        )}

        {demoType === 'detail' && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Product Detail Skeleton</h2>
            <ProductDetailSkeleton />
          </div>
        )}

        {demoType === 'cart' && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Cart Skeleton</h2>
            <CartSkeleton />
          </div>
        )}
      </div>
    </div>
  );
}

export default SkeletonDemo;
