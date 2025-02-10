import createError from 'http-errors';
import * as userServices from '../services/user.js';
// import { getEnvVar } from "../utils/getEnvVar.js";
import * as cloudUse from '../utils/saveFileToCloudinary.js';
import { resetPassword } from '../services/auth.js';

export const getUserByIdController = async (req, res) => {
  const { id } = req.params;

  const data = await userServices.getUserById(id);

  if (!data) {
    throw createError(404, `User with id=${id} not found`);
  }
  res.json({
    status: 200,
    message: `Successfully found user with id=${id}`,
    data,
  });
};

export const updateUserAvatar = async (req, res) => {
  const { id } = req.params;
  const avatar = req.file;

  if (!avatar) {
    throw createError(400, 'Avatar file is required');
  }

  // Перевіряємо існування користувача
  const user = await userServices.getUserById(id);
  if (!user) {
    throw createError(404, `User with id=${id} not found`);
  }

  // Видаляємо старий аватар якщо він існує
  if (user.avatar?.public_id) {
    await cloudUse.deleteFileFromCloudinary(user.avatar.public_id);
  }
  // Завантажуємо новий аватар
  const avatarData = await cloudUse.saveAvatarToCloudinary(avatar);

  // Оновлюємо дані користувача
  const result = await userServices.updateUser(
    { _id: id },
    {
      avatar: {
        url: avatarData.url,
        public_id: avatarData.public_id,
      },
    },
  );

  res.json({
    status: 200,
    message: 'Avatar updated successfully',
    data: {
      avatarUrl: result.data.avatar.url,
    },
  });
};

export const updateUserController = async (req, res) => {
  const { id } = req.params;
  const { oldPassword, newPassword, ...userData } = req.body;

  const user = await userServices.getUserById(id);
  if (!user) {
    throw createError(404, `User with id=${id} not found`);
  }
  if (oldPassword && newPassword) {
    await resetPassword(id, oldPassword, newPassword);
  }

  const result = await userServices.updateUser({ _id: id }, userData);

  res.json({
    status: 200,
    message: `User with id=${id} updated successfully`,
    data: result,
  });
};

export const getCurrentUserController = async (req, res, next) => {
  const user = req.user;
  res.json({
    status: 200,
    message: 'User data retrieved successfully',
    data: user,
  });
};
