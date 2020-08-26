import { Router } from 'express';
import { verifyToken } from '../middleware';
import healthCheck from './healthCheck';

const router = Router();

router.get('/healthCheck', healthCheck);

router.use(verifyToken);

export default router;
