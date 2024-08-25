import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import axios from "axios"
const getCurrentWeather=asyncHandler(async(req,res)=>{
    console.log("current-weather")
    const {lat,lon}=req.body
    axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,rain,weather_code,cloud_cover&timezone=GMT&past_days=5&forecast_days=14`)
    .then(response=>{
        return res
        .status(200)
        .json(
        new ApiResponse(200, response.data, "Weather data fetched")
    );
    })
    .catch(err=>{
        throw new ApiError(400,"Error Fetching weather data",err)
    })

})

const getWeeklyForecast=asyncHandler(async(req,res)=>{
    console.log("weekly-forecast")

    const {lat,lon}=req.body
    axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=weather_code,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,rain_sum&timezone=GMT&past_days=5&forecast_days=14`)
    .then(response=>{
        return res
        .status(200)
        .json(
        new ApiResponse(200, response.data, "Daily Forecast data fetched")
    );
    })
    .catch(err=>{
        throw new ApiError(400,"Error Fetching Daily Forecast data",err)
    })

})
const getHourlyForecast=asyncHandler(async(req,res)=>{

    const {lat,lon}=req.body
    axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}1&hourly=temperature_2m,relative_humidity_2m,dew_point_2m,apparent_temperature,rain,showers,weather_code&timezone=GMT&past_days=1&forecast_days=1`)
    .then(response=>{
        return res
        .status(200)
        .json(
        new ApiResponse(200, response.data, "Hourly Forecast data fetched")
    );
    })
    .catch(err=>{
        throw new ApiError(400,"Error Fetching Hourly Forecast data",err)
    })

})
const getDailyForecast=asyncHandler(async(req,res)=>{
    console.log("daily-forecast")
    const {lat,lon}=req.body
    axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max,uv_index_clear_sky_max,precipitation_sum,rain_sum,showers_sum,wind_speed_10m_max&timezone=GMT&forecast_days=1`)
    .then(response=>{
        return res
        .status(200)
        .json(
        new ApiResponse(200, response.data, "Hourly Forecast data fetched")
    );
    })
    .catch(err=>{
        throw new ApiError(400,"Error Fetching Hourly Forecast data",err)
    })

})
const getFromPlaceName=asyncHandler(async(req,res)=>{
    console.log("Get Longitude and Latitude for Place")
    const {Name}=req.body
    axios.get(`https://geocoding-api.open-meteo.com/v1/search?name=${Name}&count=4&language=en&format=json`)
    .then(response=>{
        return res
        .status(200)
        .json(
        new ApiResponse(200, response.data, "Hourly Forecast data fetched")
    );
    })
    .catch(err=>{
        throw new ApiError(400,"Error Fetching Hourly Forecast data",err)
    })

})

export {
    getCurrentWeather,
    getDailyForecast,
    getHourlyForecast,
    getWeeklyForecast,
    getFromPlaceName
}