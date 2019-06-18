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
			const { songId } = this.state, { songs } = this.props

			const actions = {
				handleSongChoice: this.handleSongChoice,
				handlePlayingState: this.handlePlayingState
			}

			return (
				<WrappedComponent {...{
					...this.props,
					...actions,
					...this.state,
					songId: songId || (songs.length && songs[0].id)
				}} />
			)
		}
	}
}

export default withActions