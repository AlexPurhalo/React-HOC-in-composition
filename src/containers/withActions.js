import React, {Component} from 'react'

const withActions = (WrappedComponent) => {
	return class extends Component {
		state = { songId: null, isPlaying: false }

		audioRef = React.createRef()
		songRef = React.createRef()

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

			const ref = {
				audioRef: this.audioRef,
				songRef: this.songRef
			}

			return (
				<WrappedComponent {...{...this.props, ...this.state, ...actions, ref}} />
			)
		}
	}
}

export default withActions