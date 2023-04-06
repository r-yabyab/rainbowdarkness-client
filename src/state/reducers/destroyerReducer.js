const reducer = (state = false, action) => {
    switch (action.type) {
        case "completed":
            return action.payload;
        case "finished":
            return action.payload;
        case "set":
            return action.payload;
        default:
            return state
    }
}

export default reducer;