import { createSlice } from '@reduxjs/toolkit'

export const counterSlice = createSlice({
    name: 'counter',
    initialState: 0,
    reducers:{
        icrement: (state) => state + 1,
        decrement: (state) => state - 1,
    }

})