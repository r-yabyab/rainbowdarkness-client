import { configureStore, 
    // applyMiddleware 
    } from '@reduxjs/toolkit'
import reducers from './reducers/index.js'
// import thunk from 'redux-thunk'

export const store = configureStore({
    reducer: reducers,
}, 
// applyMiddleware(thunk)
)