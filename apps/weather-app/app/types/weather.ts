export interface WeatherData {
  address: string;
  resolvedAddress: string;
  datetime: string;
  temp: number;
  tempmax: number;
  tempmin: number;
  humidity: number;
  cloudcover: number;
  conditions: string;
  icon: string;
  sunrise: string;
  sunset: string;
  days: DayForecast[];
}

export interface DayForecast {
  datetime: string;
  tempmax: number;
  tempmin: number;
  temp: number;
  humidity: number;
  cloudcover: number;
  conditions: string;
  icon: string;
  sunrise: string;
  sunset: string;
}

export type TemperatureUnit = "C" | "F";
