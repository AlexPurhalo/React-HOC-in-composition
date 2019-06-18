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
			const { songId } = this.state, { songs } = this.props.data

			const actions = {
				handleSongChoice: this.handleSongChoice,
				handlePlayingState: this.handlePlayingState
			}

			const data = {
				...this.props.data,
				isPlaying: this.state.isPlaying,
				songId: songId || (songs.length && songs[0].id)
			}

			return <WrappedComponent {...{actions, data}} />
		}
	}
}

export default withActions