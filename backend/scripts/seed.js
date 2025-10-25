import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';
import Product from '../models/Product.js';
import connectDB from '../config/db.js';

dotenv.config();

const seedData = async () => {
  try {
    await connectDB();

    // Clear existing data
    await User.deleteMany();
    await Product.deleteMany();

    console.log('🗑️  Existing data cleared');

    // Create admin user
    const admin = await User.create({
      name: 'Admin User',
      email: process.env.ADMIN_EMAIL || 'admin@luxurystore.com',
      password: process.env.ADMIN_PASSWORD || 'Admin@123456',
      role: 'admin',
    });

    // Create sample users
    const users = await User.create([
      {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'Password123',
      },
      {
        name: 'Jane Smith',
        email: 'jane@example.com',
        password: 'Password123',
      },
    ]);

    console.log('✅ Admin and sample users created');

    // Sample product data - Russet-inspired jewelry collection
    const products = [
      {
        title: 'FOXTAIL 4MM CHAIN (SILVER)',
        slug: 'foxtail-4mm-chain-silver',
        description:
          'Premium 4mm foxtail chain in sterling silver. Designed for 24/7 wear with a sleek, minimalist aesthetic that complements any style.',
        price: 1500,
        category: 'Chains',
        stock: 25,
        images: [
          {
            url: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800',
            public_id: 'foxtail-chain-silver',
          },
        ],
        rating: 4.8,
        numReviews: 0,
        isFeatured: true,
      },
      {
        title: 'SIGNET (SILVER) RING',
        slug: 'signet-silver-ring',
        description:
          'Classic signet ring in sterling silver with a clean, minimalist design. Perfect for everyday wear and personalization.',
        price: 1600,
        category: 'Rings',
        stock: 20,
        images: [
          {
            url: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800',
            public_id: 'signet-silver-ring',
          },
        ],
        rating: 4.8,
        numReviews: 0,
        isFeatured: true,
      },
      {
        title: 'NSEW VISION PENDANT (SILVER)',
        slug: 'nsew-vision-pendant-silver',
        description:
          'Geometric vision pendant in sterling silver. Features clean lines and modern design perfect for layering or wearing solo.',
        price: 1800,
        category: 'Pendants',
        stock: 15,
        images: [
          {
            url: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800',
            public_id: 'nsew-vision-pendant',
          },
        ],
        rating: 4.8,
        numReviews: 0,
        isFeatured: true,
      },
      {
        title: 'CURB 4MM CHAIN (SILVER)',
        slug: 'curb-4mm-chain-silver',
        description:
          'Classic 4mm curb chain in sterling silver. A timeless piece that works with any pendant or can be worn alone for a clean look.',
        price: 1400,
        category: 'Chains',
        stock: 30,
        images: [
          {
            url: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800',
            public_id: 'curb-chain-silver',
          },
        ],
        rating: 4.7,
        numReviews: 0,
        isFeatured: true,
      },
      {
        title: 'PALM TREE PENDANT (SILVER)',
        slug: 'palm-tree-pendant-silver',
        description:
          'Unique palm tree pendant in sterling silver. A statement piece that brings tropical vibes to your jewelry collection.',
        price: 2000,
        category: 'Pendants',
        stock: 12,
        images: [
          {
            url: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800',
            public_id: 'palm-tree-pendant',
          },
        ],
        rating: 4.8,
        numReviews: 0,
        isFeatured: true,
      },
      {
        title: 'ETERNAL LINKS BRACELET',
        slug: 'eternal-links-bracelet',
        description:
          'Interlocking links bracelet in sterling silver. Available in black and white finishes for versatile styling options.',
        price: 1400,
        category: 'Bracelets',
        stock: 18,
        images: [
          {
            url: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800',
            public_id: 'eternal-links-bracelet',
          },
        ],
        rating: 4.1,
        numReviews: 0,
        isFeatured: true,
      },
      {
        title: 'ASTRAL NORTH PENDANT',
        slug: 'astral-north-pendant',
        description:
          'Premium astral north pendant in sterling silver. A sophisticated piece that represents direction and guidance.',
        price: 3000,
        category: 'Pendants',
        stock: 0,
        images: [
          {
            url: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800',
            public_id: 'astral-north-pendant',
          },
        ],
        rating: 5.0,
        numReviews: 0,
        isFeatured: true,
      },
      {
        title: 'ASTRAL LINKS BRACELET',
        slug: 'astral-links-bracelet',
        description:
          'Luxury astral links bracelet in sterling silver. Features intricate link design for a premium look and feel.',
        price: 3500,
        category: 'Bracelets',
        stock: 0,
        images: [
          {
            url: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800',
            public_id: 'astral-links-bracelet',
          },
        ],
        rating: 4.9,
        numReviews: 0,
        isFeatured: true,
      },
      {
        title: 'ESKER (SILVER) RING',
        slug: 'esker-silver-ring',
        description:
          'Minimalist esker ring in sterling silver. Clean design perfect for stacking or wearing alone.',
        price: 1200,
        category: 'Rings',
        stock: 25,
        images: [
          {
            url: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800',
            public_id: 'esker-silver-ring',
          },
        ],
        rating: 4.8,
        numReviews: 0,
        isFeatured: false,
      },
      {
        title: 'TENNER (SILVER) RING',
        slug: 'tenner-silver-ring',
        description:
          'Bold tenner ring in sterling silver. A statement piece that commands attention with its unique design.',
        price: 1350,
        category: 'Rings',
        stock: 22,
        images: [
          {
            url: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800',
            public_id: 'tenner-silver-ring',
          },
        ],
        rating: 4.7,
        numReviews: 0,
        isFeatured: false,
      },
      {
        title: 'GREEK KEY BLACK RING',
        slug: 'greek-key-black-ring',
        description:
          'Classic greek key pattern ring in black finish. A timeless design that never goes out of style.',
        price: 1100,
        category: 'Rings',
        stock: 20,
        images: [
          {
            url: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800',
            public_id: 'greek-key-black-ring',
          },
        ],
        rating: 4.6,
        numReviews: 0,
        isFeatured: false,
      },
      {
        title: 'GREEK KEY SILVER CHANNEL RING',
        slug: 'greek-key-silver-channel-ring',
        description:
          'Elegant greek key channel ring in sterling silver. Features intricate detailing for a sophisticated look.',
        price: 1250,
        category: 'Rings',
        stock: 18,
        images: [
          {
            url: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800',
            public_id: 'greek-key-silver-channel-ring',
          },
        ],
        rating: 4.8,
        numReviews: 0,
        isFeatured: false,
      },
      {
        title: 'SNAKE 1.5MM CHAIN',
        slug: 'snake-1-5mm-chain',
        description:
          'Delicate 1.5mm snake chain in sterling silver. Perfect for layering or wearing with small pendants.',
        price: 800,
        category: 'Chains',
        stock: 35,
        images: [
          {
            url: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800',
            public_id: 'snake-1-5mm-chain',
          },
        ],
        rating: 4.5,
        numReviews: 0,
        isFeatured: false,
      },
      {
        title: 'PEARL 6MM CHAIN',
        slug: 'pearl-6mm-chain',
        description:
          'Luxurious 6mm pearl chain in sterling silver. A statement piece that adds elegance to any outfit.',
        price: 2200,
        category: 'Chains',
        stock: 15,
        images: [
          {
            url: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800',
            public_id: 'pearl-6mm-chain',
          },
        ],
        rating: 4.7,
        numReviews: 0,
        isFeatured: false,
      },
      {
        title: 'CUBA X PEARL 8MM CHAIN',
        slug: 'cuba-x-pearl-8mm-chain',
        description:
          'Bold 8mm cuba x pearl chain in sterling silver. A chunky statement piece for the confident wearer.',
        price: 2800,
        category: 'Chains',
        stock: 10,
        images: [
          {
            url: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800',
            public_id: 'cuba-x-pearl-8mm-chain',
          },
        ],
        rating: 4.9,
        numReviews: 0,
        isFeatured: false,
      },
      {
        title: 'UZI PENDANT (SILVER)',
        slug: 'uzi-pendant-silver',
        description:
          'Unique uzi pendant in sterling silver. A distinctive piece that makes a bold statement.',
        price: 1900,
        category: 'Pendants',
        stock: 14,
        images: [
          {
            url: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800',
            public_id: 'uzi-pendant-silver',
          },
        ],
        rating: 4.8,
        numReviews: 0,
        isFeatured: false,
      },
      {
        title: 'ASSCHER CUT ETERNITY (SILVER) BAND',
        slug: 'asscher-cut-eternity-silver-band',
        description:
          'Elegant asscher cut eternity band in sterling silver. Perfect for stacking or wearing as a wedding band.',
        price: 3200,
        category: 'Rings',
        stock: 8,
        images: [
          {
            url: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800',
            public_id: 'asscher-cut-eternity-band',
          },
        ],
        rating: 4.9,
        numReviews: 0,
        isFeatured: false,
      },
      {
        title: 'BLACK MESH CUFF BRACELET',
        slug: 'black-mesh-cuff-bracelet',
        description:
          'Sophisticated black mesh cuff bracelet. A versatile piece that adds edge to any look.',
        price: 1100,
        category: 'Bracelets',
        stock: 16,
        images: [
          {
            url: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800',
            public_id: 'black-mesh-cuff-bracelet',
          },
        ],
        rating: 4.6,
        numReviews: 0,
        isFeatured: false,
      },
      {
        title: 'FRESH WATER PEARLS NECKLACE',
        slug: 'fresh-water-pearls-necklace',
        description:
          'Luxurious fresh water pearls necklace. Natural pearls with beautiful luster and unique character.',
        price: 2500,
        category: 'Pendants',
        stock: 12,
        images: [
          {
            url: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800',
            public_id: 'fresh-water-pearls-necklace',
          },
        ],
        rating: 4.8,
        numReviews: 0,
        isFeatured: true,
      },
    ];

    await Product.insertMany(products);

    console.log('✅ Sample products created');
    console.log('');
    console.log('=====================================');
    console.log('🎉 Database seeded successfully!');
    console.log('=====================================');
    console.log(`Admin Email: ${admin.email}`);
    console.log(
      `Admin Password: ${process.env.ADMIN_PASSWORD || 'Admin@123456'}`
    );
    console.log('=====================================');
    console.log('');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedData();
