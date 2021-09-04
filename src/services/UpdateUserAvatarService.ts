import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';
import uploadConfig from '../config/upload';
import User from '../models/User';
import AppError from '../errors/AppError';

interface RequestDTO {
  user_id: string;
  avatarFileName?: string;
}

class UpdateUserAvatarService {
  public async execute({ user_id, avatarFileName }: RequestDTO): Promise<User> {
    if (!avatarFileName) {
      throw new AppError('Invalid file name');
    }
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne(user_id);

    if (!user) {
      throw new AppError('Only authenticated users can change avtar', 401);
    }

    if (user.avatar) {
      const userAvatarFilePath = path.join(uploadConfig.directoty, user.avatar);

      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }

    user.avatar = avatarFileName;

    await usersRepository.save(user);
    return user;
  }
}

export default UpdateUserAvatarService;
