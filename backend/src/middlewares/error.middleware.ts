import { Request, Response, NextFunction } from "express";
import ErrorHandler from "../utils/ErrorHandler";

const errorMiddleware = (
   err: ErrorHandler,
   req: Request,
   res: Response,
   next: NextFunction,
) => {
   const statusCode = err.statusCode || 500;
   const message = err.message || "Internal Server Error";

   console.log(err.stack, "error.middleware.ts");

   res.status(statusCode).json({
      success: false,
      message,
      stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
   });
};

export default errorMiddleware;
