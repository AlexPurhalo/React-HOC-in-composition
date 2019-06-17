import React from 'react'
import styled from 'styled-components';

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
	background-image url(next-track.png);
	background-size: cover;
	width: 43px;
  height: 31px;
  margin-left: 15px;
`

const PrevTrackButton = styled(PlayerButton)`
	background-image url(prev-track.png);
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
	height: 10px;
	background-color: black;
`

const ActiveProgressBar = styled.div`
	width: ${({ width }) => width}px;
	height: 10px;
	background-color: #7abedd;
`

const preparePlayingTime = (time) => {
	const minutes = Math.floor(time/60)
	const seconds = Math.floor(time%60)
	return `${minutes}:${seconds}`.replace(/^(\d):(\d+)/, `0$1:$2`)
}

const computeBarWidth = ({ current: bar }) => bar ? getComputedStyle(bar).width : 0

const Player = ({ currentTime, duration, isPlaying, songs, songId, handlePlayingState, handleSongChoice }, { audioRef, progressBarRef, playBtn }) => {
	const song = songs.find(({ id }) => id === songId)
	const songIdx = songs.indexOf(song)
	const prevSong = songs[songIdx-1]
	const nextSong = songs[songIdx+1]
	const currBarWidth = currentTime * parseInt(computeBarWidth(progressBarRef)) / duration
	return (
		<Footer>
			<audio src={song && song.audio} ref={audioRef}  />
			{prevSong && (
				<PrevTrackButton onClick={() => handleSongChoice(prevSong.id, true)}/>
			)}
			<PlayButton ref={playBtn}  autoFocus isPlaying={!isPlaying} onClick={() => handlePlayingState(!isPlaying)} />
			{nextSong && (
				<NextTrackButton onClick={() => handleSongChoice(nextSong.id, true)}/>
			)}
			<DurationSection>{preparePlayingTime(currentTime)}</DurationSection>
			<ProgressBar ref={progressBarRef}>
				<ActiveProgressBar width={currBarWidth}/>
			</ProgressBar>
			<DurationSection>{preparePlayingTime(duration)}</DurationSection>
		</Footer>
	)
}

export default React.forwardRef(Player)
