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
  collaborators: CollaboratorsDetails[];
  creator: CreatorDetails;
  updatedAt: string;
};

export declare type Folder = {
  _id: string;
  folder_name: string;
};

export declare type CreatorDetails = {
  _id: string;
  full_name: string;
  profile_url: string;
};

export declare type CollaboratorsDetails = {
  full_name: string;
  profile_url: string;
  email: string;
  actions: CollaboratorActions;
};

export declare type ActiveCollaborators = {
  full_name: string;
  profile_url: string;
  email: string;
};

export declare enum CollaboratorActions {
  Edit = "edit",
  View = "view",
  Owner = "owner",
}
