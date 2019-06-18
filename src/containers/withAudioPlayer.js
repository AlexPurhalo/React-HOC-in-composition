import React, { Component, forwardRef } from 'react'

const withAudioPlayer = (WrappedComponent) => {
	class WithPlayer extends Component {
		state = { songId: null, isPlaying: false, search: '' }

		handleTracksSearch = (search) => {
			this.setState({ search })
		}

		handleSongChoice = (songId, isPlaying) => {
			this.setState({ songId, isPlaying })
		}

		handlePlayingState = (isPlaying) => {
			this.setState({ isPlaying })
		}

		componentDidUpdate(prevProps, prevState) {
			// TODO: handle "audio.onended" action
			// 		 	to update the playing state and run the next song
			const { songId: nextSongId, isPlaying: nextIsPlaying } = this.state
			const { songId: prevSongId, isPlaying: prevIsPlaying } = prevProps

			const audio   = this.props.forwardedRef.audioRef.current
			const song    = this.props.forwardedRef.songRef.current
			const playBtn = this.props.forwardedRef.playBtn.current

			const isSongChanged = song && nextSongId !== prevSongId
			const isPlayChanged = prevIsPlaying !== nextIsPlaying
			const isPlaying 		= nextIsPlaying

			if (isSongChanged) audio.play()
			if (isSongChanged) playBtn.focus()
			if (isSongChanged) song.scrollIntoView({ block: "center", behavior: "smooth" })
			if (isPlayChanged) isPlaying ? audio.play() : audio.pause()
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