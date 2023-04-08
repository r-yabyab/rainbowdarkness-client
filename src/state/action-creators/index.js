
// export const destroyer = (completion) => {
//     return (dispatch) => {
//         dispatch({
//             type: "completed",
//             payload: completion
//         })
//     }
// }

// export const falseDestroyer = (completion) => {
//     return (dispatch) => {
//         dispatch({
//             type: "finished",
//             payload: completion
//         })
//     }
// }

export const setDestroyer = (completion) => {
    return (dispatch) => {
        dispatch({
            type: "set",
            payload: completion
        })
    }
}

export const setStaticTime = (time) => {
    return (dispatch) => {
        dispatch({
            type: 'changeStaticTime',
            payload: time
        })
    }
}

// export const positiveNumber = (num) => {
//     return (dispatch) => {
//         dispatch({
//             type: "positive",
//             payload: num
//         })
//     }
// }

// export const negativeNumber = (num) => {
//     return (dispatch) => {
//         dispatch({
//             type: 'negative',
//             payload: num
//         })
//     }
// }

// // use as setNumber
// export const setNumber = (num) => {
//     return (dispatch) => {
//         dispatch({
//             type: 'set',
//             payload: num
//         })
//     }
// }