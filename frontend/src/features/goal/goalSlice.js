// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
// import { fetchGoals } from './goalAPI'


// const initialState = {
//     items: [],
//     item: {},
//     status: 'idle'
// }

// const fetchGoalsThunk = createAsyncThunk(
//     'goal/fetchGoals',
//     async () => {
//         return await fetchGoals() // return 'Payload(Promise)'
//     }
// )

// const goalSlice = createSlice(
//     name: 'goal',
//     initialState,
//     reducers: {
//         // someAction: (state, action) => { }
//     },
//     extraReducers: builder => {
//         builder.addCase(fetchGoalsThunk.pending, state => {
//                 state.status = 'loading'
//             }).addCase(fetchGoals.fulfilled, (state, action) => {
//                 state.status = 'idle'
//                 state.items = action.payload
//             })
//     },
// )

// // export const { someAction } = goalSlice.actions

// export const selectGoals = state => state.goal.items // <- The name of reducer from store.js

// export default goalSlice.reducer


//////////////////////////////////////////////////////////////////
// export const incrementAsync = createAsyncThunk(
//     'counter/fetchCount',
//     async (amount) => {
//         const response = await fetchCount(amount)
//         return response.data
//     },
// )
// export const counterSlice = createSlice({
//     name: 'counter',
//     initialState,
//     reducers: {
//         increment: state => state.value += 1,
//         decrement: state => state.value -= 1,
//         incrementByAmount: (state, action) => {
//             state.value += action.payload
//         },
//     },
//     extraReducers: builder => {
//     builder.addCase(incrementAsync.pending, state => {
//             state.status = 'loading' 
//         }).addCase(incrementAsync.fulfilled, (state, action) => {
//             state.status = 'idle';
//             state.value += action.payload
//         })
//     },
// })
// export const { increment, decrement, incrementByAmount } = counterSlice.actions
// export const selectCount = state => state.counter.value
// export const incrementIfOdd = amount => (dispatch, getState) => {
//     const currentValue = selectCount(getState());
//     if (currentValue % 2 === 1) {
//         dispatch(incrementByAmount(amount));
//     }
// }
// export default counterSlice.reducer;
