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

export function formatTime(time: string): string {
  // Visual Crossing returns time in HH:MM:SS format
  return time.slice(0, 5); // Return HH:MM
}

// API returns user input as-is, so we apply smart title-casing
// while preserving lowercase prepositions (de, la, upon, etc.)
export function formatLocationName(location: string): string {
  // Words that should stay lowercase (common prepositions and articles in place names)
  const lowercaseWords = new Set([
    "a",
    "an",
    "am",
    "and",
    "as",
    "at",
    "but",
    "by",
    "de",
    "for",
    "in",
    "of",
    "on",
    "or",
    "the",
    "to",
    "upon",
    "with",
    "la",
    "le",
    "les",
    "da",
    "di",
    "del",
    "della",
    "van",
    "von",
    "der",
    "den",
    "het",
  ]);

  return location
    .split(" ")
    .map((word, index) => {
      // Handle hyphenated words (e.g., "Stratford-upon-Avon")
      if (word.includes("-")) {
        return word
          .split("-")
          .map((part, partIndex) => {
            const lowerPart = part.toLowerCase();
            // Keep middle parts lowercase if they're in the set
            if (partIndex > 0 && lowercaseWords.has(lowerPart)) {
              return lowerPart;
            }
            return part.charAt(0).toUpperCase() + part.slice(1).toLowerCase();
          })
          .join("-");
      }

      // Always capitalize the first word
      if (index === 0) {
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
      }

      // Check if this word should stay lowercase
      const lowerWord = word.toLowerCase();
      if (lowercaseWords.has(lowerWord)) {
        return lowerWord;
      }

      // Standard title case
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join(" ");
}

// Split string conditions by comma and show each condition on new line.
// Most conditions show two conditions, so if only one, add breaking space for UI consistency.
export const getFormattedConditions = (conditions: string) => {
  const nonBreakingSpace = "\u00A0";

  const formattedConditions = conditions
    .split(",")
    .map((condition) => condition.trim());

  if (formattedConditions.length === 1) {
    formattedConditions.push(nonBreakingSpace);
  }

  return formattedConditions;
};
