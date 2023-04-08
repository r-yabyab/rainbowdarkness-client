import { combineReducers } from 'redux'
// import numberReducer from './numberReducer'
import destroyerReducer from './destroyerReducer'
// import staticTimeReducer from './staticTimeReducer'

const reducers = combineReducers({
    // number: numberReducer,
    destroyer: destroyerReducer,
    // staticTime: staticTimeReducer,
})

export default reducers;