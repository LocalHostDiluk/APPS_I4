import { Document, model, Schema, Types } from "mongoose";

export interface IRole extends Document {
  idRole: Types.ObjectId;
  type: string;
  createDate: Date;
  deleteDate: Date;
  status: boolean;
}

const roleSchema = new Schema<IRole>({
  type: {
    type: String,
    required: true,
  },
  createDate: {
    type: Date,
    default: Date.now,
  },
  deleteDate: {
    type: Date,
    default: null,
  },
  status: {
    type: Boolean,
    default: true,
  },
});

export const Role = model<IRole>("Role", roleSchema);
