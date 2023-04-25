//isLoadingComponent state

const reducer = (state = true, action) => {
    switch (action.type) {
        case "setisLoadingComponentAction":
            return action.payload;
        default:
            return state
    }
}

export default reducer