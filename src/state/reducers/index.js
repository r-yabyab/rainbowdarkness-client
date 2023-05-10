import { combineReducers } from 'redux'
// import numberReducer from './numberReducer'
import destroyerReducer from './destroyerReducer'
// import staticTimeReducer from './staticTimeReducer'
import isLoadingComponentReducer from './isLoadingComponentReducer'
import editSubmissionTriggerReducer from './editSubmissionTriggerReducer'

const reducers = combineReducers({
    // number: numberReducer,
    destroyer: destroyerReducer,
    // staticTime: staticTimeReducer,
    isLoadingComponent: isLoadingComponentReducer,
    editSubmissionTrigger: editSubmissionTriggerReducer
})

export default reducers;