import { Tab, TabPanel, Tabs, TabsBody, TabsHeader } from '@material-tailwind/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { WeatherCard, WholeCard } from '../Components/Cards';
import { useAuth } from '../Context/Context';
import { getDailyForecast } from '../../../backend/src/controllers/weather.controller';
import { WiDayCloudy, WiDaySunny, WiDust, WiFog, WiRain, WiSnow, WiSprinkle } from 'react-icons/wi';
import { FaTemperatureArrowUp, FaTemperatureArrowDown, FaDroplet, FaCloudRain } from "react-icons/fa6";
import { BsFillSunriseFill, BsFillSunsetFill } from "react-icons/bs";
import { TbUvIndex } from "react-icons/tb";
import { FiWind } from "react-icons/fi";
import { useError } from '../Context/ErrorContext';
import { weatherIcons } from '../assets/weathercode';

function Home() {
  const [TodayData, setTodayData] = useState();
  const [dailyData, setdailyData] = useState();
  const { triggerError } = useError();
  const {location, setLocation } = useAuth();
  const [today, setToday] = useState(false)

  function GetWeeklyWeather(latitude, longitude) {
    axios.post('api/v1/weather/weekly-forecast', { lat: latitude, lon: longitude })
      .then(res => {
        setdailyData(res.data.data)
      })
      .catch(err => {
        triggerError(err)
      })
  }
  function GetDailyWeather(latitude, longitude) {
    axios.post('api/v1/weather/daily-forecast', { lat: latitude, lon: longitude })
      .then(res => {
        setTodayData(res.data.data)
      })
      .catch(err => {
        triggerError(err)
      })
  }
  function GetHourlyWeather(latitude, longitude) {
    axios.post('api/v1/weather/hourly-forecast', { lat: latitude, lon: longitude })
      .then(res => {
        setdailyData(res.data.data)
      })
      .catch(err => {
        triggerError(err)
      })
  }

  useEffect(() => {
    { !today && GetWeeklyWeather(location.latitude, location.longitude) }
    { today && GetHourlyWeather(location.latitude, location.longitude) }
  }, [today,location])
  useEffect(() => {
    GetDailyWeather(location.latitude,location.longitude)
  }, [location])


  return (
    <div className="w-full lg:w-10/12 bg-gray-100 min-h-screen lg:ml-80 px-4 md:px-6 lg:px-5 py-5">
      <div className="flex gap-2 md:gap-4">
        <h1
          className={`font-semibold cursor-pointer text-sm md:text-md lg:text-lg ${today ? "" : "underline underline-offset-8"}`}
          onClick={() => setToday(!today)}
        >
          Week
        </h1>
        <h1
          className={`font-semibold cursor-pointer text-sm md:text-md lg:text-lg ${today ? "underline underline-offset-8" : ""}`}
          onClick={() => setToday(!today)}
        >
          Today
        </h1>
      </div>

      {/* Week View */}
      {!today && (
        <div className="w-full grid grid-flow-col overflow-x-auto">
          {dailyData?.daily && dailyData.daily.time.map((date, index) => (
            <WeatherCard
              key={index}
              date={date}
              tempMax={dailyData.daily.temperature_2m_max[index]}
              tempMin={dailyData.daily.temperature_2m_min[index]}
              apparentTempMax={dailyData.daily.apparent_temperature_max[index]}
              apparentTempMin={dailyData.daily.apparent_temperature_min[index]}
              rain={dailyData.daily.rain_sum[index]}
              units={dailyData.daily_units}
              weatherCode={dailyData.daily.weather_code[index]}
            />
          ))}
        </div>
      )}

      {/* Today View */}
      {today && (
        <div className="w-full grid grid-flow-col overflow-x-auto">
          {dailyData?.hourly && dailyData.hourly.time.map((date, index) => (
            <WeatherCard
              key={index}
              date={date.split('T')[1]}
              tempMax={dailyData.hourly.temperature_2m[index]}
              apparentTempMax={dailyData.hourly.apparent_temperature[index]}
              rain={dailyData.hourly.rain[index]}
              units={dailyData.hourly_units}
              weatherCode={dailyData.hourly.weather_code[index]}
            />
          ))}
        </div>
      )}

      <div className="py-6">
        <h1 className="font-semibold text-sm md:text-md lg:text-lg">Today's Highlights</h1>
        {TodayData && (
          <div className="w-11/12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 lg:gap-2">
            <WholeCard
              title="Weather Code"
              imageSrc={weatherIcons[TodayData.daily.weather_code[0].toString()].day.image}
              value={TodayData.daily.weather_code[0]}
              units={TodayData.daily_units.weather_code}
            />
            <WholeCard
              title="Max Temperature"
              icon={<FaTemperatureArrowUp className="text-red-400" />}
              value={TodayData.daily.temperature_2m_max[0]}
              units={TodayData.daily_units.temperature_2m_max}
            />
            <WholeCard
              title="Min Temperature"
              icon={<FaTemperatureArrowDown className="text-blue-400" />}
              value={TodayData.daily.temperature_2m_min[0]}
              units={TodayData.daily_units.temperature_2m_min}
            />
            <WholeCard
              title="Sunrise"
              icon={<BsFillSunriseFill className="text-orange-400" />}
              value={TodayData.daily.sunrise[0].split('T')[1]}
              units="AM GMT"
            />
            <WholeCard
              title="Sunset"
              icon={<BsFillSunsetFill className="text-red-500" />}
              value={TodayData.daily.sunset[0].split('T')[1]}
              units="PM GMT"
            />
            <WholeCard
              title="UV Index Max"
              icon={<TbUvIndex className="text-yellow-600" />}
              value={TodayData.daily.uv_index_max[0]}
              units={TodayData.daily_units.uv_index_max}
            />
            <WholeCard
              title="Precipitation Sum"
              icon={<FaDroplet className="text-cyan-400" />}
              value={TodayData.daily.precipitation_sum[0]}
              units={TodayData.daily_units.precipitation_sum}
            />
            <WholeCard
              title="Showers Sum"
              icon={<FaCloudRain className="text-blue-600" />}
              value={TodayData.daily.showers_sum[0]}
              units={TodayData.daily_units.showers_sum}
            />
            <WholeCard
              title="Max Wind Speed"
              icon={<FiWind className="text-gray-700" />}
              value={TodayData.daily.wind_speed_10m_max[0]}
              units={TodayData.daily_units.wind_speed_10m_max}
            />
          </div>
        )}
      </div>
    </div>

  )
}

export default Home