import { model, Schema, Document } from "mongoose";

export interface IFolder extends Document {
  folder_name: string;
  creator_id: Schema.Types.ObjectId;
}

const folderSchema = new Schema<IFolder>(
  {
    folder_name: {
      type: String,
      required: true,
    },
    creator_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export const FolderModel = model("Folder", folderSchema);
