import { useState } from "react";
import styles from "./WeatherSearch.module.css";

/**
 * Props for the WeatherSearch component
 */
interface WeatherSearchProps {
  /** Callback function invoked when user submits a search with a valid location */
  onSearch: (location: string) => void;
  /** Loading state to disable input and button during API calls */
  isLoading: boolean;
}

/**
 * Weather search input component
 *
 * Provides a search form with input validation:
 * - Trims whitespace from input
 * - Disables submission when empty or loading
 * - Displays arrow icon button for submission
 */
export default function WeatherSearch({
  onSearch,
  isLoading,
}: WeatherSearchProps) {
  const [input, setInput] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onSearch(input.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.searchForm}>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Search for a location..."
        disabled={isLoading}
        className={styles.searchInput}
      />
      <button
        type="submit"
        disabled={isLoading || !input.trim()}
        className={styles.searchButton}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="5" y1="12" x2="19" y2="12" />
          <polyline points="12 5 19 12 12 19" />
        </svg>
      </button>
    </form>
  );
}
