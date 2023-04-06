import { combineReducers } from 'redux'
// import numberReducer from './numberReducer'
import destroyerReducer from './destroyerReducer'

const reducers = combineReducers({
    // number: numberReducer,
    destroyer: destroyerReducer
})

export default reducers;