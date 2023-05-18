// for data that only needs to be loaded once on page visit

import { getLoadRecent } from "../action-creators/index"

const RAINBOW_DARKNESS = 'https://stockshapes.net/rainbowdarkness'

const reducer = () => async (dispatch, getState) => {
    const response = await fetch(`${RAINBOW_DARKNESS}/api/rainbows/last`)
    const json = await response.json()

    if (response.ok) {
        dispatch(getLoadRecent(json))
    }

}

export default reducer;