import createHttpError from 'http-errors';
import bcrypt from 'bcrypt';
import { randomBytes } from 'crypto';
import path from 'node:path';
import { readFile } from 'fs/promises';
import Handlebars from 'handlebars';
import jwt from 'jsonwebtoken';
import { getEnvVar } from '../utils/getEnvVar.js';

