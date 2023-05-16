

export const setDestroyer = (completion) => {
    return (dispatch) => {
        dispatch({
            type: "set",
            payload: completion
        })
    }
}

export const setisLoadingComponent = (loading) => {
    return (dispatch) => {
        dispatch({
            type: 'setisLoadingComponentAction',
            payload: loading
        })
    }
}

export const setTimeLeft = (time) => {
    return (dispatch) => {
        dispatch({
            type: 'changeTimeLeft',
            payload: time
        })
    }
}

export const setEditSubmissionTrigger = (trigger) => {
    return (dispatch) => {
        dispatch({
            type: 'setEditSubmission',
            payload: trigger
        })
    }
}
