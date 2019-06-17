import React     from 'react'
import styled    from 'styled-components'
import Player    from './Player'
import SongsList from './SongsList'
import SearchBar from './SearchBar'

const Wrapper = styled.section`
  color: #333;
  background: #e25f5fa1;
  display: grid;
  grid-template-areas:
          "header"
          "content"
          "footer";
  grid-template-rows: 60px 10fr 60px;
  grid-template-columns: 1fr;
  grid-gap: 2px;
  height: 100vh;
  margin: 0;
`

const prepareSongId = (songs, songId) => songId || (songs.length && songs[0].id)

const preparePlayingTime = (time) => {
	const minutes = Math.floor(time/60)
	const seconds = Math.floor(time%60)
	return `${minutes}:${seconds}`.replace(/^(\d):(\d+)/, `0$1:$2`)
}

const App = (props, ref) => {
	const songId 			= prepareSongId(props.songs, props.songId)
	const currentTime = preparePlayingTime(props.currentTime)
	const duration 		= preparePlayingTime(props.duration)
	const nextProps 	= {...props, songId, currentTime, duration}
	return (
		<Wrapper>
			<SearchBar {...nextProps}					  />
			<SongsList {...nextProps} ref={ref} />
			<Player    {...nextProps} ref={ref} />
		</Wrapper>
	)
}

export default React.forwardRef(App)