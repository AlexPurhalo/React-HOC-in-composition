import React, {Component} from 'react'

const withActions = (WrappedComponent) => {
	return class extends Component {
		state= { songId: null, isPlaying: false, duration: 0, currentTime: 0 }

		audioRef = React.createRef()
		songRef = React.createRef()

		handleSongChoice = (songId, isPlaying) => {
			this.setState({ songId, isPlaying })
		}

		handlePlayingState = (isPlaying) => {
			this.setState({ isPlaying })
		}

		componentDidMount() {
			const { current: audio } = this.audioRef

			audio.addEventListener("timeupdate", (e) => {
				this.setState({ currentTime: e.target.currentTime })
			})

			audio.onloadedmetadata = (e) => {
				this.setState({ duration: e.target.duration })
			}
		}

		componentDidUpdate(prevProps, prevState) {
			const { songId: nextSongId, isPlaying: nextIsPlaying } = this.state
			const { songId: prevSongId, isPlaying: prevIsPlaying } = prevState
			const { current: audio 					 										} = this.audioRef
			const { current: song 					 										} = this.songRef

			const isSongChanged = nextSongId !== prevSongId
			const isPlayChanged = prevIsPlaying !== nextIsPlaying
			const isPlaying 		= nextIsPlaying

			// console.log(audio.__proto__.__proto__)

			if (isSongChanged) song.scrollIntoView()
			if (isSongChanged) audio.play()
			if (isPlayChanged) isPlaying ? audio.play() : audio.pause()
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