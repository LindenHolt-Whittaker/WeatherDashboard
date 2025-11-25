import { WeatherData, TemperatureUnit } from "../types/weather";
import {
  convertTemp,
  formatDate,
  formatLocationName,
  getFormattedConditions,
} from "../lib/utils";
import WeatherIcon from "./WeatherIcon";
import styles from "./CurrentWeather.module.css";

interface CurrentWeatherProps {
  weather: WeatherData;
  unit: TemperatureUnit;
}

export default function CurrentWeather({ weather, unit }: CurrentWeatherProps) {
  const temp = convertTemp(weather.temp, unit);

  return (
    <div className={styles.currentWeather}>
      <h1 className={styles.locationName}>{formatLocationName(weather.address)}</h1>
      <p className={styles.currentDate}>{formatDate(new Date())}</p>

      <div className={styles.currentWeatherIconContainer}>
        <WeatherIcon icon={weather.icon} size="large" />
      </div>

      <div className={styles.temperatureDisplayContainer}>
        <span className={styles.temperatureDisplay}>{Math.round(temp)}</span>
        <span className={styles.temperatureDisplayUnit}>°{unit}</span>
      </div>

      <div className={styles.conditions}>
        {getFormattedConditions(weather.conditions).map((condition) => (
          <div key={condition}>{condition}</div>
        ))}
      </div>
    </div>
  );
}
