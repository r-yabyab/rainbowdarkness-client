const reducer = (state = 0, action) => {
    switch (action.type) {
        case 'changeStaticTime':
            return action.payload
        default:
            return state
    }
}

export default reducer