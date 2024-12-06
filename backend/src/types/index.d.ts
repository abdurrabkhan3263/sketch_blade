export declare type Password = string;
export declare type Email = string;
export declare type FirstName = string;
export declare type LastName = string;
export declare type Image = string;
export declare type SocketId = string;
export declare type Id = string;
export declare type CreatedAt = string;
export declare type UpdatedAt = string;

export declare type User = {
  _id: Id;
  firstName: FirstName;
  lastName: LastName;
  email: Email;
  password: Password;
  image: Image;
  socketId: SocketId;
  createdAt: CreatedAt;
  updatedAt: UpdatedAt;
};

export declare type CreateUserRequest = {
  firstName: FirstName;
  lastName?: LastName;
  email: Email;
  password: Password;
  image?: Image;
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
  error: string[];
};
