import App         from './components/App'
import withSongs   from './containers/withSongs'
import withActions from './containers/withActions'
import { compose } from './utils'

export default compose(withSongs, withActions)(App)
