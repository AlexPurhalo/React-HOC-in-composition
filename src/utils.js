export const compose = (...rest) => x => rest.reduceRight((y, f) => f(y), x)

export const adjustTimeStr = (str) => str
	.replace(/(\d+):(\d+)/g, (_, p1, p2) =>
		`${p1.length < 2 ? 0+p1 : p1}:${p2.length < 2 ? 0+p2 : p2}`)

export const preparePlayingTime = (time) =>
	`${Math.floor(time/60)}:${Math.floor(time%60)}`


export const findSong = (songs, songId) => songs.find(({ id }) => id === songId)

export const findNextSong = (songs, song) => songs[songs.indexOf(song)+1]

export const findPrevSong = (songs, song) => songs[songs.indexOf(song)-1]


export const prepSearchRegexp = (search) =>
	new RegExp(search.replace(/\\/g, ''), 'i')

export const searchForTracks = (songs, regexp) =>
	songs.filter(({ artist, title }) => regexp.test(artist) || regexp.test(title))

export const computeCurrVal = (currX, fullX, fullY) => {
	// size/fullSize = currAm/fullAm
	// size = currAm / fullAm * fullSize
	return fullX && currX / fullX * fullY
}
