import React, { forwardRef, Fragment } from 'react'
import styled from 'styled-components'
import { findNextSong, findPrevSong, findSong } from '../utils'

const PlayerButton = styled.button`
	background-color: white;
	border: none;
	&:focus { outline: 0 };
	cursor: pointer;
`

const PlayButton = styled(PlayerButton)`
	width: 40px;
	height: 40px;
	background-image: url(${
	({ isPlaying }) =>
		isPlaying ? 'play-btn-black.png' : 'pause-btn-black.png'
	});
	background-size: cover;
`

const NextTrackButton = styled(PlayerButton)`
	background-image: url(next-track.png);
	background-size: cover;
	width: 43px;
  height: 31px;
  margin-left: 15px;
`

const PrevTrackButton = styled(PlayerButton)`
	background-image: url(prev-track.png);
	background-size: cover;
	width: 43px;
  height: 31px;
  margin-right: 15px;
`

const PlayerNav = ({ data, actions }, ref) => {
	const { isPlaying, songs, songId } = data
	const { handlePlayingState, handleSongChoice } = actions
	const { audioRef, playBtn, } = ref
	const song = findSong(songs, songId)
	const prevSong = findPrevSong(songs, song)
	const nextSong = findNextSong(songs, song)
	return (
		<Fragment>
			<audio src={song && song.audio} ref={audioRef}  />
			{prevSong && (
				<PrevTrackButton onClick={() => handleSongChoice(prevSong.id, true)}/>
			)}
			<PlayButton
				ref={playBtn}
				autoFocus isPlaying={!isPlaying}
				onClick={() => handlePlayingState(!isPlaying)}
			/>
			{nextSong && (
				<NextTrackButton onClick={() => handleSongChoice(nextSong.id, true)}/>
			)}
		</Fragment>
	)
}

export default forwardRef(PlayerNav)