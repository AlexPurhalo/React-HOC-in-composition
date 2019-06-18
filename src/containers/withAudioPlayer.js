import React, { Component, forwardRef } from 'react'
import { computeBarWidth } from '../utils'

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

		componentDidUpdate(prevProps, prevState) {
			console.log(prevState)
			// TODO: handle "audio.onended" action
			// 		 	to update the playing state and run the next song
			const { songId: nextSongId, isPlaying: nextIsPlaying } = this.props.data
			const { songId: prevSongId, isPlaying: prevIsPlaying } = prevProps

			const audio   = this.props.forwardedRef.audioRef.current
			const song    = this.props.forwardedRef.songRef.current
			const playBtn = this.props.forwardedRef.playBtn.current

			const isSongChanged = song && nextSongId !== prevSongId
			const isPlayChanged = prevIsPlaying !== nextIsPlaying
			const isPlaying 		= nextIsPlaying
			console.log(isPlaying)
			if (isSongChanged) audio.play()
			if (isSongChanged) playBtn.focus()
			if (isSongChanged) song.scrollIntoView({ block: "center", behavior: "smooth" })
			if (isPlayChanged) isPlaying ? audio.play() : audio.pause()
		}

		render () {
			const data = {...this.props.data, ...this.state}
			const nextActions = { handleCurrTimeUpdate: this.handleCurrTimeUpdate }
			const actions = {...this.props.actions, ...nextActions }
			const ref = this.props.forwardedRef
			return <WrappedComponent {...{data, actions, ref}} />
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