import React, { Component } from 'react'
// import logo from './logo.svg';
import './App.css'
import ReactPlayer from 'react-player'
import axios from 'axios'

class App extends Component {

  constructor() {
    super()
    this.state = {
      weatherData: {}
    }
  }

  getWeather = ( {coords} ) => {
    const weatherData = 'http://api.openweathermap.org/data/2.5/weather?lat=' + coords.latitude + '&lon=' + coords.longitude + '&appid=3faeb97e9db97e8a743f5dc0b1e043ef'
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
//  showPosition = (position) => {
//       const coords = {
//         lat: position.coords.latitude,
//         lon: position.coords.longitude
//       }
//       // console.log('COORDS', coords)
//       this.setState({
//         lat: coords.lat,
//         lon: coords.lon
//       }, () => {
//         console.log(this.state)
//         this.getWeather()
//       })
//     }

  getCoordsAndWeather() {
    return navigator.geolocation.getCurrentPosition(this.getWeather, console.error)
  }

  componentDidMount() {
    this.getCoordsAndWeather()
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={'/android-chrome-256x256.png'} className="App-logo" alt="logo" />
          <h1 className="App-title">Yourcast</h1>
          <h3>The Playlist for Your Forecast</h3>
          <div>
            <h4>

            {this.state.weatherData.main && (this.state.weatherData.main.temp * (9 / 5) - 459.67).toFixed(0)}°F /&nbsp;
            {this.state.weatherData.main && (this.state.weatherData.main.temp - 273.15).toFixed(1)}°C

            </h4>
          </div>
        </header>
        <div>
          <img src='https://maps.googleapis.com/maps/api/staticmap?center=40.7,+-74&zoom=13&scale=1&size=600x300&maptype=roadmap&key=AIzaSyD_PJaoTDrgpGawta73DrtuopubfAwj0L8&format=png&visual_refresh=true" alt="Google Map'


           />
        </div>
        <div>
          <ReactPlayer url="https://soundcloud.com/as-you-like-it/max-graef-b2b-glenn-astro-ayli" playing={false} />
        </div>
      </div>
    )
  }
}

export default App

// src='https://maps.googleapis.com/maps/api/staticmap?center=
//           "+latlon+"&zoom=14&size=400x300&sensor=false&key=YOUR_:KEY'
