import Product from '../models/Product.js';
import cloudinary from '../config/cloudinary.js';

// @desc    Get all products with filters, pagination, sorting
// @route   GET /api/products
// @access  Public
export const getProducts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 12;
    const skip = (page - 1) * limit;

    // Build query
    const query = { isActive: true };

    // Category filter
    if (req.query.category) {
      query.category = req.query.category;
    }

    // Subcategory filter
    if (req.query.subcategory) {
      query.subcategory = req.query.subcategory;
    }

    // Brand filter
    if (req.query.brand) {
      query.brand = { $regex: req.query.brand, $options: 'i' };
    }

    // Price range filter
    if (req.query.minPrice || req.query.maxPrice) {
      query.price = {};
      if (req.query.minPrice) query.price.$gte = parseFloat(req.query.minPrice);
      if (req.query.maxPrice) query.price.$lte = parseFloat(req.query.maxPrice);
    }

    // Rating filter
    if (req.query.rating) {
      query.rating = { $gte: parseFloat(req.query.rating) };
    }

    // Stock filter
    if (req.query.inStock === 'true') {
      query.stock = { $gt: 0 };
    }

    // Search by title, description, or brand
    if (req.query.search) {
      query.$or = [
        { title: { $regex: req.query.search, $options: 'i' } },
        { description: { $regex: req.query.search, $options: 'i' } },
        { brand: { $regex: req.query.search, $options: 'i' } },
      ];
    }

    // Featured products
    if (req.query.featured === 'true') {
      query.isFeatured = true;
    }

    // Tag filter
    if (req.query.tag) {
      query.tags = { $in: [req.query.tag] };
    }

    // Color filter
    if (req.query.color) {
      query['colors.name'] = { $regex: req.query.color, $options: 'i' };
    }

    // Size filter
    if (req.query.size) {
      query.sizes = { $in: [req.query.size] };
    }

    // Sorting
    let sortOption = {};
    if (req.query.sort === 'price-asc') {
      sortOption = { price: 1 };
    } else if (req.query.sort === 'price-desc') {
      sortOption = { price: -1 };
    } else if (req.query.sort === 'rating') {
      sortOption = { rating: -1 };
    } else if (req.query.sort === 'newest') {
      sortOption = { createdAt: -1 };
    } else if (req.query.sort === 'oldest') {
      sortOption = { createdAt: 1 };
    } else if (req.query.sort === 'name-asc') {
      sortOption = { title: 1 };
    } else if (req.query.sort === 'name-desc') {
      sortOption = { title: -1 };
    } else {
      sortOption = { createdAt: -1 };
    }

    const products = await Product.find(query)
      .sort(sortOption)
      .limit(limit)
      .skip(skip)
      .select('-reviews')
      .lean();

    const total = await Product.countDocuments(query);

    // Get aggregation data for filters
    const categories = await Product.distinct('category', { isActive: true });
    const brands = await Product.distinct('brand', { isActive: true, brand: { $exists: true, $ne: '' } });
    const tags = await Product.distinct('tags', { isActive: true, tags: { $exists: true, $ne: [] } });

    res.json({
      products,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalProducts: total,
        hasNextPage: page < Math.ceil(total / limit),
        hasPrevPage: page > 1,
      },
      filters: {
        categories,
        brands,
        tags,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single product by ID or slug
// @route   GET /api/products/:idOrSlug
// @access  Public
export const getProductById = async (req, res) => {
  try {
    const { idOrSlug } = req.params;

    let product;
    // Check if it's a MongoDB ObjectId or slug
    if (idOrSlug.match(/^[0-9a-fA-F]{24}$/)) {
      product = await Product.findById(idOrSlug).populate('reviews.user', 'name');
    } else {
      product = await Product.findOne({ slug: idOrSlug }).populate(
        'reviews.user',
        'name'
      );
    }

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create product (Admin only)
// @route   POST /api/products
// @access  Private/Admin
export const createProduct = async (req, res) => {
  try {
    const {
      title,
      description,
      shortDescription,
      price,
      discountPrice,
      category,
      subcategory,
      brand,
      sku,
      stock,
      lowStockThreshold,
      images,
      isFeatured,
      tags,
      weight,
      dimensions,
      colors,
      sizes,
      metaTitle,
      metaDescription,
    } = req.body;

    // Validate required fields
    if (!title || !description || !price || !category || stock === undefined) {
      return res.status(400).json({
        message: 'Title, description, price, category, and stock are required',
      });
    }

    // Check if SKU already exists
    if (sku) {
      const existingProduct = await Product.findOne({ sku });
      if (existingProduct) {
        return res.status(400).json({ message: 'SKU already exists' });
      }
    }

    // Process images if provided
    let processedImages = [];
    if (images && images.length > 0) {
      processedImages = images.map((img, index) => ({
        url: img.url,
        public_id: img.public_id,
        alt: img.alt || title,
        isPrimary: index === 0, // First image is primary by default
      }));
    }

    const productData = {
      title,
      description,
      shortDescription,
      price,
      discountPrice,
      category,
      subcategory,
      brand,
      sku,
      stock,
      lowStockThreshold,
      images: processedImages,
      isFeatured: isFeatured || false,
      tags: tags || [],
      weight,
      dimensions,
      colors: colors || [],
      sizes: sizes || [],
      metaTitle: metaTitle || title,
      metaDescription: metaDescription || shortDescription || description.substring(0, 160),
    };

    const product = await Product.create(productData);
    res.status(201).json(product);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Product with this title already exists' });
    }
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update product (Admin only)
// @route   PUT /api/products/:id
// @access  Private/Admin
export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const {
      title,
      description,
      shortDescription,
      price,
      discountPrice,
      category,
      subcategory,
      brand,
      sku,
      stock,
      lowStockThreshold,
      images,
      isFeatured,
      isActive,
      tags,
      weight,
      dimensions,
      colors,
      sizes,
      metaTitle,
      metaDescription,
    } = req.body;

    // Check if SKU already exists (if changing SKU)
    if (sku && sku !== product.sku) {
      const existingProduct = await Product.findOne({ sku, _id: { $ne: req.params.id } });
      if (existingProduct) {
        return res.status(400).json({ message: 'SKU already exists' });
      }
    }

    // Handle image updates
    let updatedImages = product.images;
    if (images && images.length > 0) {
      // Delete old images from Cloudinary if they're being replaced
      const oldImageIds = product.images.map(img => img.public_id);
      const newImageIds = images.map(img => img.public_id);
      const imagesToDelete = oldImageIds.filter(id => !newImageIds.includes(id));

      // Delete old images from Cloudinary
      for (const publicId of imagesToDelete) {
        try {
          await cloudinary.uploader.destroy(publicId);
        } catch (error) {
          console.error('Error deleting image from Cloudinary:', error);
        }
      }

      // Process new images
      updatedImages = images.map((img, index) => ({
        url: img.url,
        public_id: img.public_id,
        alt: img.alt || title || product.title,
        isPrimary: img.isPrimary || index === 0,
      }));
    }

    const updateData = {
      title: title || product.title,
      description: description || product.description,
      shortDescription,
      price: price !== undefined ? price : product.price,
      discountPrice,
      category: category || product.category,
      subcategory,
      brand,
      sku,
      stock: stock !== undefined ? stock : product.stock,
      lowStockThreshold,
      images: updatedImages,
      isFeatured: isFeatured !== undefined ? isFeatured : product.isFeatured,
      isActive: isActive !== undefined ? isActive : product.isActive,
      tags: tags || product.tags,
      weight,
      dimensions,
      colors: colors || product.colors,
      sizes: sizes || product.sizes,
      metaTitle: metaTitle || product.metaTitle,
      metaDescription: metaDescription || product.metaDescription,
    };

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    res.json(updatedProduct);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Product with this title already exists' });
    }
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete product (Admin only)
// @route   DELETE /api/products/:id
// @access  Private/Admin
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Delete images from Cloudinary
    if (product.images && product.images.length > 0) {
      const deletePromises = product.images.map(img => 
        cloudinary.uploader.destroy(img.public_id)
      );
      
      try {
        await Promise.all(deletePromises);
      } catch (error) {
        console.error('Error deleting images from Cloudinary:', error);
        // Continue with product deletion even if image deletion fails
      }
    }

    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all categories
// @route   GET /api/products/categories/all
// @access  Public
export const getCategories = async (req, res) => {
  try {
    const categories = await Product.distinct('category', { isActive: true });
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get product statistics (Admin only)
// @route   GET /api/products/stats
// @access  Private/Admin
export const getProductStats = async (req, res) => {
  try {
    const totalProducts = await Product.countDocuments();
    const activeProducts = await Product.countDocuments({ isActive: true });
    const featuredProducts = await Product.countDocuments({ isFeatured: true });
    const outOfStockProducts = await Product.countDocuments({ stock: 0 });
    const lowStockProducts = await Product.countDocuments({ 
      stock: { $gt: 0, $lte: 10 } 
    });

    const categoryStats = await Product.aggregate([
      { $match: { isActive: true } },
      { $group: { _id: '$category', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);

    const brandStats = await Product.aggregate([
      { $match: { isActive: true, brand: { $exists: true, $ne: '' } } },
      { $group: { _id: '$brand', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 10 }
    ]);

    res.json({
      totalProducts,
      activeProducts,
      featuredProducts,
      outOfStockProducts,
      lowStockProducts,
      categoryStats,
      brandStats,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get related products
// @route   GET /api/products/:id/related
// @access  Public
export const getRelatedProducts = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const relatedProducts = await Product.find({
      _id: { $ne: product._id },
      category: product.category,
      isActive: true,
    })
    .limit(4)
    .select('-reviews')
    .lean();

    res.json(relatedProducts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Bulk update products (Admin only)
// @route   PUT /api/products/bulk
// @access  Private/Admin
export const bulkUpdateProducts = async (req, res) => {
  try {
    const { productIds, updateData } = req.body;

    if (!productIds || !Array.isArray(productIds) || productIds.length === 0) {
      return res.status(400).json({ message: 'Product IDs are required' });
    }

    const result = await Product.updateMany(
      { _id: { $in: productIds } },
      updateData,
      { runValidators: true }
    );

    res.json({
      message: `${result.modifiedCount} products updated successfully`,
      modifiedCount: result.modifiedCount,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Bulk delete products (Admin only)
// @route   DELETE /api/products/bulk
// @access  Private/Admin
export const bulkDeleteProducts = async (req, res) => {
  try {
    const { productIds } = req.body;

    if (!productIds || !Array.isArray(productIds) || productIds.length === 0) {
      return res.status(400).json({ message: 'Product IDs are required' });
    }

    // Get products to delete their images
    const products = await Product.find({ _id: { $in: productIds } });
    
    // Delete images from Cloudinary
    for (const product of products) {
      if (product.images && product.images.length > 0) {
        const deletePromises = product.images.map(img => 
          cloudinary.uploader.destroy(img.public_id)
        );
        
        try {
          await Promise.all(deletePromises);
        } catch (error) {
          console.error('Error deleting images from Cloudinary:', error);
        }
      }
    }

    const result = await Product.deleteMany({ _id: { $in: productIds } });

    res.json({
      message: `${result.deletedCount} products deleted successfully`,
      deletedCount: result.deletedCount,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

