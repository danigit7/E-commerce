import request from 'supertest';
import app from '../server.js';

describe('Auth API Tests', () => {
  let accessToken;

  describe('POST /api/auth/register', () => {
    it('should register a new user', async () => {
      const res = await request(app)
        .post('/api/auth/register')
        .send({
          name: 'Test User',
          email: `test${Date.now()}@example.com`,
          password: 'Password123',
        });

      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty('accessToken');
      expect(res.body).toHaveProperty('email');
    });

    it('should not register user with existing email', async () => {
      const email = `duplicate${Date.now()}@example.com`;
      
      await request(app)
        .post('/api/auth/register')
        .send({
          name: 'Test User',
          email: email,
          password: 'Password123',
        });

      const res = await request(app)
        .post('/api/auth/register')
        .send({
          name: 'Test User 2',
          email: email,
          password: 'Password123',
        });

      expect(res.statusCode).toBe(400);
    });
  });

  describe('POST /api/auth/login', () => {
    it('should login with valid credentials', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'john@example.com',
          password: 'Password123',
        });

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('accessToken');
      accessToken = res.body.accessToken;
    });

    it('should not login with invalid credentials', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'john@example.com',
          password: 'wrongpassword',
        });

      expect(res.statusCode).toBe(401);
    });
  });

  describe('GET /api/auth/me', () => {
    it('should get user profile with valid token', async () => {
      const res = await request(app)
        .get('/api/auth/me')
        .set('Authorization', `Bearer ${accessToken}`);

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('email');
    });

    it('should not get profile without token', async () => {
      const res = await request(app).get('/api/auth/me');

      expect(res.statusCode).toBe(401);
    });
  });
});

