import { Document, model, Schema, Types } from "mongoose";

export interface IProduct extends Document {
  id: Types.ObjectId;
  name: string;
  description: string;
  cant: number;
  price: number;
  createDate: Date;
  deleteDate: Date;
  status: boolean;
}

const productSchema = new Schema<IProduct>({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  cant: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

export const Product = model<IProduct>("Product", productSchema);
