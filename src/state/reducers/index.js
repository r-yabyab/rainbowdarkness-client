import { combineReducers } from 'redux'
// import numberReducer from './numberReducer'
import destroyerReducer from './destroyerReducer'
// import staticTimeReducer from './staticTimeReducer'
import isLoadingComponentReducer from './isLoadingComponentReducer'
import editSubmissionTriggerReducer from './editSubmissionTriggerReducer'
import tooltipContentReducer from './tooltipContentReducer'
import fetchLastAll from './thunk-reducers/fetchLastReducer'

const reducers = combineReducers({
    // synchronous
    destroyer: destroyerReducer,
    isLoadingComponent: isLoadingComponentReducer,
    editSubmissionTrigger: editSubmissionTriggerReducer,
    tooltipContent: tooltipContentReducer,
    // async thunks
    rainbowLastAll: fetchLastAll
})

export default reducers;