export const compose = (...rest) => x => {
	return rest.reduceRight((y, f) => f(y), x)
}

export const adjustTimeStr = (str) => {
	return str.replace(/(\d+):(\d+)/g, (_, p1, p2) => {
		return `${p1.length < 2 ? 0+p1 : p1}:${p2.length < 2 ? 0+p2 : p2}`
	})
}

export const preparePlayingTime = (time) => {
	return `${Math.floor(time/60)}:${Math.floor(time%60)}`
}



export const findSong = (songs, songId) => {
	return songs.find(({ id }) => id === songId)
}

export const findNextSong = (songs, song) => {
	return songs[songs.indexOf(song)+1] || songs[0]
}


export const findPrevSong = (songs, song) => {
	return songs[songs.indexOf(song)-1] || songs[songs.length-1]
}

export const prepSearchRegexp = (search) => {
	return new RegExp(search.replace(/\\/g, ''), 'i')
}

export const searchForTracks = (songs, regexp) => {
	return songs.filter(({ artist, title }) => {
		return regexp.test(artist) || regexp.test(title)
	})
}

export const computeCurrVal = (currX, fullX, fullY) => {
	return fullX && currX / fullX * fullY
	// size/fullSize = currAm/fullAm
	// size = currAm / fullAm * fullSize
}
