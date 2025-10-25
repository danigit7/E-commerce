import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../../utils/api';
import LoadingSpinner from '../../components/LoadingSpinner';
import { toast } from 'react-toastify';
import { FiEdit2, FiTrash2, FiPlus, FiX, FiUpload } from 'react-icons/fi';

function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    discountPrice: '',
    category: 'Watches',
    stock: '',
    images: [],
  });

  const categories = [
    'Watches',
    'Jewelry',
    'Bags',
    'Accessories',
    'Clothing',
    'Shoes',
    'Fragrances',
    'Sunglasses',
  ];

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data } = await api.get('/products?limit=100');
      setProducts(data.products);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (product = null) => {
    if (product) {
      setEditingProduct(product);
      setFormData({
        title: product.title,
        description: product.description,
        price: product.price,
        discountPrice: product.discountPrice || '',
        category: product.category,
        stock: product.stock,
        images: product.images || [],
      });
    } else {
      setEditingProduct(null);
      setFormData({
        title: '',
        description: '',
        price: '',
        discountPrice: '',
        category: 'Watches',
        stock: '',
        images: [],
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingProduct(null);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingProduct) {
        await api.put(`/products/${editingProduct._id}`, formData);
        toast.success('Product updated successfully');
      } else {
        await api.post('/products', formData);
        toast.success('Product created successfully');
      }
      fetchProducts();
      handleCloseModal();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Operation failed');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await api.delete(`/products/${id}`);
        toast.success('Product deleted successfully');
        fetchProducts();
      } catch (error) {
        toast.error('Failed to delete product');
      }
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);

    try {
      const { data } = await api.post('/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, { url: data.url, public_id: data.public_id }],
      }));
      toast.success('Image uploaded');
    } catch (error) {
      toast.error('Image upload failed');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-ivory py-8">
      <div className="container-custom">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-serif font-bold">Product Management</h1>
          <button
            onClick={() => handleOpenModal()}
            className="btn-primary flex items-center space-x-2"
          >
            <FiPlus />
            <span>Add Product</span>
          </button>
        </div>

        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-primary text-ivory">
                <tr>
                  <th className="px-6 py-4 text-left">Image</th>
                  <th className="px-6 py-4 text-left">Title</th>
                  <th className="px-6 py-4 text-left">Category</th>
                  <th className="px-6 py-4 text-left">Price</th>
                  <th className="px-6 py-4 text-left">Stock</th>
                  <th className="px-6 py-4 text-left">Rating</th>
                  <th className="px-6 py-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-charcoal-200">
                {products.map((product) => (
                  <motion.tr
                    key={product._id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="hover:bg-ivory transition-colors"
                  >
                    <td className="px-6 py-4">
                      <img
                        src={product.images?.[0]?.url || '/placeholder.jpg'}
                        alt={product.title}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-semibold line-clamp-2">
                        {product.title}
                      </p>
                    </td>
                    <td className="px-6 py-4">{product.category}</td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-semibold">${product.price}</p>
                        {product.discountPrice && (
                          <p className="text-sm text-charcoal-500 line-through">
                            ${product.discountPrice}
                          </p>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2 py-1 rounded-full text-sm ${
                          product.stock > 10
                            ? 'bg-green-100 text-green-800'
                            : product.stock > 0
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {product.stock}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {product.rating?.toFixed(1)} ({product.numReviews})
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center space-x-2">
                        <button
                          onClick={() => handleOpenModal(product)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                        >
                          <FiEdit2 size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(product._id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                        >
                          <FiTrash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Product Modal */}
        <AnimatePresence>
          {showModal && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={handleCloseModal}
                className="fixed inset-0 bg-black/50 z-50"
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="fixed inset-0 z-50 flex items-center justify-center p-4"
              >
                <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-8">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold">
                      {editingProduct ? 'Edit Product' : 'Add New Product'}
                    </h2>
                    <button
                      onClick={handleCloseModal}
                      className="p-2 hover:bg-ivory rounded-lg"
                    >
                      <FiX size={24} />
                    </button>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block font-semibold mb-2">
                        Title *
                      </label>
                      <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className="input-field"
                        required
                      />
                    </div>

                    <div>
                      <label className="block font-semibold mb-2">
                        Description *
                      </label>
                      <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows="4"
                        className="input-field"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block font-semibold mb-2">
                          Price *
                        </label>
                        <input
                          type="number"
                          name="price"
                          value={formData.price}
                          onChange={handleChange}
                          className="input-field"
                          step="0.01"
                          required
                        />
                      </div>

                      <div>
                        <label className="block font-semibold mb-2">
                          Discount Price
                        </label>
                        <input
                          type="number"
                          name="discountPrice"
                          value={formData.discountPrice}
                          onChange={handleChange}
                          className="input-field"
                          step="0.01"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block font-semibold mb-2">
                          Category *
                        </label>
                        <select
                          name="category"
                          value={formData.category}
                          onChange={handleChange}
                          className="input-field"
                          required
                        >
                          {categories.map((cat) => (
                            <option key={cat} value={cat}>
                              {cat}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block font-semibold mb-2">
                          Stock *
                        </label>
                        <input
                          type="number"
                          name="stock"
                          value={formData.stock}
                          onChange={handleChange}
                          className="input-field"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block font-semibold mb-2">Images</label>
                      <div className="flex items-center space-x-2 mb-2">
                        <label className="btn-outline cursor-pointer flex items-center space-x-2">
                          <FiUpload />
                          <span>Upload Image</span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="hidden"
                          />
                        </label>
                      </div>
                      <div className="grid grid-cols-4 gap-2">
                        {formData.images.map((img, index) => (
                          <div key={index} className="relative">
                            <img
                              src={img.url}
                              alt=""
                              className="w-full h-20 object-cover rounded-lg"
                            />
                            <button
                              type="button"
                              onClick={() => {
                                setFormData((prev) => ({
                                  ...prev,
                                  images: prev.images.filter(
                                    (_, i) => i !== index
                                  ),
                                }));
                              }}
                              className="absolute top-1 right-1 p-1 bg-red-600 text-white rounded-full"
                            >
                              <FiX size={12} />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex space-x-4 pt-4">
                      <button type="submit" className="flex-1 btn-primary">
                        {editingProduct ? 'Update Product' : 'Create Product'}
                      </button>
                      <button
                        type="button"
                        onClick={handleCloseModal}
                        className="flex-1 btn-outline"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default AdminProducts;
