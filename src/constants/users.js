export const emailRegexp =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

export const accessTokenLifetime = 15 * 60 * 1000;

export const refreshTokenLifetime = 24 * 30 * 60 * 60 * 1000;

export const dateRegexp = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}/;
