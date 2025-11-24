import { WeatherData, TemperatureUnit } from "../types/weather";
import { convertTemp, formatTime } from "../lib/utils";

interface DayOverviewProps {
  weather: WeatherData;
  unit: TemperatureUnit;
}

export default function DayOverview({ weather, unit }: DayOverviewProps) {
  const maxTemp = convertTemp(weather.tempmax, unit);
  const minTemp = convertTemp(weather.tempmin, unit);

  return (
    <div className="day-overview">
      <h2>Day Overview</h2>

      <div className="overview-grid">
        <div className="stat-card">
          <h3>Humidity</h3>
          <div className="stat-value">{Math.round(weather.humidity)}%</div>
          <div className="progress-bar-container">
            <span className="progress-percentage">%</span>
            <div className="progress-bar">
              <div
                className={`progress-fill ${
                  weather.humidity > 50 ? "green" : "yellow"
                }`}
                style={{ width: `${weather.humidity}%` }}
              />
            </div>
            <div className="progress-labels">
              <span>0</span>
              <span>100</span>
            </div>
          </div>
        </div>

        <div className="stat-card">
          <h3>Cloud Cover</h3>
          <div className="stat-value">{Math.round(weather.cloudcover)}%</div>
          <div className="progress-bar-container">
            <span className="progress-percentage">%</span>
            <div className="progress-bar">
              <div
                className={`progress-fill ${
                  weather.cloudcover > 50 ? "green" : "yellow"
                }`}
                style={{ width: `${weather.cloudcover}%` }}
              />
            </div>
            <div className="progress-labels">
              <span>0</span>
              <span>100</span>
            </div>
          </div>
        </div>
      </div>

      <div className="detail-grid">
        <div className="detail-card">
          <div className="detail-label">Max temp.</div>
          <div className="detail-value-container">
            <span className="detail-value">{Math.round(maxTemp)}</span>
            <span className="detail-value-unit">°{unit}</span>
          </div>
        </div>

        <div className="detail-card">
          <div className="detail-label">Min temp.</div>
          <div className="detail-value-container">
            <span className="detail-value">{Math.round(minTemp)}</span>
            <span className="detail-value-unit">°{unit}</span>
          </div>
        </div>

        <div className="detail-card">
          <div className="detail-label">Sunrise</div>
          <div className="detail-value">{formatTime(weather.sunrise)}</div>
        </div>

        <div className="detail-card">
          <div className="detail-label">Sunset</div>
          <div className="detail-value">{formatTime(weather.sunset)}</div>
        </div>
      </div>
    </div>
  );
}
