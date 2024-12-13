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
      },
      creator_id: {
         type: Schema.Types.ObjectId,
         ref: "User",
         required: true,
      },
      collaborators: {
         type: [Schema.Types.ObjectId],
         ref: "User",
      },
      collaborators_actions: {
         type: Object,
         of: {
            type: [
               {
                  type: String,
                  enum: ["view", "edit", "comment", "owner"],
               },
            ],
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

const File = model<IFile>("File", fileSchema);

export default File;
