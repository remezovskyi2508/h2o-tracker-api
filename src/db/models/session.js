import { Schema, model } from 'mongoose';
import { handleSaveError, setUpdateSettings } from './hooks.js';

const sessionSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId, //що це саме Id
      ref: 'userAuth',
    },
    accessToken: {
      type: String,
      required: true,
    },
    accessTokenValidUntil: {
      type: Date,
      required: true,
    },
    // refreshToken: {
    //   type: String,
    //   required: true,
    // },
    // refreshTokenValidUntil: {
    //   type: Date,
    //   required: true,
    // },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

//додати статуст помилки через хук для додавання якщо валідація не пройшла
sessionSchema.post('save', handleSaveError);

//перед оновл-ням включаєм валідацію
sessionSchema.pre('findOneAndUpdate', setUpdateSettings);

//додати статуст помилки через хук для оновлення
sessionSchema.post('findOneAndUpdate', handleSaveError);

//На основі схеми створ модель( клас)
const SessionCollection = model('session', sessionSchema);

export default SessionCollection;
