import React from 'react'
import styled from 'styled-components'
import { searchForTracks } from '../utils'

const ListItem = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	max-width: 180px;
	text-align: center;
	margin: 30px 0;
	&:hover { cursor: pointer };
	&:focus {background-color: green} 
`

const Picture = styled.div`
	width: 180px;
	height: 180px;
	display: flex;
	align-items: center;
	justify-content: center;
	background-image: url(${
	({ isActive, picture }) =>
		isActive ? 'playing-song.gif' : picture
	});
	background-size: cover;
	&:hover { opacity: 0.7; }
`

const PlayButton = styled.div`
	width: 60px;
	height: 60px;
	&:hover {
		cursor: pointer;
		background-image: url(${
	({ isActive }) =>
		isActive ? 'pause-button.png' : 'play-button.png'
	});
		background-size: cover;
	}
`

const ContentList = styled.div`
	background: white;
	grid-area: content;
	display: grid;
	grid-template-columns: 1fr 1fr 1fr 1fr;
	overflow:hidden;
	overflow-y:scroll;
	justify-items: center;
`

const ArtistTitle = styled.div`
	margin: 5px 0 2px;
	color: ${({ isActive }) => isActive ? '#8cb3b9' : '#887575'};
	font-weight: ${({ isActive }) => isActive ? 900 : 400};
`

const SongTitle = styled.div`
	color: ${({ isActive }) => isActive ? '#44444480' : '#a91919a6;'}
	font-weight: ${({ isActive }) => isActive ? 900 : 400};
`

const SongsList = ({ data, actions }, ref) => {
	const { songs, songId, isPlaying, search } = data
	const { handleSongChoice } = actions
	const { songRef } = ref
	const foundSongs = searchForTracks(songs, search)
	console.log(foundSongs.length)
	return (
		<ContentList id="content">
			{foundSongs && foundSongs.map(({ id, picture, title, artist}) => {
				const isActive = isPlaying && songId === id
				return (
					<ListItem key={id} onClick={() => handleSongChoice(id, !isActive)}>
						<div ref={isActive ? songRef : null}>
							<Picture isActive={isActive} picture={picture}>
								<PlayButton isActive={isActive} />
							</Picture>
							<ArtistTitle isActive={isActive}>{artist}</ArtistTitle>
							<SongTitle isActive={isActive}>{title}</SongTitle>
						</div>
					</ListItem>
				)
			})}
		</ContentList>
	)
}

export default React.forwardRef(SongsList)
