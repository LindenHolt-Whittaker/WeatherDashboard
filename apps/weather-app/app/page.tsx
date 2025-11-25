"use client";

import { useState, useEffect } from "react";
import { WeatherData, TemperatureUnit } from "./types/weather";
import { getWeather } from "./lib/weatherApi";
import WeatherSearch from "./components/WeatherSearch";
import CurrentWeather from "./components/CurrentWeather";
import DayOverview from "./components/DayOverview";
import ForecastCard from "./components/ForecastCard";
import styles from "./page.module.css";

/**
 * Main weather dashboard component
 *
 * Manages application state including:
 * - Current weather data from API
 * - Loading and error states
 * - Temperature unit preference (Celsius/Fahrenheit)
 *
 * Loads default location (Brighton) on mount and allows users to search
 * for weather in other locations via the search component.
 */
export default function Home() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [unit, setUnit] = useState<TemperatureUnit>("C");

  const DEFAULT_LOCATION = "Brighton";

  /**
   * Fetches weather data for the specified location
   * Handles loading state, error messages, and data updates
   *
   * @param location - Location name to fetch weather for
   */
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
    <div className={styles.appContainer}>
      <aside className={styles.sidebar}>
        <WeatherSearch onSearch={fetchWeather} isLoading={loading} />

        {loading && (
          <div className={styles.loadingState}>
            <div className={styles.spinner} />
            <p>Loading weather data...</p>
          </div>
        )}

        {error && (
          <div className={styles.errorState}>
            <p>{error}</p>
          </div>
        )}

        {weather && !loading && (
          <CurrentWeather weather={weather} unit={unit} />
        )}
      </aside>

      <main className={styles.mainContent}>
        <div className={styles.unitToggle}>
          <button
            className={unit === "C" ? styles.active : ""}
            onClick={() => setUnit("C")}
          >
            °C
          </button>
          <button
            className={unit === "F" ? styles.active : ""}
            onClick={() => setUnit("F")}
          >
            °F
          </button>
        </div>

        {weather && !loading && (
          <>
            <DayOverview weather={weather} unit={unit} />

            <div className={styles.forecastSection}>
              <h2>5 Day Forecast</h2>
              <div className={styles.forecastGrid}>
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
          <div className={styles.mainErrorState}>
            <h2>Unable to load weather data</h2>
            <p>Please try searching for a different location.</p>
          </div>
        )}
      </main>
    </div>
  );
}
