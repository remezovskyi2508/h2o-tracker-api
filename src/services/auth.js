// import createHttpError from 'http-errors';
// import bcrypt from 'bcrypt';
// import { randomBytes } from 'crypto';
// import path from 'node:path';
// import { readFile } from 'fs/promises';
// import Handlebars from 'handlebars';
// import jwt from 'jsonwebtoken';
// import { getEnvVar } from '../utils/getEnvVar.js';

import createHttpError from 'http-errors';
import bcrypt from 'bcrypt';
import { randomBytes } from 'crypto';
import { accessTokenLifetime } from '../constants/users.js';
import path from 'node:path';
import { readFile } from 'fs/promises';
import Handlebars from 'handlebars';
import jwt from 'jsonwebtoken';
import { getEnvVar } from '../utils/getEnvVar.js';
import UserAuthCollection from '../db/models/userAuth.js';
import SessionCollection from '../db/models/session.js';

export const register = async (payload) => {
  const { email, password } = payload;
  const user = await UserAuthCollection.findOne({ email });
  if (user) {
    throw createHttpError(409, 'Email is already in use');
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const newUser = await UserAuthCollection.create({
    ...payload,
    password: hashPassword,
  }); //юзер,емейл,пароль

  return newUser;
};

export const login = async ({ email, password }) => {
  const user = await UserAuthCollection.findOne({ email });
  if (!user) {
    throw createHttpError(401, 'Email or password invalid');
  }
  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw createHttpError(401, 'Email or password invalid');
  }
  await SessionCollection.deleteOne({ userId: user._id });

  const accessToken = randomBytes(30).toString('base64');

  return SessionCollection.create({
    userId: user._id,
    accessToken,
    accessTokenValidUntil: Date.now() + accessTokenLifetime,
  });
};

export const getSession = (filter) => SessionCollection.findOne(filter);

export const getUser = (filter) => UserAuthCollection.findOne(filter);

export const logout = async (sessionId) => {
  const session = await SessionCollection.findById(sessionId);
  if (!session) {
    throw createHttpError(404, 'Session not found');
  }

  await SessionCollection.deleteOne({ _id: sessionId });
};
