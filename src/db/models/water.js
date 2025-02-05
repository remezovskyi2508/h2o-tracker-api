import { model, Schema } from 'mongoose';
import { handleSaveError } from './hooks.js';

const waterSchema = new Schema(
  {
    date: {
      type: Date,
      required: true,
    },
    waterVolume: {
      type: Number,
      min: 1,
      max: 5000,
      required: [true, 'Set water volume'],
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    versionKey: false,
  },
);

waterSchema.post('save', handleSaveError);

export const WaterCollection = model('Water', waterSchema);
