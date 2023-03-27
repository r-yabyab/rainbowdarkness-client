// initial value on page load
const reducer = (state = null, action) => {
    switch (action.type) {
        case "negative":
            return state + action.payload
        case "positive":
            return state - action.payload
        // use as setNumber
        case 'set':
            return action.payload
        default:
            return state
    }
}

export default reducer;