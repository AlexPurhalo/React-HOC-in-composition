import React, { forwardRef, Fragment } from 'react'
import styled from 'styled-components'
import { computeCurrVal } from '../utils'

const VolumeImg = styled.div`
	width: 20px;
	height: 20px;
	background-image: url(volume.png);
	background-size: cover;
	margin: 0 10px;
	cursor: pointer;
`

const Bar = styled.div`
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

const VolumeBar = ({ data: { volume }, actions: { handleVolumeSize } }, { volumeBar }) => {
	const volSize = volumeBar.current ? volumeBar.current.offsetWidth : 0
	const currVolumeWidth = computeCurrVal(volume, 1, volSize)
	return (
		<Fragment>
			<VolumeImg />
			<Bar onClick={e => handleVolumeSize(e)} ref={volumeBar}>
				<VolumeInnerBar width={currVolumeWidth}/>
			</Bar>
		</Fragment>
	)
}

export default forwardRef(VolumeBar)