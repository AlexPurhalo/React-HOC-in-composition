import React, { Component, forwardRef } from 'react'
import {computeCurrVal} from "../utils"


const withVolume = (WrappedComponent) => {
	class WithVolume extends Component {
		state = { volume: 1 }

		handleVolumeSize = (e) => {
			const bar = this.props.forwardedRef.volumeBar.current
			const mouseX = e.pageX - bar.offsetLeft
			const volume = computeCurrVal(mouseX, bar.offsetWidth, 1)

			this.setState({ volume }, () => {
				this.props.forwardedRef.audioRef.current.volume = volume
			})
		}

		render() {
			const actions = {
				...this.props.actions,
				handleVolumeSize: this.handleVolumeSize
			}

			const data = {...this.props.data, ...this.state}
			const ref = this.props.forwardedRef

			return <WrappedComponent {...{actions, data, ref}} />
		}
	}

	return forwardRef((props, ref) => (
		<WithVolume {...{...props, forwardedRef: ref}} />
	))
}

export default withVolume