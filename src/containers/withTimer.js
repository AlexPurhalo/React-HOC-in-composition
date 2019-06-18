import React, { Component, forwardRef } from 'react'
import { computeCurrVal } from '../utils'


const withTimer = (WrappedComponent) => {
	class WithTimer extends Component {
		state = { duration: 0, currentTime: 0 }

		handleCurrTimeUpdate = (e) => {
			const bar = this.props.forwardedRef.progressBarRef.current
			const audio = this.props.forwardedRef.audioRef.current
			const playBtn = this.props.forwardedRef.playBtn.current
			const mouseX = e.pageX - bar.offsetLeft
			audio.currentTime = computeCurrVal(mouseX, bar.offsetWidth, this.state.duration)
			playBtn.focus()
		}

		componentDidMount() {
			const bar   = this.props.forwardedRef.progressBarRef.current
			const audio = this.props.forwardedRef.audioRef.current

			this.setState({ barSize: bar.offsetWidth })

			audio.addEventListener("timeupdate", (e) => {
				this.setState({ currentTime: e.target.currentTime })
			})

			audio.onloadedmetadata = (e) => {
				this.setState({ duration: e.target.duration })
			}
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
		<WithTimer {...{...props, forwardedRef: ref}} />
	))
}

export default withTimer
