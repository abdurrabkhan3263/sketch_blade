import { Router } from "express";
import {
  createUser,
  deleteUser,
  updateUser,
  loginUser,
} from "../controllers/user.controller";

const userRouter = Router();

userRouter.route("/user").post(createUser);
userRouter.route("/user:id").put(updateUser);
userRouter.route("/user:id").delete(deleteUser);

export default userRouter;
