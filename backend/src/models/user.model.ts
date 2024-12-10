import { model, Schema, Document } from "mongoose";

interface IUser extends Document {
  _id: string;
  first_name: string;
  last_name: string;
  email: string;
  image_url: string;
  socket_id: string;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    _id: {
      type: String,
      required: true,
      unique: true,
    },
    first_name: {
      type: String,
      required: true,
      trim: true,
    },
    last_name: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    image_url: {
      type: String,
      trim: true,
    },
    socket_id: {
      type: String,
    },
  },
  { timestamps: true },
);

export const User = model("User", userSchema);
