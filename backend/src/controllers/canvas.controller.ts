import { Request, Response } from "express";
import AsyncHandler from "../utils/AsyncHandler";
import dbConnection from "../db/DatabaseConnection";
import ErrorHandler from "../utils/ErrorHandler";
import ApiResponse from "../utils/ApiResponse";

export const getCanvasState = AsyncHandler(
   async (req: Request, res: Response) => {
      const { canvasId } = req.params;

      if (!canvasId) {
         throw new ErrorHandler({
            statusCode: 400,
            message: "Canvas ID is required",
         });
      }

      const redis = dbConnection.getRedisClient();

      const canvasState = await redis.hGetAll(canvasId);

      if (!canvasState) {
         throw new ErrorHandler({
            statusCode: 404,
            message: "Canvas not found",
         });
      }

      res.status(200).json(
         ApiResponse.success({
            statusCode: 200,
            message: "Canvas state fetched",
            data: canvasState,
         }),
      );
   },
);

export const updateCanvasState = AsyncHandler(
   async (req: Request, res: Response) => {},
);

export const createCanvasState = AsyncHandler(
   async (req: Request, res: Response) => {},
);

export const deleteCanvasState = AsyncHandler(
   async (req: Request, res: Response) => {},
);
