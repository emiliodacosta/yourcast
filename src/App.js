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
      triggerPreview: false,
      previewCondition: ''
    }
    this.getCoordsAndWeather = this.getCoordsAndWeather.bind(this)
    this.getMusic = this.getMusic.bind(this)
    this.onPreviewChange = this.onPreviewChange.bind(this)
  }

  getCoordsAndWeather() {
    axios.get('http://ip-api.com/json')
      .then(function (response) {
        // console.log(response.data)
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
            // console.log(response)
            return response.data
          })
          .then(weather => {
            this.setState({
              weatherData: weather
            })
          })
      })
  }

  getMusic(condition) {
    switch (condition) {
      case 'Clear':
        return <ReactPlayer url='https://www.youtube.com/watch?v=sYi7uEvEEmk' playing={false} />
      case 'Clouds':
        return <ReactPlayer url='https://www.youtube.com/watch?v=HPODefkT1Qg' playing={false} />
      case 'Drizzle':
        return <ReactPlayer url='https://www.youtube.com/watch?v=4fSS36Xve4k' playing={false} />
      case 'Rain':
        return <ReactPlayer url='https://www.youtube.com/watch?v=46N0PgjFqyw' playing={false} />
      case 'Thunderstorm':
        return <ReactPlayer url='https://soundcloud.com/deuxhelix/ambulance-deuxhelixrmx' playing={false} />
      case 'Snow':
        return <ReactPlayer url='https://soundcloud.com/ibanzero/voltereta' playing={false} />
      case 'Atmosphere':
        return <ReactPlayer url='https://www.youtube.com/watch?v=hEm0zbJe0jY' playing={false} />
      default:
    }
  }

  onPreviewChange(evt) {
    let condition = evt.target.value
    this.setState({
      triggerPreview: true,
      previewCondition: condition
    })
    // have div below in render function, showPreview boolean dependent on selection not being select or same as actual weather
  }

  componentDidMount() {
    this.getCoordsAndWeather()
  }

  render() {
    const lat = this.state.lat
    const lon = this.state.lon
    const weather = this.state.weatherData
    const getMusic = this.getMusic
    const triggerPreview = this.state.triggerPreview
    const previewCondition = this.state.previewCondition
    let now = new Date()
    console.log(weather)
    return (
      <div className="App">
        <header className="App-header">
          <img src={'/android-chrome-256x256.png'} className="App-logo" alt="logo" />
          <h1 className="App-title">Yourcast</h1>
          <h3>Music for Your Forecast</h3>
          <br />
          <div>
            {weather.main && weather.weather[0].description ?
              <p>{(weather.main.temp * (9 / 5) - 459.67).toFixed(0)}°F
              & {weather.weather[0].main} {`(`}{weather.weather[0].description}{`)`} @ <Time value={now} format="HH:mm" />
                <br />
              </p>
              : <p> loading weather... </p>
            }
          </div>
        </header>
        <div className="map">
          {lat !== 0 && lon !== 0 ?
            <img src={'https://maps.googleapis.com/maps/api/staticmap?center=' + lat + ',+' + lon + '&zoom=13&scale=1&size=600x300&maptype=roadmap&key=AIzaSyD_PJaoTDrgpGawta73DrtuopubfAwj0L8&format=png&visual_refresh=true'} alt="Google Map" />
            : <p> loading map... </p>
          }
        </div>
        <br />
        <br />
        <div className="weatherTrackTitle">
            {weather.main && weather.weather[0].main ?
              <p>A Track for {weather.weather[0].main}</p>
              : null
            }
        </div>
        <br />
        <div className="weatherTrack">
          {weather.main && weather.weather[0].main ?
            getMusic(weather.weather[0].main)
            : <p> loading music... </p>
          }
        </div>
        <br />
        <br />
        <br />
        <div className="previewSelect">
          <span>Preview music for other weather conditions: </span>
          <select selected="select" onChange={(evt) => this.onPreviewChange(evt)}>
            <option value="select">select</option>
            <option value="Clear">Clear</option>
            <option value="Clouds">Clouds</option>
            <option value="Drizzle">Drizzle</option>
            <option value="Rain">Rain</option>
            <option value="Thunderstorm">Thunderstorm</option>
            <option value="Snow">Snow</option>
            <option value="Atmosphere">Mist</option>
          </select>
        </div>
        <br />
        <br />
        <div className="previewTrack">
          {triggerPreview ?
            getMusic(previewCondition)
          : null
          }
        </div>
        <br />
        <br />
      </div>
    )
  }
}

export default App

// For Celsius {(weather.main.temp - 273.15).toFixed(1)}°C&nbsp;
