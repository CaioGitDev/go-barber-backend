import { Router } from 'express';
import * as Faker from 'faker';
import multer from 'multer';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import CreateUserService from '../services/CreateUserService';

import uploadConfig from '../config/upload';

const usersRouter = Router();

const upload = multer(uploadConfig);

usersRouter.post('/', async (request, response) => {
  try {
    const { name, email, password } = request.body;

    // // user faker to generate random data

    // const { name, email, password } = {
    //   name: Faker.name.findName(),
    //   email: Faker.internet.email(),
    //   password: Faker.internet.password(),
    // };

    const createUser = new CreateUserService();
    const user = await createUser.execute({
      name,
      email,
      password,
    });

    const userWithoutPassword = {
      id: user.id,
      name: user.name,
      email: user.email,
      created_at: user.created_at,
      updated_at: user.updated_at,
    };

    return response.json(userWithoutPassword);
  } catch (error) {
    return response.status(400).json({ error: error.message });
  }
});

usersRouter.patch('/avatar', ensureAuthenticated, upload.single('avatar'),
  async (request, response) => {
    const { file } = request;

    return response.json({ ok: true });
  });

export default usersRouter;
