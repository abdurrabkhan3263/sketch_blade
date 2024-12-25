import { Router } from "express";
import {
   createFile,
   deleteFile,
   getCollaborators,
   getFiles,
   removeCollaborator,
   toggleLock,
   updateFile,
   addCollaborator,
   changeCollaboratorPermission,
   getFile,
   getFolderFiles,
} from "../controllers/file.controller";
import userMiddleware from "../middlewares/user.middleware";

const router = Router();

router.use(userMiddleware);
router.route("/").post(createFile).get(getFiles);
router.route("/:id").put(updateFile).delete(deleteFile).get(getFile);
router.route("/:id/toggle-lock").put(toggleLock);
router
   .route("/:id/collaborators")
   .get(getCollaborators)
   .delete(removeCollaborator)
   .put(changeCollaboratorPermission);
router.route("/:id/collaborators/add").put(addCollaborator);
router.route("/:id/folder").get(getFolderFiles);

export default router;
