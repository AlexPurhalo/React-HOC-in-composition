import React, { Component } from 'react'

const withActions = (WrappedComponent) => {
	return class extends Component {
		state = { songId: null, isPlaying: false }

		handleSongChoice = (songId, isPlaying) => {
			this.setState({ songId, isPlaying })
		}

		handlePlayingState = (isPlaying) => {
			this.setState({ isPlaying })
		}

		render() {
			const actions = {
				handleSongChoice: this.handleSongChoice,
				handlePlayingState: this.handlePlayingState
			}

			return (
				<WrappedComponent {...{...this.props, ...this.state, ...actions}} />
			)
		}
	}
}

export default withActions