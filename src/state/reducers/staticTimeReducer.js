const reducer = (state = 0, action) => {
    switch (action.type) {
        case 'changeTimeLeft':
            return action.payload
        default:
            return state
    }
}

export default reducer