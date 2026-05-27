import { Schema } from 'mongoose';
import { User } from 'src/bussiness/entities/user.entity';

export const AlertSchema = new Schema(
  {
    datetime: Date,
    alertType: {
      type: String,
      enum: ['Calor extremo', 'Helada', 'Tormenta', 'Humedad crítica'],
    },
    pressure: Number,
    temperature: Number,
    humidity: Number,
    measurement: { type: String },
    station: { type: String },
    users: [{ type: Schema.Types.ObjectId, ref: User.name }],
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true }, selectPopulatedPaths: true },
);
