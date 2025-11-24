"use client";

import { useState, useEffect } from "react";
import { WeatherData, TemperatureUnit } from "./types/weather";
import { getWeather } from "./lib/weatherApi";
import WeatherSearch from "./components/WeatherSearch";
import CurrentWeather from "./components/CurrentWeather";
import DayOverview from "./components/DayOverview";
import ForecastCard from "./components/ForecastCard";

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
            <DayOverview weather={weather} unit={unit} />

            <div className="forecast-section">
              <h2>5 Day Forecast</h2>
              <div className="forecast-grid">
                {weather.days.slice(0, 5).map((day, index) => (
                  <ForecastCard
                    key={day.datetime}
                    forecast={day}
                    unit={unit}
                    index={index}
                  />
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
