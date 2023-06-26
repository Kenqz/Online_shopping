import { createPortal } from 'react-dom'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import CartModal from './CartModal/CartModal'
import Backdrop from '../Backdrop/Backdrop'
import './Cart.css'
import { cartActions } from '../../store/cartSlice'

import ShoppingBag from '../../assets/shopping-bag.svg'

const Cart = () => {
  const [isModalShowing, setIsModalShowing] = useState(false)
  const cartItems = useSelector((state) => state.cart.items)
  const isItemAdded = useSelector((state) => state.cart.isItemAdded)

  const dispatch = useDispatch()

  useEffect(() => {
    const id = setTimeout(() => {
      dispatch(cartActions.resetIsItemAdded())
    }, 300)

    return () => clearTimeout(id)
  }, [isItemAdded, dispatch])

  const modalToggleHandler = () => {
    setIsModalShowing((prevState) => !prevState)
  }

  return (
    <div className="cart">
      <p
        className={`cart__title ${isItemAdded ? 'cart__itemAdded' : ''}`}
        onClick={modalToggleHandler}
      >
        <img
          className="cart__shoppingBag"
          src={ShoppingBag}
          alt="shopping bag icon"
        />
        <span className="cart__itemsNumber">{cartItems.length}</span>
      </p>

      {isModalShowing && (
        <div className="cart__modal">
          <CartModal onModalClosing={modalToggleHandler} />
        </div>
      )}
      {isModalShowing &&
        createPortal(
          <Backdrop onModalClosing={modalToggleHandler} />,
          document.getElementById('backdrop-root')
        )}
    </div>
  )
}

export default Cart

// na klik
