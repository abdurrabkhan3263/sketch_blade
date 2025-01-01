import { Schema, model, Document } from "mongoose";
import { CollaboratorAction } from "../types/appType";

export interface IFile extends Document {
   file_name: string;
   folder: Schema.Types.ObjectId;
   creator: Schema.Types.ObjectId;
   collaborators: Schema.Types.ObjectId[];
   active_collaborators: Schema.Types.ObjectId[];
   room_id: string;
   description: string;
   locked: boolean;
   collaborators_actions: { [key: string]: CollaboratorAction };
   created_at: Date;
}

export interface CollaboratorActionDocument extends Document {
   user: Schema.Types.ObjectId;
   actions: ["edit", "view", "comment"];
}

const collaboratorsAction = new Schema<CollaboratorActionDocument>(
   {
      _id: {
         type: Schema.Types.ObjectId,
         ref: "User",
         required: true,
      },
      actions: {
         type: [String],
         enum: ["edit", "view", "comment"],
         required: true,
         validate: {
            validator: function (v: any) {
               return v && v.length > 0;
            },
            message: "Collaborator must have at least one action",
         },
      },
   },
   { _id: false },
);

const fileSchema = new Schema<IFile>(
   {
      file_name: {
         type: String,
         default: "Untitled File",
      },
      folder: {
         type: Schema.Types.ObjectId,
         ref: "Folder",
         default: null,
      },
      creator: {
         type: Schema.Types.ObjectId,
         ref: "User",
         required: true,
      },
      collaborators: {
         type: [collaboratorsAction],
         validate: {
            validator: function (permissions: CollaboratorActionDocument[]) {
               const users = permissions.map((p) => p._id);
               return new Set(users).size === users.length;
            },
            message: "Duplicate users are not allowed in permissions",
         },
         default: [],
      },
      active_collaborators: [
         {
            type: Schema.Types.ObjectId,
            ref: "User",
         },
      ],
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
