import React from 'react'
import styled from 'styled-components'
import {
	compose,
	preparePlayingTime,
	computeCurrVal,
	findNextSong,
	findPrevSong,
	findSong ,
	adjustTimeStr
} from '../utils'

const Footer = styled.footer`
	background: white;
	grid-area: footer;
	display: flex;
	align-items: center;
	justify-content: center;
`

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

const DurationSection = styled.section`
	font-size: 20px;
	margin: 0 20px;
`

const ProgressBar = styled.div`
	width: 50%;
	height: 15px;
	background-color: black;
	cursor: pointer;
`

const ActiveProgressBar = styled.div`
	width: ${({ width }) => width}px;
	height: 100%;
	background-color: #7abedd;
`

const VolumeImg = styled.div`
	width: 20px;
	height: 20px;
	background-image: url(volume.png);
	background-size: cover;
	margin: 0 10px;
	cursor: pointer;
`

const VolumeBar = styled.div`
	width: 100px;
	height: 10px;
	background-color: black;
	cursor: pointer;
`
const VolumeInnerBar = styled.div`
	width: ${({ width }) => width}px;
	height: 100%;
	background-color: #7abedd;
`


const Player = ({ data, actions }, ref) => {
	const { currentTime, duration, isPlaying, songs, songId, volume } = data
	const { handlePlayingState, handleSongChoice, handleCurrTimeUpdate, handleVolumeSize } = actions
	const { audioRef, progressBarRef, playBtn, volumeBar } = ref
	const barSize = progressBarRef.current ? progressBarRef.current.offsetWidth : 0
	const volSize = volumeBar.current ? volumeBar.current.offsetWidth : 0
	const song = findSong(songs, songId), prevSong = findPrevSong(songs, song), nextSong = findNextSong(songs, song)
	const currBarWidth = computeCurrVal(currentTime, duration, barSize)
	const currTimeStr = compose(adjustTimeStr, preparePlayingTime)(currentTime)
	const durationStr = compose(adjustTimeStr, preparePlayingTime)(duration)
	const currVolumeWidth = computeCurrVal(volume, 1, volSize)
	return (
		<Footer>
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
			<DurationSection>{currTimeStr}</DurationSection>
			<ProgressBar onClick={e => handleCurrTimeUpdate(e, barSize)} ref={progressBarRef}>
				<ActiveProgressBar width={currBarWidth}/>
			</ProgressBar>
			<DurationSection>{durationStr}</DurationSection>
			<VolumeImg />
			<VolumeBar onClick={e => handleVolumeSize(e)} ref={volumeBar}>
				<VolumeInnerBar width={currVolumeWidth}/>
			</VolumeBar>
		</Footer>
	)
}

export default React.forwardRef(Player)
