import React, { Component, forwardRef } from 'react'

const computeBarWidth = (bar) => bar ? parseInt(getComputedStyle(bar).width) : 0

const withAudioPlayer = (WrappedComponent) => {
	class WithAudioPlayer extends Component {
		state = { duration: 0, currentTime: 0, barSize: 0}

		handleCurrTimeUpdate = (e) => {
			const bar = this.props.forwardedRef.progressBarRef.current
			const audio = this.props.forwardedRef.audioRef.current
			const playBtn = this.props.forwardedRef.playBtn.current
			const fullSize = computeBarWidth(bar)
			const mouseX = e.pageX - bar.offsetLeft
			audio.currentTime = mouseX / fullSize * this.state.duration
			playBtn.focus()
		}

		componentDidMount() {
			const bar   = this.props.forwardedRef.progressBarRef.current
			const audio = this.props.forwardedRef.audioRef.current

			this.setState({ barSize: computeBarWidth(bar) })

			audio.addEventListener("timeupdate", (e) => {
				this.setState({ currentTime: e.target.currentTime })
			})

			audio.onloadedmetadata = (e) => {
				this.setState({ duration: e.target.duration })
			}
		}

		componentDidUpdate(prevProps) {
			// TODO: handle "audio.onended" action
			// 		 	to update the playing state and run the next song
			const { songId: nextSongId, isPlaying: nextIsPlaying } = this.props
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

		render () {
			const { forwardedRef, ...restProps } = this.props

			return (
				<WrappedComponent {...{
					...restProps,
					...this.state,
					ref: forwardedRef,
					handleCurrTimeUpdate: this.handleCurrTimeUpdate
				}} />
			)
		}
	}

	return forwardRef((props, ref) => (
		<WithAudioPlayer {...{...props, forwardedRef: ref}} />
	))
}

export default withAudioPlayer

// TODO:
//  1. "barSize" is temporary saved to the "state" because of
//  	 the bug described in the step 3;
//  1. Currently has a bug emerging while resetting the window size,
//     state keeps holding the previous size;
//  3. Remove "barSize" from the "state" and compute it
//		 in the child component, after figuring out the bug
//		 based on width disappearing after song pausing;