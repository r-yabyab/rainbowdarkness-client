
export const positiveNumber = (num) => {
    return (dispatch) => {
        dispatch({
            type: "positive",
            payload: num
        })
    }
}

export const negativeNumber = (num) => {
    return (dispatch) => {
        dispatch({
            type: 'negative',
            payload: num
        })
    }
}

// use as setNumber
export const setNumber = (num) => {
    return (dispatch) => {
        dispatch({
            type: 'set',
            payload: num
        })
    }
}