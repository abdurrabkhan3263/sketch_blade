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
} from "../controllers/file.controller";

const router = Router();

router.route("/").post(createFile).get(getFiles);
router.route("/:id").put(updateFile).delete(deleteFile).get(getFile);
router.route("/:id/toggle-lock").put(toggleLock);
router
  .route("/:id/collaborators")
  .get(getCollaborators)
  .delete(removeCollaborator)
  .put(changeCollaboratorPermission);
router.route("/:id/collaborators/add").put(addCollaborator);

export default router;
