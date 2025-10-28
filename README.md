# Frontend Exercise

![image 1](https://github.com/echo724/notion2md/assets/78376735/6b880ad1-3ff2-4cdd-8d06-ff708314772d)

### Objective

Using a NX monorepo, TypeScript, React and Next.js your task is to build a Weather App.

### Brief

Your assignment is to build a Weather App using the [Visual Crossing Weather API](https://www.visualcrossing.com/resources/documentation/weather-api/timeline-weather-api/). We are looking for a solution that is functionally complete, not pixel-perfect but should look as close [this design document](https://www.figma.com/file/FNdVsOUJA53CWMW9mnraYk/Weather-App?type=design&node-id=0%3A1&t=FPsFSmGIgDaH48F6-1) as possible.

Fork this branch and then design, organise, test, and document your code using the scenario of it being deployed to production and be used by a user base of 5,000 daily active users.

### Tasks

You have complete freedom over how and how long you want to spend to deliver the following requirements:

- On first load, the profile should show the weather for a specific place.
- Users can for the weather of a location from user input.
- Users can see relevant weather information based on their search.
- Handle the case of no data being available for a search.

[Learn more about this workspace setup and its capabilities](https://nx.dev/nx-api/next?utm_source=nx_project&amp;utm_medium=readme&amp;utm_campaign=nx_projects) or run `npx nx graph` to visually explore what was created. Now, let's get you up to speed!

## Run tasks

To run the dev server for your app, use:

```sh
npx nx dev weather-app
```

To create a production bundle:

```sh
npx nx build weather-app
```

To see all available targets to run for a project, run:

```sh
npx nx show project weather-app
```
