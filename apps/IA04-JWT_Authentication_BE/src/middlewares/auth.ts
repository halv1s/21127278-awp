import { Request, Response, NextFunction, RequestHandler } from 'express';
import jwt from 'jsonwebtoken';

export const authenticateJWT: RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = req.cookies.token as string | undefined;
  if (!token) {
    res.status(401).json({ message: 'Access denied' });
    return;
  }

  jwt.verify(token, process.env.JWT_SECRET as string, (err, payload) => {
    if (err) {
      res.status(403).json({ message: 'Invalid token' });
      return;
    }

    res.locals.username = (payload as { username: string }).username;

    next();
  });
};
