import React, { Component } from 'react'

const withActions = (WrappedComponent) => {
	return class extends Component {
		state= { songId: null, isPlaying: false }
		audioRef = React.createRef()
		songRef = React.createRef()

		handleSongChoice = (songId, isPlaying) => {
			this.setState({ songId, isPlaying })
		}

		handlePlayingState = (isPlaying) => {
			this.setState({ isPlaying })
		}

		componentDidUpdate(prevProps, prevState) {
			const { songId: nextSongId, isPlaying: nextIsPlaying } = this.state
			const { songId: prevSongId, isPlaying: prevIsPlaying } = prevState
			const { current: audio 					 										} = this.audioRef
			const { current: song 					 										} = this.songRef

			const isSongChanged = nextSongId !== prevSongId
			const isPlayChanged = prevIsPlaying !== nextIsPlaying
			const isPlaying 		= nextIsPlaying

			if (isSongChanged) song.scrollIntoView()
			if (isSongChanged) audio.play()
			if (isPlayChanged) isPlaying ? audio.play() : audio.pause()
		}

		render() {
			const { songId, isPlaying } = this.state
			const { songs } = this.props
			const { audioRef, songRef } = this
			return (
				<WrappedComponent
					{...this.props}
					songId={songId || (songs.length && songs[0].id)}
					isPlaying={isPlaying}
					handleSongChoice={this.handleSongChoice}
					handlePlayingState={this.handlePlayingState}
					ref={{audioRef, songRef}}
				/>
			)
		}
	}
}

export default withActions