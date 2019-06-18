import React, { Component } from 'react'

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
			return <WrappedComponent {...{data: { songs: this.state.songs } }} />
		}
	}
}

export default withSongs