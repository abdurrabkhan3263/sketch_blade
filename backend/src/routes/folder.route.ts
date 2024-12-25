import { Router } from "express";
import {
   createFolder,
   deleteFolder,
   getFolders,
   updateFolder,
} from "../controllers/folder.controller";
import userMiddleware from "../middlewares/user.middleware";

const router = Router();

router.use(userMiddleware);
router.route("/").post(createFolder).get(getFolders);
router.route("/:id").put(updateFolder).delete(deleteFolder);

export default router;
