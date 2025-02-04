import createHttpError from 'http-errors';
import bcrypt from 'bcrypt';
import { randomBytes } from 'crypto';
import { accessTokenLifetime } from '../constants/users.js';
import UserAuthCollection from '../db/models/userAuth.js';
import SessionCollection from '../db/models/session.js';
import UserCollection from '../db/models/user.js';

export const register = async (payload) => {
  const { email, password } = payload;

  // Перевірка чи існує користувач
  const existingUserAuth = await UserAuthCollection.findOne({ email });
  const existingUser = await UserCollection.findOne({ email });

  if (existingUserAuth || existingUser) {
    throw createHttpError(409, 'Email in use');
  }

  const hashPassword = await bcrypt.hash(password, 10);

  // Створення в UserAuthCollection
  const newUserAuth = await UserAuthCollection.create({
    email,
    password: hashPassword,
  });

  // Створення в UserCollection
  const newUser = await UserCollection.create({
    email,
    password: hashPassword,
  });

  return {
    userAuth: newUserAuth,
    user: newUser,
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
    accessTokenValidUntil
  });

  return {
    session: {
      id: session._id,
      accessToken: session.accessToken,
      accessTokenValidUntil: session.accessTokenValidUntil
    },
    userId: user._id
  };
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
