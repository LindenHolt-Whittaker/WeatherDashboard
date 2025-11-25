// Mock the environment variable before importing the module
process.env.NEXT_PUBLIC_WEATHER_API_KEY = 'test-api-key';

import { getWeather } from '../weatherApi';
import { setupFetchMock, setupFetchError, mockApiResponse } from '../../__tests__/test-utils';

describe('getWeather', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should fetch and transform weather data successfully', async () => {
    setupFetchMock(mockApiResponse);

    const result = await getWeather('Brighton');

    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining('Brighton')
    );
    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining('unitGroup=metric')
    );
    expect(result.address).toBe('brighton');
    expect(result.temp).toBe(18.5);
    expect(result.days).toHaveLength(5);
  });

  it('should encode location in URL', async () => {
    setupFetchMock(mockApiResponse);

    await getWeather('New York');

    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining('New%20York')
    );
  });

  it('should include API key in request', async () => {
    setupFetchMock(mockApiResponse);

    await getWeather('London');

    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining('key=test-api-key')
    );
  });

  it('should include content type in request', async () => {
    setupFetchMock(mockApiResponse);

    await getWeather('Paris');

    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining('contentType=json')
    );
  });

  it('should throw error when API key is missing', async () => {
    process.env.NEXT_PUBLIC_WEATHER_API_KEY = '';

    // Need to reload the module to pick up the new env var
    jest.resetModules();
    const { getWeather: getWeatherReloaded } = require('../weatherApi');

    await expect(getWeatherReloaded('London')).rejects.toThrow(
      'Weather API key is not configured'
    );

    process.env.NEXT_PUBLIC_WEATHER_API_KEY = 'test-api-key';
  });

  it('should handle 400 status (location not found)', async () => {
    setupFetchMock({}, false, 400);

    await expect(getWeather('InvalidLocation')).rejects.toThrow(
      'Location not found. Please try a different search.'
    );
  });

  it('should handle 401 status (unauthorized)', async () => {
    setupFetchMock({}, false, 401);

    await expect(getWeather('London')).rejects.toThrow(
      'Failed to fetch weather data. Please try again.'
    );
  });

  it('should handle 500 status (server error)', async () => {
    setupFetchMock({}, false, 500);

    await expect(getWeather('London')).rejects.toThrow(
      'Failed to fetch weather data. Please try again.'
    );
  });

  it('should handle network errors', async () => {
    setupFetchError('Network connection failed');

    await expect(getWeather('London')).rejects.toThrow('Network connection failed');
  });

  it('should slice days correctly (next 5 days)', async () => {
    const apiResponseWith7Days = {
      ...mockApiResponse,
      days: Array(7).fill(null).map((_, i) => ({
        ...mockApiResponse.days[0],
        datetime: `2025-01-${25 + i}`
      }))
    };
    
    setupFetchMock(apiResponseWith7Days);

    const result = await getWeather('London');

    expect(result.days).toHaveLength(5);
  });

  it('should handle special characters in location', async () => {
    setupFetchMock(mockApiResponse);

    await getWeather('Zürich');

    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining('Z%C3%BCrich')
    );
  });

  it('should correctly map current conditions', async () => {
    setupFetchMock(mockApiResponse);

    const result = await getWeather('Brighton');

    expect(result.datetime).toBe('14:30:00');
    expect(result.temp).toBe(18.5);
    expect(result.humidity).toBe(65);
    expect(result.cloudcover).toBe(40);
    expect(result.conditions).toBe('Partly cloudy, Breezy');
    expect(result.icon).toBe('partly-cloudy-day');
    expect(result.sunrise).toBe('06:30:00');
    expect(result.sunset).toBe('20:15:00');
  });

  it('should correctly map today max/min temps from days array', async () => {
    setupFetchMock(mockApiResponse);

    const result = await getWeather('Brighton');

    expect(result.tempmax).toBe(22.3);
    expect(result.tempmin).toBe(15.1);
  });

  it('should preserve address and resolvedAddress', async () => {
    setupFetchMock(mockApiResponse);

    const result = await getWeather('Brighton');

    expect(result.address).toBe('brighton');
    expect(result.resolvedAddress).toBe('Brighton, England, United Kingdom');
  });

  it('should handle locations with ampersands', async () => {
    setupFetchMock(mockApiResponse);

    await getWeather('Trinidad & Tobago');

    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining('Trinidad%20%26%20Tobago')
    );
  });

  it('should handle locations with slashes', async () => {
    setupFetchMock(mockApiResponse);

    await getWeather('Washington D.C./USA');

    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining('Washington%20D.C.%2FUSA')
    );
  });

  it('should construct correct API URL', async () => {
    setupFetchMock(mockApiResponse);

    await getWeather('London');

    expect(fetch).toHaveBeenCalledWith(
      'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/London?unitGroup=metric&key=test-api-key&contentType=json'
    );
  });
});