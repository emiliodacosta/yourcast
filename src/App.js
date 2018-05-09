import React, { Component } from 'react'
import './App.css'
import ReactPlayer from 'react-player'
import axios from 'axios'
import Time from 'react-time'

class App extends Component {

  constructor() {
    super()
    this.state = {
      weatherData: {},
      lat: 0,
      lon: 0,
      condition: '',
      preview: ''
    }
    this.getWeatherConditions = this.getWeatherConditions.bind(this)
    this.onPreviewChange = this.onPreviewChange.bind(this)
    this.getCoordsAndWeather = this.getCoordsAndWeather.bind(this)
  }

  getCoordsAndWeather() {
    axios.get('http://ip-api.com/json')
      .then(function (response) {
        console.log(response.data)
        return response.data
      })
      .then((data) => {
        this.setState({
          lat: data.lat,
          lon: data.lon
        })
        let weatherData = 'https://api.openweathermap.org/data/2.5/weather?lat=' + this.state.lat + '&lon=' + this.state.lon + '&appid=3faeb97e9db97e8a743f5dc0b1e043ef'
        weatherData = 'https://api.openweathermap.org/data/2.5/weather?q=London&appid=3faeb97e9db97e8a743f5dc0b1e043ef'
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
      })
  }

  onPreviewChange(condition, evt) {
    condition = evt.target.value
    // have div below in render function, showPreview boolean dependent on selection not being select or same as actual weather
    return <div>{this.getWeatherConditions(condition, condition)}</div>
  }

  getWeatherConditions(condition, description) {
    switch (description) {
      case 'clear sky':
        condition = 'clear sky'
        return <ReactPlayer url="https://www.youtube.com/watch?v=sYi7uEvEEmk" playing={true} />
      case 'few clouds' || 'scattered clouds' || 'broken clouds':
        condition = 'clouds'
        return <ReactPlayer url="https://www.youtube.com/watch?v=HPODefkT1Qg" playing={false} />
      case 'shower rain' || 'rain':
        condition = 'rain'
        return <ReactPlayer url="https://www.youtube.com/watch?v=46N0PgjFqyw" playing={false} />
      case 'thunderstorm':
        condition = 'thunderstorm'
        return <ReactPlayer url="https://soundcloud.com/deuxhelix/ambulance-deuxhelixrmx" playing={false} />
      case 'snow':
        condition = 'snow'
        return <ReactPlayer url="https://soundcloud.com/ibanzero/voltereta" playing={false} />
      case 'mist':
        condition = 'mist'
        return <ReactPlayer url="https://www.youtube.com/watch?v=hEm0zbJe0jY" playing={false} />
      default:
        condition = 'select'
    }
  }

  componentDidMount() {
    this.getCoordsAndWeather()
  }

  render() {
    const lat = this.state.lat
    const lon = this.state.lon
    const weather = this.state.weatherData
    const getWeatherConditions = this.getWeatherConditions
    let now = new Date()
    let condition = ''
    console.log(weather)
    return (
      <div className="App">
        <header className="App-header">
          <img src={'/android-chrome-256x256.png'} className="App-logo" alt="logo" />
          <h1 className="App-title">Yourcast</h1>
          <h3>Music for Your Forecast</h3>
          <div>
            {weather.main && weather.weather[0].description ?
              <p>{(weather.main.temp * (9 / 5) - 459.67).toFixed(0)}°F
              & {weather.weather[0].description} @ <Time value={now} format="HH:mm" />
                <br />
              </p>
              : <p> loading weather... </p>
            }
          </div>
        </header>
        <div className='map'>
          {lat !== 0 && lon !== 0 ?
            <img src={"https://maps.googleapis.com/maps/api/staticmap?center=" + lat + ",+" + lon + "&zoom=13&scale=1&size=600x300&maptype=roadmap&key=AIzaSyD_PJaoTDrgpGawta73DrtuopubfAwj0L8&format=png&visual_refresh=true"} alt="Google Map" />
            : <p> loading map... </p>
          }
        </div>
        <div className='preview'>
          <span>Preview music for other weather conditions</span>
          <select selected="select" onChange={(evt) => this.onPreviewChange(condition, evt)}>
            <option value="select">select</option>
            <option value="clear sky">clear sky</option>
            <option value="clouds">clouds</option>
            <option value="rain">rain</option>
            <option value="thunderstorm">thunderstorm</option>
            <option value="snow">snow</option>
            <option value="mist">mist</option>
          </select>
        </div>

        <div>
          {weather.main && weather.weather[0].description ?
            (condition.length > 1 && condition !== weather.weather[0].description && condition !== 'select' ?
              getWeatherConditions(condition, condition)
              : getWeatherConditions(condition, weather.weather[0].description)
            )
            : <p> loading music... </p>
          }
        </div>
      </div>
    )
  }
}

export default App

// For Celsius {(weather.main.temp - 273.15).toFixed(1)}°C&nbsp;

