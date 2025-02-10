import * as authServices from '../services/auth.js';

export const registerController = async (req, res, next) => {
  const { userId, email } = await authServices.register(req.body);

  res.status(201).json({
    status: 201,
    message: 'Successfully registered a user!',
    data: {
      userId,
      email,
    },
  });
};

export const loginController = async (req, res) => {
  const { accessToken, sessionId, userId, accessTokenValidUntil } =
    await authServices.login(req.body);

  res.cookie('accessToken', accessToken, {
    expires: new Date(accessTokenValidUntil),
  });

  res.cookie('sessionId', sessionId, {
    expires: new Date(accessTokenValidUntil),
  });
  res.json({
    status: 200,
    message: 'Successfully logged in an user!',
    data: {
      accessToken,
      userId,
    },
  });
};

export const logoutController = async (req, res) => {
  if (req.cookies.sessionId) {
    await authServices.logout(req.cookies.sessionId); //якщо э кого розлогінити розлогінь
  }

  res.clearCookie('accessToken');
  res.clearCookie('sessionId');

  res.status(204).send();
};
