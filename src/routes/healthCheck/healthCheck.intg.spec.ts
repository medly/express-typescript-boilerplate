import request from 'supertest';
import app from '../../app';

describe('Health check', () => {
    it('works', async () => {
        const { status, body } = await request(app).get('/api/satellite/healthCheck');
        expect(status).toEqual(200);
        expect(body).toEqual({ status: 'Satellite-auth-api is up and running' });
    });
});
