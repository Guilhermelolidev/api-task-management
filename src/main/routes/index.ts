import { Router } from 'express';
import { taskRoutes } from './task.routes';
import { userRoutes } from './user.routes';

const routes = Router();

routes.use('/users', userRoutes);
routes.use('/tasks', taskRoutes);

export { routes };
