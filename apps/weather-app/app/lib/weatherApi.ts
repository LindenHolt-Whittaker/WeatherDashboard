import { WeatherData } from "../types/weather";

const API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
const BASE_URL =
  "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline";

/**
 * Fetches weather data from the Visual Crossing Weather API and transforms it
 * into the application's WeatherData format
 *
 * @param location - Location name (city, address, coordinates, etc.)
 * @returns Promise resolving to WeatherData with current conditions and 5-day forecast
 * @throws Error if API key is not configured
 * @throws Error with user-friendly message if location is not found (400 status)
 * @throws Error with generic message for other API failures
 */
export async function getWeather(location: string): Promise<WeatherData> {
  if (!API_KEY) {
    throw new Error("Weather API key is not configured");
  }

  const url = `${BASE_URL}/${encodeURIComponent(
    location
  )}?unitGroup=metric&key=${API_KEY}&contentType=json`;

  const response = await fetch(url);

  if (!response.ok) {
    if (response.status === 400) {
      throw new Error("Location not found. Please try a different search.");
    }
    throw new Error("Failed to fetch weather data. Please try again.");
  }

  const data = await response.json();

  return {
    address: data.address,
    resolvedAddress: data.resolvedAddress,
    datetime: data.currentConditions.datetime,
    temp: data.currentConditions.temp,
    tempmax: data.days[0].tempmax,
    tempmin: data.days[0].tempmin,
    humidity: data.currentConditions.humidity,
    cloudcover: data.currentConditions.cloudcover,
    conditions: data.currentConditions.conditions,
    icon: data.currentConditions.icon,
    sunrise: data.currentConditions.sunrise,
    sunset: data.currentConditions.sunset,
    days: data.days.slice(1, 6), // Get next 5 days
  };
}
