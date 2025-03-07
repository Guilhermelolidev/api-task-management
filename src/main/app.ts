require('express-async-errors');

import express from 'express';
import { ZodError } from 'zod';
import { AppDataSource } from '../infrastructure/database/config/data-source';
import { routes } from './routes';

const app = express();
app.use(express.json());

AppDataSource.initialize()
  .then(() => {
    app.use(routes);

    app.use(function (error: any, request: any, response: any, next: any) {
      if (error instanceof ZodError) {
        return response
          .status(400)
          .json({ message: 'Validation error', error: error.flatten() });
      }
      return response.status(500).json({ message: 'Internal Server Error' });
    });
  })
  .catch(error => {
    console.log(`Error when initialing server`, error);
  });

export default app;
