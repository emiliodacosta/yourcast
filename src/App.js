import React, { Component } from 'react'
// import logo from './logo.svg';
import './App.css'
import ReactPlayer from 'react-player'
import getTheWeather from 'get-the-weather'

let options = {
  zip: 11385,
  DarkSkyKey: 'your key here',
  ZipCodeApiKey: `zipcodeapi.com key here`
}

getTheWeather(options).then(result => console.log(result.currently.temperature))


class App extends Component {


  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={'/android-chrome-256x256.png'} className="App-logo" alt="logo" />
          <h1 className="App-title">Yourcast</h1>
          <h3>The Playlist for Your Forecast</h3>
        </header>
        <ReactPlayer url='https://www.mixcloud.com/mantranova/mantranova-subfm-032415-10pm-midnight-pst-6am-8am-gmt/' playing={false} />
      </div>
    )
  }
}

export default App
