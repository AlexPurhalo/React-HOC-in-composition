import React from 'react'
import './SongsList.css'

const SongsList = ({ songs, song, isPlaying }) => (
	<div id="content">
		{songs.map(({ picture, title, artist}, i) => (
			<div key={i}>
				<div>
					<div className="picture" style={{backgroundImage: `url(${picture})`, backgroundSize: 'cover'}}>
						<div className={"play-btn"}>
						</div>
					</div>
					<div className={"song-artist"}>{artist}</div>
					<div className={"song-title"}>{title}</div>
				</div>
			</div>
		))}
	</div>
)

export default SongsList
