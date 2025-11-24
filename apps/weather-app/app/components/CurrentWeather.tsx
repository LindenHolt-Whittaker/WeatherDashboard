import { WeatherData, TemperatureUnit } from "../types/weather";
import { convertTemp, formatDate } from "../lib/utils";
import WeatherIcon from "./WeatherIcon";

interface CurrentWeatherProps {
  weather: WeatherData;
  unit: TemperatureUnit;
}

export default function CurrentWeather({ weather, unit }: CurrentWeatherProps) {
  const temp = convertTemp(weather.temp, unit);

  return (
    <div className="current-weather">
      <h1 className="location-name">{weather.address}</h1>
      <p className="current-date">{formatDate(new Date())}</p>

      <div className="current-weather-icon-container">
        <WeatherIcon icon={weather.icon} size="large" />
      </div>

      <div className="temperature-display-container">
        <span className="temperature-display">{Math.round(temp)}</span>
        <span className="temperature-display-unit">°{unit}</span>
      </div>

      <div className="conditions">{weather.conditions}</div>
    </div>
  );
}
