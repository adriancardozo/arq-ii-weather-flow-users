import { Schema } from 'mongoose';
import { Alert } from 'src/bussiness/entities/alert.entity';

export const UserSchema = new Schema(
  {
    firstName: String,
    lastName: String,
    email: { type: String, unique: true },
    password: String,
    stations: [{ type: String }],
    subscriptions: [{ type: String }],
    alerts: [{ type: Schema.Types.ObjectId, ref: Alert.name }],
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } },
);
