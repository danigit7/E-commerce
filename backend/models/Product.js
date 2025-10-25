import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    comment: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide a product title'],
      trim: true,
      maxlength: [100, 'Title cannot exceed 100 characters'],
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      index: true,
    },
    description: {
      type: String,
      required: [true, 'Please provide a product description'],
      maxlength: [2000, 'Description cannot exceed 2000 characters'],
    },
    shortDescription: {
      type: String,
      maxlength: [200, 'Short description cannot exceed 200 characters'],
    },
    price: {
      type: Number,
      required: [true, 'Please provide a price'],
      min: [0, 'Price cannot be negative'],
    },
    discountPrice: {
      type: Number,
      min: [0, 'Discount price cannot be negative'],
      validate: {
        validator: function (value) {
          return !value || value < this.price;
        },
        message: 'Discount price must be less than regular price',
      },
    },
    category: {
      type: String,
      required: [true, 'Please provide a category'],
      enum: [
        'Watches',
        'Jewelry',
        'Bags',
        'Accessories',
        'Clothing',
        'Shoes',
        'Fragrances',
        'Sunglasses',
        'Chains',
        'Rings',
        'Pendants',
        'Bracelets',
      ],
      index: true,
    },
    subcategory: {
      type: String,
      trim: true,
    },
    brand: {
      type: String,
      trim: true,
      maxlength: [50, 'Brand name cannot exceed 50 characters'],
    },
    sku: {
      type: String,
      unique: true,
      sparse: true,
      trim: true,
    },
    stock: {
      type: Number,
      required: true,
      min: [0, 'Stock cannot be negative'],
      default: 0,
    },
    lowStockThreshold: {
      type: Number,
      default: 10,
      min: [0, 'Low stock threshold cannot be negative'],
    },
    images: [
      {
        url: {
          type: String,
          required: true,
        },
        public_id: {
          type: String,
          required: true,
        },
        alt: {
          type: String,
          default: '',
        },
        isPrimary: {
          type: Boolean,
          default: false,
        },
      },
    ],
    rating: {
      type: Number,
      default: 0,
      min: [0, 'Rating cannot be negative'],
      max: [5, 'Rating cannot exceed 5'],
    },
    numReviews: {
      type: Number,
      default: 0,
      min: [0, 'Number of reviews cannot be negative'],
    },
    reviews: [reviewSchema],
    isFeatured: {
      type: Boolean,
      default: false,
      index: true,
    },
    isActive: {
      type: Boolean,
      default: true,
      index: true,
    },
    tags: [
      {
        type: String,
        trim: true,
      },
    ],
    weight: {
      type: Number,
      min: [0, 'Weight cannot be negative'],
    },
    dimensions: {
      length: { type: Number, min: 0 },
      width: { type: Number, min: 0 },
      height: { type: Number, min: 0 },
    },
    colors: [
      {
        name: { type: String, required: true },
        hex: { type: String, match: /^#[0-9A-F]{6}$/i },
      },
    ],
    sizes: [
      {
        type: String,
        trim: true,
      },
    ],
    metaTitle: {
      type: String,
      maxlength: [60, 'Meta title cannot exceed 60 characters'],
    },
    metaDescription: {
      type: String,
      maxlength: [160, 'Meta description cannot exceed 160 characters'],
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtual for final price (discount price if available, otherwise regular price)
productSchema.virtual('finalPrice').get(function () {
  return this.discountPrice || this.price;
});

// Virtual for discount percentage
productSchema.virtual('discountPercentage').get(function () {
  if (this.discountPrice && this.price > this.discountPrice) {
    return Math.round(((this.price - this.discountPrice) / this.price) * 100);
  }
  return 0;
});

// Virtual for stock status
productSchema.virtual('stockStatus').get(function () {
  if (this.stock === 0) return 'out-of-stock';
  if (this.stock <= this.lowStockThreshold) return 'low-stock';
  return 'in-stock';
});

// Virtual for primary image
productSchema.virtual('primaryImage').get(function () {
  const primary = this.images.find((img) => img.isPrimary);
  return primary || this.images[0] || null;
});

// Create slug from title before saving
productSchema.pre('save', function (next) {
  if (this.isModified('title')) {
    let baseSlug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .replace(/(^-|-$)/g, '');

    // Ensure slug is unique
    this.slug = baseSlug;
  }
  next();
});

// Ensure unique slug
productSchema.pre('save', async function (next) {
  if (this.isModified('slug') || this.isNew) {
    let slug = this.slug;
    let counter = 1;

    while (await this.constructor.findOne({ slug, _id: { $ne: this._id } })) {
      slug = `${this.slug}-${counter}`;
      counter++;
    }

    this.slug = slug;
  }
  next();
});

// Index for better query performance
productSchema.index({ title: 'text', description: 'text', brand: 'text' });
productSchema.index({ price: 1 });
productSchema.index({ rating: -1 });
productSchema.index({ createdAt: -1 });
productSchema.index({ isActive: 1, isFeatured: 1 });

const Product = mongoose.model('Product', productSchema);

export default Product;
