import { model, Schema } from "mongoose";
import bcrypt from "bcrypt";
import { Password } from "../types";

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
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
    password: {
      type: String,
      required: true,
      select: false,
    },
    image: {
      type: String,
      trim: true,
    },
    socket_id: {
      type: String,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = bcrypt.hashSync(this.password, 10);
});

userSchema.methods.isPasswordCorrect = async function (password: Password) {
  return bcrypt.compareSync(password, this.password);
};

export const User = model("User", userSchema);
