import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { read, create, remove, update } from './goalsAPI'


export const readGoals = createAsyncThunk(
    'goals/fetchGoals',
    async (_, thunkAPI) => {
        try {
            const userToken = thunkAPI.getState().auth.user.token
            const res = await read(userToken)
            return res.data.reverse()
        } catch (error) {
            const message = error.response.data.message || error.message || error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

// export const createGoal = createAsyncThunk(
//     'goals/createGoal',
//     async ({ goalData, token }, thunkAPI) => {
//         try {
//             const res = await create(goalData, token)
//             return res.data
//         } catch (error) {
//             const message = error.response.data.message || error.message || error.toString()
//             return thunkAPI.rejectWithValue(message)
//         }
//     }
// )
/////////////////////////////////////////////////////////////////
export const createGoal = createAsyncThunk(
    'goals/createGoal',
    async (goalData, thunkAPI) => {
        try {
            const userToken = thunkAPI.getState().auth.user.token
            const res = await create(goalData, userToken)
            return res.data
        } catch (error) {
            const message = error.response.data.message || error.message || error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const deleteGoal = createAsyncThunk(
    'goals/destroyGoal',
    async (goalId, thunkAPI) => {
        try {
            const userToken = thunkAPI.getState().auth.user.token
            const res = await remove(goalId, userToken)
            return res.data
        } catch (error) {
            const message = error.response.data.message || error.message || error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const updateGoal = createAsyncThunk(
    'goals/updateGoal',
    async ({ goalId, goalData }, thunkAPI) => {
        try {
            const userToken = thunkAPI.getState().auth.user.token
            const res = await update(goalId, goalData, userToken)
            return res.data
        } catch (error) {
            const message = error.response.data.message || error.message || error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)


const initialState = {
    items: [],
    message: '',
    isLoading: false,
    isSuccess: false,
    isError: false
}

export const goalsSlice = createSlice({
    name: 'goals',
    initialState,
    reducers: {
        reset: state => {
            state.message = ''
            state.isLoading = false
            state.isSuccess = false
            state.isError = false
        },
        deletedItems: state => {
            state.items = []
        }
    },
    extraReducers: build => {
        build.addCase(readGoals.pending, state => {
                state.isLoading = true
            }).addCase(readGoals.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.items = action.payload
            }).addCase(readGoals.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
        build.addCase(createGoal.pending, state => {
                state.isLoading = true
            }).addCase(createGoal.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                // state.items.unshift(action.payload)
                ////////////////////////////////////////////////
                state.items = [ action.payload, ...state.items ]
            }).addCase(createGoal.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
        build.addCase(deleteGoal.pending, state => {
                state.isLoading = true
            }).addCase(deleteGoal.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.items = state.items.filter(item => item.id !== action.payload.id )
            }).addCase(deleteGoal.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
        build.addCase(updateGoal.pending, state => {
                state.isLoading = true
            }).addCase(updateGoal.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.items = state.items.map(item => item.id === action.payload.id ? action.payload : item )
            }).addCase(updateGoal.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    }
})

export const { reset, deletedItems } = goalsSlice.actions

export const selectGoals = state => state.goals

export default goalsSlice.reducer