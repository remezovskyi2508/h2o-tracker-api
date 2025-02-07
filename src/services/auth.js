import createHttpError from 'http-errors';
import bcrypt from 'bcrypt';
import { randomBytes } from 'crypto';
import { accessTokenLifetime } from '../constants/users.js';
import path from 'node:path';
import { readFile } from 'fs/promises';
import Handlebars from 'handlebars';
import jwt from 'jsonwebtoken';
import { getEnvVar } from '../utils/getEnvVar.js';
import SessionCollection from '../db/models/session.js';
import UserCollection from '../db/models/user.js';

export const register = async (payload) => {
  const { email, password } = payload;

  const user = await UserCollection.findOne({ email });

  if (user) {
    throw createHttpError(409, 'Email is already in use');
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const newUser = await UserCollection.create({
    ...payload,
    password: hashPassword,
  });

  const userId = newUser._id;
  return {
    userId,
    email: newUser.email,
  };
};

export const login = async ({ email, password }) => {
  const user = await UserCollection.findOne({ email });
  if (!user) {
    throw createHttpError(401, 'Email or password invalid');
  }
  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw createHttpError(401, 'Email or password invalid');
  }

  await SessionCollection.deleteOne({ userId: user._id });
  const accessToken = randomBytes(30).toString('base64');
  const accessTokenValidUntil = new Date(Date.now() + accessTokenLifetime);

  const session = await SessionCollection.create({
    userId: user._id,
    accessToken,
    accessTokenValidUntil: Date.now() + accessTokenLifetime,
  });
  return {
    accessToken,
    accessTokenValidUntil: session.accessTokenValidUntil,
    sessionId: session._id,
    userId: user._id,
  };
};

export const getSession = (filter) => SessionCollection.findOne(filter);

export const getUser = (filter) => UserCollection.findOne(filter);

export const resetPassword = async (_id, oldPassword, newPassword) => {
  const user = await UserCollection.findById(_id);
  if (!user) {
    throw createHttpError(404, 'User not found');
  }

  const passwordCompare = await bcrypt.compare(oldPassword, user.password);
  if (!passwordCompare) {
    throw createHttpError(401, 'Old password is incorrect');
  }

  const hashNewPassword = await bcrypt.hash(newPassword, 10);

  user.password = hashNewPassword;
  await user.save();
};

export const logout = async (sessionId) => {
  const session = await SessionCollection.findById(sessionId);
  if (!session) {
    throw createHttpError(404, 'Session not found');
  }

  await SessionCollection.deleteOne({ _id: sessionId });
};
