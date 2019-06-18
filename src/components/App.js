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

const App = (props, ref) => (
	<Wrapper>
		<SearchBar {...props}	/>
		<SongsList {...{...props, ref}} />
		<Player    {...{...props, ref}} />
	</Wrapper>
)

export default React.forwardRef(App)