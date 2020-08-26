import { RequestHandler } from 'express';

export const healthCheck: RequestHandler = (_, res) => res.json({ status: 'Satellite-auth-api is up and running' });
