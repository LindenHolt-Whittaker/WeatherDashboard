import { DayForecast, TemperatureUnit } from "../types/weather";
import { convertTemp, getFormattedConditions } from "../lib/utils";
import WeatherIcon from "./WeatherIcon";
import styles from "./ForecastCard.module.css";

interface ForecastCardProps {
  forecast: DayForecast;
  unit: TemperatureUnit;
  index: number;
}

export default function ForecastCard({
  forecast,
  unit,
  index,
}: ForecastCardProps) {
  const maxTemp = convertTemp(forecast.tempmax, unit);
  const minTemp = convertTemp(forecast.tempmin, unit);

  const getDayLabel = (dateString: string, index: number) => {
    if (index === 0) return "Tomorrow";

    const date = new Date(dateString);
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    return `${days[date.getDay()]}, ${date.getDate()} ${
      months[date.getMonth()]
    }`;
  };

  return (
    <div className={styles.forecastCard}>
      <div className={styles.forecastDay}>
        {getDayLabel(forecast.datetime, index)}
      </div>
      <div className={styles.forecastWeatherIconContainer}>
        <WeatherIcon icon={forecast.icon} />
      </div>
      <div className={styles.forecastConditions}>
        {getFormattedConditions(forecast.conditions).map((condition) => (
          <div key={condition}>{condition}</div>
        ))}
      </div>
      <div className={styles.forecastTemps}>
        <span className={styles.tempHigh}>
          {Math.round(maxTemp)}°{unit}
        </span>
        <span className={styles.tempLow}>
          {Math.round(minTemp)}°{unit}
        </span>
      </div>
    </div>
  );
}
