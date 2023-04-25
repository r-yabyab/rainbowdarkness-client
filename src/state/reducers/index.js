import { combineReducers } from 'redux'
// import numberReducer from './numberReducer'
import destroyerReducer from './destroyerReducer'
// import staticTimeReducer from './staticTimeReducer'
import isLoadingComponentReducer from './isLoadingComponentReducer'

const reducers = combineReducers({
    // number: numberReducer,
    destroyer: destroyerReducer,
    // staticTime: staticTimeReducer,
    isLoadingComponent: isLoadingComponentReducer
})

export default reducers;