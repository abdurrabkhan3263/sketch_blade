import { ApiResponse } from "../types/appType";
import { NextFunction, Request, Response } from "express";

const userMiddleware = (req: Request, res: Response, next: NextFunction) => {
  req.userId = "123";
  next();
};

export default userMiddleware;
