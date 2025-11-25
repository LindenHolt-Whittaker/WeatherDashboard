import { render, screen } from '@testing-library/react';
import DayOverview from '../DayOverview';
import { mockWeatherData, mockExtremeWeather } from '../../__tests__/test-utils';

describe('DayOverview', () => {
  it('should render "Day Overview" heading', () => {
    render(<DayOverview weather={mockWeatherData} unit="C" />);
    expect(screen.getByText('Day Overview')).toBeTruthy();
  });

  it('should display humidity percentage', () => {
    render(<DayOverview weather={mockWeatherData} unit="C" />);
    expect(screen.getByText('65%')).toBeTruthy();
  });

  it('should display cloud cover percentage', () => {
    render(<DayOverview weather={mockWeatherData} unit="C" />);
    expect(screen.getByText('40%')).toBeTruthy();
  });

  it('should display max temperature in Celsius', () => {
    render(<DayOverview weather={mockWeatherData} unit="C" />);
    expect(screen.getByText('22')).toBeTruthy();
  });

  it('should display min temperature in Celsius', () => {
    render(<DayOverview weather={mockWeatherData} unit="C" />);
    expect(screen.getByText('15')).toBeTruthy();
  });

  it('should display max temperature in Fahrenheit', () => {
    render(<DayOverview weather={mockWeatherData} unit="F" />);
    expect(screen.getByText('72')).toBeTruthy();
  });

  it('should display min temperature in Fahrenheit', () => {
    render(<DayOverview weather={mockWeatherData} unit="F" />);
    expect(screen.getByText('59')).toBeTruthy();
  });

  it('should round temperature values', () => {
    const weatherData = {
      ...mockWeatherData,
      tempmax: 22.7,
      tempmin: 15.3
    };
    render(<DayOverview weather={weatherData} unit="C" />);
    expect(screen.getByText('23')).toBeTruthy();
    expect(screen.getByText('15')).toBeTruthy();
  });

  it('should display formatted sunrise time', () => {
    render(<DayOverview weather={mockWeatherData} unit="C" />);
    expect(screen.getByText('06:30')).toBeTruthy();
  });

  it('should display formatted sunset time', () => {
    render(<DayOverview weather={mockWeatherData} unit="C" />);
    expect(screen.getByText('20:15')).toBeTruthy();
  });

  it('should render humidity progress bar with correct width', () => {
    const { container } = render(<DayOverview weather={mockWeatherData} unit="C" />);
    const humidityCard = Array.from(container.querySelectorAll('.stat-card')).find(
      card => card.textContent?.includes('Humidity')
    );
    const progressFill = humidityCard?.querySelector('.progress-fill') as HTMLElement;
    expect(progressFill?.style.width).toBe('65%');
  });

  it('should render cloud cover progress bar with correct width', () => {
    const { container } = render(<DayOverview weather={mockWeatherData} unit="C" />);
    const cloudCard = Array.from(container.querySelectorAll('.stat-card')).find(
      card => card.textContent?.includes('Cloud Cover')
    );
    const progressFill = cloudCard?.querySelector('.progress-fill') as HTMLElement;
    expect(progressFill?.style.width).toBe('40%');
  });

  it('should apply green class to humidity progress bar when > 50%', () => {
    const { container } = render(<DayOverview weather={mockWeatherData} unit="C" />);
    const humidityCard = Array.from(container.querySelectorAll('.stat-card')).find(
      card => card.textContent?.includes('Humidity')
    );
    const progressFill = humidityCard?.querySelector('.progress-fill');
    expect(progressFill?.className).toContain('green');
  });

  it('should apply yellow class to humidity progress bar when <= 50%', () => {
    const weatherData = {
      ...mockWeatherData,
      humidity: 45
    };
    const { container } = render(<DayOverview weather={weatherData} unit="C" />);
    const humidityCard = Array.from(container.querySelectorAll('.stat-card')).find(
      card => card.textContent?.includes('Humidity')
    );
    const progressFill = humidityCard?.querySelector('.progress-fill');
    expect(progressFill?.className).toContain('yellow');
  });

  it('should apply green class to cloud cover progress bar when > 50%', () => {
    const weatherData = {
      ...mockWeatherData,
      cloudcover: 75
    };
    const { container } = render(<DayOverview weather={weatherData} unit="C" />);
    const cloudCard = Array.from(container.querySelectorAll('.stat-card')).find(
      card => card.textContent?.includes('Cloud Cover')
    );
    const progressFill = cloudCard?.querySelector('.progress-fill');
    expect(progressFill?.className).toContain('green');
  });

  it('should apply yellow class to cloud cover progress bar when <= 50%', () => {
    const { container } = render(<DayOverview weather={mockWeatherData} unit="C" />);
    const cloudCard = Array.from(container.querySelectorAll('.stat-card')).find(
      card => card.textContent?.includes('Cloud Cover')
    );
    const progressFill = cloudCard?.querySelector('.progress-fill');
    expect(progressFill?.className).toContain('yellow');
  });

  it('should handle 0% humidity', () => {
    render(<DayOverview weather={mockExtremeWeather} unit="C" />);
    expect(screen.getByText('0%')).toBeTruthy();
  });

  it('should handle 100% cloud cover', () => {
    render(<DayOverview weather={mockExtremeWeather} unit="C" />);
    expect(screen.getByText('100%')).toBeTruthy();
  });

  it('should display correct labels', () => {
    render(<DayOverview weather={mockWeatherData} unit="C" />);
    expect(screen.getByText('Humidity')).toBeTruthy();
    expect(screen.getByText('Cloud Cover')).toBeTruthy();
    expect(screen.getByText('Max temp.')).toBeTruthy();
    expect(screen.getByText('Min temp.')).toBeTruthy();
    expect(screen.getByText('Sunrise')).toBeTruthy();
    expect(screen.getByText('Sunset')).toBeTruthy();
  });

  it('should render progress bar labels', () => {
    const { container } = render(<DayOverview weather={mockWeatherData} unit="C" />);
    const progressLabels = container.querySelectorAll('.progress-labels');
    expect(progressLabels.length).toBe(2);
    progressLabels.forEach(label => {
      expect(label.textContent).toContain('0');
      expect(label.textContent).toContain('100');
    });
  });

  it('should display temperature units', () => {
    render(<DayOverview weather={mockWeatherData} unit="C" />);
    const units = screen.getAllByText('°C');
    expect(units.length).toBe(2);
  });

  it('should update when weather prop changes', () => {
    const { rerender } = render(<DayOverview weather={mockWeatherData} unit="C" />);
    expect(screen.getByText('65%')).toBeTruthy();

    const newWeather = {
      ...mockWeatherData,
      humidity: 80,
      cloudcover: 60
    };
    rerender(<DayOverview weather={newWeather} unit="C" />);
    expect(screen.getByText('80%')).toBeTruthy();
    expect(screen.getByText('60%')).toBeTruthy();
  });

  it('should update when unit prop changes', () => {
    const { rerender } = render(<DayOverview weather={mockWeatherData} unit="C" />);
    expect(screen.getByText('22')).toBeTruthy();
    expect(screen.getAllByText('°C').length).toBe(2);

    rerender(<DayOverview weather={mockWeatherData} unit="F" />);
    expect(screen.getByText('72')).toBeTruthy();
    expect(screen.getAllByText('°F').length).toBe(2);
  });

  it('should apply correct CSS classes', () => {
    const { container } = render(<DayOverview weather={mockWeatherData} unit="C" />);
    expect(container.querySelector('.day-overview')).toBeTruthy();
    expect(container.querySelector('.overview-grid')).toBeTruthy();
    expect(container.querySelector('.detail-grid')).toBeTruthy();
    expect(container.querySelectorAll('.stat-card').length).toBe(2);
    expect(container.querySelectorAll('.detail-card').length).toBe(4);
  });

  it('should handle extreme temperatures', () => {
    render(<DayOverview weather={mockExtremeWeather} unit="C" />);
    expect(screen.getByText('50')).toBeTruthy();
    expect(screen.getByText('-50')).toBeTruthy();
  });

  it('should round humidity to nearest integer', () => {
    const weatherData = {
      ...mockWeatherData,
      humidity: 65.7
    };
    render(<DayOverview weather={weatherData} unit="C" />);
    expect(screen.getByText('66%')).toBeTruthy();
  });

  it('should round cloud cover to nearest integer', () => {
    const weatherData = {
      ...mockWeatherData,
      cloudcover: 40.3
    };
    render(<DayOverview weather={weatherData} unit="C" />);
    expect(screen.getByText('40%')).toBeTruthy();
  });

  it('should render stat values with correct classes', () => {
    const { container } = render(<DayOverview weather={mockWeatherData} unit="C" />);
    const statValues = container.querySelectorAll('.stat-value');
    expect(statValues.length).toBe(2);
  });

  it('should render detail values with correct classes', () => {
    const { container } = render(<DayOverview weather={mockWeatherData} unit="C" />);
    const detailValues = container.querySelectorAll('.detail-value');
    expect(detailValues.length).toBeGreaterThanOrEqual(4);
  });

  it('should handle exactly 50% values', () => {
    const weatherData = {
      ...mockWeatherData,
      humidity: 50,
      cloudcover: 50
    };
    const { container } = render(<DayOverview weather={weatherData} unit="C" />);
    
    const progressFills = container.querySelectorAll('.progress-fill');
    progressFills.forEach(fill => {
      expect(fill.className).toContain('yellow');
    });
  });
});