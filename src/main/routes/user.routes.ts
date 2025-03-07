import { Request, Response, Router } from 'express';
import { HttpRequest } from '../../shared/types/httpRequest';
import { createUserComposer } from '../composer/create-user.composer';

const userRoutes = Router();

userRoutes.post('/', async (req: Request, res: Response) => {
  // recebe a requisicao http
  // envia a requisicao para o composer
  const httpRequest: HttpRequest = {
    body: req.body,
  };

  const { statusCode, body } = await createUserComposer(httpRequest);

  res.status(statusCode).json(body);
});

export { userRoutes };
