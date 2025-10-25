# Product API Documentation

## Overview
This document describes the comprehensive Product API endpoints with full CRUD operations and Cloudinary image integration.

## Base URL
```
/api/products
```

## Authentication
- Public endpoints: No authentication required
- Admin endpoints: Require JWT token with admin role

## Product Model Schema

### Core Fields
- `title` (String, required): Product title (max 100 chars)
- `slug` (String, unique): Auto-generated URL-friendly identifier
- `description` (String, required): Product description (max 2000 chars)
- `shortDescription` (String, optional): Short description (max 200 chars)
- `price` (Number, required): Regular price (min 0)
- `discountPrice` (Number, optional): Discounted price (must be < price)
- `category` (String, required): Product category
- `subcategory` (String, optional): Product subcategory
- `brand` (String, optional): Product brand (max 50 chars)
- `sku` (String, unique, optional): Stock keeping unit
- `stock` (Number, required): Available stock (min 0)
- `lowStockThreshold` (Number, default 10): Low stock warning threshold

### Media Fields
- `images` (Array): Product images with Cloudinary integration
  - `url` (String): Cloudinary image URL
  - `public_id` (String): Cloudinary public ID
  - `alt` (String): Image alt text
  - `isPrimary` (Boolean): Primary image flag

### SEO Fields
- `metaTitle` (String, optional): SEO title (max 60 chars)
- `metaDescription` (String, optional): SEO description (max 160 chars)

### Additional Fields
- `isFeatured` (Boolean, default false): Featured product flag
- `isActive` (Boolean, default true): Product visibility
- `tags` (Array): Product tags
- `weight` (Number, optional): Product weight
- `dimensions` (Object): Product dimensions (length, width, height)
- `colors` (Array): Available colors with hex codes
- `sizes` (Array): Available sizes
- `rating` (Number, default 0): Average rating (0-5)
- `numReviews` (Number, default 0): Number of reviews
- `reviews` (Array): Product reviews

### Virtual Fields
- `finalPrice`: Returns discountPrice or price
- `discountPercentage`: Calculated discount percentage
- `stockStatus`: Returns 'in-stock', 'low-stock', or 'out-of-stock'
- `primaryImage`: Returns primary or first image

## API Endpoints

### 1. Get All Products
**GET** `/api/products`

**Query Parameters:**
- `page` (number): Page number (default: 1)
- `limit` (number): Items per page (default: 12)
- `category` (string): Filter by category
- `subcategory` (string): Filter by subcategory
- `brand` (string): Filter by brand
- `minPrice` (number): Minimum price filter
- `maxPrice` (number): Maximum price filter
- `rating` (number): Minimum rating filter
- `inStock` (boolean): Filter in-stock products
- `search` (string): Search in title, description, brand
- `featured` (boolean): Filter featured products
- `tag` (string): Filter by tag
- `color` (string): Filter by color
- `size` (string): Filter by size
- `sort` (string): Sort options
  - `price-asc`: Price ascending
  - `price-desc`: Price descending
  - `rating`: By rating
  - `newest`: By creation date (newest first)
  - `oldest`: By creation date (oldest first)
  - `name-asc`: By name ascending
  - `name-desc`: By name descending

**Response:**
```json
{
  "products": [...],
  "pagination": {
    "currentPage": 1,
    "totalPages": 5,
    "totalProducts": 50,
    "hasNextPage": true,
    "hasPrevPage": false
  },
  "filters": {
    "categories": [...],
    "brands": [...],
    "tags": [...]
  }
}
```

### 2. Get Single Product
**GET** `/api/products/:idOrSlug`

**Parameters:**
- `idOrSlug`: Product ID or slug

**Response:**
```json
{
  "_id": "...",
  "title": "Product Title",
  "slug": "product-title",
  "description": "...",
  "price": 99.99,
  "discountPrice": 79.99,
  "finalPrice": 79.99,
  "discountPercentage": 20,
  "stockStatus": "in-stock",
  "primaryImage": {...},
  "images": [...],
  "reviews": [...],
  ...
}
```

### 3. Create Product (Admin)
**POST** `/api/products`

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Body:**
```json
{
  "title": "Product Title",
  "description": "Product description",
  "shortDescription": "Short description",
  "price": 99.99,
  "discountPrice": 79.99,
  "category": "Watches",
  "subcategory": "Luxury",
  "brand": "Rolex",
  "sku": "ROLEX-001",
  "stock": 10,
  "lowStockThreshold": 5,
  "images": [
    {
      "url": "https://res.cloudinary.com/...",
      "public_id": "luxury-ecommerce/products/...",
      "alt": "Product image",
      "isPrimary": true
    }
  ],
  "isFeatured": true,
  "tags": ["luxury", "premium"],
  "weight": 0.5,
  "dimensions": {
    "length": 10,
    "width": 5,
    "height": 2
  },
  "colors": [
    {
      "name": "Gold",
      "hex": "#FFD700"
    }
  ],
  "sizes": ["S", "M", "L"],
  "metaTitle": "SEO Title",
  "metaDescription": "SEO Description"
}
```

### 4. Update Product (Admin)
**PUT** `/api/products/:id`

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Body:** Same as create product (partial updates supported)

### 5. Delete Product (Admin)
**DELETE** `/api/products/:id`

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Response:**
```json
{
  "message": "Product deleted successfully"
}
```

### 6. Get Categories
**GET** `/api/products/categories/all`

**Response:**
```json
["Watches", "Jewelry", "Bags", "Accessories", "Clothing", "Shoes", "Fragrances", "Sunglasses"]
```

### 7. Get Product Statistics (Admin)
**GET** `/api/products/stats`

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Response:**
```json
{
  "totalProducts": 100,
  "activeProducts": 95,
  "featuredProducts": 10,
  "outOfStockProducts": 5,
  "lowStockProducts": 8,
  "categoryStats": [...],
  "brandStats": [...]
}
```

### 8. Get Related Products
**GET** `/api/products/:id/related`

**Response:**
```json
[
  {
    "_id": "...",
    "title": "Related Product",
    "price": 99.99,
    "primaryImage": {...},
    ...
  }
]
```

### 9. Bulk Update Products (Admin)
**PUT** `/api/products/bulk`

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Body:**
```json
{
  "productIds": ["id1", "id2", "id3"],
  "updateData": {
    "isFeatured": true,
    "isActive": false
  }
}
```

### 10. Bulk Delete Products (Admin)
**DELETE** `/api/products/bulk`

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Body:**
```json
{
  "productIds": ["id1", "id2", "id3"]
}
```

## Image Upload Endpoints

### Base URL
```
/api/upload
```

### 1. Upload Single Image
**POST** `/api/upload`

**Headers:**
```
Authorization: Bearer <jwt_token>
Content-Type: multipart/form-data
```

**Body:**
- `image` (file): Image file (max 10MB)

**Response:**
```json
{
  "url": "https://res.cloudinary.com/...",
  "public_id": "luxury-ecommerce/products/...",
  "width": 1000,
  "height": 1000,
  "format": "jpg",
  "bytes": 123456
}
```

### 2. Upload Multiple Images
**POST** `/api/upload/multiple`

**Headers:**
```
Authorization: Bearer <jwt_token>
Content-Type: multipart/form-data
```

**Body:**
- `images` (files): Array of image files (max 10 files, 10MB each)

**Response:**
```json
[
  {
    "url": "https://res.cloudinary.com/...",
    "public_id": "luxury-ecommerce/products/...",
    "width": 1000,
    "height": 1000,
    "format": "jpg",
    "bytes": 123456,
    "alt": "image1.jpg",
    "isPrimary": true
  }
]
```

### 3. Delete Single Image
**DELETE** `/api/upload/:publicId`

**Headers:**
```
Authorization: Bearer <jwt_token>
```

### 4. Delete Multiple Images
**DELETE** `/api/upload/multiple`

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Body:**
```json
{
  "publicIds": ["public_id_1", "public_id_2"]
}
```

### 5. Transform Image
**POST** `/api/upload/transform`

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Body:**
```json
{
  "publicId": "luxury-ecommerce/products/...",
  "transformations": {
    "width": 500,
    "height": 500,
    "crop": "fill",
    "quality": "auto"
  }
}
```

### 6. Get Image Info
**GET** `/api/upload/info/:publicId`

**Headers:**
```
Authorization: Bearer <jwt_token>
```

## Error Responses

### 400 Bad Request
```json
{
  "message": "Validation error",
  "errors": [
    {
      "field": "title",
      "message": "Title is required"
    }
  ]
}
```

### 401 Unauthorized
```json
{
  "message": "Access denied. No token provided."
}
```

### 403 Forbidden
```json
{
  "message": "Access denied. Admin role required."
}
```

### 404 Not Found
```json
{
  "message": "Product not found"
}
```

### 500 Internal Server Error
```json
{
  "message": "Server error"
}
```

## Usage Examples

### Create Product with Images
1. Upload images first:
```bash
curl -X POST http://localhost:5000/api/upload/multiple \
  -H "Authorization: Bearer <token>" \
  -F "images=@image1.jpg" \
  -F "images=@image2.jpg"
```

2. Create product with image URLs:
```bash
curl -X POST http://localhost:5000/api/products \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Luxury Watch",
    "description": "Premium luxury watch",
    "price": 999.99,
    "category": "Watches",
    "stock": 5,
    "images": [
      {
        "url": "https://res.cloudinary.com/...",
        "public_id": "luxury-ecommerce/products/...",
        "isPrimary": true
      }
    ]
  }'
```

### Search Products
```bash
curl "http://localhost:5000/api/products?search=watch&category=Watches&minPrice=100&maxPrice=1000&sort=price-asc&page=1&limit=12"
```

## Notes
- All timestamps are in ISO format
- Images are automatically optimized and resized by Cloudinary
- Temporary files are cleaned up after upload
- Product deletion also removes associated images from Cloudinary
- Slug generation is automatic and ensures uniqueness
- Virtual fields are included in JSON responses
