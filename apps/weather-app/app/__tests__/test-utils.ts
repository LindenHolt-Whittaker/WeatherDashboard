import { WeatherData, DayForecast } from '../types/weather';

/**
 * Mock weather data for Brighton
 */
export const mockWeatherData: WeatherData = {
  address: "brighton",
  resolvedAddress: "Brighton, England, United Kingdom",
  datetime: "14:30:00",
  temp: 18.5,
  tempmax: 22.3,
  tempmin: 15.1,
  humidity: 65,
  cloudcover: 40,
  conditions: "Partly cloudy, Breezy",
  icon: "partly-cloudy-day",
  sunrise: "06:30:00",
  sunset: "20:15:00",
  days: [
    {
      datetime: "2025-01-26",
      tempmax: 20.5,
      tempmin: 14.2,
      temp: 17.3,
      humidity: 70,
      cloudcover: 50,
      conditions: "Overcast",
      icon: "cloudy",
      sunrise: "06:29:00",
      sunset: "20:16:00"
    },
    {
      datetime: "2025-01-27",
      tempmax: 19.8,
      tempmin: 13.5,
      temp: 16.5,
      humidity: 75,
      cloudcover: 80,
      conditions: "Rain, Overcast",
      icon: "rain",
      sunrise: "06:28:00",
      sunset: "20:17:00"
    },
    {
      datetime: "2025-01-28",
      tempmax: 21.0,
      tempmin: 15.5,
      temp: 18.0,
      humidity: 60,
      cloudcover: 30,
      conditions: "Partially cloudy",
      icon: "partly-cloudy-day",
      sunrise: "06:27:00",
      sunset: "20:18:00"
    },
    {
      datetime: "2025-01-29",
      tempmax: 23.5,
      tempmin: 16.8,
      temp: 20.0,
      humidity: 55,
      cloudcover: 20,
      conditions: "Clear",
      icon: "clear-day",
      sunrise: "06:26:00",
      sunset: "20:19:00"
    },
    {
      datetime: "2025-01-30",
      tempmax: 24.2,
      tempmin: 17.5,
      temp: 21.0,
      humidity: 50,
      cloudcover: 15,
      conditions: "Clear",
      icon: "clear-day",
      sunrise: "06:25:00",
      sunset: "20:20:00"
    }
  ]
};

/**
 * Mock API response structure
 */
export const mockApiResponse = {
  address: "brighton",
  resolvedAddress: "Brighton, England, United Kingdom",
  currentConditions: {
    datetime: "14:30:00",
    temp: 18.5,
    humidity: 65,
    cloudcover: 40,
    conditions: "Partly cloudy, Breezy",
    icon: "partly-cloudy-day",
    sunrise: "06:30:00",
    sunset: "20:15:00"
  },
  days: [
    {
      datetime: "2025-01-25",
      tempmax: 22.3,
      tempmin: 15.1,
      temp: 18.5,
      humidity: 65,
      cloudcover: 40,
      conditions: "Partly cloudy",
      icon: "partly-cloudy-day",
      sunrise: "06:30:00",
      sunset: "20:15:00"
    },
    ...mockWeatherData.days
  ]
};

/**
 * Alternative mock data for different locations
 */
export const mockLondonWeather: WeatherData = {
  ...mockWeatherData,
  address: "london",
  resolvedAddress: "London, England, United Kingdom",
  temp: 16.0,
  tempmax: 19.0,
  tempmin: 12.0,
};

/**
 * Mock weather with single condition (for formatting tests)
 */
export const mockSingleConditionWeather: WeatherData = {
  ...mockWeatherData,
  conditions: "Clear"
};

/**
 * Mock weather with extreme values (for edge case tests)
 */
export const mockExtremeWeather: WeatherData = {
  ...mockWeatherData,
  temp: -40,
  tempmax: 50,
  tempmin: -50,
  humidity: 0,
  cloudcover: 100
};

/**
 * Create a mock day forecast
 */
export const createMockDayForecast = (overrides?: Partial<DayForecast>): DayForecast => ({
  datetime: "2025-01-26",
  tempmax: 20.0,
  tempmin: 14.0,
  temp: 17.0,
  humidity: 70,
  cloudcover: 50,
  conditions: "Overcast",
  icon: "cloudy",
  sunrise: "06:30:00",
  sunset: "20:15:00",
  ...overrides
});

/**
 * Setup global fetch mock
 */
export const setupFetchMock = (response: any, ok = true, status = 200) => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok,
      status,
      json: () => Promise.resolve(response),
    })
  ) as jest.Mock;
};

/**
 * Setup fetch to throw network error
 */
export const setupFetchError = (errorMessage = "Network error") => {
  global.fetch = jest.fn(() => 
    Promise.reject(new Error(errorMessage))
  ) as jest.Mock;
};