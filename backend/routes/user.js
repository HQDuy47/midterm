import { Router } from "express";
import userController from "../controllers/userControllers.js";
import middlewareController from "../controllers/middlewareControllers.js";
const router = Router();

//GET ALL USERS
router.get("/", middlewareController.verifyToken, userController.getAllUsers);

//DELETE USER
router.delete(
  "/:id",
  middlewareController.verifyTokenAndAdminAuth,
  userController.deleteUser
);

export default router;
