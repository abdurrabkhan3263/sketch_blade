export declare type File = {
  _id: string;
  file_name: string;
  folder_name?: string;
  active_collaborators: {
    full_name: string;
    profile_url: string;
  }[];
  creator: {
    full_name: string;
    profile_url: string;
  };
  createdAt: string;
  updatedAt?: string;
};
