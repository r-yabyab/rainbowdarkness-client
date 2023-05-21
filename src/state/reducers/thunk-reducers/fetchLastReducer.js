// used in:
// useEffect in HomePage.js && somewhere else
// arrow fx in PutSubmission when user removes (for the HomeChart data)

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'

const RAINBOW_DARKNESS = 'https://stockshapes.net/rainbowdarkness'

const initialState = {
    loading: false,
    rainbow: [],
    error: '',
}

export const fetchLastAll = createAsyncThunk('rainbow/fetchLast', () => {
    return axios
        .get(`${RAINBOW_DARKNESS}/api/rainbows/last`)
        .then((response) => response.data)
})

const fetchLastAllSlice = createSlice({
    name: 'last',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchLastAll.pending, (state) => {
            state.loading = true
        })
        builder.addCase(fetchLastAll.fulfilled, (state, action) => {
            console.log('fetchLast.fulfilled case executed');
            state.loading = false
            state.rainbow = action.payload
            state.error = ''
        })
        builder.addCase(fetchLastAll.rejected, (state, action) => {
            state.loading = false
            state.rainbow = []
            state.error = action.error.message
        })
    }
})

export default fetchLastAllSlice.reducer