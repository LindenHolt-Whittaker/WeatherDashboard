import { useState } from "react";

interface WeatherSearchProps {
  onSearch: (location: string) => void;
  isLoading: boolean;
}

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
    <form onSubmit={handleSubmit} className="search-form">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Search for a location..."
        disabled={isLoading}
        className="search-input"
      />
      <button
        type="submit"
        disabled={isLoading || !input.trim()}
        className="search-button"
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
