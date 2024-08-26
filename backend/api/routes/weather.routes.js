import { Router } from "express";
import { getCurrentWeather, getDailyForecast, getFromPlaceName, getHourlyForecast, getWeeklyForecast } from "../controllers/weather.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router=Router()

router.route("/current-weather").post(verifyJWT,getCurrentWeather)
router.route("/weekly-forecast").post(verifyJWT,getWeeklyForecast)
router.route("/daily-forecast").post(verifyJWT,getDailyForecast)
router.route("/hourly-forecast").post(verifyJWT,getHourlyForecast)
router.route("/get-place").post(verifyJWT,getFromPlaceName)

export default router