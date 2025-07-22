import { Router } from "express";
import {
    loginUser,
    logoutUser,
    registerUser,
    getCurrentUser,
    forgotPassword,
    refreshAccessToken,
} from "../controllers/user.controller.js"
import { verifyJWT } from "../middlewares/auth.middleware.js"

const router = Router()

router.route("/login").post(loginUser)
router.route("/signup").post(registerUser)
router.route("/logout").get(verifyJWT, logoutUser)
router.route("/current-user").get(verifyJWT, getCurrentUser)
router.route("/refresh-token").post(verifyJWT, refreshAccessToken)

// important implementation
router.route("/forgot-password").post(forgotPassword)

export default router