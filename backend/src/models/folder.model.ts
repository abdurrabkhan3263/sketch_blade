import { model, Schema, Document } from "mongoose";

export interface IFolder extends Document {
   folder_name: string;
   creator_id: Schema.Types.ObjectId;
}

const folderSchema = new Schema<IFolder>(
   {
      folder_name: {
         type: String,
         default: "Untitled Folder",
      },
      creator_id: {
         type: Schema.Types.ObjectId,
         ref: "User",
         required: true,
      },
   },
   { timestamps: true },
);

export default model<IFolder>("Folder", folderSchema);
