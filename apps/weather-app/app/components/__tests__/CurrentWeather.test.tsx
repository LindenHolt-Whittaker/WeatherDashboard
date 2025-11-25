import { render, screen } from '@testing-library/react';
import CurrentWeather from '../CurrentWeather';
import { mockWeatherData, mockSingleConditionWeather } from '../../__tests__/test-utils';

describe('CurrentWeather', () => {
  it('should render location name with proper formatting', () => {
    render(<CurrentWeather weather={mockWeatherData} unit="C" />);
    expect(screen.getByText('Brighton')).toBeTruthy();
  });

  it('should render current date', () => {
    render(<CurrentWeather weather={mockWeatherData} unit="C" />);
    const dateRegex = /^(Mon|Tue|Wed|Thu|Fri|Sat|Sun), \d{1,2} (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)$/;
    const dateElement = screen.getByText(dateRegex);
    expect(dateElement).toBeTruthy();
  });

  it('should render weather icon', () => {
    render(<CurrentWeather weather={mockWeatherData} unit="C" />);
    const img = screen.getByRole('img') as HTMLImageElement;
    expect(img).toBeTruthy();
    expect(img.className).toContain('large');
  });

  it('should display temperature in Celsius', () => {
    render(<CurrentWeather weather={mockWeatherData} unit="C" />);
    expect(screen.getByText('19')).toBeTruthy();
    expect(screen.getByText('°C')).toBeTruthy();
  });

  it('should display temperature in Fahrenheit', () => {
    render(<CurrentWeather weather={mockWeatherData} unit="F" />);
    expect(screen.getByText('65')).toBeTruthy();
    expect(screen.getByText('°F')).toBeTruthy();
  });

  it('should round temperature correctly', () => {
    const weatherData = {
      ...mockWeatherData,
      temp: 18.4
    };
    render(<CurrentWeather weather={weatherData} unit="C" />);
    expect(screen.getByText('18')).toBeTruthy();
  });

  it('should round temperature up when needed', () => {
    const weatherData = {
      ...mockWeatherData,
      temp: 18.6
    };
    render(<CurrentWeather weather={weatherData} unit="C" />);
    expect(screen.getByText('19')).toBeTruthy();
  });

  it('should render multiple conditions separated by comma', () => {
    render(<CurrentWeather weather={mockWeatherData} unit="C" />);
    expect(screen.getByText('Partly cloudy')).toBeTruthy();
    expect(screen.getByText('Breezy')).toBeTruthy();
  });

  it('should render single condition', () => {
    render(<CurrentWeather weather={mockSingleConditionWeather} unit="C" />);
    expect(screen.getByText('Clear')).toBeTruthy();
  });

  it('should apply correct CSS classes', () => {
    const { container } = render(<CurrentWeather weather={mockWeatherData} unit="C" />);
    expect(container.querySelector('.current-weather')).toBeTruthy();
    expect(container.querySelector('.location-name')).toBeTruthy();
    expect(container.querySelector('.current-date')).toBeTruthy();
    expect(container.querySelector('.temperature-display')).toBeTruthy();
    expect(container.querySelector('.temperature-display-unit')).toBeTruthy();
    expect(container.querySelector('.conditions')).toBeTruthy();
  });

  it('should update when weather prop changes', () => {
    const { rerender } = render(<CurrentWeather weather={mockWeatherData} unit="C" />);
    expect(screen.getByText('Brighton')).toBeTruthy();

    const newWeather = {
      ...mockWeatherData,
      address: 'london',
      temp: 15.0
    };
    rerender(<CurrentWeather weather={newWeather} unit="C" />);
    expect(screen.getByText('London')).toBeTruthy();
    expect(screen.getByText('15')).toBeTruthy();
  });

  it('should update when unit prop changes', () => {
    const { rerender } = render(<CurrentWeather weather={mockWeatherData} unit="C" />);
    expect(screen.getByText('19')).toBeTruthy();
    expect(screen.getByText('°C')).toBeTruthy();

    rerender(<CurrentWeather weather={mockWeatherData} unit="F" />);
    expect(screen.getByText('65')).toBeTruthy();
    expect(screen.getByText('°F')).toBeTruthy();
  });

  it('should handle negative temperatures', () => {
    const weatherData = {
      ...mockWeatherData,
      temp: -5.5
    };
    render(<CurrentWeather weather={weatherData} unit="C" />);
    expect(screen.getByText('-5')).toBeTruthy();
  });

  it('should handle zero temperature', () => {
    const weatherData = {
      ...mockWeatherData,
      temp: 0
    };
    render(<CurrentWeather weather={weatherData} unit="C" />);
    expect(screen.getByText('0')).toBeTruthy();
  });

  it('should handle very high temperatures', () => {
    const weatherData = {
      ...mockWeatherData,
      temp: 45.2
    };
    render(<CurrentWeather weather={weatherData} unit="C" />);
    expect(screen.getByText('45')).toBeTruthy();
  });

  it('should format location name with multiple words', () => {
    const weatherData = {
      ...mockWeatherData,
      address: 'new york'
    };
    render(<CurrentWeather weather={weatherData} unit="C" />);
    expect(screen.getByText('New York')).toBeTruthy();
  });

  it('should format location name with prepositions', () => {
    const weatherData = {
      ...mockWeatherData,
      address: 'stratford upon avon'
    };
    render(<CurrentWeather weather={weatherData} unit="C" />);
    expect(screen.getByText('Stratford upon Avon')).toBeTruthy();
  });

  it('should pass correct icon to WeatherIcon component', () => {
    render(<CurrentWeather weather={mockWeatherData} unit="C" />);
    const img = screen.getByRole('img') as HTMLImageElement;
    expect(img.getAttribute('alt')).toBe('partly-cloudy-day');
  });

  it('should handle different weather icons', () => {
    const weatherData = {
      ...mockWeatherData,
      icon: 'rain'
    };
    render(<CurrentWeather weather={weatherData} unit="C" />);
    const img = screen.getByRole('img') as HTMLImageElement;
    expect(img.getAttribute('src')).toBe('/icons/rain-cloud.svg');
  });

  it('should render all condition parts', () => {
    const weatherData = {
      ...mockWeatherData,
      conditions: 'Rain, Overcast, Windy'
    };
    const { container } = render(<CurrentWeather weather={weatherData} unit="C" />);
    const conditionDivs = container.querySelectorAll('.conditions > div');
    expect(conditionDivs.length).toBe(3);
  });
});