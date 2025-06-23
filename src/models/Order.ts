import { Document, model, Schema, Types } from "mongoose";

interface IOrderProduct {
  productId: Types.ObjectId;
  quantity: number;
  price: number;
}

export interface IOrder extends Document {
  id: Types.ObjectId;
  user: string;
  subtotal: string;
  total: string;
  createDate: Date;
  deleteDate: Date;
  status: string;
  products: IOrderProduct[];
}

const orderProductSchema = new Schema<IOrderProduct>(
  {
    productId: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  { _id: false }
);

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
  products: {
    type: [orderProductSchema],
    required: true,
    validate: [
      (array: string | any[]) => array.length > 0,
      "Orden debe contener al menos un producto",
    ],
  },
  total: {
    type: String,
    required: true,
  },
});

export const Order = model<IOrder>("Order", orderSchema);
