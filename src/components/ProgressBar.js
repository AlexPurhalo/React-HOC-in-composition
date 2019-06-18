import React, { forwardRef, Fragment } from 'react'
import styled from 'styled-components'
import { adjustTimeStr, compose, computeCurrVal, preparePlayingTime } from "../utils"

const DurationSection = styled.section`
	font-size: 20px;
	margin: 0 20px;
`

const Bar = styled.div`
	width: 50%;
	height: 15px;
	background-color: black;
	cursor: pointer;
`

const ActiveBar = styled.div`
	width: ${({ width }) => width}px;
	height: 100%;
	background-color: #7abedd;
`

const ProgressBar = ({ data, actions }, ref) => {
	const { currentTime, duration } = data
	const { handleCurrTimeUpdate  } = actions
	const { progressBarRef 				} = ref

	const barSize 		 = progressBarRef.current ? progressBarRef.current.offsetWidth : 0
	const currBarWidth = computeCurrVal(currentTime, duration, barSize)
	const currTimeStr  = compose(adjustTimeStr, preparePlayingTime)(currentTime)
	const durationStr  = compose(adjustTimeStr, preparePlayingTime)(duration)

	return (
		<Fragment>
			<DurationSection>{currTimeStr}</DurationSection>
			<Bar onClick={e => handleCurrTimeUpdate(e)} ref={progressBarRef}>
				<ActiveBar width={currBarWidth}/>
			</Bar>
			<DurationSection>{durationStr}</DurationSection>
		</Fragment>
	)
}

export default forwardRef(ProgressBar)