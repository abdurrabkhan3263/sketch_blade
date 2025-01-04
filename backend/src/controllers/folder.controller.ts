import { Request, Response } from "express";
import AsyncHandler from "../utils/AsyncHandler";
import FolderModel from "../models/folder.model";
import ErrorHandler from "../utils/ErrorHandler";
import { isValidObjectId, Types } from "mongoose";
import { CreateFolderRequest } from "../types/appType";
import ApiResponse from "../utils/ApiResponse";
import DatabaseConnection from "../db/DatabaseConnection";
import { CACHE_EXPIRATION } from "../lib/constants";
import FileModel from "../models/file.model";

export const createFolder = AsyncHandler(
   async (req: Request, res: Response): Promise<void> => {
      const { folder_name, files }: CreateFolderRequest = req.body;
      const userId = req.userId;

      if (!userId) {
         throw new ErrorHandler({
            statusCode: 400,
            message: "Invalid creator id",
         });
      }

      const folder = await FolderModel.create({
         folder_name,
         creator_id: userId,
      });

      if (!folder) {
         throw new ErrorHandler({
            statusCode: 500,
            message: "Folder not created",
         });
      }

      const redisClient = DatabaseConnection.getRedisClient();

      if (Array.isArray(files) && files.length > 0) {
         const file = await FileModel.updateMany(
            {
               _id: { $in: files },
            },
            {
               folder: folder._id,
            },
         );

         if (!file) {
            throw new ErrorHandler({
               statusCode: 500,
               message: "Files not updated",
            });
         }
      }

      await redisClient.del(`folders:${userId}`);

      res.status(201).json({ success: true, data: folder });
   },
);

export const updateFolder = AsyncHandler(
   async (req: Request, res: Response): Promise<void> => {
      const { id } = req.params;
      const { folder_name } = req.body;
      const userId = req.userId;

      if (!userId) {
         throw new ErrorHandler({
            statusCode: 400,
            message: "Invalid creator id",
         });
      }

      if (!isValidObjectId(id)) {
         throw new ErrorHandler({
            statusCode: 400,
            message: "Invalid folder id",
         });
      }

      if (!folder_name) {
         throw new ErrorHandler({
            statusCode: 400,
            message: "Folder name is required",
         });
      }

      const folder = await FolderModel.findByIdAndUpdate({
         _id: id,
         creator_id: userId,
      });

      if (!folder) {
         throw new ErrorHandler({
            statusCode: 403,
            message: "You are not authorized to update this folder",
         });
      }

      const updatedFolder = await FolderModel.findByIdAndUpdate(
         id,
         { folder_name },
         { new: true },
      );

      if (!updatedFolder) {
         throw new ErrorHandler({
            statusCode: 500,
            message: "Folder not updated",
         });
      }

      res.status(200).json({ success: true, data: updatedFolder });
   },
);

export const deleteFolder = AsyncHandler(
   async (req: Request, res: Response): Promise<void> => {
      const { id } = req.params;
      const userId = req.userId;

      if (!userId) {
         throw new ErrorHandler({
            statusCode: 400,
            message: "Invalid creator id",
         });
      }

      if (!isValidObjectId(id)) {
         throw new ErrorHandler({
            statusCode: 400,
            message: "Invalid folder id",
         });
      }

      const redisClient = DatabaseConnection.getRedisClient();

      const findFolder = await FolderModel.findOne({
         _id: id,
         creator_id: userId,
      });

      if (!findFolder) {
         throw new ErrorHandler({
            statusCode: 403,
            message:
               "You are not authorized to delete this folder or folder not found",
         });
      }

      const folder = await FolderModel.findByIdAndDelete(id);

      if (!folder) {
         throw new ErrorHandler({
            statusCode: 500,
            message: "Folder not deleted",
         });
      }

      await redisClient.del(`folders:${userId}`);

      res.status(200).json(
         ApiResponse.success({ statusCode: 200, message: "Folder deleted" }),
      );
   },
);

export const getFolders = AsyncHandler(async (req: Request, res: Response) => {
   const userId = req.userId;

   if (!userId) {
      throw new ErrorHandler({
         statusCode: 400,
         message: "Invalid creator id",
      });
   }

   const redisClient = DatabaseConnection.getRedisClient();
   const cacheKey = `folders:${userId}`;
   const cacheData = await redisClient.get(cacheKey);

   if (cacheData) {
      return res
         .status(200)
         .json({ success: true, data: JSON.parse(cacheData) });
   }

   const folders = await FolderModel.aggregate([
      {
         $match: {
            creator_id: new Types.ObjectId(userId),
         },
      },
      {
         $lookup: {
            from: "users",
            localField: "creator_id",
            foreignField: "_id",
            as: "creator",
            pipeline: [
               {
                  $project: {
                     _id: 0,
                     full_name: {
                        $concat: ["$first_name", " ", "$last_name"],
                     },
                     profile_url: 1,
                  },
               },
            ],
         },
      },
      {
         $project: {
            folder_name: 1,
            createdAt: 1,
            updatedAt: 1,
            creator: {
               $first: "$creator",
            },
         },
      },
   ]);

   if (!folders) {
      throw new ErrorHandler({
         statusCode: 404,
         message: "Folders not found",
      });
   }

   await redisClient.set(cacheKey, JSON.stringify(folders), {
      EX: CACHE_EXPIRATION,
   });

   res.status(200).json({ success: true, data: folders });
});

export const getFoldersForMoveFile = AsyncHandler(async (req: Request, res: Response) => {
    const userId = req.userId;

    if (!userId) {
        throw new ErrorHandler({
            statusCode: 400,
            message: "Invalid creator id",
        });
    }

    const folders = await FolderModel.find({
        creator_id: userId,
    });

    if (!folders) {
        throw new ErrorHandler({
            statusCode: 404,
            message: "Folders not found",
        });
    }

    res.status(200).json(ApiResponse.success({
        statusCode: 200,
        message: "Folders found",
        data: folders,
    }));
})