import React, { Component } from 'react'
import './App.css'
import { Player, SongsList, SearchBar } from './components'

class App extends Component {
  state = {
    songs: [],
    song: null,
    isPlaying: false
  }

  componentDidMount() {
    fetch('/songs.json')
      .then(response => response.json())
      .then(json => json)
      .then(songs => this.setState({songs}))
  }

  render() {
    return (
      <div id="container">
        <SearchBar {...this.state} />
        <SongsList {...this.state} />
        <Player    {...this.state} />
      </div>
    )
  }
}

export default App
