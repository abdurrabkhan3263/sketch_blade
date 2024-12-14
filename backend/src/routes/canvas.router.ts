import { Router } from "express";
import userMiddleware from "../middlewares/user.middleware";
import {
   createCanvasState,
   deleteCanvasState,
   getCanvasState,
   updateCanvasState,
} from "../controllers/canvas.controller";

const router = Router();

router.use(userMiddleware);

router
   .route("")
   .get(getCanvasState)
   .post(createCanvasState)
   .put(updateCanvasState)
   .delete(deleteCanvasState);

export default router;
