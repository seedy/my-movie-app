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

Runs the app in development mode and should open [http://localhost:3000/](http://localhost:3000/).\
In case it doesn't properly handle opening the app, go to [http://localhost:3000/](http://localhost:3000/) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

# Assessment synthesis

Here are some thoughts and points I'd like to highlight. 

I permitted myself to give my opinion fully, with no intent to criticize anything other than my work. 

I wish you a good review.

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

I didn't store movie details inside the application, which means they are fetched each time the Details screen is opened. In a real application context, I expect we may want regular updates regarding ratings for instance.

I am even a bit more reluctant towards using Redux coupled with API requests' status. The more you have state management logic in your app, the more you have to work on it to make sure data is fresh.

I think there are better solutions than relying on Redux's global storage to improve the user experience nowadays, such as Websockets, GraphQl, etc.

## Why not using Axios

For the same reasons I avoided Redux, I feel Axios is a big library and I had very few use cases. Fetch API does the job.

## Time spent

**10 hours**

## Extra

### List items animation

I animated the images in the movies list on hover. 

Touch seems to work properly with this animation when simulating mobile layout. I already had implemented a similar feature in another project, so I know I could alo work with onClick instead.

### Dialog for detailed screen

I moved the detailed screen inside a Dialog, I thought it looked prettier this way.

I wanted to find a way to nicely display the backdrop image element, without blank spaces in the rest of the page.

### Theming and dark mode

I love implementing dark mode whenever I can. So I took some extra time to add the feature. By default, if the browser has not setting regarding dark mode, it is set by default.

User can toggle a button to switch between dark and light modes.

## Room for improvements

### API image sizes

I am not so proud of my handling of the different image sizes offered by the API. I think a more deep study of responsive coupled with image sizes would help optimize the rendering.

### Image backdrop

I had some issues with the image backdrop when displaying a mobile layout: most of the time, I either had to stretch the backdrop image or repeat it to make sure it took the whole screen. I really wanted my backdrop to be fullscreen on mobile, out of personal taste, I guess.

I thought about using a linear-gradient for instance, but I didn't take much time to dig in that way. I ended up repeating the image when needed, as it gives minimal visual differences.

### Lists layout

I went for a minimal layout with a few icons. I think I could add more, with extra features

### Translations

I could have implemented a "switch to French/English" feature.

It would be fairly easy to integrate a translation framework, such as I18next. It would require replacing plain text by translation variables.

The movie API already handles language query params for movie titles and informations.

### Infinite list or multiple pages for movies List

I didn't implement fetch of multiple pages for the movies list, simply because I wanted to focus on the design, rather than on pagination.

That's a big subject, which would have required more work regarding how I fetched the data.

I think it was not expected, so I didn't push further that way.

### Data storage

I didn't give a lot of credit to data storage management here. I must admit I could have spent a lot more time on that part.