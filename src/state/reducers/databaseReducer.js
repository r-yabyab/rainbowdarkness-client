import { setLoadRecent } from "../action-creators/databaseActions"

const RAINBOW_DARKNESS = 'https://stockshapes.net/rainbowdarkness'

export const loadRecent = () => async (dispatch, getState) => {
    const response = await fetch(`${RAINBOW_DARKNESS}/api/rainbows/last`)
    const json = await response.json()

    if (response.ok) {
        dispatch(setLoadRecent(json))
    }

}