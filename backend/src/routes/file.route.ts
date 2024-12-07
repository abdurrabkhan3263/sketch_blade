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
} from "../controllers/file.controller";

const router = Router();

router.route("/").post(createFile).get(getFiles);
router.route("/:id").put(updateFile).delete(deleteFile);
router.route("/:id/toggle-lock").put(toggleLock);
router
  .route("/:id/collaborators")
  .get(getCollaborators)
  .put(removeCollaborator);
router.route("/:id/collaborators/add").put(addCollaborator);

export default router;
