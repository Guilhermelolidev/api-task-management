import { Request, Response, Router } from 'express';
import { HttpRequest } from '../../shared/types/httpRequest';
import { loginUserComposer } from '../composer/login-user.composer';

const authRoutes = Router();

authRoutes.post('/', async (req: Request, res: Response) => {
  const httpRequest: HttpRequest = {
    body: req.body,
  };
  const { statusCode, body } = await loginUserComposer(httpRequest);

  res.status(statusCode).json(body);
});

export { authRoutes };
