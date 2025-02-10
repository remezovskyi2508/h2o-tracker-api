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
    httpOnly: true,
    secure: true,
    sameSite: 'none',
  });

  res.cookie('sessionId', sessionId, {
    expires: new Date(accessTokenValidUntil),
    httpOnly: true,
    secure: true,
    sameSite: 'none',
  });

  res.json({
    status: 200,
    message: 'Successfully logged in an user!',
    data: {
      accessToken,
      userId,
      sessionId
    },
  });
};

export const logoutController = async (req, res) => {
  try {
    let sessionId = req.cookies?.sessionId;
    if (!sessionId) {
      return res.status(400).json({ message: 'Session ID is missing' });
    }

    try {
      sessionId = JSON.parse(decodeURIComponent(sessionId));
    } catch (error) {
      console.log('Session ID is not in JSON format, using raw value.');
    }

    await authServices.logout(sessionId);

    res.clearCookie('accessToken');
    res.clearCookie('sessionId');

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
