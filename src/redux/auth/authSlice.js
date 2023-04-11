import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    email: '',
    isLoggedIn: false
  },
  reducers: {
    setEmail: (state, action) => {
      state.email = action.payload
    },
    setLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload
    }
  }
})

export const { setEmail, setLoggedIn } = authSlice.actions

export default authSlice.reducer
