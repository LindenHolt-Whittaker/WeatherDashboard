import { render, screen } from '@testing-library/react';
import ForecastCard from '../ForecastCard';
import { createMockDayForecast } from '../../__tests__/test-utils';

describe('ForecastCard', () => {
  const mockForecast = createMockDayForecast();

  it('should display "Tomorrow" for index 0', () => {
    render(<ForecastCard forecast={mockForecast} unit="C" index={0} />);
    expect(screen.getByText('Tomorrow')).toBeTruthy();
  });

  it('should display formatted date for index 1', () => {
    const forecast = createMockDayForecast({ datetime: '2025-01-27' });
    render(<ForecastCard forecast={forecast} unit="C" index={1} />);
    const dateRegex = /^(Mon|Tue|Wed|Thu|Fri|Sat|Sun), \d{1,2} (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)$/;
    expect(screen.getByText(dateRegex)).toBeTruthy();
  });

  it('should display formatted date for index 2', () => {
    const forecast = createMockDayForecast({ datetime: '2025-01-28' });
    render(<ForecastCard forecast={forecast} unit="C" index={2} />);
    const dateRegex = /^(Mon|Tue|Wed|Thu|Fri|Sat|Sun), \d{1,2} (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)$/;
    expect(screen.getByText(dateRegex)).toBeTruthy();
  });

  it('should render weather icon', () => {
    render(<ForecastCard forecast={mockForecast} unit="C" index={0} />);
    const img = screen.getByRole('img');
    expect(img).toBeTruthy();
  });

  it('should render correct weather icon', () => {
    const forecast = createMockDayForecast({ icon: 'rain' });
    render(<ForecastCard forecast={forecast} unit="C" index={0} />);
    const img = screen.getByRole('img') as HTMLImageElement;
    expect(img.getAttribute('src')).toBe('/icons/rain-cloud.svg');
  });

  it('should render formatted conditions', () => {
    render(<ForecastCard forecast={mockForecast} unit="C" index={0} />);
    expect(screen.getByText('Overcast')).toBeTruthy();
  });

  it('should render multiple conditions', () => {
    const forecast = createMockDayForecast({ conditions: 'Rain, Overcast' });
    render(<ForecastCard forecast={forecast} unit="C" index={0} />);
    expect(screen.getByText('Rain')).toBeTruthy();
    expect(screen.getByText('Overcast')).toBeTruthy();
  });

  it('should display high temperature in Celsius', () => {
    render(<ForecastCard forecast={mockForecast} unit="C" index={0} />);
    expect(screen.getByText('20°C')).toBeTruthy();
  });

  it('should display low temperature in Celsius', () => {
    render(<ForecastCard forecast={mockForecast} unit="C" index={0} />);
    expect(screen.getByText('14°C')).toBeTruthy();
  });

  it('should display high temperature in Fahrenheit', () => {
    render(<ForecastCard forecast={mockForecast} unit="F" index={0} />);
    expect(screen.getByText('68°F')).toBeTruthy();
  });

  it('should display low temperature in Fahrenheit', () => {
    render(<ForecastCard forecast={mockForecast} unit="F" index={0} />);
    expect(screen.getByText('57°F')).toBeTruthy();
  });

  it('should round temperatures correctly', () => {
    const forecast = createMockDayForecast({ tempmax: 20.7, tempmin: 14.3 });
    render(<ForecastCard forecast={forecast} unit="C" index={0} />);
    expect(screen.getByText('21°C')).toBeTruthy();
    expect(screen.getByText('14°C')).toBeTruthy();
  });

  it('should apply correct CSS classes', () => {
    const { container } = render(<ForecastCard forecast={mockForecast} unit="C" index={0} />);
    expect(container.querySelector('.forecast-card')).toBeTruthy();
    expect(container.querySelector('.forecast-day')).toBeTruthy();
    expect(container.querySelector('.forecast-conditions')).toBeTruthy();
    expect(container.querySelector('.forecast-temps')).toBeTruthy();
  });

  it('should render temp-high and temp-low elements', () => {
    const { container } = render(<ForecastCard forecast={mockForecast} unit="C" index={0} />);
    expect(container.querySelector('.temp-high')).toBeTruthy();
    expect(container.querySelector('.temp-low')).toBeTruthy();
  });

  it('should update when forecast prop changes', () => {
    const { rerender } = render(<ForecastCard forecast={mockForecast} unit="C" index={0} />);
    expect(screen.getByText('20°C')).toBeTruthy();

    const newForecast = createMockDayForecast({ tempmax: 25, tempmin: 18 });
    rerender(<ForecastCard forecast={newForecast} unit="C" index={0} />);
    expect(screen.getByText('25°C')).toBeTruthy();
    expect(screen.getByText('18°C')).toBeTruthy();
  });

  it('should update when unit prop changes', () => {
    const { rerender } = render(<ForecastCard forecast={mockForecast} unit="C" index={0} />);
    expect(screen.getByText('20°C')).toBeTruthy();

    rerender(<ForecastCard forecast={mockForecast} unit="F" index={0} />);
    expect(screen.getByText('68°F')).toBeTruthy();
  });

  it('should update when index prop changes', () => {
    const { rerender } = render(<ForecastCard forecast={mockForecast} unit="C" index={0} />);
    expect(screen.getByText('Tomorrow')).toBeTruthy();

    rerender(<ForecastCard forecast={mockForecast} unit="C" index={1} />);
    expect(screen.queryByText('Tomorrow')).toBeFalsy();
  });

  it('should handle negative temperatures', () => {
    const forecast = createMockDayForecast({ tempmax: -5, tempmin: -15 });
    render(<ForecastCard forecast={forecast} unit="C" index={0} />);
    expect(screen.getByText('-5°C')).toBeTruthy();
    expect(screen.getByText('-15°C')).toBeTruthy();
  });

  it('should handle zero temperatures', () => {
    const forecast = createMockDayForecast({ tempmax: 5, tempmin: 0 });
    render(<ForecastCard forecast={forecast} unit="C" index={0} />);
    expect(screen.getByText('5°C')).toBeTruthy();
    expect(screen.getByText('0°C')).toBeTruthy();
  });

  it('should handle very high temperatures', () => {
    const forecast = createMockDayForecast({ tempmax: 45, tempmin: 30 });
    render(<ForecastCard forecast={forecast} unit="C" index={0} />);
    expect(screen.getByText('45°C')).toBeTruthy();
    expect(screen.getByText('30°C')).toBeTruthy();
  });

  it('should format date with correct day name', () => {
    const forecast = createMockDayForecast({ datetime: '2025-01-27' });
    render(<ForecastCard forecast={forecast} unit="C" index={1} />);
    expect(screen.getByText(/Mon, \d{1,2} Jan/)).toBeTruthy();
  });

  it('should format date with correct month', () => {
    const forecast = createMockDayForecast({ datetime: '2025-12-15' });
    render(<ForecastCard forecast={forecast} unit="C" index={1} />);
    expect(screen.getByText(/\w{3}, 15 Dec/)).toBeTruthy();
  });

  it('should handle single condition', () => {
    const forecast = createMockDayForecast({ conditions: 'Clear' });
    const { container } = render(<ForecastCard forecast={forecast} unit="C" index={0} />);
    const conditionDivs = container.querySelectorAll('.forecast-conditions > div');
    expect(conditionDivs.length).toBe(2);
  });

  it('should handle three conditions', () => {
    const forecast = createMockDayForecast({ conditions: 'Rain, Overcast, Windy' });
    const { container } = render(<ForecastCard forecast={forecast} unit="C" index={0} />);
    const conditionDivs = container.querySelectorAll('.forecast-conditions > div');
    expect(conditionDivs.length).toBe(3);
  });

  it('should render weather icon with medium size by default', () => {
    render(<ForecastCard forecast={mockForecast} unit="C" index={0} />);
    const img = screen.getByRole('img') as HTMLImageElement;
    expect(img.className).toContain('medium');
  });

  it('should handle different weather icons', () => {
    const clearForecast = createMockDayForecast({ icon: 'clear-day' });
    const { rerender } = render(<ForecastCard forecast={clearForecast} unit="C" index={0} />);
    let img = screen.getByRole('img') as HTMLImageElement;
    expect(img.getAttribute('src')).toBe('/icons/sun.svg');

    const rainyForecast = createMockDayForecast({ icon: 'rain' });
    rerender(<ForecastCard forecast={rainyForecast} unit="C" index={0} />);
    img = screen.getByRole('img') as HTMLImageElement;
    expect(img.getAttribute('src')).toBe('/icons/rain-cloud.svg');
  });

  it('should display correct temperature conversion', () => {
    const forecast = createMockDayForecast({ tempmax: 0, tempmin: -40 });
    render(<ForecastCard forecast={forecast} unit="F" index={0} />);
    expect(screen.getByText('32°F')).toBeTruthy();
    expect(screen.getByText('-40°F')).toBeTruthy();
  });

  it('should handle decimal temperatures in Fahrenheit conversion', () => {
    const forecast = createMockDayForecast({ tempmax: 20.5, tempmin: 15.5 });
    render(<ForecastCard forecast={forecast} unit="F" index={0} />);
    expect(screen.getByText('69°F')).toBeTruthy();
    expect(screen.getByText('60°F')).toBeTruthy();
  });

  it('should render correct structure', () => {
    const { container } = render(<ForecastCard forecast={mockForecast} unit="C" index={0} />);
    const card = container.querySelector('.forecast-card');
    expect(card?.querySelector('.forecast-day')).toBeTruthy();
    expect(card?.querySelector('.forecast-weather-icon-container')).toBeTruthy();
    expect(card?.querySelector('.forecast-conditions')).toBeTruthy();
    expect(card?.querySelector('.forecast-temps')).toBeTruthy();
  });

  it('should handle edge case dates', () => {
    const forecast = createMockDayForecast({ datetime: '2025-02-01' });
    render(<ForecastCard forecast={forecast} unit="C" index={1} />);
    expect(screen.getByText(/\w{3}, 1 Feb/)).toBeTruthy();
  });

  it('should handle end of month dates', () => {
    const forecast = createMockDayForecast({ datetime: '2025-01-31' });
    render(<ForecastCard forecast={forecast} unit="C" index={1} />);
    expect(screen.getByText(/\w{3}, 31 Jan/)).toBeTruthy();
  });
});