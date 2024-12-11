import { Request, Response } from "express";
import AsyncHandler from "../utils/AsyncHandler";
import FileModel from "../models/file.model";
import ErrorHandler from "../utils/ErrorHandler";
import { isValidObjectId, Types } from "mongoose";
import { Collaborators, CreateFileRequest } from "../types/appType";
import ApiResponse from "../utils/ApiResponse";

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
      throw new ErrorHandler({ statusCode: 400, message: "Invalid folder id" });
    }

    if (collaborators && !Array.isArray(collaborators)) {
      throw new ErrorHandler({
        statusCode: 400,
        message: "Collaborators must be an array",
      });
    }

    const collaborator_ids = collaborators
      ? collaborators.map((collaborator) => collaborator.id)
      : [];

    const file = await FileModel.create({
      file_name,
      folder_id,
      creator_id: id,
      collaborators: collaborator_ids,
      collaborators_actions: collaborators,
      description,
    });

    if (!file) {
      throw new ErrorHandler({
        statusCode: 500,
        message: "Failed to create file",
      });
    }

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
    const { file_name, description } = req.body;
    const userId = req.userId;

    if (!isValidObjectId(id)) {
      throw new ErrorHandler({ statusCode: 400, message: "Invalid file id" });
    }

    if (!isValidObjectId(userId))
      throw new ErrorHandler({ statusCode: 400, message: "Invalid user id" });

    const file = await FileModel.findById(id);

    if (!file) {
      throw new ErrorHandler({ statusCode: 404, message: "File not found" });
    }

    if (
      file.creator_id.toString() !== userId ||
      !file.collaborators_actions[userId].includes("edit")
    ) {
      throw new ErrorHandler({
        statusCode: 403,
        message: "You are not authorized to update this file",
      });
    }

    const updatedFile = await FileModel.updateOne(
      { _id: id },
      { file_name, description },
      { new: true },
    );

    if (!updatedFile) {
      throw new ErrorHandler({ statusCode: 500, message: "File not updated" });
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
      throw new ErrorHandler({ statusCode: 400, message: "Invalid file id" });
    }

    if (!isValidObjectId(userId)) {
      throw new ErrorHandler({ statusCode: 400, message: "Invalid user id" });
    }

    const file = await FileModel.findOne({ _id: id, creator_id: userId });

    if (!file) {
      throw new ErrorHandler({
        statusCode: 403,
        message: "You are not authorized to delete this file",
      });
    }

    const deleteFile = await FileModel.findByIdAndDelete(id);

    if (!deleteFile) {
      throw new ErrorHandler({ statusCode: 500, message: "File not deleted" });
    }

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
      throw new ErrorHandler({ statusCode: 400, message: "Invalid file id" });
    }

    if (!isValidObjectId(userId)) {
      throw new ErrorHandler({ statusCode: 400, message: "Invalid user id" });
    }

    const file = await FileModel.findOne({ _id: id, creator_id: userId });

    if (!file) {
      throw new ErrorHandler({
        statusCode: 403,
        message: "You are not authorized to lock/unlock this file",
      });
    }

    const updatedFile = await FileModel.updateOne(
      { _id: id },
      { is_locked: !file.locked },
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
    const { collaborators }: { collaborators: Collaborators } = req.body;

    if (!isValidObjectId(fileId)) {
      throw new ErrorHandler({ statusCode: 400, message: "Invalid file id" });
    }

    if (!isValidObjectId(userId)) {
      throw new ErrorHandler({ statusCode: 400, message: "Invalid user id" });
    }

    if (!collaborators) {
      throw new ErrorHandler({
        statusCode: 400,
        message: "Collaborators is required",
      });
    }

    const file = await FileModel.findOne({
      _id: fileId,
      creator_id: userId,
    }).lean();

    if (!file) {
      throw new ErrorHandler({
        statusCode: 403,
        message:
          "You are not authorized to add a collaborator to this file or file not found",
      });
    }

    const collaboratorIds = Object.keys(collaborators).map(
      (id) => new Types.ObjectId(id),
    );

    const updatedFile = await FileModel.updateOne(
      { _id: fileId },
      [
        {
          $set: {
            collaborators: {
              $setUnion: ["$collaborators", collaboratorIds],
            },
            collaborators_actions: {
              $mergeObjects: ["$collaborators_actions", collaborators],
            },
          },
        },
      ],
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
    const [fileId, collaboratorId, id] = [
      req.params.id,
      req.body.id,
      req.userId,
    ];

    if (!isValidObjectId(fileId)) {
      throw new ErrorHandler({ statusCode: 400, message: "Invalid file id" });
    }

    if (!isValidObjectId(id)) {
      throw new ErrorHandler({ statusCode: 400, message: "Invalid user id" });
    }

    if (!isValidObjectId(collaboratorId)) {
      throw new ErrorHandler({
        statusCode: 400,
        message: "Invalid collaborator id",
      });
    }

    const file = await FileModel.findOne({ _id: fileId, creator_id: id });

    if (!file) {
      throw new ErrorHandler({
        statusCode: 403,
        message:
          "You are not authorized to remove a collaborator from this file or file not found",
      });
    }

    const updatedFile = await FileModel.updateOne(
      { _id: fileId },
      {
        $pull: {
          collaborators: collaboratorId,
        },
        $unset: {
          [`collaborators_actions.${collaboratorId}`]: "",
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
    const [fileId, collaborator, id] = [req.params.id, req.body.id, req.userId];

    if (!isValidObjectId(fileId)) {
      throw new ErrorHandler({ statusCode: 400, message: "Invalid file id" });
    }

    if (!isValidObjectId(id)) {
      throw new ErrorHandler({ statusCode: 400, message: "Invalid user id" });
    }

    if (!isValidObjectId(collaborator.id)) {
      throw new ErrorHandler({
        statusCode: 400,
        message: "Invalid collaborator id",
      });
    }

    const file = await FileModel.findOne({ _id: fileId, creator_id: id });

    if (!file) {
      throw new ErrorHandler({
        statusCode: 403,
        message:
          "You are not authorized to change collaborator permission or file not found",
      });
    }

    const updatedFile = await FileModel.findByIdAndUpdate(
      fileId,
      {
        $set: {
          [`collaborators_actions.${collaborator.id}`]: collaborator.key,
        },
      },
      { new: true },
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
        data: updatedFile,
        message: "Collaborator permission changed successfully",
      }),
    );
  },
);

export const getFiles = AsyncHandler(
  async (req: Request, res: Response): Promise<void> => {},
);

export const getFile = AsyncHandler(async (req: Request, res: Response) => {});

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
          _id: fileId,
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
              $project: {
                _id: 1,
                full_name: 1,
                email: 1,
                profile_picture: 1,
              },
            },
          ],
        },
      },
      {
        $project: {
          _id: 0,
          collaborators: 1,
        },
      },
    ]);

    if (!findFileCollaborators) {
      throw new ErrorHandler({
        statusCode: 404,
        message: "Collaborators not found",
      });
    }

    res.status(200).json(
      ApiResponse.success({
        success: true,
        data: findFileCollaborators,
        message: "Collaborators found successfully",
      }),
    );
  },
);
