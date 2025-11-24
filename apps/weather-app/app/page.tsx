"use client";

import { useState, useEffect } from "react";
import { WeatherData, TemperatureUnit } from "./types/weather";
import { getWeather } from "./lib/weatherApi";
import WeatherSearch from "./components/WeatherSearch";
import CurrentWeather from "./components/CurrentWeather";

export default function Home() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [unit, setUnit] = useState<TemperatureUnit>("C");

  const DEFAULT_LOCATION = "Brighton";

  const fetchWeather = async (location: string) => {
    try {
      setLoading(true);
      setError(null);
      const data = await getWeather(location);
      setWeather(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to fetch weather data"
      );
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather(DEFAULT_LOCATION);
  }, []);

  return (
    <div className="app-container">
      <aside className="sidebar">
        <WeatherSearch onSearch={fetchWeather} isLoading={loading} />

        {loading && (
          <div className="loading-state">
            <div className="spinner" />
            <p>Loading weather data...</p>
          </div>
        )}

        {error && (
          <div className="error-state">
            <p>{error}</p>
          </div>
        )}

        {weather && !loading && (
          <CurrentWeather weather={weather} unit={unit} />
        )}
      </aside>

      <main className="main-content">
        <div className="unit-toggle">
          <button
            className={unit === "C" ? "active" : ""}
            onClick={() => setUnit("C")}
          >
            °C
          </button>
          <button
            className={unit === "F" ? "active" : ""}
            onClick={() => setUnit("F")}
          >
            °F
          </button>
        </div>

        {weather && !loading && (
          <>
            <div className="day-overview">
              <h2>Day Overview</h2>

              <div className="overview-grid">
                <div className="stat-card">
                  <h3>Humidity</h3>
                  <div className="stat-value">
                    {Math.round(weather.humidity)}%
                  </div>
                  <span className="progress-percentage">%</span>
                  <div className="progress-bar">
                    <div
                      className="progress-fill humidity"
                      style={{ width: `${weather.humidity}%` }}
                    />
                  </div>
                  <div className="progress-labels">
                    <span>0</span>
                    <span>100</span>
                  </div>
                </div>

                <div className="stat-card">
                  <h3>Cloud Cover</h3>
                  <div className="stat-value">
                    {Math.round(weather.cloudcover)}%
                  </div>
                  <span className="progress-percentage">%</span>
                  <div className="progress-bar">
                    <div
                      className="progress-fill cloudcover"
                      style={{ width: `${weather.cloudcover}%` }}
                    />
                  </div>
                  <div className="progress-labels">
                    <span>0</span>
                    <span>100</span>
                  </div>
                </div>
              </div>

              <div className="detail-grid">
                <div className="detail-card">
                  <div className="detail-label">Max temp.</div>
                  <div className="detail-value">
                    {weather.tempmax}°{unit}
                  </div>
                </div>

                <div className="detail-card">
                  <div className="detail-label">Max temp.</div>
                  <div className="detail-value">
                    {weather.tempmax}°{unit}
                  </div>
                </div>

                <div className="detail-card">
                  <div className="detail-label">Sunrise</div>
                  <div className="detail-value">{weather.sunrise}</div>
                </div>

                <div className="detail-card">
                  <div className="detail-label">Sunset</div>
                  <div className="detail-value">{weather.sunset}</div>
                </div>
              </div>
            </div>

            <div className="forecast-section">
              <h2>5 Day Forecast</h2>
              <div className="forecast-grid">
                {weather.days.slice(0, 5).map((day, index) => (
                  <div key={index} className="forecast-card">
                    <div className="forecast-day">{day.datetime}</div>
                    <div className="weather-icon">{day.icon}</div>
                    <div className="forecast-conditions">{day.conditions}</div>
                    <div className="forecast-temps">
                      <span className="temp-high">
                        {day.tempmax}°{unit}
                      </span>
                      <span className="temp-low">
                        {day.tempmin}°{unit}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {error && !loading && (
          <div className="main-error-state">
            <h2>Unable to load weather data</h2>
            <p>Please try searching for a different location.</p>
          </div>
        )}
      </main>
    </div>
  );
}
