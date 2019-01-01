# my-wx-app

This app will provide the regular or aviaiton weather for the selected station.

### Pre-requisites:

In order to use this app you will need to sign up for API keys at openweathermap.org and checkwx.com. Once you have your keys, create two environment variables named `OPEN_WX_API_KEY` and `AV_WX_API_KEY` with the values of the two keys respectively.

### How to use:

1. Run `npm start` to run the app. It will be listening on port `3000`. Browse to `localhost:3000`
2. Select the type of weather you want:
   - Regular - This will provide the regular weather for the city you enter.
   - METAR - This will provide the latest METAR (hourly observation) at the airport you enter. This takes the 4 letter ICAO identifier of the station.
   - TAF - This will provide the latest TAF (forecast) at the airport you enter. This takes the 4 letter ICAO identifier of the station.
3. Hit the blue button!

If the query was successful, you will get the results in a green box below. If not, you will get an error in a red box.
