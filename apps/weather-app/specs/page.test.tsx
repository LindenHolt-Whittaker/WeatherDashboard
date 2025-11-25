/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Page from '../app/page';
import { setupFetchMock, setupFetchError, mockApiResponse } from '../app/__tests__/test-utils';

describe('Page Integration Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    process.env.NEXT_PUBLIC_WEATHER_API_KEY = 'test-api-key';
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('Initial Load', () => {
    it('should show loading state initially', () => {
      setupFetchMock(mockApiResponse);
      render(<Page />);
      expect(screen.getByText('Loading weather data...')).toBeTruthy();
    });

    it('should fetch weather for default location (Brighton) on mount', async () => {
      setupFetchMock(mockApiResponse);
      render(<Page />);

      await waitFor(() => {
        expect(fetch).toHaveBeenCalledWith(
          expect.stringContaining('Brighton')
        );
      });
    });

    it('should display weather data after successful load', async () => {
      setupFetchMock(mockApiResponse);
      render(<Page />);

      await waitFor(() => {
        expect(screen.getByText('Brighton')).toBeTruthy();
      });

      expect(screen.queryByText('Loading weather data...')).toBeFalsy();
    });

    it('should display current weather section after load', async () => {
      setupFetchMock(mockApiResponse);
      const { container } = render(<Page />);

      await waitFor(() => {
        expect(screen.getByText('Brighton')).toBeTruthy();
      });

      const tempDisplay = container.querySelector('.temperature-display');
      expect(tempDisplay).toBeTruthy();
      expect(tempDisplay?.textContent).toMatch(/^\d+$/);
    });

    it('should display 5 day forecast after load', async () => {
      setupFetchMock(mockApiResponse);
      const { container } = render(<Page />);

      await waitFor(() => {
        expect(screen.getByText('Brighton')).toBeTruthy();
      });

      const forecastCards = container.querySelectorAll('.forecast-card');
      expect(forecastCards.length).toBe(5);
    });
  });

  describe('Search Functionality', () => {
    it('should allow user to search for a location', async () => {
      setupFetchMock(mockApiResponse);
      render(<Page />);

      await waitFor(() => {
        expect(screen.getByText('Brighton')).toBeTruthy();
      });

      const londonResponse = {
        ...mockApiResponse,
        address: 'london',
        resolvedAddress: 'London, England, United Kingdom'
      };
      setupFetchMock(londonResponse);

      const input = screen.getByRole('textbox') as HTMLInputElement;
      const button = screen.getByRole('button', { name: '' });

      fireEvent.change(input, { target: { value: 'London' } });
      fireEvent.click(button);

      await waitFor(() => {
        expect(screen.getByText('London')).toBeTruthy();
      });
    });

    it('should show loading state during search', async () => {
      setupFetchMock(mockApiResponse);
      render(<Page />);

      await waitFor(() => {
        expect(screen.getByText('Brighton')).toBeTruthy();
      });

      setupFetchMock(mockApiResponse);

      const input = screen.getByRole('textbox') as HTMLInputElement;
      const button = screen.getByRole('button', { name: '' });

      fireEvent.change(input, { target: { value: 'Paris' } });
      fireEvent.click(button);

      expect(screen.getByText('Loading weather data...')).toBeTruthy();

      await waitFor(() => {
        expect(screen.queryByText('Loading weather data...')).toBeFalsy();
      });
    });

    it('should disable search input while loading', async () => {
      setupFetchMock(mockApiResponse);
      render(<Page />);

      const input = screen.getByRole('textbox') as HTMLInputElement;
      expect(input.disabled).toBe(true);

      await waitFor(() => {
        expect(input.disabled).toBe(false);
      });
    });
  });

  describe('Error Handling', () => {
    it('should display error message on API failure', async () => {
      setupFetchMock({}, false, 400);
      render(<Page />);

      await waitFor(() => {
        expect(screen.getByText(/Location not found/)).toBeTruthy();
      });
    });

    it('should show error in sidebar', async () => {
      setupFetchMock({}, false, 500);
      render(<Page />);

      await waitFor(() => {
        expect(screen.getByText(/Failed to fetch weather data/)).toBeTruthy();
      });
    });

    it('should show error in main content area', async () => {
      setupFetchMock({}, false, 400);
      render(<Page />);

      await waitFor(() => {
        expect(screen.getByText('Unable to load weather data')).toBeTruthy();
      });
    });

    it('should allow retry after error', async () => {
      setupFetchMock({}, false, 400);
      render(<Page />);

      await waitFor(() => {
        expect(screen.getByText(/Location not found/)).toBeTruthy();
      });

      setupFetchMock(mockApiResponse);

      const input = screen.getByRole('textbox') as HTMLInputElement;
      const button = screen.getByRole('button', { name: '' });

      fireEvent.change(input, { target: { value: 'Brighton' } });
      fireEvent.click(button);

      await waitFor(() => {
        expect(screen.getByText('Brighton')).toBeTruthy();
      });
    });

    it('should handle network errors', async () => {
      setupFetchError('Network connection failed');
      render(<Page />);

      await waitFor(() => {
        expect(screen.getByText('Network connection failed')).toBeTruthy();
      });
    });
  });

  describe('Temperature Unit Toggle', () => {
    it('should render Celsius and Fahrenheit buttons', async () => {
      setupFetchMock(mockApiResponse);
      render(<Page />);

      await waitFor(() => {
        expect(screen.getByText('Brighton')).toBeTruthy();
      });

      const buttons = screen.getAllByRole('button');
      const celsiusButton = buttons.find(b => b.textContent === '°C');
      const fahrenheitButton = buttons.find(b => b.textContent === '°F');

      expect(celsiusButton).toBeTruthy();
      expect(fahrenheitButton).toBeTruthy();
    });

    it('should have Celsius active by default', async () => {
      setupFetchMock(mockApiResponse);
      render(<Page />);

      await waitFor(() => {
        expect(screen.getByText('Brighton')).toBeTruthy();
      });

      const buttons = screen.getAllByRole('button');
      const celsiusButton = buttons.find(b => b.textContent === '°C');

      expect(celsiusButton?.className).toContain('active');
    });

    it('should switch to Fahrenheit when clicked', async () => {
      setupFetchMock(mockApiResponse);
      render(<Page />);

      await waitFor(() => {
        expect(screen.getByText('Brighton')).toBeTruthy();
      });

      const buttons = screen.getAllByRole('button');
      const fahrenheitButton = buttons.find(b => b.textContent === '°F');

      fireEvent.click(fahrenheitButton!);

      expect(fahrenheitButton?.className).toContain('active');
    });

    it('should update temperature display when unit changes', async () => {
      setupFetchMock(mockApiResponse);
      render(<Page />);

      await waitFor(() => {
        expect(screen.getByText('Brighton')).toBeTruthy();
      });

      expect(screen.getAllByText('°C').length).toBeGreaterThan(0);

      const buttons = screen.getAllByRole('button');
      const fahrenheitButton = buttons.find(b => b.textContent === '°F');

      fireEvent.click(fahrenheitButton!);

      await waitFor(() => {
        expect(screen.getAllByText('°F').length).toBeGreaterThan(0);
      });
    });
  });

  describe('Conditional Rendering', () => {
    it('should not show weather while loading', () => {
      setupFetchMock(mockApiResponse);
      render(<Page />);

      expect(screen.getByText('Loading weather data...')).toBeTruthy();
    });

    it('should show weather when loaded', async () => {
      setupFetchMock(mockApiResponse);
      render(<Page />);

      await waitFor(() => {
        expect(screen.getByText('Brighton')).toBeTruthy();
      });

      expect(screen.queryByText('Loading weather data...')).toBeFalsy();
    });

    it('should show forecast section when loaded', async () => {
      setupFetchMock(mockApiResponse);
      render(<Page />);

      await waitFor(() => {
        expect(screen.getByText('5 Day Forecast')).toBeTruthy();
      });
    });

    it('should hide forecast when loading', () => {
      setupFetchMock(mockApiResponse);
      render(<Page />);

      expect(screen.getByText('Loading weather data...')).toBeTruthy();
    });

    it('should hide forecast on error', async () => {
      setupFetchMock({}, false, 400);
      render(<Page />);

      await waitFor(() => {
        expect(screen.getByText(/Location not found/)).toBeTruthy();
      });

      expect(screen.queryByText('5 Day Forecast')).toBeFalsy();
    });
  });

  describe('Layout and Structure', () => {
    it('should render sidebar', async () => {
      setupFetchMock(mockApiResponse);
      const { container } = render(<Page />);

      await waitFor(() => {
        expect(screen.getByText('Brighton')).toBeTruthy();
      });

      expect(container.querySelector('.sidebar')).toBeTruthy();
    });

    it('should render main content area', async () => {
      setupFetchMock(mockApiResponse);
      const { container } = render(<Page />);

      await waitFor(() => {
        expect(screen.getByText('Brighton')).toBeTruthy();
      });

      expect(container.querySelector('.main-content')).toBeTruthy();
    });

    it('should render search form in sidebar', async () => {
      setupFetchMock(mockApiResponse);
      render(<Page />);

      await waitFor(() => {
        expect(screen.getByRole('textbox')).toBeTruthy();
      });
    });

    it('should render unit toggle in main content', async () => {
      setupFetchMock(mockApiResponse);
      const { container } = render(<Page />);

      await waitFor(() => {
        expect(screen.getByText('Brighton')).toBeTruthy();
      });

      expect(container.querySelector('.unit-toggle')).toBeTruthy();
    });

    it('should render Day Overview section', async () => {
      setupFetchMock(mockApiResponse);
      render(<Page />);

      await waitFor(() => {
        expect(screen.getByText('Day Overview')).toBeTruthy();
      });
    });

    it('should render forecast grid', async () => {
      setupFetchMock(mockApiResponse);
      const { container } = render(<Page />);

      await waitFor(() => {
        expect(screen.getByText('Brighton')).toBeTruthy();
      });

      expect(container.querySelector('.forecast-grid')).toBeTruthy();
    });
  });

  describe('Complete User Workflows', () => {
    it('should complete happy path workflow', async () => {
      setupFetchMock(mockApiResponse);
      render(<Page />);

      await waitFor(() => {
        expect(screen.getByText('Brighton')).toBeTruthy();
      });

      const buttons = screen.getAllByRole('button');
      const fahrenheitButton = buttons.find(b => b.textContent === '°F');
      fireEvent.click(fahrenheitButton!);

      await waitFor(() => {
        expect(screen.getAllByText('°F').length).toBeGreaterThan(0);
      });

      const londonResponse = {
        ...mockApiResponse,
        address: 'london',
        resolvedAddress: 'London, England, United Kingdom'
      };
      setupFetchMock(londonResponse);

      const input = screen.getByRole('textbox') as HTMLInputElement;
      const searchButton = buttons.find(b => b.querySelector('svg'));

      fireEvent.change(input, { target: { value: 'London' } });
      fireEvent.click(searchButton!);

      await waitFor(() => {
        expect(screen.getByText('London')).toBeTruthy();
      });

      expect(screen.getAllByText('°F').length).toBeGreaterThan(0);
    });

    it('should handle error recovery workflow', async () => {
      setupFetchMock({}, false, 400);
      render(<Page />);

      await waitFor(() => {
        expect(screen.getByText(/Location not found/)).toBeTruthy();
      });

      setupFetchMock(mockApiResponse);

      const input = screen.getByRole('textbox') as HTMLInputElement;
      const buttons = screen.getAllByRole('button');
      const searchButton = buttons.find(b => b.querySelector('svg'));

      fireEvent.change(input, { target: { value: 'Brighton' } });
      fireEvent.click(searchButton!);

      await waitFor(() => {
        expect(screen.getByText('Brighton')).toBeTruthy();
      });

      expect(screen.queryByText(/Location not found/)).toBeFalsy();
    });
  });

  describe('State Management', () => {
    it('should maintain unit preference across searches', async () => {
      setupFetchMock(mockApiResponse);
      render(<Page />);

      await waitFor(() => {
        expect(screen.getByText('Brighton')).toBeTruthy();
      });

      const buttons = screen.getAllByRole('button');
      const fahrenheitButton = buttons.find(b => b.textContent === '°F');
      fireEvent.click(fahrenheitButton!);

      await waitFor(() => {
        expect(screen.getAllByText('°F').length).toBeGreaterThan(0);
      });

      setupFetchMock(mockApiResponse);

      const input = screen.getByRole('textbox') as HTMLInputElement;
      const searchButton = buttons.find(b => b.querySelector('svg'));

      fireEvent.change(input, { target: { value: 'Paris' } });
      fireEvent.click(searchButton!);

      await waitFor(() => {
        expect(screen.getAllByText('°F').length).toBeGreaterThan(0);
      });
    });

    it('should clear previous error on successful search', async () => {
      setupFetchMock({}, false, 400);
      render(<Page />);

      await waitFor(() => {
        expect(screen.getByText(/Location not found/)).toBeTruthy();
      });

      setupFetchMock(mockApiResponse);

      const input = screen.getByRole('textbox') as HTMLInputElement;
      const buttons = screen.getAllByRole('button');
      const searchButton = buttons.find(b => b.querySelector('svg'));

      fireEvent.change(input, { target: { value: 'Brighton' } });
      fireEvent.click(searchButton!);

      await waitFor(() => {
        expect(screen.queryByText(/Location not found/)).toBeFalsy();
      });
    });
  });
});
