// fires when user submits, dep for submission info (PutSubmission.js) 
// and (HomeChart.js && DataFetch.js) to refresh data

const reducer = (state = false, action) => {
    switch (action.type) {
        // case "completed":
        //     return action.payload;
        // case "finished":
        //     return action.payload;
        case "setEditSubmission":
            return action.payload;
        default:
            return state
    }
}

export default reducer;