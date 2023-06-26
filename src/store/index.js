import { configureStore } from '@reduxjs/toolkit'

import cartSlice from './cartSlice'
import authSlice from './authSlice'
import productsSlice from './productsSlice'

const store = configureStore({
  reducer: {
    cart: cartSlice.reducer,
    auth: authSlice.reducer,
    products: productsSlice.reducer,
  },
})

export default store
