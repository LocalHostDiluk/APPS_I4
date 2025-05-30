import { Document, model, Schema, Types } from "mongoose";

export interface IOrder extends Document {
  id: Types.ObjectId;
  user: string;
  subtotal: string;
  total: string;
  createDate: Date;
  deleteDate: Date;
  status: boolean;
}

const orderSchema = new Schema<IOrder>({
  createDate: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: String,
    required: true,
  },
  subtotal: {
    type: String,
    required: true,
  },
  total: {
    type: String,
    required: true,
  },
});

export const Order = model<IOrder>("Order", orderSchema);
