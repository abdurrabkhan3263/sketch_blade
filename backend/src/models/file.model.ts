import { Schema, model, Document } from "mongoose";

export interface IFile extends Document {
  file_name: string;
  folder_id: Schema.Types.ObjectId;
  creator_id: Schema.Types.ObjectId;
  collaborators: Schema.Types.ObjectId[];
  activeCollaborators: Schema.Types.ObjectId[];
  locked: boolean;
  created_at: Date;
}

const fileSchema = new Schema<IFile>(
  {
    file_name: {
      type: String,
      required: true,
    },
    folder_id: {
      type: Schema.Types.ObjectId,
      ref: "Folder",
      required: true,
    },
    creator_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    collaborators: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    activeCollaborators: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    locked: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const FileModel = model("File", fileSchema);
