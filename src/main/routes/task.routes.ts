import { Request, Response, Router } from 'express';
import { HttpRequest } from '../../shared/types/httpRequest';
import { createTaskComposer } from '../composer/create-task.composer';
import { deleteTaskComposer } from '../composer/delete-task.composer';
import { listTasksComposer } from '../composer/list-tasks.composer';
import { updateTaskComposer } from '../composer/update-task.composer';

const taskRoutes = Router();

taskRoutes.post('/', async (req: Request, res: Response) => {
  const httpRequest: HttpRequest = {
    body: req.body,
  };

  const { statusCode, body } = await createTaskComposer(httpRequest);

  res.status(statusCode).json(body);
});

taskRoutes.get('/', async (req: Request, res: Response) => {
  const httpRequest: HttpRequest = {
    query: req.query,
  };

  const { statusCode, body } = await listTasksComposer(httpRequest);

  res.status(statusCode).json(body);
});

taskRoutes.delete('/:id', async (req: Request, res: Response) => {
  const httpRequest: HttpRequest = {
    params: req.params,
  };

  const { statusCode, body } = await deleteTaskComposer(httpRequest);

  res.status(statusCode).json(body);
});

taskRoutes.put('/:id', async (req: Request, res: Response) => {
  const httpRequest: HttpRequest = {
    params: req.params,
    body: req.body,
  };

  const { statusCode, body } = await updateTaskComposer(httpRequest);

  res.status(statusCode).json(body);
});

export { taskRoutes };
