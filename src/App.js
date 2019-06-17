import App             from './components/App'
import withSongs       from './containers/withSongs'
import withActions     from './containers/withActions'
import withAudioPlayer from './containers/withAudioPlayer'
// import withLogs				 from './containers/withLogs'
import { compose } 		 from './utils'

export default compose(withSongs, withActions, withAudioPlayer)(App)
///
