import { Router } from "express";
import { changeCurrentPassword, getConnections, getCurrentUser, getUserChannelProfile, loginUser, logoutUser, refreshAccessToken, registerUser, searchUser, updateAccountDetails, updateUserAvatar } from "../controllers/user.controller.js";
import { upload, verifyJWT} from "../middlewares/middleware.js";
import { getCurrentWeather, getDailyForecast, getFromPlaceName, getHourlyForecast, getWeeklyForecast } from "../controllers/weather.controller.js";


const router=Router()

// User Routes
router.route("/users/register").post(registerUser)
router.route("/users/login").post(loginUser);

// secure routes
router.route("/users/logout").post(verifyJWT,logoutUser);
router.route("/users/refresh-token").post(refreshAccessToken);

router.route("/users/current-user").get(verifyJWT,getCurrentUser)
router.route("/users/avatar").patch(verifyJWT,upload.single("avatar"),updateUserAvatar)

// weather routes
router.route("/weather/current-weather").post(verifyJWT,getCurrentWeather)
router.route("/weather/weekly-forecast").post(verifyJWT,getWeeklyForecast)
router.route("/weather/daily-forecast").post(verifyJWT,getDailyForecast)
router.route("/weather/hourly-forecast").post(verifyJWT,getHourlyForecast)
router.route("/weather/get-place").post(verifyJWT,getFromPlaceName)
export default router