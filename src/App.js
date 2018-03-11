import React, { Component } from 'react'
import './App.css'
import ReactPlayer from 'react-player'
import axios from 'axios'

class App extends Component {

  constructor() {
    super()
    this.state = {
      weatherData: {},
      lat: 0,
      lon: 0
    }
  }

  getWeather = ( {coords} ) => {
    this.setState({
      lat: coords.latitude,
      lon: coords.longitude
    })
    let weatherData = 'http://api.openweathermap.org/data/2.5/weather?lat=' + this.state.lat + '&lon=' + coords.longitude + '&appid=3faeb97e9db97e8a743f5dc0b1e043ef'
    // weatherData = 'http://api.openweathermap.org/data/2.5/weather?q=London&appid=3faeb97e9db97e8a743f5dc0b1e043ef'
    return axios.get(weatherData)
      .then(function (response) {
        console.log(response)
        return response.data
      })
      .then(weather => {
        this.setState({
          weatherData: weather
        })
      })
  }

  getCoordsAndWeather() {
    return navigator.geolocation.getCurrentPosition(this.getWeather, console.error)
  }

  componentDidMount() {
    this.getCoordsAndWeather()
  }

  render() {
    const lat = this.state.lat
    const lon = this.state.lon
    const weather = this.state.weatherData
    console.log(weather)
    return (
      <div className="App">
        <header className="App-header">
          <img src={'/android-chrome-256x256.png'} className="App-logo" alt="logo" />
          <h1 className="App-title">Yourcast</h1>
          <h3>Music for Your Forecast</h3>
          <div>


            {weather.main && weather.weather[0].description ?
              <p> {weather.weather[0].description.split(' ')[0].charAt(0).toUpperCase() + weather.weather[0].description.slice(1)}
                <br />
                {(weather.main.temp * (9 / 5) - 459.67).toFixed(0)}°F ~&nbsp;{(weather.main.temp - 273.15).toFixed(1)}°C
              </p>
              : <p> loading weather... </p>
            }

            {weather.main && weather.weather[0].description.includes('clear') ?
              <p> clear
              </p>
              : <p> loading weather... </p>
            }

            {weather.main && weather.weather[0].description.includes('clouds') ?
              <p> clouds
              </p>
              : <p> loading weather... </p>
            }

            {weather.main && weather.weather[0].description.includes('rain') ?
              <p> rain
              </p>
              : <p> loading weather... </p>
            }

            {weather.main && weather.weather[0].description.includes('thunder') ?
              <p> thunderstorm
              </p>
              : <p> loading weather... </p>
            }


            {weather.main && weather.weather[0].description.includes('snow') ?
              <p> snow
              </p>
              : <p> loading weather... </p>
            }

            {weather.main && weather.weather[0].description.includes('mist') ?
              <p> mist
              </p>
              : <p> loading weather... </p>
            }

          </div>
        </header>
        <div>
          {lat !== 0 && lon !== 0 ?
            <img src={"https://maps.googleapis.com/maps/api/staticmap?center=" + lat + ",+" + lon + "&zoom=13&scale=1&size=600x300&maptype=roadmap&key=AIzaSyD_PJaoTDrgpGawta73DrtuopubfAwj0L8&format=png&visual_refresh=true"} alt="Google Map" />
            : <p> loading map... </p>
          }
        </div>
        <div>
          <ReactPlayer url="https://soundcloud.com/as-you-like-it/max-graef-b2b-glenn-astro-ayli" playing={false} />
        </div>
      </div>
    )
  }
}

export default App
