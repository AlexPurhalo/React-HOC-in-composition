import React, { Component } from 'react'
import './App.css'

class App extends Component {
  state = {
    songs: []
  }

  componentDidMount() {
    fetch('/songs.json')
      .then(response => response.json())
      .then(json => json)
      .then(songs => this.setState({songs}))
  }

  render() {
    const { songs } = this.state
    return (
      <div id="container">
        <header id="pageHeader">
          <input/>
        </header>
        <nav id="nav">
          <ul>
            {songs.map(({ title, artist }) => (
              <li>{artist} - {title}</li>
            ))}
          </ul>
        </nav>
        <div id="content">
          {songs.map(({ picture, title, artist}, i) => (
            <div key={i}>
              <div>
                <img className="picture" src={picture} alt=""/>
                <div>{artist}???????????</div>
                <div>{title}</div>
              </div>
            </div>
          ))}
        </div>
        <footer>Footer</footer>
      </div>
    )
  }
}
export default App

