import AsyncHandler from "../utils/AsyncHandler";
import { Request, Response } from "express";
import { User } from "../models/user.model";
import ApiResponse from "../utils/ApiResponse";

const getUserAsCollaborator = AsyncHandler(
   async (req: Request, res: Response) => {
      const { email, current_email } = req.body;

      if ((!email || email.trim() === "") && !current_email) {
         return res
            .status(400)
            .json(ApiResponse.error({ message: "User name is required" }));
      }

      const findUser = await User.find(
         {
            email: { $regex: new RegExp(email, "i"), $ne: current_email },
         },
         {
            full_name: {
               $concat: ["$first_name", " ", "$last_name"],
            },
            email: 1,
            profile_url: 1,
         },
      );

      if (!findUser) {
         return res
            .status(404)
            .json(ApiResponse.error({ message: "User not found" }));
      }

      res.status(200).json(
         ApiResponse.success({ data: findUser, message: "User found" }),
      );
   },
);

export default getUserAsCollaborator;
