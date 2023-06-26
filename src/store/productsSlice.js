import { createSlice } from '@reduxjs/toolkit'

const productsSlice = createSlice({
  name: 'products',
  initialState: { products: [] },
  reducers: {
    addItems(state, action) {
      state.products = action.payload
    },
  },
})

export const productsActions = productsSlice.actions
export default productsSlice
