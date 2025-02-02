import { Schema, model } from 'mongoose';
import { handleSaveError, setUpdateSettings } from './hooks.js';
import { emailRegexp } from '../../constants/users.js';

const userAuthSchema = new Schema(
  {
    email: {
      type: String,
      match: emailRegexp,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { versionKey: false, timestamps: true },
);

userAuthSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

userAuthSchema.post('save', handleSaveError);

userAuthSchema.pre('findOneAndUpdate', setUpdateSettings);

userAuthSchema.post('findOneAndUpdate', handleSaveError);

const UserAuthCollection = model('userAuth', userAuthSchema);

export default UserAuthCollection;
