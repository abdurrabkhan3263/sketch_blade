import { Router } from "express";
import {
   createFolder,
   deleteFolder,
   getFolders,
   updateFolder,
    getFoldersForMoveFile
} from "../controllers/folder.controller";
import userMiddleware from "../middlewares/user.middleware";

const router = Router();

router.use(userMiddleware);
router.route("/").post(createFolder).get(getFolders);
router.route("/:id").put(updateFolder).delete(deleteFolder);
router.route("/small-folder").get(getFoldersForMoveFile);

export default router;
