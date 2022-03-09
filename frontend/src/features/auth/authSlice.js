import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { 
    register, 
    login,
    getUser, 
    // logout 
} from './authAPI'


export const registerUser = createAsyncThunk(
    'auth/registerUser',
    async (userData, thunkAPI) => {
        try {
            const response = await register(userData)
            // console.log(response)
            return response.data.message // return <Payload>
        } catch (error) {
            // console.log(error.response.data.message)
            // console.log(error.message)
            // console.log(error.toString())
            const message = error.response.data.message || error.message || error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async (userData, thunkAPI) => {
        try {
            const res = await login(userData)
            // console.log(res)
            /*****************************************************/
            localStorage.setItem('user', JSON.stringify(res.data))
            /*****************************************************/
            return res.data // return <Payload>
        } catch (error) {
            const message = error.response.data.message || error.message || error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

// export const getUserData = createAsyncThunk(
//     'auth/getUserData',
//     async (token, thunkAPI) => {
//         try {
//             const res = await getUser(token)
//             // console.log(res)
//             return res.data // return <Payload>
//         } catch (error) {
//             const message = error.response.data.message || error.message || error.toString()
//             return thunkAPI.rejectWithValue(message)
//         }
//     }
// )
////////////////////////////////////////////////////
export const getUserData = createAsyncThunk(
    'auth/getUserData',
    async (_, thunkAPI) => {
        try {

            // const userToken = JSON.parse(localStorage.getItem('user')).token
            ///////////////////////////////////////////////////////////////////
            const userToken = thunkAPI.getState().auth.user.token

            const res = await getUser(userToken)
            return res.data // return <Payload>
        } catch (error) {
            const message = error.response.data.message || error.message || error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

/* Solution1: Failed */
// export const logoutUser = createAsyncThunk(
//     'auth/logoutUser',
//     async (token, thunkAPI) => {
//         try {
//             const res = await logout(token)
//             // console.log(res)
//             /********************************/
//             localStorage.clear()
//             /* OR */
//             // localStorage.removeItem('user')
//             /********************************/
//             return res.data.message // return <Payload>
//         } catch (error) {
//             const message = error.response.data.message || error.message || error.toString()
//             return thunkAPI.rejectWithValue(message)
//         }
//     }
// )
///////////////////////////////////////////////
/* Solution2 */
// export const logoutUser = createAsyncThunk(
//     'auth/logoutUser',
//     async () => {
//         await logout()
//     }
// )


/**
 * 'window.localStorage' stores data(ex. user's token) as a <string> in browser.
 * - localStorage.setItem()
 * - localStorage.getItem()
 * - localStorage.removeItem()
 * - localStorage.clear()
 */
const user = JSON.parse(localStorage.getItem('user')) // For Reloading Page!!!
/******************************************************/

const initialState = {
    user: user ? user : null,
    message: '',
    // status: 'idle' || 'loading' || 'success' || 'error'
    isLoading: false,
    isSuccess: false,
    isError: false
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        reset: state => {
            state.message = ''
            // status: 'idle' || 'loading' || 'success' || 'error'
            state.isError = false
            state.isLoading = false
            state.isSuccess = false
        },
        /* Solution3 */
        loggedOut: state => {
            state.user = null // !!!
        }
    },
    extraReducers: builder => {
        builder.addCase(registerUser.pending, state => {
                // state.status = 'loading'
                state.isLoading = true
            }).addCase(registerUser.fulfilled, (state, action) => {
                state.message = action.payload
                // state.status = 'success'
                state.isLoading = false
                state.isSuccess = true
            }).addCase(registerUser.rejected, (state, action) => {
                state.message = action.payload
                // state.status = 'error'
                state.isLoading = false
                state.isError = true
            })
        builder.addCase(loginUser.pending, state => {
                // state.status = 'loading'
                state.isLoading = true
            }).addCase(loginUser.fulfilled, (state, action) => {
                state.user = action.payload // !!!
                // state.status = 'success'
                state.isLoading = false
                state.isSuccess = true
            }).addCase(loginUser.rejected, (state, action) => {
                state.message = action.payload
                // state.status = 'error'
                state.isLoading = false
                state.isError = true
            })
        builder.addCase(getUserData.pending, state => {
                // state.status = 'loading'
                state.isLoading = true
            }).addCase(getUserData.fulfilled, (state, action) => {
                state.user = action.payload // !!!
                // state.status = 'success'
                state.isLoading = false
                state.isSuccess = true
            }).addCase(getUserData.rejected, (state, action) => {
                state.message = action.payload
                // state.status = 'error'
                state.isLoading = false
                state.isError = true
            })
        /* Solution1: Failed */
        // builder.addCase(logoutUser.pending, state => {
        //         // state.status = 'loading'
        //         state.isLoading = true
        //     }).addCase(logoutUser.fulfilled, (state, action) => {
        //         state.user = null // !!!
        //         state.message = action.payload
        //         // state.status = 'success'
        //         state.isLoading = false
        //         state.isSuccess = true
        //     }).addCase(logoutUser.rejected, (state, action) => {
        //         state.message = action.payload            
        //         // state.status = 'error'
        //         state.isLoading = false
        //         state.isError = true
        //     })
        ///////////////////////////////////////////////////////////
        /* Solution2 */
        // builder.addCase(logoutUser.fulfilled, state => { 
        //         state.user = null // !!!
        //     })
    }
})

export const { reset, loggedOut } = authSlice.actions

export const selectAuth = state => state.auth

/* Solution3 */
export const logoutUser = () => (dispatch, getState) => {
    dispatch(loggedOut())
    /********************************/
    localStorage.clear()
    /* OR */
    // localStorage.removeItem('user')
    /********************************/
}

export default authSlice.reducer