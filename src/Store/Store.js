import {configureStore} from '@reduxjs/toolkit'
import {watchReducer} from '../GlobalState/CreateSlice'


export const store = configureStore({
    reducer:{
     watchReducer,
    }
})