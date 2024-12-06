export declare type User = {
  _id: Id;
  first_name: FirstName;
  last_name: LastName;
  email: Email;
  password: Password;
  image_url: Image;
  socket_id: SocketId;
  createdAt: CreatedAt;
  updatedAt: UpdatedAt;
};

export declare type CreateUserRequest = {
  id: Id;
  first_name: FirstName;
  last_name?: LastName;
  email: Email;
  password: Password;
  image_url?: Image;
};

export declare type ApiResponse = {
  success?: boolean;
  statusCode?: number;
  message: string;
  data?: any;
};

export declare type Error = {
  statusCode: number;
  message: string;
};

// Folder
export declare type Folder = {
  _id: Id;
  folder_name: string;
  creator_id: Id;
  createdAt: CreatedAt;
  updatedAt: UpdatedAt;
};

export declare type CreateFolderRequest = {
  folder_name: string;
  creator_id: Id;
};

export declare type UpdateFolderRequest = {
  folder_name: string;
};

// File
export declare type File = {
  _id: Id;
  file_name: string;
  folder?: Folder;
  collaborators: User[];
  active_collaborators: User[];
  room_id?: string;
  locked: boolean;
  createdAt: CreatedAt;
  updatedAt: UpdatedAt;
};

export declare type CreateFileRequest = {
  file_name: string;
  folder_id?: Id;
  collaborator_ids: Id[];
};

export declare type UpdateFileRequest = {
  file_name: string;
};

export declare type Password = string;
export declare type Email = string;
export declare type FirstName = string;
export declare type LastName = string;
export declare type Image = string;
export declare type SocketId = string;
export declare type Id = string;
export declare type CreatedAt = string;
export declare type UpdatedAt = string;
export declare type id = string;
