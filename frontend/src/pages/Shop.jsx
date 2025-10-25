import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../store/slices/productSlice';
import ProductCard from '../components/ProductCard';
import { ProductSkeletonGrid } from '../components/ProductSkeleton';

function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  const { products, loading, totalPages, currentPage } = useSelector(
    (state) => state.product
  );

  const [filters, setFilters] = useState({
    sort: searchParams.get('sort') || 'newest',
    search: searchParams.get('search') || '',
    page: parseInt(searchParams.get('page')) || 1,
  });

  useEffect(() => {
    const params = {};
    Object.keys(filters).forEach((key) => {
      if (filters[key]) {
        params[key] = filters[key];
      }
    });
    dispatch(fetchProducts(params));
  }, [filters, dispatch]);

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value, page: 1 };
    setFilters(newFilters);

    const params = new URLSearchParams();
    Object.keys(newFilters).forEach((k) => {
      if (newFilters[k]) params.set(k, newFilters[k]);
    });
    setSearchParams(params);
  };

  const handlePageChange = (page) => {
    setFilters({ ...filters, page });
    const params = new URLSearchParams(searchParams);
    params.set('page', page);
    setSearchParams(params);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-ivory py-12">
      <div className="container-custom">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-serif font-bold mb-2">Our Collection</h1>
          <p className="text-charcoal-600">
            Discover {products.length} luxury products
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Products Grid */}
          <div className="flex-1">
            {/* Sort */}
            <div className="flex justify-between items-center mb-6">
              <p className="text-charcoal-600">
                Showing {products.length} of {products.length} products
              </p>
              <select
                value={filters.sort}
                onChange={(e) => handleFilterChange('sort', e.target.value)}
                className="input-field w-auto"
              >
                <option value="newest">Newest</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <ProductSkeletonGrid count={9} />
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-xl text-charcoal-600">No products found</p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {products.map((product, index) => (
                    <motion.div
                      key={product._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <ProductCard product={product} />
                    </motion.div>
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center mt-12 space-x-2">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                      (page) => (
                        <button
                          key={page}
                          onClick={() => handlePageChange(page)}
                          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                            currentPage === page
                              ? 'bg-primary text-ivory'
                              : 'bg-white text-charcoal hover:bg-primary-100'
                          }`}
                        >
                          {page}
                        </button>
                      )
                    )}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Shop;
