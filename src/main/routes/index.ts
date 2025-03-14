import { Router } from 'express';
import { authRoutes } from './auth.routes';
import { taskRoutes } from './task.routes';
import { userRoutes } from './user.routes';

const routes = Router();

routes.use('/users', userRoutes);
routes.use('/tasks', taskRoutes);
routes.use('/auth', authRoutes);

export { routes };
