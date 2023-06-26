import { createSlice } from '@reduxjs/toolkit'

const cartSlice = createSlice({
  name: 'cart',
  initialState: { items: [], isItemAdded: false },
  reducers: {
    addItemToCart(state, action) {
      const id = action.payload.id

      for (let i = 0; i < state.items.length; i++) {
        if (state.items[i].id === id) {
          ++state.items[i].quantity
          localStorage.removeItem('orders')
          localStorage.setItem('orders', JSON.stringify(state.items))
          return
        }
      }

      state.items.push(action.payload)
      localStorage.removeItem('orders')
      localStorage.setItem('orders', JSON.stringify(state.items))

      state.isItemAdded = true
    },
    incrementItemAmount(state, action) {
      const id = action.payload

      for (let i = 0; i < state.items.length; i++) {
        if (state.items[i].id === id) {
          ++state.items[i].quantity
        }
      }

      localStorage.removeItem('orders')
      localStorage.setItem('orders', JSON.stringify(state.items))
    },
    decrementItemAmount(state, action) {
      const id = action.payload

      for (let i = 0; i < state.items.length; i++) {
        if (state.items[i].id === id) {
          --state.items[i].quantity

          if (state.items[i].quantity === 0) {
            state.items.splice(i, 1)
          }
        }
      }

      localStorage.removeItem('orders')
      localStorage.setItem('orders', JSON.stringify(state.items))
    },
    removeItemFromCart(state, action) {
      const id = action.payload

      for (let i = 0; i < state.items.length; i++) {
        if (state.items[i].id === id) {
          state.items.splice(i, 1)
          localStorage.removeItem('orders')
          localStorage.setItem('orders', JSON.stringify(state.items))
          return
        }
      }
    },
    resetIsItemAdded(state) {
      state.isItemAdded = false
    },

    replaceItems(state, action) {
      if (action.payload.length === 0) {
        state.items = action.payload
        return
      }
      let itemsArr = [...action.payload]
      state.items = itemsArr
    },
  },
})

export const cartActions = cartSlice.actions
export default cartSlice
