import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import configureStore from './store/configureStore'
import routes from './routes'

import './reset.css'
import './index.css'
import './icons/fontawesome-all'

const store = configureStore()

ReactDOM.render(<Provider store={store}>{routes}</Provider>, document.getElementById('root'))
