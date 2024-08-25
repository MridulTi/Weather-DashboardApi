import React, { useEffect, useState } from 'react'
import { CiSearch } from "react-icons/ci";
import { FaCloud, FaCloudRain } from "react-icons/fa";
import { WiHumidity, WiDaySunny, WiDust, WiFog, WiSprinkle, WiRain, WiSnow, WiDayCloudy } from "react-icons/wi";
import { Tooltip } from "@material-tailwind/react";
import axios from 'axios';
import { useAuth } from '../Context/Context';

export const Navbar = () => {
    const [currentData, setcurrentData] = useState(false)
    const { location, setLocation } = useAuth();
    const { triggerError } = useError();
    const [formData, setFormData] = useState()
    const [searchBar, setSearchBar] = useState([])

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };
    // const weatherIcons = {
    //     2: <WiDaySunny className="text-orange-400" />,       // Clear
    //     1: <WiDayCloudy className="text-gray-200" />,      // Partly cloudy
    //     3: <WiDust className="text-orange-500" />,           // Sandstorm, duststorm, or blowing snow
    //     4: <WiFog className="text-gray-200" />,            // Fog, thick dust, or haze
    //     5: <WiSprinkle className="text-cyan-100" />,       // Drizzle
    //     6: <WiRain className="text-blue-300" />,           // Rain
    //     20: <WiSnow className="text-white" />,          // Drizzle (not freezing) or snow grains not falling as shower(s)
    // };

    const getLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setLocation({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                    });
                },
                (error) => triggerError(error.message)
            );
        }
    }
    function GetCurrentWeather(latitude, longitude) {
        console.log(latitude, longitude)
        axios.post('api/v1/weather/current-weather', { lat: latitude, lon: longitude })
            .then(res => {
                setcurrentData(res.data.data)
            })
            .catch(err => {
                triggerError(err)
            })
    }
    function handleSearch() {
        axios.post("api/v1/weather/get-place", formData)
            .then(res => {
                setSearchBar(res.data.data.results)
            })
            .catch(err => {
                triggerError(err)
            })
    }

    function sendLocation(data) {
        setLocation({
            latitude: data.latitude,
            longitude: data.longitude
        })
        GetCurrentWeather(location.latitude, location.longitude)
        setSearchBar([])
    }
    useEffect(() => {
        getLocation()
    }, [])
    useEffect(() => {
        GetCurrentWeather(location.latitude, location.longitude)
    }, [location])

    return (
        <>
            {currentData && (
                <div className="w-full sm:w-80 h-full sm:h-screen fixed left-0 bg-gray-300 p-5 sm:py-10 flex flex-col justify-center gap-6">
                    <div className='flex bg-white p-2 rounded-lg place-items-center gap-4'>
                        <CiSearch className='text-xl' />
                        <input className='outline-0 w-full' type='text' placeholder='Search for Places' name='Name' onChange={handleInputChange}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    e.preventDefault();
                                    handleSearch();
                                }
                            }} />
                        {searchBar?.length > 0 && (
                            <div className='absolute z-10 bg-white border border-gray-200 rounded-lg shadow-lg mt-2 w-full max-h-60 overflow-auto top-28 left-2'>
                                {searchBar.map((data) => (
                                    <div
                                        key={data.id} // Ensure each item has a unique key
                                        className='w-full px-5 py-2 cursor-pointer hover:bg-gray-100'
                                        onClick={() => sendLocation(data)}
                                    >
                                        <div className='flex gap-16 justify-between'>
                                            <h1>{data.name}</h1>
                                            <h1>{data.admin1}</h1>
                                        </div>
                                        <div className='flex gap-16 text-gray-500 justify-between'>
                                            <h1>{data.country}</h1>
                                            <p>{data.country_code}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                    </div>
                    <div className="grid gap-10 divide-y-2 divide-gray-300">
                        <div className="grid place-items-start">
                            <img className=""
                                src={weatherIcons[currentData.current.weather_code.toString()].day.image}
                            />
                            <h1 className="font-semibold text-6xl sm:text-8xl">
                                {currentData.current.temperature_2m}
                                <b className="text-4xl sm:text-6xl font-extralight">
                                    {currentData.current_units.temperature_2m}
                                </b>
                            </h1>
                            <h2 className="text-base sm:text-xl">
                                {currentData.current.time} {currentData.timezone_abbreviation}
                            </h2>
                        </div>
                        <div className="grid place-items-start gap-4 py-6 sm:py-12">
                            <h1 className="text-sm font-semibold flex gap-2 place-items-center">
                                <FaCloud /> Cloud Cover: {currentData.current.cloud_cover}
                                {currentData.current_units.cloud_cover}
                            </h1>
                            <h2 className="text-sm font-semibold flex gap-2 place-items-center">
                                <FaCloudRain />Rain: {currentData.current.rain}{" "}
                                {currentData.current_units.rain}
                            </h2>
                            <h2 className="text-sm font-semibold flex gap-2 place-items-center">
                                <WiHumidity />
                                Relative Humidity: {currentData.current.relative_humidity_2m}{" "}
                                {currentData.current_units.relative_humidity_2m}
                            </h2>
                            <div className="w-full font-extralight grid place-items-start rounded-xl">
                                <h1>Latitude: {currentData.latitude}</h1>
                                <h1>Longitude: {currentData.longitude}</h1>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>

    )
}

import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { useError } from '../Context/ErrorContext';
import { weatherIcons } from '../assets/weathercode';
export const TopBar = () => {
    const { userDetails } = useAuth();
    const navigate = useNavigate()


    function logout() {
        axios.post('api/v1/users/logout')
            .then(res => {
                navigate("/")
            })
            .catch(err => {
                console.log(err)
            })
    }

    return (
        <div className="fixed top-0 right-0 p-2 px-4 sm:px-6 flex gap-2 sm:gap-4 place-items-center">
            <Tooltip
                placement="bottom"
                content={
                    <div className="grid place-items-center">
                        <h1 className="text-sm sm:text-base">{userDetails.fullName}</h1>
                        <button
                            className="p-1 sm:p-2 bg-red-600 w-full text-xs sm:text-sm"
                            onClick={logout}
                        >
                            Logout
                        </button>
                    </div>
                }
            >
                <div>
                    <FaUserCircle className="text-2xl sm:text-3xl text-gray-600" />
                </div>
            </Tooltip>
        </div>

    )
}