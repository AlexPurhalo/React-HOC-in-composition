import React, { Component, forwardRef } from 'react'


const withAudioPlayer = (WrappedComponent) => {
	class WithPlayer extends Component {
		state = { songId: null, isPlaying: false, search: '' }

		handleTracksSearch = (search) => {
			this.setState({ search })
		}

		handleSongChoice = (songId, isPlaying) => {
			this.setState({ songId, isPlaying }, () => {
				this.props.forwardedRef.playBtn.current.focus()
				this.props.forwardedRef.songRef.current.scrollIntoView({ block: "center", behavior: "smooth" })
				this.props.forwardedRef.audioRef.current[isPlaying ? 'play' : 'pause']()

			})
		}

		handlePlayingState = (isPlaying) => {
			this.setState({ isPlaying }, () => {
				this.props.forwardedRef.audioRef.current[isPlaying ? 'play' : 'pause']()
			})
		}

		render() {
			const { songId } = this.state, { songs } = this.props.data

			const actions = {
				handleSongChoice: this.handleSongChoice,
				handlePlayingState: this.handlePlayingState,
				handleTracksSearch: this.handleTracksSearch
			}

			const data = {
				...this.props.data,
				...this.state,
				songId: songId || (songs.length && songs[0].id)
			}

			const ref = this.props.forwardedRef

			return <WrappedComponent {...{actions, data, ref}} />
		}
	}

	return forwardRef((props, ref) => (
		<WithPlayer {...{...props, forwardedRef: ref}} />
	))
}

export default withAudioPlayer