import React, { Component } from 'react'

const withActions = (WrappedComponent) => {
	return class extends Component {
		state= {
			songId: null,
			isPlaying: false
		}
		handleSongChoice = (songId, isPlaying) => {
			this.setState({ songId, isPlaying })
		}
		render() {
			const { songId, isPlaying } = this.state
			const { songs } = this.props
			return (
				<WrappedComponent {...{
					...this.props,
					songId: songId || (songs.length && songs[0].id),
					isPlaying: isPlaying,
					handleSongChoice: this.handleSongChoice
				}} />
			)
		}
	}
}

export default withActions