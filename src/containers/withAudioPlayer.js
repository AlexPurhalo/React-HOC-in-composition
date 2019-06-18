import React, { Component, forwardRef } from 'react'


const withAudioPlayer = (WrappedComponent) => {
	class WithPlayer extends Component {
		state = { songId: null, isPlaying: false, search: '' }

		handleTracksSearch = (search) => {
			this.setState({ search })
		}

		handleSongChoice = (songId, isPlaying) => {
			this.setState({ songId, isPlaying }, () => {
				const btn = this.props.forwardedRef.playBtn.current
				const song = this.props.forwardedRef.songRef.current
				const audio = this.props.forwardedRef.audioRef.current

				btn.focus()
				song && song.scrollIntoView({ block: "center", behavior: "smooth" })
				audio[isPlaying ? 'play' : 'pause']()
			})
		}

		handlePlayingState = (isPlaying) => {
			this.setState({ isPlaying }, () => {
				this.props.forwardedRef.audioRef.current[isPlaying ? 'play' : 'pause']()
			})
		}

		render() {
			console.log(this.props.forwardedRef.playBtn.current)
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