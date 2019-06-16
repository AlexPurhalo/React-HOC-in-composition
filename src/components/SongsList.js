import React from 'react'
import styled from 'styled-components'

const ListItem = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	max-width: 180px;
	text-align: center;
	margin: 30px 0;
	&:hover { cursor: pointer } 
`

const Picture = styled.div`
	width: 180px;
	height: 180px;
	display: flex;
	align-items: center;
	justify-content: center;
	background-image: url(${({ picture }) => picture});
	background-size: cover;
	&:hover { opacity: 0.7; }
`

const PlayButton = styled.div`
	width: 60px;
	height: 60px;
	&:hover {
		cursor: pointer;
		background-image: url("/play-button-arrowhead.png");
		background-size: cover;
	}
`

const ArtistTitle = styled.div`
	margin: 5px 0 2px;
	color: #887575;
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

const SongTitle = styled.div`
	color: #a91919a6;
`
const SongsList = ({ songs, song, isPlaying }) => (
	<ContentList id="content">
		{songs && songs.map(({ picture, title, artist}, i) => (
			<ListItem key={i}>
				<div>
					<Picture picture={picture}>
						<PlayButton />
					</Picture>
					<ArtistTitle>{artist}</ArtistTitle>
					<SongTitle>{title}</SongTitle>
				</div>
			</ListItem>
		))}
	</ContentList>
)

export default SongsList
