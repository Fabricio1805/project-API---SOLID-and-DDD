import { Router } from 'express';
import { CreateUserController } from '../controllers/create-user/create-user-controller';
import DelteUserController from '../controllers/delete-user/delete-user-controller';
import GetUsersController from '../controllers/get-users/get-users-controller';
import UpdateUserController from '../controllers/update-user/update-user-controller';
import { CreateUserRepository } from '../repositories/create-user/create-user-repository';
import DeleteUserRepository from '../repositories/delete-user/delete-user-repository';
import GetUsersRepository from '../repositories/get-users/get-users-repository';
import UpdateUserRepository from '../repositories/update-user/update-user-repository';

const userRoutes = Router();


//route get users
userRoutes.get('/', async (req, res) => {
  const getUsersRepository = new GetUsersRepository();

  const getUsersController = new GetUsersController(getUsersRepository);

  const { body, statusCode } = await getUsersController.handle();
  res.status(statusCode).send(body);
});

//route create user
userRoutes.post('/', async (req, res) => {
  const createUserRepository = new CreateUserRepository();

  const createUserController = new CreateUserController(createUserRepository);

  const { body, statusCode } = await createUserController.handle({
    body: req.body,
  });

  res.status(statusCode).send(body);
});

//route update user
userRoutes.patch('/:id', async (req, res) => {
  const updateUserRepository = new UpdateUserRepository();

  const updateUserController = new UpdateUserController(updateUserRepository);

  const { body, statusCode } = await updateUserController.handle({
    body: req.body,
    params: req.params,
  });
  res.status(statusCode).send(body);
});

// route delete user
userRoutes.delete('/:id', async (req, res) => {
  const deleteUserRepository = new DeleteUserRepository();

  const deleteUserController = new DelteUserController(deleteUserRepository);

  const { body, statusCode } = await deleteUserController.handle({
    params: req.params,
  });
  res.status(statusCode).send(body);

});


export default userRoutes;
