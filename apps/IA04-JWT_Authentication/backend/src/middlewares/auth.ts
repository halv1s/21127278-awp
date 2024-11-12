import { Request, Response, NextFunction, RequestHandler } from 'express';
import jwt from 'jsonwebtoken';

export const authenticateJWT: RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = (req.headers.Authorization as string | undefined)?.split(
    ' ',
  )[1];
  if (!token) {
    res.status(401).send('Access denied');
    return;
  }

  jwt.verify(token, process.env.JWT_SECRET as string, (err, payload) => {
    if (err) {
      res.status(403).send('Invalid token');
      return;
    }

    res.locals.username = (payload as { username: string }).username;

    next();
  });
};
