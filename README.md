# Weather App

A React/Next.js weather dashboard using the Visual Crossing Weather API.

## Features

- Search weather by location
- Temperature unit toggle (°C/°F)
- 5-day forecast
- Current conditions with humidity, cloud cover, sunrise/sunset
- Responsive design
- Error handling

## Setup

1. Install dependencies:
```bash
   npm install
```

2. Add your API key to `.env`:
```
   NEXT_PUBLIC_WEATHER_API_KEY=your_key_here
```

3. Run development server:
```bash
   npx nx dev weather-app
```

## Testing

To run tests:
```bash
npx nx test weather-app
```

Run with coverage report:
```bash
npx nx test weather-app --coverage
```

Run in watch mode:
```bash
npx nx test weather-app --watch
```

### Note on Console Warnings

You may see React `act(...)` warnings in the console output. These are informational messages about async state updates and do not indicate test failures. All tests verify correct behaviour through proper `waitFor()` assertions.

## Production Considerations

For a production deployment with 5,000 DAU:
- Add request caching (SWR/React Query)
- Implement rate limiting for API calls
- Add error tracking (Sentry)
- Set up CDN for static assets
- Add analytics
- Implement comprehensive E2E tests

## Time Spent

Approximately 5 hours total.
