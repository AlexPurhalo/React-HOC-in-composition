import React, { Component } from 'react'

const withActions = (WrappedComponent) => {
	return class extends Component {
		state= {
			songId: null
		}
		handleSongChoice(songId) {
			this.setState({ songId })
		}
		render() {
			return (
				<WrappedComponent {...{
					...this.props,
					handleSongChoice: this.handleSongChoice,
					songId: this.state.songId
				}} />
			)
		}
	}
}

export default withActions