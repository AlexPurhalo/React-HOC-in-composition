import React, { Component } from 'react'

import App from './components/App'

const compose = (...rest) => x => rest.reduceRight((y, f) => f(y), x)

const withSongs = (WrappedComponent) => {
  return class extends Component {
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
      return <WrappedComponent {...{...this.props, songs: this.state.songs}} />
    }
  }
}

const withActions = (WrappedComponent) => {
  return class extends Component {
    state= {
      songId: null
    }
    handleSongChoice(songId) {
      this.setState({ songId })
    }
    render() {
      return (
        <WrappedComponent {...{
          ...this.props,
          handleSongChoice: this.handleSongChoice,
          songId: this.state.songId
        }} />
      )
    }
  }
}

const withLogs = (WrappedComponent) => {
  return (props) => console.log(props) || <WrappedComponent {...props} />
}

export default compose(withSongs, withActions)(App)
