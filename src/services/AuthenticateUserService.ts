import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { getRepository } from 'typeorm';
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
      throw new Error(defaultErrorMessage);
    }

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new Error(defaultErrorMessage);
    }

    const token = sign({}, '6adef64403108a32e718425683c2d364', {
      subject: user.id,
      expiresIn: '1d',
    });

    return {
      user,
      token,
    };
  }
}

export default AuthenticationUserService;
