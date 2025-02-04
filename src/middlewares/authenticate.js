// import createHttpError from 'http-errors';

// import { getSession, getUser } from '../services/auth.js';

// export const authenticate = async (req, res, next) => {
//   const authHeader = req.get('Authorization');
//   if (!authHeader) {
//     next(createHttpError(401, 'Authorization header not found'));
//   }
//   const [bearer, accessToken] = authHeader.split(' ');
//   if (bearer !== 'Bearer') {
//     return next(createHttpError(401, 'Header must be Bearer type'));
//   }

//   const session = await getSession({ accessToken });
//   if (!session) {
//     return next(createHttpError(401, 'Session not found'));
//   }

//   if (Date.now() > session.accessTokenValidUntil) {
//     return next(createHttpError(401, 'Access token expired'));
//   }

//   const user = await getUser({ _id: session.userId });
//   if (!user) {
//     return next(createHttpError(401, 'User not found'));
//   }

//   req.user = user;

//   next();
// };
import jwt from 'jsonwebtoken';
import UserCollection from '../db/models/user';

export const authenticate = async (req, res, next) => {
  const { authorization = '' } = req.headers;
  const [bearer, token] = authorization.split(' ');

  if (bearer !== 'Bearer') {
    return res.status(401).json({ message: 'Not authorized' });
  }

  try {
    const { id } = jwt.verify(token, process.env.JWT_SECRET);
    const user = await UserCollection.findById(id);

    if (!user) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Not authorized' });
  }
};
