import { describe, it, expect } from 'vitest';
import request from 'supertest';
import bookings from './data/bookings.json';
import app from './App';

describe('GET /api/v1/bookings', () => {
  it('should return a list of bookings', async () => {
    const response = await request(app).get('/api/v1/bookings');

    // Assertions
    expect(response.status).toBe(200);
    expect(response.body.data).toEqual(bookings);
  });

  it('should return a list of mentors', async () => {
    const response = await request(app).get('/api/v1/mentors');

    // Assertions
    expect(response.status).toBe(200);
    expect(response.body.status).toEqual('success');
  });

  it('should return a mentor', async () => {
    const response = await request(app).get('/api/v1/mentors/1');

    // Assertions
    expect(response.status).toBe(200);
    expect(response.body.status).toEqual('success');
    expect(response.body.length).toEqual(1);
  });

  it('should not return a mentor', async () => {
    const response = await request(app).get('/api/v1/mentors/15');

    // Assertions
    expect(response.status).toBe(200);
    expect(response.body.status).toEqual('success');
    expect(response.body.length).not.toEqual(1);
  });
});
