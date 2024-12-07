import { Request, Response } from "express";
import AsyncHandler from "../utils/AsyncHandler";
import FileModel from "../models/file.model";
import ErrorHandler from "../utils/ErrorHandler";
import { isValidObjectId } from "mongoose";
import { CreateFileRequest } from "../types";
import ApiResponse from "../utils/ApiResponse";

export const createFile = AsyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const { file_name, folder_id, collaborator_ids }: CreateFileRequest =
      req.body;
    const { id } = req.user;

    if (!isValidObjectId(id)) {
      throw new ErrorHandler({
        statusCode: 400,
        message: "Invalid creator id",
      });
    }

    if (folder_id && !isValidObjectId(folder_id)) {
      throw new ErrorHandler({ statusCode: 400, message: "Invalid folder id" });
    }

    const file = await FileModel.create({
      file_name,
      folder_id: folder_id || null,
      creator_id: id,
      collaborators: collaborator_ids || [],
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
    const { file_name } = req.body;
    const { id: userId } = req.user;

    if (!isValidObjectId(id)) {
      throw new ErrorHandler({ statusCode: 400, message: "Invalid file id" });
    }

    if (!isValidObjectId(userId))
      throw new ErrorHandler({ statusCode: 400, message: "Invalid user id" });

    const file = await FileModel.findById({ _id: id, creator_id: userId });

    if (!file) {
      throw new ErrorHandler({
        statusCode: 403,
        message: "You are not authorized to update this file",
      });
    }

    const updatedFile = await FileModel.updateOne(
      { _id: id },
      { file_name },
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
    const { _id } = req.user;

    if (!isValidObjectId(id)) {
      throw new ErrorHandler({ statusCode: 400, message: "Invalid file id" });
    }

    const file = await FileModel.findOne({ _id: id, creator_id: _id });

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
    const { _id } = req.user;

    if (!isValidObjectId(id)) {
      throw new ErrorHandler({ statusCode: 400, message: "Invalid file id" });
    }

    if (!isValidObjectId(_id)) {
      throw new ErrorHandler({ statusCode: 400, message: "Invalid user id" });
    }

    const file = await FileModel.findOne({ _id: id, creator_id: _id });

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
  async (req: Request, res: Response): Promise<void> => {},
);

export const removeCollaborator = AsyncHandler(
  async (req: Request, res: Response): Promise<void> => {},
);

export const getFiles = AsyncHandler(
  async (req: Request, res: Response): Promise<void> => {},
);

export const getCollaborators = AsyncHandler(
  async (req: Request, res: Response): Promise<void> => {},
);
