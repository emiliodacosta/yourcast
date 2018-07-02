import React, { Component } from "react"
import "./App.css"
import ReactPlayer from "react-player"
import axios from "axios"
import Time from "react-time"

class App extends Component {
  constructor() {
    super()
    this.state = {
      weatherData: {},
      lat: 0,
      lon: 0,
      triggerPreview: false,
      previewCondition: ""
    }
    this.getCoordsAndWeather = this.getCoordsAndWeather.bind(this)
    this.getMusic = this.getMusic.bind(this)
    this.onPreviewChange = this.onPreviewChange.bind(this)
  }

  getWeather = ({ coords }) => {
    this.setState({
      lat: coords.latitude,
      lon: coords.longitude
    })
    // console.log("COORDS", coords.latitude, coords.longitude)
    let weatherData =
      "https://api.openweathermap.org/data/2.5/weather?lat=" +
      this.state.lat +
      "&lon=" +
      this.state.lon +
      "&appid=3faeb97e9db97e8a743f5dc0b1e043ef"
    // weatherData = 'https://api.openweathermap.org/data/2.5/weather?q=London&appid=3faeb97e9db97e8a743f5dc0b1e043ef'
    return axios
      .get(weatherData)
      .then(function(response) {
        // console.log(response)
        return response.data
      })
      .then(weather => {
        this.setState({
          weatherData: weather
        })
      })
  }

  getCoordsAndWeather() {
    return navigator.geolocation.getCurrentPosition(
      this.getWeather,
      console.error
    )
  }

  getMusic(condition) {
    switch (condition) {
      case "Clear":
        return "https://www.youtube.com/watch?v=sYi7uEvEEmk"
      case "Clouds":
        return "https://www.youtube.com/watch?v=HPODefkT1Qg"
      case "Drizzle":
        return "https://www.youtube.com/watch?v=4fSS36Xve4k"
      case "Rain":
        return "https://www.youtube.com/watch?v=46N0PgjFqyw"
      case "Thunderstorm":
        return "https://soundcloud.com/deuxhelix/ambulance-deuxhelixrmx"
      case "Snow":
        return "https://soundcloud.com/ibanzero/voltereta"
      case "Mist":
        return "https://www.youtube.com/watch?v=hEm0zbJe0jY"
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
          <img
            src={"/android-chrome-256x256.png"}
            className="App-logo"
            alt="logo"
          />
          <h1 className="App-title">Yourcast</h1>
          <h3>Music for Your Forecast</h3>
          <br />
          <div>
            {weather.main && weather.weather[0].description ? (
              <p>
                {(weather.main.temp * (9 / 5) - 459.67).toFixed(0)}°F &{" "}
                {weather.weather[0].main} @ <Time value={now} format="HH:mm" />
                <br />
              </p>
            ) : (
              <p> loading weather... </p>
            )}
          </div>
        </header>
        <div>
          {lat !== 0 && lon !== 0 ? (
            <img className="map"
              src={
                "https://maps.googleapis.com/maps/api/staticmap?center=" +
                lat +
                ",+" +
                lon +
                "&zoom=13&scale=1&size=600x300&maptype=roadmap&key=AIzaSyD_PJaoTDrgpGawta73DrtuopubfAwj0L8&format=png&visual_refresh=true"
              }
              alt="Google Map"
            />
          ) : (
            <p> loading map... </p>
          )}
        </div>
        <br />
        <br />
        <div className="weatherTrackTitle">
          {weather.main && weather.weather[0].main ? (
            <p>A Track for {weather.weather[0].main}</p>
          ) : null}
        </div>
        <br />
        <div className="weatherTrack">
          {weather.main && weather.weather[0].main ?
            <ReactPlayer
              className='react-player'
              url={getMusic(weather.weather[0].main)}
              width='100%'
              height='100%'
              playing={false}
              controls
              volume={1}
            />
          :
            <p> loading music... </p>
          }
        </div>
        <br />
        <br />
        <br />
        <div className="previewSelect">
          <span>Preview music for other weather conditions: </span>
          <br />
          <br />
          <select selected="select" onChange={evt => this.onPreviewChange(evt)}>
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
        <div className="weatherTrack">
          {triggerPreview ?
            <ReactPlayer
              className='react-player'
              url={getMusic(previewCondition)}
              width='100%'
              height='100%'
              playing={false}
              controls
              volume={1}
            />
          : null}
        </div>
        <br />
        <br />
      </div>
    )
  }
}

export default App

// For Celsius {(weather.main.temp - 273.15).toFixed(1)}°C&nbsp;
// netlify requires https

// {`(`} {weather.weather[0].description} {`)`}
