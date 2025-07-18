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
  deleteDate?: Date | null;
  status?: string;
  products: IOrderProduct[];
}

const orderProductSchema = new Schema<IOrderProduct>({
  productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
  quantity: { type: Number, required: true, min: 1 },
  price: { type: Number, required: true, min: 0 },
});

const orderSchema = new Schema<IOrder>({
  user: { type: String, required: true },
  status: { type: String, default: "Pendiente" },
  subtotal: { type: String, required: true },
  total: { type: String, required: true },
  products: { type: [orderProductSchema], required: true },
  createDate: { type: Date, default: Date.now },
  deleteDate: { type: Date, default: null },
});

export const Order = model<IOrder>("Order", orderSchema);
