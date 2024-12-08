import { Request, Response } from "express";
import AsyncHandler from "../utils/AsyncHandler";
import FolderModel from "../models/folder.model";
import ErrorHandler from "../utils/ErrorHandler";
import { isValidObjectId } from "mongoose";
import { CreateFolderRequest } from "../types/appType";

export const createFolder = AsyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const { folder_name = "" }: CreateFolderRequest = req.body;
    const { id: creator_id } = req.user;

    if (!isValidObjectId(creator_id)) {
      throw new ErrorHandler({
        statusCode: 400,
        message: "Please provide folder name and creator id",
      });
    }

    const folder = await FolderModel.create({ folder_name, creator_id });

    if (!folder) {
      throw new ErrorHandler({
        statusCode: 500,
        message: "Folder not created",
      });
    }

    res.status(201).json({ success: true, data: folder });
  },
);

export const updateFolder = AsyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const { folder_name } = req.body;
    const { id: userId } = req.user;

    if (!isValidObjectId(userId)) {
      throw new ErrorHandler({
        statusCode: 400,
        message: "Invalid creator id",
      });
    }

    if (!isValidObjectId(id)) {
      throw new ErrorHandler({ statusCode: 400, message: "Invalid folder id" });
    }

    const folder = await FolderModel.findOne({ _id: id, creator_id: userId });

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
    const { id: userId } = req.user;

    if (!isValidObjectId(userId)) {
      throw new ErrorHandler({
        statusCode: 400,
        message: "Invalid creator id",
      });
    }

    if (!isValidObjectId(id)) {
      throw new ErrorHandler({ statusCode: 400, message: "Invalid folder id" });
    }

    const findFolder = await FolderModel.findOne({
      _id: id,
      creator_id: userId,
    });

    if (!findFolder) {
      throw new ErrorHandler({
        statusCode: 403,
        message: "You are not authorized to delete this folder",
      });
    }

    const folder = await FolderModel.findByIdAndDelete(id);

    if (!folder) {
      throw new ErrorHandler({
        statusCode: 500,
        message: "Folder not deleted",
      });
    }

    res.status(200).json({ success: true, data: folder });
  },
);
