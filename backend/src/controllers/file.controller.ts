import { Request, Response } from "express";
import AsyncHandler from "../utils/AsyncHandler";
import FileModel from "../models/file.model";
import ErrorHandler from "../utils/ErrorHandler";
import { isValidObjectId, Schema, Types, ObjectId } from "mongoose";
import { Collaborators, CreateFileRequest } from "../types/appType";
import ApiResponse from "../utils/ApiResponse";
import DatabaseConnection from "../db/DatabaseConnection";
import { CACHE_EXPIRATION } from "../lib/constants";

export const createFile = AsyncHandler(
   async (req: Request, res: Response): Promise<void> => {
      const {
         file_name,
         folder_id,
         collaborators,
         description,
      }: CreateFileRequest = req.body;
      const id = req.userId;

      if (!id) {
         throw new ErrorHandler({
            statusCode: 400,
            message: "Invalid creator id",
         });
      }

      if (folder_id && !isValidObjectId(folder_id)) {
         throw new ErrorHandler({
            statusCode: 400,
            message: "Invalid folder id",
         });
      }

      const redisClient = DatabaseConnection.getRedisClient();

      const file = await FileModel.create({
         file_name,
         folder: folder_id,
         creator: id,
         collaborators,
         description,
      });

      if (!file) {
         throw new ErrorHandler({
            statusCode: 500,
            message: "Failed to create file",
         });
      }

      await redisClient.del(`files:${id}`);

      res.status(201).json(
         ApiResponse.success({
            statusCode: 201,
            success: true,
            data: file,
            message: "File created successfully",
         }),
      );
   },
);

export const updateFile = AsyncHandler(
   async (req: Request, res: Response): Promise<void> => {
      const { id } = req.params;

      const { file_name, description, collaborators } = req.body;
      const userId = req.userId;

      if (!file_name && !description) {
         throw new ErrorHandler({
            statusCode: 400,
            message: "File name or description is required",
         });
      }

      if (!isValidObjectId(id)) {
         throw new ErrorHandler({
            statusCode: 400,
            message: "Invalid file id",
         });
      }

      if (!isValidObjectId(userId))
         throw new ErrorHandler({
            statusCode: 400,
            message: "Invalid user id",
         });

      const file = await FileModel.findById(id);

      if (!file) {
         throw new ErrorHandler({
            statusCode: 404,
            message: "File not found",
         });
      }

      if (
         file.creator.toString() !== userId &&
         !file.collaborators_actions[userId]?.includes("edit")
      ) {
         throw new ErrorHandler({
            statusCode: 403,
            message: "You are not authorized to update this file",
         });
      }

      const updatedFile = await FileModel.findByIdAndUpdate(
         id,
         { file_name, description, collaborators },
         { new: true },
      );

      if (!updatedFile) {
         throw new ErrorHandler({
            statusCode: 500,
            message: "File not updated",
         });
      }

      res.status(200).json(
         ApiResponse.success({
            success: true,
            data: updatedFile,
            message: "File updated successfully",
         }),
      );
   },
);

export const deleteFile = AsyncHandler(
   async (req: Request, res: Response): Promise<void> => {
      const { id } = req.params;
      const userId = req.userId;

      if (!isValidObjectId(id)) {
         throw new ErrorHandler({
            statusCode: 400,
            message: "Invalid file id",
         });
      }

      if (!isValidObjectId(userId)) {
         throw new ErrorHandler({
            statusCode: 400,
            message: "Invalid user id",
         });
      }

      const file = await FileModel.findOne({ _id: id, creator: userId });

      if (!file) {
         throw new ErrorHandler({
            statusCode: 403,
            message: "You are not authorized to delete this file",
         });
      }

      const redisClient = DatabaseConnection.getRedisClient();

      const deleteFile = await FileModel.findByIdAndDelete(id);

      if (!deleteFile) {
         throw new ErrorHandler({
            statusCode: 500,
            message: "File not deleted",
         });
      }

      await redisClient.del(`file:${id}`);
      await redisClient.del(`files:${userId}`);

      res.status(200).json(
         ApiResponse.success({
            success: true,
            message: "File deleted successfully",
         }),
      );
   },
);

export const toggleLock = AsyncHandler(
   async (req: Request, res: Response): Promise<void> => {
      const { id } = req.params;
      const userId = req.userId;

      if (!isValidObjectId(id)) {
         throw new ErrorHandler({
            statusCode: 400,
            message: "Invalid file id",
         });
      }

      if (!isValidObjectId(userId)) {
         throw new ErrorHandler({
            statusCode: 400,
            message: "Invalid user id",
         });
      }

      const file = await FileModel.findOne({ _id: id, creator: userId });

      if (!file) {
         throw new ErrorHandler({
            statusCode: 403,
            message: "You are not authorized to lock/unlock this file",
         });
      }

      const updatedFile = await FileModel.updateOne(
         { _id: id },
         { locked: !file.locked },
         { new: true },
      );

      if (!updatedFile) {
         throw new ErrorHandler({
            statusCode: 500,
            message: "Failed to lock/unlock file",
         });
      }

      res.status(200).json(
         ApiResponse.success({
            success: true,
            data: updatedFile,
            message: "File locked/unlocked successfully",
         }),
      );
   },
);

export const addCollaborator = AsyncHandler(
   async (req: Request, res: Response): Promise<void> => {
      const fileId = req.params.id;
      const userId = req.userId;
      const { collaborators }: { collaborators: Collaborators[] } = req.body;

      if (!isValidObjectId(fileId)) {
         throw new ErrorHandler({
            statusCode: 400,
            message: "Invalid file id",
         });
      }

      if (!isValidObjectId(userId)) {
         throw new ErrorHandler({
            statusCode: 400,
            message: "Invalid user id",
         });
      }

      if (!collaborators) {
         throw new ErrorHandler({
            statusCode: 400,
            message: "Collaborators is required",
         });
      }

      const file = await FileModel.findOne({
         _id: fileId,
         creator: userId,
      }).lean();

      if (!file) {
         throw new ErrorHandler({
            statusCode: 403,
            message:
               "You are not authorized to add a collaborator to this file or file not found",
         });
      }

      const updatedFile = await FileModel.findByIdAndUpdate(
         fileId,
         {
            $push: {
               collaborators: {
                  $each: collaborators,
               },
            },
         },
         { new: true },
      );

      if (!updatedFile) {
         throw new ErrorHandler({
            statusCode: 500,
            message: "Failed to add collaborator",
         });
      }

      res.status(200).json(
         ApiResponse.success({
            success: true,
            data: updatedFile,
            message: "Collaborator added successfully",
         }),
      );
   },
);

export const removeCollaborator = AsyncHandler(
   async (req: Request, res: Response): Promise<void> => {
      const [fileId, collaboratorIds, id] = [
         req.params.id,
         req.body.collaboratorIds,
         req.userId,
      ];

      if (!isValidObjectId(fileId)) {
         throw new ErrorHandler({
            statusCode: 400,
            message: "Invalid file id",
         });
      }

      if (!isValidObjectId(id)) {
         throw new ErrorHandler({
            statusCode: 400,
            message: "Invalid user id",
         });
      }

      if (!collaboratorIds?.length) {
         throw new ErrorHandler({
            statusCode: 400,
            message: "Collaborator id is required",
         });
      }

      const file = await FileModel.findOne({ _id: fileId, creator: id });

      if (!file) {
         throw new ErrorHandler({
            statusCode: 403,
            message:
               "You are not authorized to remove a collaborator from this file or file not found",
         });
      }

      const updatedFile = await FileModel.findByIdAndUpdate(
         fileId,
         {
            $pull: {
               collaborators: {
                  user: {
                     $in: collaboratorIds,
                  },
               },
            },
         },
         { new: true },
      );

      if (!updatedFile) {
         throw new ErrorHandler({
            statusCode: 500,
            message: "Failed to remove collaborator",
         });
      }

      res.status(200).json(
         ApiResponse.success({
            success: true,
            data: updatedFile,
            message: "Collaborator removed successfully",
         }),
      );
   },
);

export const changeCollaboratorPermission = AsyncHandler(
   async (req: Request, res: Response): Promise<void> => {
      const { id: fileId } = req.params;
      const { collaborator }: { collaborator: Collaborators } = req.body;
      const id = req.userId;

      if (!isValidObjectId(fileId)) {
         throw new ErrorHandler({
            statusCode: 400,
            message: "Invalid file id",
         });
      }

      if (!isValidObjectId(id)) {
         throw new ErrorHandler({
            statusCode: 400,
            message: "Invalid user id",
         });
      }

      if (
         !Array.isArray(collaborator.actions) ||
         collaborator.actions.length === 0
      ) {
         throw new ErrorHandler({
            statusCode: 400,
            message: "Collaborator actions is required",
         });
      }

      const file = await FileModel.findOne({ _id: fileId, creator: id });

      if (!file) {
         throw new ErrorHandler({
            statusCode: 403,
            message:
               "You are not authorized to change collaborator permission or file not found",
         });
      }

      const updatedFile = await FileModel.findOneAndUpdate(
         { _id: fileId },
         {
            $set: {
               "collaborators.$[elem].actions": collaborator.actions,
            },
         },
         {
            arrayFilters: [{ "elem.user": collaborator.user }],
            new: true,
            runValidators: true,
            lean: true,
         },
      );

      if (!updatedFile) {
         throw new ErrorHandler({
            statusCode: 500,
            message: "Failed to change the permission of the collaborator",
         });
      }

      res.status(200).json(
         ApiResponse.success({
            statusCode: 200,
            message: "Collaborator permission changed successfully",
         }),
      );
   },
);

export const getFiles = AsyncHandler(
   async (req: Request, res: Response): Promise<void> => {
      const userId = req.userId;

      if (!isValidObjectId(userId)) {
         throw new ErrorHandler({
            statusCode: 400,
            message: "Invalid user id",
         });
      }

      const redisClient = DatabaseConnection.getRedisClient();
      const cachedData = await redisClient.get(`files:${userId}`);

      if (cachedData) {
         res.status(200).json(
            ApiResponse.success({
               data: JSON.parse(cachedData),
               message: "Files found successfully",
            }),
         );
         return;
      }

      const files = await FileModel.aggregate([
         {
            $match: {
               $or: [
                  {
                     creator: new Types.ObjectId(userId),
                  },
                  {
                     "collaborators.user": new Types.ObjectId(userId),
                  },
               ],
            },
         },
         {
            $lookup: {
               from: "folders",
               localField: "folder",
               foreignField: "_id",
               as: "folder",
               pipeline: [
                  {
                     $project: {
                        folder_name: 1,
                     },
                  },
               ],
            },
         },
         {
            $lookup: {
               from: "users",
               localField: "active_collaborators",
               foreignField: "_id",
               as: "active_collaborators",
               pipeline: [
                  {
                     $project: {
                        _id: 0,
                        profile_url: 1,
                        full_name: {
                           $concat: ["$first_name", " ", "$last_name"],
                        },
                     },
                  },
               ],
            },
         },
         {
            $lookup: {
               from: "users",
               localField: "collaborators",
               foreignField: "_id",
               as: "collaborators",
               pipeline: [
                  {
                     $project: {
                        profile_url: 1,
                        full_name: {
                           $concat: ["$first_name", " ", "$last_name"],
                        },
                     },
                  },
               ],
            },
         },
         {
            $lookup: {
               from: "users",
               localField: "creator",
               foreignField: "_id",
               as: "creator",
               pipeline: [
                  {
                     $project: {
                        profile_url: 1,
                        full_name: {
                           $concat: ["$first_name", " ", "$last_name"],
                        },
                     },
                  },
               ],
            },
         },
         {
            $addFields: {
               folder: {
                  $first: "$folder",
               },
               creator: {
                  $first: "$creator",
               },
            },
         },
         {
            $project: {
               file_name: 1,
               folder: 1,
               active_collaborators: {
                  $slice: ["$active_collaborators", 3],
               },
               collaborators: 1,
               description: 1,
               creator: 1,
               createdAt: 1,
               updatedAt: 1,
            },
         },
      ]);

      if (!files?.length) {
         res.status(200).json(
            ApiResponse.success({
               success: true,
               data: [],
               message: "No files found",
            }),
         );
         return;
      }

      redisClient.set(`files:${userId}`, JSON.stringify(files), {
         EX: CACHE_EXPIRATION,
      });

      res.status(200).json(
         ApiResponse.success({
            success: true,
            data: files,
            message: "Files found successfully",
         }),
      );
   },
);

export const getFile = AsyncHandler(async (req: Request, res: Response) => {
   const { id } = req.params;

   if (!isValidObjectId(id)) {
      throw new ErrorHandler({
         statusCode: 400,
         message: "Invalid file id",
      });
   }

   const redisClient = DatabaseConnection.getRedisClient();
   const cachedData = await redisClient.get(`file:${id}`);

   if (cachedData) {
      res.status(200).json(
         ApiResponse.success({
            data: JSON.parse(cachedData),
            message: "File found successfully",
         }),
      );
      return;
   }

   const file = await FileModel.aggregate([
      {
         $match: {
            _id: new Types.ObjectId(id),
         },
      },
      {
         $lookup: {
            from: "users",
            localField: "creator",
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
         $lookup: {
            from: "users",
            localField: "active_collaborators",
            foreignField: "_id",
            as: "active_collaborators",
            pipeline: [
               {
                  $project: {
                     _id: 0,
                     full_name: {
                        $concat: ["$first_name", " ", "$last_name"],
                     },
                     email: 1,
                     profile_url: 1,
                  },
               },
            ],
         },
      },
      {
         $unwind: "$collaborators",
      },
      {
         $lookup: {
            from: "users",
            localField: "collaborators.user",
            foreignField: "_id",
            as: "collaborator",
            pipeline: [
               {
                  $project: {
                     _id: 0,
                     full_name: {
                        $concat: ["$first_name", " ", "$last_name"],
                     },
                     email: 1,
                     profile_url: 1,
                  },
               },
            ],
         },
      },
      {
         $unwind: "$collaborator",
      },
      {
         $group: {
            _id: "$_id",
            file_name: {
               $first: "$file_name",
            },
            description: {
               $first: "$description",
            },
            locked: {
               $first: "$locked",
            },
            updatedAt: {
               $first: "$updatedAt",
            },
            creator: {
               $first: "$creator",
            },
            active_collaborators: {
               $first: "$active_collaborators",
            },
            folder: {
               $first: "$folder",
            },
            collaborators: {
               $push: {
                  user: "$collaborator",
                  actions: "$collaborators.actions",
               },
            },
         },
      },
      {
         $project: {
            file_name: 1,
            creator: {
               $first: "$creator",
            },
            collaborators: 1,
            active_collaborators: 1,
            description: 1,
            locked: 1,
            updatedAt: 1,
            folder: 1,
         },
      },
   ]);

   if (!file) {
      throw new ErrorHandler({
         statusCode: 404,
         message: "File not found",
      });
   }

   redisClient.set(`file:${id}`, JSON.stringify(file), {
      EX: CACHE_EXPIRATION,
   });

   res.status(200).json(
      ApiResponse.success({ data: file, message: "File found successfully" }),
   );
});

export const getFolderFiles = AsyncHandler(
   async (req: Request, res: Response) => {
      const { id } = req.params;
      const userId = req.userId;

      if (!isValidObjectId(id)) {
         throw new ErrorHandler({
            statusCode: 400,
            message: "Invalid folder id",
         });
      }

      if (!isValidObjectId(userId)) {
         throw new ErrorHandler({
            statusCode: 400,
            message: "Invalid user id",
         });
      }

      const files = await FileModel.aggregate([
         {
            $match: {
               $or: [
                  {
                     folder: new Types.ObjectId(id),
                     creator: new Types.ObjectId(userId),
                  },
                  {
                     folder: new Types.ObjectId(id),
                     "collaborators.user": new Types.ObjectId(userId),
                  },
               ],
            },
         },
         {
            $lookup: {
               from: "users",
               localField: "creator",
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
            $lookup: {
               from: "users",
               localField: "active_collaborators",
               foreignField: "_id",
               as: "active_collaborators",
               pipeline: [
                  {
                     $project: {
                        _id: 0,
                        full_name: {
                           $concat: ["$first_name", " ", "$last_name"],
                        },
                        email: 1,
                        profile_url: 1,
                     },
                  },
               ],
            },
         },
         {
            $lookup: {
               from: "users",
               localField: "collaborators.user",
               foreignField: "_id",
               as: "collaborators",
               pipeline: [
                  {
                     $project: {
                        _id: 0,
                        full_name: {
                           $concat: ["$first_name", " ", "$last_name"],
                        },
                        email: 1,
                        profile_url: 1,
                     },
                  },
               ],
            },
         },
         {
            $project: {
               file_name: 1,
               creator: {
                  $first: "$creator",
               },
               collaborators: 1,
               active_collaborators: 1,
               createdAt: 1,
               updatedAt: 1,
            },
         },
      ]);

      if (!files?.length) {
         throw new ErrorHandler({
            statusCode: 404,
            message: "Files not found",
         });
      }

      res.status(200).json(
         ApiResponse.success({
            success: true,
            data: files,
            message: "Files found successfully",
         }),
      );
   },
);

export const getCollaborators = AsyncHandler(
   async (req: Request, res: Response): Promise<void> => {
      const [fileId, userId] = [req.params.id, req.userId];

      if (!isValidObjectId(fileId)) {
         throw new ErrorHandler({
            statusCode: 400,
            message: "Invalid file id",
         });
      }

      if (!isValidObjectId(userId)) {
         throw new ErrorHandler({
            statusCode: 400,
            message: "Invalid user id",
         });
      }

      const findFileCollaborators = await FileModel.aggregate([
         {
            $match: {
               _id: new Types.ObjectId(fileId),
            },
         },
         {
            $lookup: {
               from: "users",
               localField: "collaborators",
               foreignField: "_id",
               as: "collaborators",
               pipeline: [
                  {
                     $addFields: {
                        full_name: {
                           $concat: ["$first_name", " ", "$last_name"],
                        },
                     },
                  },
                  {
                     $project: {
                        _id: 1,
                        full_name: 1,
                        email: 1,
                        profile_url: 1,
                     },
                  },
               ],
            },
         },
         {
            $addFields: {
               collaborators: {
                  $map: {
                     input: "$collaborators",
                     as: "collaborator",
                     in: {
                        $mergeObjects: [
                           "$$collaborator",
                           {
                              actions: {
                                 $ifNull: [
                                    {
                                       $getField: {
                                          field: {
                                             $toString: "$$collaborator._id",
                                          },
                                          input: "$collaborators_actions",
                                       },
                                    },
                                    [],
                                 ],
                              },
                           },
                        ],
                     },
                  },
               },
            },
         },
         {
            $project: {
               _id: 0,
               collaborators: 1,
            },
         },
      ]);

      if (!findFileCollaborators.length) {
         throw new ErrorHandler({
            statusCode: 404,
            message: "Collaborators not found",
         });
      }

      res.status(200).json(
         ApiResponse.success({
            success: true,
            data: findFileCollaborators[0],
            message: "Collaborators found successfully",
         }),
      );
   },
);
