import { WiDayCloudy, WiDaySunny, WiDust, WiFog, WiRain, WiSnow, WiSprinkle } from "react-icons/wi";
import { weatherIcons } from "../assets/weathercode";


export const WeatherCard = ({ date, tempMax, units, tempMin, apparentTempMax, apparentTempMin, rain, weatherCode }) => {
    return (
        <div className="border p-3 sm:p-4 m-2 rounded-2xl shadow-lg bg-white w-44 sm:w-52 lg:w-60 grid place-items-center aspect-square">
            <h2 className="font-bold text-base sm:text-lg md:text-xl">{date}</h2>
            <img className=""
                src={weatherIcons[weatherCode.toString()].day.image}
            />
            <div className="grid place-items-center gap-1 sm:gap-2">
                <div className="flex gap-2 sm:gap-4">
                    {tempMax && (
                        <p className="text-xs sm:text-sm font-semibold">
                            {tempMax}{units.temperature_2m_max}
                        </p>
                    )}
                    {tempMin && (
                        <p className="text-xs sm:text-sm text-cyan-500">
                            {tempMin}{units.temperature_2m_min}
                        </p>
                    )}
                </div>
                <div className="text-xs sm:text-sm flex gap-1 sm:gap-2">
                    <b className="text-gray-500">Apparent:</b>
                    {apparentTempMax && (
                        <p className="text-orange-300">
                            {apparentTempMax}{units.apparent_temperature_max}
                        </p>
                    )}
                    {apparentTempMin && (
                        <p className="text-cyan-400">
                            {apparentTempMin}{units.apparent_temperature_min}
                        </p>
                    )}
                </div>
                {rain != 0 && (
                    <p className="text-xs sm:text-sm">
                        <b>Rain:</b> {rain}{units.rain_sum}
                    </p>
                )}
            </div>
        </div>

    );
};

export const WholeCard = ({ title,imageSrc, icon, value, units }) => {
    return (
        <div className="bg-white grid place-items-start p-4 sm:p-6 md:p-8 rounded-2xl shadow-md gap-4 sm:gap-6">
            <h2 className="text-sm sm:text-md md:text-lg text-gray-500">{title}</h2>
            {icon&&<div className="text-xl sm:text-3xl md:text-4xl">
                {icon}
            </div>}
            {imageSrc&&<img className=""
                src={imageSrc}
            />}
            <div className="flex gap-1 sm:gap-2 place-items-end">
                <p className="text-4xl sm:text-5xl md:text-6xl">{value}</p>
                <p className="text-md sm:text-lg md:text-xl">{units}</p>
            </div>
        </div>

    )
}
