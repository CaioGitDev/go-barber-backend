import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { getRepository } from 'typeorm';
import auth from '../config/auth';
import AppError from '../errors/AppError';
import User from '../models/User';

interface RequestDTO {
  email: string;
  password: string;
}

interface ResponseDTO {
  user: User;
  token: string;
}

class AuthenticationUserService {
  public async execute({ email, password }: RequestDTO): Promise<ResponseDTO> {
    const defaultErrorMessage = 'Incorrect email/password combination';
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne({
      where: { email },
    });

    if (!user) {
      throw new AppError(defaultErrorMessage, 401);
    }

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new AppError(defaultErrorMessage, 401);
    }

    const { secret, expiresIn } = auth.jwt;
    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    });

    return {
      user,
      token,
    };
  }
}

export default AuthenticationUserService;
