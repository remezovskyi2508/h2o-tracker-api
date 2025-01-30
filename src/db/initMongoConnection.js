import mongoose from 'mongoose';
import { getEnvVar } from '../utils/getEnvVar.js';

const user = getEnvVar('MONGODB_USER');
const password = getEnvVar('MONGODB_PASSWORD');
const url = getEnvVar('MONGODB_URL');
const db = getEnvVar('MONGODB_DB');

export const initMongoConnection = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${user}:${password}@${url}/${db}?retryWrites=true&w=majority&appName=Cluster0`,
    );
    console.log('Mongo connection successfully established!');
  } catch (error) {
    console.log(`Error connection Mongo ${error.message}`);
  }
};
