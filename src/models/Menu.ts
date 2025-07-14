import mongoose, { Schema } from "mongoose";

export interface IMenu extends Document {
  title: string;
  path: string;
  icon: string;
  roles: [];
}

const menuSchema = new Schema<IMenu>({
  title: {
    type: String,
    required: true,
  },
  path: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    required: true,
  },
  roles: [
    {
      type: Schema.Types.ObjectId,
      ref: "Role",
      required: true,
    },
  ],
});

export const Menu = mongoose.model<IMenu>("Menu", menuSchema);