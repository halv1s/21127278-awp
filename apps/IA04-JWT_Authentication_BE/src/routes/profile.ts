import { Router, Request, Response } from 'express';
import { authenticateJWT } from '../middlewares/auth';

const router = Router();

router.get('/', authenticateJWT, (req: Request, res: Response) => {
  res.json({
    username: res.locals.username,
  });
});

export default router;
