import { Schema, model } from 'mongoose';

 import { handleSaveError, setUpdateSettings } from './hooks.js';


const userSchema = new Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    gender: {
      type: String,
      enum: ['female', 'male'],
    },
    avatar: {
      url: String,
      public_id: String
    },
    password: {
      type: String,
      required: true,
    },
    oldPassword: {
      type: String,
    },
    dailyNorm: {
      type: Number,
      default: 1800,
    }
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

userSchema.post('save', handleSaveError);
userSchema.pre('findOneAndUpdate', setUpdateSettings);
userSchema.post('findOneAndUpdate', handleSaveError);

const UserCollection = model('users', userSchema);

export default UserCollection;
