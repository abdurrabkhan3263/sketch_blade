import { Response, Request } from "express";
import AsyncHandler from "../utils/AsyncHandler";
import { User } from "../models/user.model";
import { CreateUserRequest } from "../types";
import ApiResponse from "../utils/ApiResponse";

export const createUser = AsyncHandler(async (req: Request, res: Response) => {
  const { email, firstName, lastName, password, image }: CreateUserRequest =
    req.body;

  const isAllRequiredFieldsProvided = email && firstName && password;

  if (!isAllRequiredFieldsProvided) {
    return res.status(400).json(
      ApiResponse.error({
        statusCode: 400,
        message: "Please provide all required fields",
      })
    );
  }

  const newUser = await User.create({
    email,
    firstName,
    lastName,
    password,
  });

  console.log(newUser);

  if (!newUser) {
    return res.status(500).json(
      ApiResponse.error({
        statusCode: 500,
        message: "Failed to create user",
      })
    );
  }

  return res.status(201).json(
    ApiResponse.success({
      statusCode: 201,
      message: "User created successfully",
      data: newUser,
    })
  );
});

export const updateUser = AsyncHandler(
  async (req: Request, res: Response) => {}
);

export const deleteUser = AsyncHandler(
  async (req: Request, res: Response) => {}
);

export const loginUser = AsyncHandler(
  async (req: Request, res: Response) => {}
);
