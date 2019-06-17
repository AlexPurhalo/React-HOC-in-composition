import React from 'react'
import styled from 'styled-components';

const Footer = styled.footer`
	background: white;
	grid-area: footer;
	display: flex;
	align-items: center;
	justify-content: center;
`

const Player = ({ songs, songId }, { audioRef }) => {
	console.log(audioRef)
	const song = songs.find(({ id }) => id === songId)
	return (
		<Footer>
			<audio src={song && song.audio} controls={true} ref={audioRef} />
		</Footer>
	)
}

export default React.forwardRef(Player)