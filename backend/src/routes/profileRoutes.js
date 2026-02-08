import { Router } from 'express';
import { getMyProfile, upsertMyProfile } from '../controllers/profileController.js';
import { requireAuth } from '../middleware/authMiddleware.js';

const profileRouter = Router();

profileRouter.use(requireAuth);
profileRouter.get('/me', getMyProfile);
profileRouter.put('/me', upsertMyProfile);

export { profileRouter };
