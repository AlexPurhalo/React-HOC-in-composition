import React, { Component } from 'react'
import './Player.css'

class Player extends Component {
	render() {
		const song = this.props.song || this.props.songs[0]
		return (
			<footer>
				<audio src={song && song.audio} controls={true}/>
			</footer>
		)
	}
}

export default Player