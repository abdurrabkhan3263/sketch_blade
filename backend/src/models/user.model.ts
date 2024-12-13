import { model, Schema, Document } from "mongoose";

interface IUser extends Document {
   first_name: string;
   last_name: string;
   email: string;
   profile_url: string;
   socket_id: string;
   userId: string;
   createdAt: Date;
   updatedAt: Date;
}

const userSchema = new Schema<IUser>(
   {
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
      profile_url: {
         type: String,
         trim: true,
      },
      socket_id: {
         type: String,
      },
      userId: {
         type: String,
         required: true,
         unique: true,
      },
   },
   { timestamps: true },
);

export const User = model("User", userSchema);
