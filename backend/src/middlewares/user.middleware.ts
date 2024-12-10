import { ApiResponse } from "../types/appType";
import { NextFunction, Request, Response } from "express";
import { clerkClient } from "@clerk/express";
import ErrorHandler from "../utils/ErrorHandler";
import AsyncHandler from "../utils/AsyncHandler";

const userMiddleware = AsyncHandler(
  async (req: Request, _: Response, next: NextFunction) => {
    try {
      const authHeader = req.headers.authorization;
      const token = authHeader && authHeader.split(" ")[1];

      if (!token)
        throw new ErrorHandler({ statusCode: 401, message: "Unauthorized" });
      const userRes = await clerkClient.users.getUser(token);

      if (!userRes) {
        throw new ErrorHandler({ statusCode: 401, message: "Unauthorized" });
      }

      req.userId = userRes.id;
    } catch {
      throw new ErrorHandler({ statusCode: 401, message: "Unauthorized" });
    }

    next();
  },
);

export default userMiddleware;
