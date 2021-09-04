import { Router } from 'express';
import * as Faker from 'faker';
import CreateUserService from '../services/CreateUserService';

const usersRouter = Router();

usersRouter.post('/', async (request, response) => {
  try {
    // const { name, email, password } = request.body;

    // user faker to generate random data

    const { name, email, password } = {
      name: Faker.name.findName(),
      email: Faker.internet.email(),
      password: Faker.internet.password(),
    };

    const createUser = new CreateUserService();
    const user = await createUser.execute({
      name,
      email,
      password,
    });

    delete user.password;

    return response.json(user);
  } catch (error) {
    return response.status(400).json({ error: error.message });
  }
});

export default usersRouter;
