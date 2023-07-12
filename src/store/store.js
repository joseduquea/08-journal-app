import { configureStore } from '@reduxjs/toolkit'
import { authSlice } from './Auth'
import { journalSlice } from './journal'

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    journal: journalSlice.reducer
  },
})
