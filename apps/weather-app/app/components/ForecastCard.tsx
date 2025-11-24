import { DayForecast, TemperatureUnit } from "../types/weather";
import { convertTemp } from "../lib/utils";
import WeatherIcon from "./WeatherIcon";

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
    if (index === 0) return "Today";
    if (index === 1) return "Tomorrow";

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

  // Split string conditions by comma and show each condition on new line.
  // Most conditions show two conditions, so if only one, add breaking space for UI consistency.
  const getFormattedConditions = (conditions: string) => {
    const nonBreakingSpace = "\u00A0";

    const formattedConditions = conditions
      .split(",")
      .map((condition, i) => <div key={condition}>{condition}</div>);

    if (formattedConditions.length === 1)
    {
      formattedConditions.push(<div>{nonBreakingSpace}</div>)
    }

    return formattedConditions;
  };

  return (
    <div className="forecast-card">
      <div className="forecast-day">
        {getDayLabel(forecast.datetime, index)}
      </div>
      <div className="forecast-weather-icon-container">
        <WeatherIcon icon={forecast.icon} />
      </div>
      <div className="forecast-conditions">
        {getFormattedConditions(forecast.conditions)}
      </div>
      <div className="forecast-temps">
        <span className="temp-high">
          {Math.round(maxTemp)}°{unit}
        </span>
        <span className="temp-low">
          {Math.round(minTemp)}°{unit}
        </span>
      </div>
    </div>
  );
}
