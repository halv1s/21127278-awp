import { Router, Request, Response } from 'express';
import { authenticateJWT } from '../middlewares/auth';

const router = Router();

router.get('/', authenticateJWT, (req: Request, res: Response) => {
  res.send(
    `Hello, ${res.locals.username}! You have access to this protected route.`,
  );
});

export default router;
