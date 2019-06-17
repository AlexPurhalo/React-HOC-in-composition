import React, { Component, forwardRef } from 'react'

const withAudioPlayer = (WrappedComponent) => {
	class WithAudioPlayer extends Component {
		state = { duration: 0, currentTime: 0 }

		componentDidMount() {
			const { current: audio } = this.props.forwardedRef.audioRef

			audio.addEventListener("timeupdate", (e) => {
				this.setState({ currentTime: e.target.currentTime })
			})

			audio.onloadedmetadata = (e) => {
				this.setState({ duration: e.target.duration })
			}
		}

		componentDidUpdate(prevProps) {
			const { songId: nextSongId, isPlaying: nextIsPlaying } = this.props
			const { songId: prevSongId, isPlaying: prevIsPlaying } = prevProps
			const audio = this.props.forwardedRef.audioRef.current
			const song  = this.props.forwardedRef.songRef.current

			const isSongChanged = nextSongId !== prevSongId
			const isPlayChanged = prevIsPlaying !== nextIsPlaying
			const isPlaying 		= nextIsPlaying

			// console.log(audio.__proto__.__proto__)
			//
			if (isSongChanged) song.scrollIntoView({block: "center", behavior: "smooth"})
			if (isSongChanged) audio.play()
			if (isPlayChanged) isPlaying ? audio.play() : audio.pause()
		}

		render () {
			const {forwardedRef, ...restProps} = this.props;
			return (
				<WrappedComponent {...restProps} {...this.state} ref={forwardedRef} />
			)
		}
	}

	return forwardRef((props, ref) => {
		return <WithAudioPlayer {...props} forwardedRef={ref} />
	})
}

export default withAudioPlayer