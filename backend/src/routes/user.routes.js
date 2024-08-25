import { Router } from "express";
import { changeCurrentPassword, getConnections, getCurrentUser, getUserChannelProfile, loginUser, logoutUser, refreshAccessToken, registerUser, searchUser, updateAccountDetails, updateUserAvatar } from "../controllers/user.controller.js";
import {upload} from "../middlewares/multer.middleware.js"
import { verifyJWT } from "../middlewares/auth.middleware.js";


const router=Router()

router.route("/register").post(registerUser)
router.route("/login").post(loginUser);

// secure routes
router.route("/logout").post(verifyJWT,logoutUser);
router.route("/refresh-token").post(refreshAccessToken);

router.route("/current-user").get(verifyJWT,getCurrentUser)
router.route("/avatar").patch(verifyJWT,upload.single("avatar"),updateUserAvatar)


export default router