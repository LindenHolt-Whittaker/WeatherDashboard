# Weather App

A React/Next.js weather dashboard using the Visual Crossing Weather API.

## Features

- Search functionality with Visual Crossing API integration
- Temperature unit toggle (°C/°F)
- Design matching the Figma specification
- 5-day forecast with current conditions (humidity, cloud cover, sunrise/sunset, temps)
- Current conditions with humidity, cloud cover, sunrise/sunset
- Responsive design for mobile/tablet and smaller desktop sizes
- Error handling for invalid locations and API failures

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

There is currently >85% unit test coverage across components and utilities.

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

## Development

This project was developed with assistance from Claude AI (Anthropic's Claude Sonnet 4.5 model).

This model was used as a coding assistant helping with:

- Scaffolding the initial component structure
- Discussing architectural decisions
- Troubleshooting issues
- Generating Jest unit tests
- Refactoring global CSS file to CSS modules

## Time Spent

Approximately 5 hours total.
