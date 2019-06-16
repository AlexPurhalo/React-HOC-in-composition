import React, { Component } from 'react'
import styled from 'styled-components';

const compose = (...rest) => x => rest.reduceRight((y, f) => f(y), x)

const Footer = styled.footer`
	background: white;
	grid-area: footer;
	display: flex;
	align-items: center;
	justify-content: center;
`

const getSongId = ({ songs, songId }) => ({
	songId: songId || (songs.length && songs[0].id),
	songs
})

const getSong = ({ songs, songId }) => songs.find(({ id }) => id === songId)

class Player extends Component {
	render() {
		const song = compose(getSong, getSongId)(this.props)
		return (
			<Footer>
				{song && <audio src={song && song.audio} controls={true}/>}
			</Footer>
		)
	}
}

export default Player