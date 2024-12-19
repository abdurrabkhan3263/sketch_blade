export declare type UserDetails = {
  full_name: string;
  profile_url: string;
};

export declare type File = {
  _id: string;
  file_name: string;
  folder_name?: string;
  active_collaborators: UserDetails[];
  creator: UserDetails;
  createdAt: string;
  updatedAt?: string;
};
