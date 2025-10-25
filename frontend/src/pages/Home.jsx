import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../store/slices/productSlice';
import ProductCard from '../components/ProductCard';
import { ProductSkeletonGrid } from '../components/ProductSkeleton';
import {
  FiTruck,
  FiShield,
  FiUsers,
  FiCreditCard,
  FiStar,
  FiChevronLeft,
  FiChevronRight,
} from 'react-icons/fi';

function Home() {
  const dispatch = useDispatch();
  const { products, loading } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(fetchProducts({ featured: 'true', limit: 8 }));
  }, [dispatch]);

  const features = [
    {
      icon: FiTruck,
      title: 'FREE SHIPPING NATIONWIDE',
      desc: 'Enjoy cost-free standard shipping',
    },
    {
      icon: FiShield,
      title: 'LIFETIME WARRANTY',
      desc: 'Perpetual product protection on limited materials',
    },
    {
      icon: FiUsers,
      title: '100,000+ COMMUNITY',
      desc: "Our #1 priority is the community's trust and reliability",
    },
    {
      icon: FiCreditCard,
      title: 'SECURE PAYMENTS',
      desc: 'Protected transactions with encrypted data for financial safety',
    },
  ];

  const collections = [
    {
      title: 'NEW RELEASES',
      subtitle: 'DISCOVER OUR COLLECTION',
      image:
        'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800',
    },
    {
      title: 'RUSSET X',
      subtitle: 'DISCOVER OUR COLLECTION',
      image:
        'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800',
    },
    {
      title: 'A/W ICONS',
      subtitle: 'DISCOVER OUR COLLECTION',
      image:
        'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800',
    },
  ];

  const testimonials = [
    {
      name: 'Abdul Wahab',
      title: 'Drip Check ❄️ ✔️',
      text: "The Ring and the whole packaging was amazing no cap. I would suggest russet anytime it's a total gangbanger in the market. Definitely going to buy Esker as well",
      rating: 5,
    },
    {
      name: 'Hamza Zia',
      title: 'Good quality',
      text: 'The ring feels premium to use, customer service is excellent aswell got my ring size changed without any hassle. Great product!',
      rating: 5,
    },
  ];

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center bg-black">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600')] bg-cover bg-center opacity-30"></div>

        <div className="relative z-10 container-custom text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-6xl md:text-8xl font-bold mb-8">My Store</h1>
            <Link to="/shop">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-black px-4 sm:px-6 lg:px-8 py-2 sm:py-3 lg:py-4 text-sm sm:text-base lg:text-lg font-medium hover:bg-gray-100 transition-colors"
              >
                SHOP JEWELRY
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <feature.icon className="text-black mx-auto mb-4" size={32} />
                <h3 className="font-bold text-lg mb-2 text-black uppercase">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-600">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Collection Banners */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {collections.map((collection, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative aspect-square overflow-hidden group cursor-pointer"
              >
                <img
                  src={collection.image}
                  alt={collection.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300 flex flex-col justify-between p-8">
                  <p className="text-white text-sm uppercase tracking-wide">
                    {collection.subtitle}
                  </p>
                  <h3 className="text-white text-3xl font-bold uppercase">
                    {collection.title}
                  </h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Best Sellers Section */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-2xl font-bold text-black mb-2">
              FEATURED COLLECTION
            </h2>
            <h3 className="text-4xl font-bold text-black">BEST SELLERS</h3>
          </motion.div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              <ProductSkeletonGrid count={8} />
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {products.slice(0, 8).map((product, index) => (
                <motion.div
                  key={product._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </div>
          )}

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-right mt-12"
          >
            <Link to="/shop">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-black text-white px-4 sm:px-6 lg:px-8 py-2 sm:py-3 text-sm sm:text-base font-medium hover:bg-gray-800 transition-colors"
              >
                VIEW ALL
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Fresh Water Pearls Banner */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
            <img
              src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1200"
              alt="Fresh Water Pearls"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-orange-500/20 flex flex-col justify-center items-center text-center p-8">
              <p className="text-white text-sm uppercase tracking-wide mb-4">
                JUST LANDED
              </p>
              <h3 className="text-white text-5xl font-bold uppercase mb-8">
                FRESH WATER PEARLS
              </h3>
              <button className="bg-white text-black px-4 sm:px-6 lg:px-8 py-2 sm:py-3 text-sm sm:text-base font-medium hover:bg-gray-100 transition-colors">
                COP NOW
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2 className="text-4xl font-bold text-black mb-2">
              What The Community Says
            </h2>
            <p className="text-lg text-gray-600">Based On 2470 Reviews</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                viewport={{ once: true }}
                className="bg-white border border-gray-200 p-8"
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <FiStar
                      key={i}
                      className="text-yellow-400 fill-yellow-400"
                      size={16}
                    />
                  ))}
                </div>
                <h4 className="font-bold text-lg mb-4 text-black">
                  {testimonial.title}
                </h4>
                <p className="text-gray-700 mb-6 italic">
                  "{testimonial.text}"
                </p>
                <p className="font-medium text-black">{testimonial.name}</p>
              </motion.div>
            ))}
          </div>

          <div className="flex justify-end mt-8">
            <div className="flex space-x-2">
              <button className="w-10 h-10 border border-black flex items-center justify-center hover:bg-black hover:text-white transition-colors">
                <FiChevronLeft size={20} />
              </button>
              <button className="w-10 h-10 border border-black flex items-center justify-center hover:bg-black hover:text-white transition-colors">
                <FiChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
