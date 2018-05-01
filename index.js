const express    = require('express');
const bodyParser = require('body-parser');
const app        = express();
const request    = require('request');
const apiKey     = 'Insert API Key here';
const avWxAPIKey = 'Insert API Key here';

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

app.get('/', function (req,res) {
  console.log(req.url);
  //console.log(req);
  res.render('index', {cityName: null, weather: null, error: null});
});

app.get('/wx', function (req,res) {
  res.render('wx', {cityName: null, weather: null, error: null});
});

app.post('/', function (req,res) {
  let city   = req.body.cityName;
  let wxType = req.body.wxType;
  if(wxType == 'METAR') {
    console.log(`Getting latest METAR for ${city}`);
    var options = {
      url: `https://api.checkwx.com/metar/${city}`,
      headers: {
        'X-API-Key': avWxAPIKey
      }
    };

    request(options, function(err, response, body) {
      let results = JSON.parse(body);
      console.log(results.data[0]);
      let metar = results.data[0]
      //res.render('wx', {cityName: null, weather: null, error: null});
      res.render('index', {cityName: city, weather: metar, error: null});
    });
  }
  else {
    console.log(`Getting Regular weather for ${city}`);
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`

    request(url, function(err, response, body) {
      if(err) {
        res.render('index', {cityName: city, error: 'Error, please try again'});
      }
      else {
        let weather = JSON.parse(body);
        if(weather.main == undefined) {
          let errorMsg = `Error: No city by the name '${city}' was found. Please check and try again!`
          res.render('index', {cityName: null, error: errorMsg});
        }
        else {
          console.log(weather.main.temp);
          console.log(weather.weather[0].description);
          let temperature    = weather.main.temp;
          let skyCondition   = weather.weather[0].description;
          let city           = weather.name;
          let countryCode    = weather.country;
          let currentWeather = `The current weather in ${city} is ${temperature} degrees Celsius with ${skyCondition}.`
          res.render('index', {cityName: city, weather: currentWeather, error: null});
        }
      }
    });
  }
});

app.listen(3000, function () {
  console.log('Listening on port 3000');
});
