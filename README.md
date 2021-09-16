# Getting Started

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Secrets integration

Create the following file `secrets.js` under `src` folder:
```
export const API_KEY = 'yourtoken'
export const BASE_URL = 'baseurl'
```

Then replace placeholders.

## Launching the app

Start the app with [`yarn start`](#yarn-start)

### `yarn start`

Runs the app in development mode and should open [http://local.themoviedb.org:3000/](http://local.themoviedb.org:3000/).\
In case it doesn't properly handle opening the app, go to [http://local.themoviedb.org:3000/](http://local.themoviedb.org:3000/) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

# Assessment synthesis

## Github branches

I followed a Github Flow with PRs related to hypothetical features. I considered the main steps of the application's implementation where my features.

You can have a look at my PRs [here](https://github.com/seedy/my-movie-app/pulls?q=is%3Apr+is%3Aclosed)

## Libraries used

- material-ui for theming, design system, icons and components
- some eslint plugins for convenience
- lodash and ramda for some prebuilt helper functions

## Why not using Redux

For a simple and straightforward storage such as this one, I preferred using React's Context API over Redux.

I am used to Redux's patterns, but I always feel like the setup takes some time, so I preferred spending my time on other tasks.

At first, I had implemented 2 Contexts, one for each list of movies (popular movies, upcoming movies) displayed.

To handle a global storage and avoid refetching data each time the Lists screen was rendered, I reworked my Context and moved it to the root of the app.

I am even a bit more reluctant in using Redux coupled with API requests. The more you have state management logic in your app, the more you have to work on it to make sure data is fresh.

I think there are better solutions than relying on Redux's global storage to improve the user experience nowadays, such as Websockets, GraphQl, etc.

## Why not using Axios

For the same reasons I avoided Redux, I feel Axios is a big library and I had very few use cases. Fetch API does the job.

## Time spent

**10 hours**