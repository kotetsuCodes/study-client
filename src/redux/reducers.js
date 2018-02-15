import { combineReducers } from 'redux'
import mainReducer from './main/reducer'
import scienceReducer from './science/reducer'
import instructorReducer from './instructor/reducer'
import loginReducer from './login/reducer'

const rootReducer = combineReducers({
  main: mainReducer,
  science: scienceReducer,
  instructor: instructorReducer,
  login: loginReducer,
})

export default rootReducer
