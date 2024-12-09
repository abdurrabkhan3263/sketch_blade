import { Schema, model, Document } from "mongoose";
import { CollaboratorAction } from "../types/appType";

export interface IFile extends Document {
  file_name: string;
  folder_id: Schema.Types.ObjectId;
  creator_id: Schema.Types.ObjectId;
  collaborators: Schema.Types.ObjectId[];
  active_collaborators: Schema.Types.ObjectId[];
  room_id: string;
  description: string;
  locked: boolean;
  collaborators_actions: { [key: string]: CollaboratorAction };
  created_at: Date;
}

const fileSchema = new Schema<IFile>(
  {
    file_name: {
      type: String,
      default: "Untitled File",
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
    // collaborators_actions: {
    //   key: [{ type: "view" }, { type: "edit" }, { type: "comment" }],
    // },
    collaborators_actions: {
      type: Map,
      of: {
        type: String,
        enum: ["view", "edit", "comment"],
      },
    },
    active_collaborators: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    room_id: {
      type: String,
    },
    description: {
      type: String,
      default: "",
    },
    locked: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

export default model<IFile>("File", fileSchema);
