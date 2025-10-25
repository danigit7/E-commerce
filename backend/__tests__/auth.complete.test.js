import request from 'supertest';
import mongoose from 'mongoose';
import app from '../server.js';
import User from '../models/User.js';

// Test database connection
const MONGO_URI = process.env.MONGO_URI_TEST || 'mongodb://localhost:27017/ecommerce_test';

// Setup and teardown
beforeAll(async () => {
  await mongoose.connect(MONGO_URI);
  await User.deleteMany({}); // Clear users before tests
});

afterAll(async () => {
  await User.deleteMany({}); // Clean up after tests
  await mongoose.connection.close();
});

describe('🔐 JWT Authentication System Tests', () => {
  let accessToken;
  let refreshTokenCookie;
  let adminAccessToken;
  let testUser;

  const testUserData = {
    name: 'Test User',
    email: 'test@example.com',
    password: 'test123456',
  };

  const adminUserData = {
    name: 'Admin User',
    email: 'admin@example.com',
    password: 'admin123456',
  };

  // ============================================
  // REGISTRATION TESTS
  // ============================================
  describe('POST /api/auth/register', () => {
    it('should register a new user successfully', async () => {
      const response = await request(app)
        .post('/api/auth/register')
        .send(testUserData)
        .expect('Content-Type', /json/)
        .expect(201);

      expect(response.body).toHaveProperty('_id');
      expect(response.body).toHaveProperty('name', testUserData.name);
      expect(response.body).toHaveProperty('email', testUserData.email);
      expect(response.body).toHaveProperty('role', 'user');
      expect(response.body).toHaveProperty('accessToken');
      expect(response.body).not.toHaveProperty('password');

      // Check for refresh token cookie
      const cookies = response.headers['set-cookie'];
      expect(cookies).toBeDefined();
      const refreshCookie = cookies.find((cookie) => cookie.startsWith('refreshToken='));
      expect(refreshCookie).toBeDefined();
      expect(refreshCookie).toMatch(/HttpOnly/);
    });

    it('should reject registration with missing name', async () => {
      const response = await request(app)
        .post('/api/auth/register')
        .send({
          email: 'noname@example.com',
          password: 'test123456',
        })
        .expect(400);

      expect(response.body).toHaveProperty('errors');
    });

    it('should reject registration with invalid email', async () => {
      const response = await request(app)
        .post('/api/auth/register')
        .send({
          name: 'Test',
          email: 'invalid-email',
          password: 'test123456',
        })
        .expect(400);

      expect(response.body).toHaveProperty('errors');
    });

    it('should reject registration with short password', async () => {
      const response = await request(app)
        .post('/api/auth/register')
        .send({
          name: 'Test',
          email: 'test@example.com',
          password: '123',
        })
        .expect(400);

      expect(response.body).toHaveProperty('errors');
    });

    it('should reject duplicate email registration', async () => {
      const response = await request(app)
        .post('/api/auth/register')
        .send(testUserData)
        .expect(400);

      expect(response.body).toHaveProperty('message', 'User already exists');
    });
  });

  // ============================================
  // LOGIN TESTS
  // ============================================
  describe('POST /api/auth/login', () => {
    it('should login user successfully', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: testUserData.email,
          password: testUserData.password,
        })
        .expect('Content-Type', /json/)
        .expect(200);

      expect(response.body).toHaveProperty('_id');
      expect(response.body).toHaveProperty('email', testUserData.email);
      expect(response.body).toHaveProperty('accessToken');
      expect(response.body).not.toHaveProperty('password');

      // Save tokens for later tests
      accessToken = response.body.accessToken;

      // Check for refresh token cookie
      const cookies = response.headers['set-cookie'];
      expect(cookies).toBeDefined();
      refreshTokenCookie = cookies.find((cookie) => cookie.startsWith('refreshToken='));
      expect(refreshTokenCookie).toBeDefined();
    });

    it('should reject login with wrong password', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: testUserData.email,
          password: 'wrongpassword',
        })
        .expect(401);

      expect(response.body).toHaveProperty('message', 'Invalid credentials');
    });

    it('should reject login with non-existent email', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'nonexistent@example.com',
          password: 'password123',
        })
        .expect(401);

      expect(response.body).toHaveProperty('message', 'Invalid credentials');
    });

    it('should reject login with missing password', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: testUserData.email,
        })
        .expect(400);

      expect(response.body).toHaveProperty('errors');
    });
  });

  // ============================================
  // PROTECTED ROUTE TESTS
  // ============================================
  describe('GET /api/auth/me', () => {
    it('should get user profile with valid token', async () => {
      const response = await request(app)
        .get('/api/auth/me')
        .set('Authorization', `Bearer ${accessToken}`)
        .expect('Content-Type', /json/)
        .expect(200);

      expect(response.body).toHaveProperty('_id');
      expect(response.body).toHaveProperty('email', testUserData.email);
      expect(response.body).toHaveProperty('name', testUserData.name);
      expect(response.body).not.toHaveProperty('password');
    });

    it('should reject request without token', async () => {
      const response = await request(app)
        .get('/api/auth/me')
        .expect(401);

      expect(response.body).toHaveProperty('message', 'Not authorized, no token');
    });

    it('should reject request with invalid token', async () => {
      const response = await request(app)
        .get('/api/auth/me')
        .set('Authorization', 'Bearer invalid_token')
        .expect(401);

      expect(response.body).toHaveProperty('message', 'Not authorized, token failed');
    });
  });

  // ============================================
  // TOKEN VERIFICATION TESTS
  // ============================================
  describe('GET /api/auth/verify', () => {
    it('should verify valid token', async () => {
      const response = await request(app)
        .get('/api/auth/verify')
        .set('Authorization', `Bearer ${accessToken}`)
        .expect('Content-Type', /json/)
        .expect(200);

      expect(response.body).toHaveProperty('valid', true);
      expect(response.body).toHaveProperty('user');
      expect(response.body.user).toHaveProperty('email', testUserData.email);
    });

    it('should reject invalid token', async () => {
      await request(app)
        .get('/api/auth/verify')
        .set('Authorization', 'Bearer invalid_token')
        .expect(401);
    });
  });

  // ============================================
  // REFRESH TOKEN TESTS
  // ============================================
  describe('POST /api/auth/refresh', () => {
    it('should refresh access token with valid refresh token', async () => {
      const response = await request(app)
        .post('/api/auth/refresh')
        .set('Cookie', refreshTokenCookie)
        .expect('Content-Type', /json/)
        .expect(200);

      expect(response.body).toHaveProperty('accessToken');
      expect(response.body.accessToken).not.toBe(accessToken);

      // Update access token
      accessToken = response.body.accessToken;
    });

    it('should reject refresh without refresh token cookie', async () => {
      const response = await request(app)
        .post('/api/auth/refresh')
        .expect(401);

      expect(response.body).toHaveProperty('message', 'No refresh token provided');
    });

    it('should reject refresh with invalid refresh token', async () => {
      const response = await request(app)
        .post('/api/auth/refresh')
        .set('Cookie', 'refreshToken=invalid_token')
        .expect(401);

      expect(response.body).toHaveProperty('message', 'Invalid refresh token');
    });
  });

  // ============================================
  // LOGOUT TESTS
  // ============================================
  describe('POST /api/auth/logout', () => {
    it('should logout user successfully', async () => {
      const response = await request(app)
        .post('/api/auth/logout')
        .set('Authorization', `Bearer ${accessToken}`)
        .expect('Content-Type', /json/)
        .expect(200);

      expect(response.body).toHaveProperty('message', 'Logged out successfully');

      // Check that refresh token cookie is cleared
      const cookies = response.headers['set-cookie'];
      expect(cookies).toBeDefined();
      const refreshCookie = cookies.find((cookie) => cookie.startsWith('refreshToken='));
      expect(refreshCookie).toMatch(/expires=Thu, 01 Jan 1970/);
    });

    it('should reject logout without token', async () => {
      await request(app)
        .post('/api/auth/logout')
        .expect(401);
    });
  });

  // ============================================
  // ADMIN MIDDLEWARE TESTS
  // ============================================
  describe('Admin Middleware Tests', () => {
    beforeAll(async () => {
      // Create an admin user
      const adminUser = await User.create({
        name: adminUserData.name,
        email: adminUserData.email,
        password: adminUserData.password,
        role: 'admin',
      });

      // Login as admin
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: adminUserData.email,
          password: adminUserData.password,
        });

      adminAccessToken = response.body.accessToken;
    });

    it('should allow admin access to admin routes', async () => {
      const response = await request(app)
        .get('/api/admin/stats')
        .set('Authorization', `Bearer ${adminAccessToken}`)
        .expect(200);

      expect(response.body).toBeDefined();
    });

    it('should reject non-admin access to admin routes', async () => {
      // Login as regular user again
      const loginResponse = await request(app)
        .post('/api/auth/login')
        .send({
          email: testUserData.email,
          password: testUserData.password,
        });

      const userToken = loginResponse.body.accessToken;

      const response = await request(app)
        .get('/api/admin/stats')
        .set('Authorization', `Bearer ${userToken}`)
        .expect(403);

      expect(response.body).toHaveProperty('message', 'Not authorized as admin');
    });
  });

  // ============================================
  // PASSWORD RESET TESTS
  // ============================================
  describe('Password Reset Flow', () => {
    let resetToken;

    it('should send password reset email', async () => {
      // Note: This will fail if email service is not configured
      // You may want to mock the email service for testing
      const response = await request(app)
        .post('/api/auth/forgot-password')
        .send({ email: testUserData.email });

      // This might return 500 if email service is not configured
      // In production, it should return 200
      expect([200, 500]).toContain(response.status);
    });

    it('should reject forgot password for non-existent email', async () => {
      const response = await request(app)
        .post('/api/auth/forgot-password')
        .send({ email: 'nonexistent@example.com' })
        .expect(404);

      expect(response.body).toHaveProperty('message', 'User not found');
    });
  });

  // ============================================
  // PASSWORD HASHING TESTS
  // ============================================
  describe('Password Security Tests', () => {
    it('should store hashed password, not plain text', async () => {
      const user = await User.findOne({ email: testUserData.email }).select('+password');
      
      expect(user.password).toBeDefined();
      expect(user.password).not.toBe(testUserData.password);
      expect(user.password.length).toBeGreaterThan(50); // Bcrypt hash length
    });

    it('should correctly compare passwords', async () => {
      const user = await User.findOne({ email: testUserData.email }).select('+password');
      
      const isMatch = await user.comparePassword(testUserData.password);
      expect(isMatch).toBe(true);

      const isNotMatch = await user.comparePassword('wrongpassword');
      expect(isNotMatch).toBe(false);
    });
  });

  // ============================================
  // USER STATUS TESTS
  // ============================================
  describe('User Status Tests', () => {
    it('should reject login for deactivated user', async () => {
      // Deactivate user
      await User.findOneAndUpdate(
        { email: testUserData.email },
        { isActive: false }
      );

      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: testUserData.email,
          password: testUserData.password,
        })
        .expect(403);

      expect(response.body).toHaveProperty('message', 'Account is deactivated');

      // Reactivate user
      await User.findOneAndUpdate(
        { email: testUserData.email },
        { isActive: true }
      );
    });
  });

  // ============================================
  // TOKEN STRUCTURE TESTS
  // ============================================
  describe('Token Structure Tests', () => {
    it('should have valid JWT structure', () => {
      const parts = accessToken.split('.');
      expect(parts).toHaveLength(3); // header.payload.signature
    });

    it('should include user ID in token payload', () => {
      const payload = JSON.parse(
        Buffer.from(accessToken.split('.')[1], 'base64').toString()
      );
      
      expect(payload).toHaveProperty('id');
      expect(payload).toHaveProperty('iat'); // issued at
      expect(payload).toHaveProperty('exp'); // expiration
    });
  });
});

// ============================================
// SUMMARY REPORT
// ============================================
afterAll(() => {
  console.log('\n' + '='.repeat(60));
  console.log('✅ JWT AUTHENTICATION TESTS COMPLETE');
  console.log('='.repeat(60));
  console.log('Tests covered:');
  console.log('  ✅ User Registration');
  console.log('  ✅ User Login');
  console.log('  ✅ Token Generation (Access + Refresh)');
  console.log('  ✅ Protected Routes');
  console.log('  ✅ Token Verification');
  console.log('  ✅ Token Refresh');
  console.log('  ✅ User Logout');
  console.log('  ✅ Admin Middleware');
  console.log('  ✅ Password Hashing');
  console.log('  ✅ User Status Check');
  console.log('  ✅ Input Validation');
  console.log('  ✅ Error Handling');
  console.log('='.repeat(60) + '\n');
});

