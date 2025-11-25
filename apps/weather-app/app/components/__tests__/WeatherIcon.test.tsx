import { render, screen } from '@testing-library/react';
import WeatherIcon from '../WeatherIcon';

describe('WeatherIcon', () => {
  it('should render with default medium size', () => {
    render(<WeatherIcon icon="clear-day" />);
    const img = screen.getByRole('img');
    expect(img.className).toContain('weather-icon');
    expect(img.className).toContain('medium');
  });

  it('should render with large size when specified', () => {
    render(<WeatherIcon icon="clear-day" size="large" />);
    const img = screen.getByRole('img');
    expect(img.className).toContain('weather-icon');
    expect(img.className).toContain('large');
  });

  it('should map clear-day to sun.svg', () => {
    render(<WeatherIcon icon="clear-day" />);
    const img = screen.getByRole('img') as HTMLImageElement;
    expect(img.getAttribute('src')).toBe('/icons/sun.svg');
  });

  it('should map clear-night to sun.svg', () => {
    render(<WeatherIcon icon="clear-night" />);
    const img = screen.getByRole('img') as HTMLImageElement;
    expect(img.getAttribute('src')).toBe('/icons/sun.svg');
  });

  it('should map partly-cloudy-day to partly-cloudy.svg', () => {
    render(<WeatherIcon icon="partly-cloudy-day" />);
    const img = screen.getByRole('img') as HTMLImageElement;
    expect(img.getAttribute('src')).toBe('/icons/partly-cloudy.svg');
  });

  it('should map partly-cloudy-night to partly-cloudy.svg', () => {
    render(<WeatherIcon icon="partly-cloudy-night" />);
    const img = screen.getByRole('img') as HTMLImageElement;
    expect(img.getAttribute('src')).toBe('/icons/partly-cloudy.svg');
  });

  it('should map showers-day to sun-rain.svg', () => {
    render(<WeatherIcon icon="showers-day" />);
    const img = screen.getByRole('img') as HTMLImageElement;
    expect(img.getAttribute('src')).toBe('/icons/sun-rain.svg');
  });

  it('should map thunder-showers-day to sun-rain.svg', () => {
    render(<WeatherIcon icon="thunder-showers-day" />);
    const img = screen.getByRole('img') as HTMLImageElement;
    expect(img.getAttribute('src')).toBe('/icons/sun-rain.svg');
  });

  it('should map snow-showers-day to sun-rain.svg', () => {
    render(<WeatherIcon icon="snow-showers-day" />);
    const img = screen.getByRole('img') as HTMLImageElement;
    expect(img.getAttribute('src')).toBe('/icons/sun-rain.svg');
  });

  it('should map rain to rain-cloud.svg', () => {
    render(<WeatherIcon icon="rain" />);
    const img = screen.getByRole('img') as HTMLImageElement;
    expect(img.getAttribute('src')).toBe('/icons/rain-cloud.svg');
  });

  it('should map cloudy to rain-cloud.svg', () => {
    render(<WeatherIcon icon="cloudy" />);
    const img = screen.getByRole('img') as HTMLImageElement;
    expect(img.getAttribute('src')).toBe('/icons/rain-cloud.svg');
  });

  it('should map fog to rain-cloud.svg', () => {
    render(<WeatherIcon icon="fog" />);
    const img = screen.getByRole('img') as HTMLImageElement;
    expect(img.getAttribute('src')).toBe('/icons/rain-cloud.svg');
  });

  it('should map wind to rain-cloud.svg', () => {
    render(<WeatherIcon icon="wind" />);
    const img = screen.getByRole('img') as HTMLImageElement;
    expect(img.getAttribute('src')).toBe('/icons/rain-cloud.svg');
  });

  it('should map thunder-rain to rain-cloud.svg', () => {
    render(<WeatherIcon icon="thunder-rain" />);
    const img = screen.getByRole('img') as HTMLImageElement;
    expect(img.getAttribute('src')).toBe('/icons/rain-cloud.svg');
  });

  it('should map showers-night to rain-cloud.svg', () => {
    render(<WeatherIcon icon="showers-night" />);
    const img = screen.getByRole('img') as HTMLImageElement;
    expect(img.getAttribute('src')).toBe('/icons/rain-cloud.svg');
  });

  it('should map thunder-showers-night to rain-cloud.svg', () => {
    render(<WeatherIcon icon="thunder-showers-night" />);
    const img = screen.getByRole('img') as HTMLImageElement;
    expect(img.getAttribute('src')).toBe('/icons/rain-cloud.svg');
  });

  it('should map snow to rain-cloud.svg', () => {
    render(<WeatherIcon icon="snow" />);
    const img = screen.getByRole('img') as HTMLImageElement;
    expect(img.getAttribute('src')).toBe('/icons/rain-cloud.svg');
  });

  it('should map snow-showers-night to rain-cloud.svg', () => {
    render(<WeatherIcon icon="snow-showers-night" />);
    const img = screen.getByRole('img') as HTMLImageElement;
    expect(img.getAttribute('src')).toBe('/icons/rain-cloud.svg');
  });

  it('should use fallback icon for unknown codes', () => {
    render(<WeatherIcon icon="unknown-icon" />);
    const img = screen.getByRole('img') as HTMLImageElement;
    expect(img.getAttribute('src')).toBe('/icons/sun.svg');
  });

  it('should have correct alt text', () => {
    render(<WeatherIcon icon="clear-day" />);
    const img = screen.getByRole('img') as HTMLImageElement;
    expect(img.getAttribute('alt')).toBe('clear-day');
  });

  it('should update when icon prop changes', () => {
    const { rerender } = render(<WeatherIcon icon="clear-day" />);
    const img = screen.getByRole('img') as HTMLImageElement;
    expect(img.getAttribute('src')).toBe('/icons/sun.svg');

    rerender(<WeatherIcon icon="rain" />);
    expect(img.getAttribute('src')).toBe('/icons/rain-cloud.svg');
  });

  it('should update when size prop changes', () => {
    const { rerender } = render(<WeatherIcon icon="clear-day" size="medium" />);
    expect(screen.getByRole('img').className).toContain('medium');

    rerender(<WeatherIcon icon="clear-day" size="large" />);
    expect(screen.getByRole('img').className).toContain('large');
  });
});