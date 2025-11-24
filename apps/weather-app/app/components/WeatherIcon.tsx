interface WeatherIconProps {
  icon: string;
  size?: "medium" | "large";
}

export default function WeatherIcon({
  icon,
  size = "medium",
}: WeatherIconProps) {
  // Map API icon codes to 4 Figma icons
  const getIconFileName = (apiIcon: string): string => {
    // Icon 1: Sun (clear conditions)
    if (apiIcon === "clear-day" || apiIcon === "clear-night") {
      return "sun.svg";
    }

    // Icon 2: Sun behind cloud (partly cloudy)
    if (apiIcon === "partly-cloudy-day" || apiIcon === "partly-cloudy-night") {
      return "partly-cloudy.svg";
    }

    // Icon 3: Sun behind raining cloud (daytime precipitation)
    if (
      apiIcon === "showers-day" ||
      apiIcon === "thunder-showers-day" ||
      apiIcon === "snow-showers-day"
    ) {
      return "sun-rain.svg";
    }

    // Icon 4: Raining cloud (everything else - full rain, storms, heavy clouds, night rain)
    if (
      apiIcon === "rain" ||
      apiIcon === "cloudy" ||
      apiIcon === "fog" ||
      apiIcon === "wind" ||
      apiIcon === "thunder-rain" ||
      apiIcon === "showers-night" ||
      apiIcon === "thunder-showers-night" ||
      apiIcon === "snow" ||
      apiIcon === "snow-showers-night"
    ) {
      return "rain-cloud.svg";
    }

    // Fallback to sun icon
    return "sun.svg";
  };

  const iconFileName = getIconFileName(icon);

  return (
    <img
      src={`/icons/${iconFileName}`}
      alt={icon}
      className={`weather-icon ${size}`}
      style={{ display: "block" }}
    />
  );
}
