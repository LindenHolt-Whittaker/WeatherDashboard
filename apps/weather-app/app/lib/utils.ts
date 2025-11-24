import { TemperatureUnit } from "../types/weather";

export function convertTemp(celsius: number, unit: TemperatureUnit): number {
  if (unit === "F") {
    return (celsius * 9) / 5 + 32;
  }
  return celsius;
}

export function formatDate(date: Date): string {
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

  const dayName = days[date.getDay()];
  const day = date.getDate();
  const month = months[date.getMonth()];

  return `${dayName}, ${day} ${month}`;
}
