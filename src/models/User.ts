import { Document, model, Schema, Types } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: Types.ObjectId[];
  id: Types.ObjectId;
  phone: string;
  createDate: Date;
  deleteDate: Date;
  status: boolean;
}

const userSchema = new Schema<IUser>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: [
    {
      type: Schema.Types.ObjectId,
      ref: "Role",
      required: true,
    }
  ],
  phone: {
    type: String,
  },
  createDate: {
    type: Date,
    default: Date.now,
  },
  deleteDate: {
    type: Date,
  },
  status: {
    type: Boolean,
    default: true,
  },
});

export const User = model<IUser>("User", userSchema);
