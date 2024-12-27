export declare type User = {
   _id: Id;
   first_name: FirstName;
   last_name: LastName;
   email: Email;
   password: Password;
   profile_url: Image;
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
   profile_url?: Image;
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
   files: String[];
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
   collaborators?: Collaborators[];
   description?: string;
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
export declare type Collaborators = {
   user: Id;
   actions: CollaboratorAction[];
};
export declare enum CollaboratorAction {
   Edit = "edit",
   View = "view",
   Comment = "comment",
   Owner = "owner",
}
