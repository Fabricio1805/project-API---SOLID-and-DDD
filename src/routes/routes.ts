import { Router } from 'express';
import userRoutes from './user.routes';

const routes = Router();

// user
routes.use('/users', userRoutes);

export default routes;
