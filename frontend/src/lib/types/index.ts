export declare type User = {
  _id: string;
  clerkId: string;
  name: string;
  email: string;
};

export declare type Files = {
  _id: string;
  file_name: string;
  folder?: Folder;
  active_collaborators: CreatorDetails[];
  creator: CreatorDetails;
  collaborators: CollaboratorData[];
  description: string;
  createdAt: string;
  updatedAt?: string;
};

export declare type File = {
  _id: string;
  file_name: string;
  folder?: string;
  description?: string;
  locked: boolean;
  active_collaborators: ActiveCollaborators[];
  collaborators: CollaboratorData[];
  creator: CreatorDetails;
  updatedAt: string;
};

export declare type Folder = {
  _id: string;
  folder_name: string;
  createdAt: string;
};

export declare type Folders = {
  _id: string;
  folder_name: string;
  creator: CreatorDetails;
  createdAt: string;
  updatedAt: string;
};

export declare type CreatorDetails = {
  _id?: string;
  full_name: string;
  profile_url: string;
};

export declare type ActiveCollaborators = {
  full_name: string;
  profile_url: string;
  email: string;
};

export declare type CollaboratorData = {
  _id: string;
  full_name: string;
  profile_url: string;
  actions: CollaboratorActions;
  email: string;
};

export declare type ListCollaborator = {
  _id: string;
  email: string;
  full_name: string;
  profile_url: string;
};

export declare type CreateFile = {
  file_name: string;
  collaborators: CollaboratorData[];
  description: string;
};

export declare type ToolBarProperties = {
  fillColor: string;
  fillStyle: FillStyle;
  strokeColor: string;
  strokeStyle: StrokeStyle;
  strokeWidth: StrokeWidth;
  edgeStyle: EdgeStyle;
  opacity: number;
  eraserRadius: number;
  fontSize: FontSize;
};

export declare type CollaboratorActions = "edit" | "view";

export declare type StrokeStyle = "SOLID" | "DOTTED" | "DASHED";

export declare type FillStyle = "SOLID" | "CROSSHATCH" | "HACHURE";

export declare type EdgeStyle = "SHARP" | "ROUNDED";

export declare type StrokeWidth = "THIN" | "MEDIUM" | "THICK";

export declare type FontSize = "SMALL" | "MEDIUM" | "LARGE";

export declare type ToolBarElem =
  | "cursor"
  | "circle"
  | "rectangle"
  | "free hand"
  | "text"
  | "eraser"
  | "arrow"
  | "point arrow"
  | "upload";
