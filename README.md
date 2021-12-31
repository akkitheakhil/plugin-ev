# Plug-in

App to find all the Eletric charging points near your location or user selected location.

## TECH STACK
- React Native
- Expo
- Redux Toolkit
- Tailwind CSS
- Google Maps 
  - Directions API
  - Maps SDK Android 
  - Distance Matrix API
  - Places API 

## Features completed

- Dashboard with Autocomplete Places search box
- Current location in Autocomplete search box
- List of charging station for the selected location
- Select charging station to get more information including
  - Direction
  - Distance and Time
- Option to open Google Maps for Turn-by-Turn Navigation using selected Origin location and Destination with driving mode. 

* Screenshots

![Plug-in EV](/screen.png)

## Environment Variables

The environment variables can be found and modified in the `.env-sample` file. First, rename the file to `.env`.
They come with these default values:

```bash
GOOGLE_MAPS_KEY={{YOUR_GOOGLE_MAPS API}}
```
## Try the APP now

To try the App on Android devices, you can go to release section and download the latest APK and install it in your device. 

## Build and Run on Android

Run `npm run android` to build the project. The build artifacts will be stored in the `dist/twitter-clone` directory.
