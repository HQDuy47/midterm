import { Router } from "express";
import authController from "../controllers/authControllers.js";
import middlewareController from "../controllers/middlewareControllers.js";

const router = Router();

//REGISTER
router.post("/register", authController.registerUser);

//LOGIN
router.post("/login", authController.loginUser);

//REFRESH
router.post("/refresh", authController.requestRefreshToken);

//LOG OUT
router.post(
  "/logout",
  middlewareController.verifyToken,
  authController.userLogout
);

export default router;
