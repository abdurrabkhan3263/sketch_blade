export declare type UserDetails = {
  full_name: string;
  profile_url: string;
};

export declare type Files = {
  _id: string;
  file_name: string;
  folder_name?: string;
  active_collaborators: UserDetails[];
  creator: UserDetails;
  createdAt: string;
  updatedAt?: string;
};

export declare type File = {
  file_name: string;
  folder_id: string;
  creator_id: Schema.Types.ObjectId;
  collaborators: Schema.Types.ObjectId[];
  active_collaborators: Schema.Types.ObjectId[];
  room_id: string;
  description: string;
  locked: boolean;
  collaborators_actions: { [key: string]: CollaboratorAction };
  created_at: Date;
};
