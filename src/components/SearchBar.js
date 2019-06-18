import React from 'react'

import styled from 'styled-components'

const Header = styled.header`
	background: #fff6f3;
	grid-area: header;
	display: flex;
	align-items: center;
	justify-content: center;
	text-align: center;
`

const Input = styled.input`
	height: 95%;
	width: 70%;
	font-size: 25px;
	border: solid 2px #e25f5fa1;
	border-bottom: solid 2px inherit;
	text-align: center;
	&:focus { outline: 0; };
	::placeholder {
		opacity: 0.3 
	}
`

const SearchBar = ({ data: { search }, actions: { handleTracksSearch }}) => (
	<Header>
		<Input
			value={search}
			type="text"
			placeholder="Start typing for tracks"
			onChange={e => handleTracksSearch(e.target.value)}
		/>
	</Header>
)

export default SearchBar