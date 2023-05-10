// fire when user posts their number,
// deps are HookMood.js (initial fire), DataFetch.js (to refetch data when user is prompted to next page)

const reducer = (state = false, action) => {
    switch (action.type) {
        // case "completed":
        //     return action.payload;
        // case "finished":
        //     return action.payload;
        case "set":
            return action.payload;
        default:
            return state
    }
}

export default reducer;