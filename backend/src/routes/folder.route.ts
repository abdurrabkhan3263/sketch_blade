import { Router } from "express";
import {
  createFolder,
  deleteFolder,
  updateFolder,
} from "../controllers/folder.controller";

const router = Router();

router.route("/").post(createFolder);
router.route("/:id").put(updateFolder).delete(deleteFolder);

export default router;
