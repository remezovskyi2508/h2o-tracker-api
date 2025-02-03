import { model, Schema } from 'mongoose';
import { handleSaveError } from './hooks.js';
import { dateRegexp } from '../../constants/users.js';

const waterSchema = new Schema(
  {
    date: {
      type: Date,
      required: true,
      match: dateRegexp,
    },
    waterVolume: {
      type: Number,
      min: 1,
      max: 5000,
      required: [true, 'Set water volume'],
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
  },
  {
    versionKey: false,
  },
);

waterSchema.post('save', handleSaveError);

export const WaterCollection = model('Water', waterSchema);
