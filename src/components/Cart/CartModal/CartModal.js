import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

import CartItem from '../CartItem/CartItem'
import './CartModal.css'

const CartModal = (props) => {
  const cartItems = useSelector((state) => state.cart.items)
  const isLoggedIn = useSelector((state) => state.auth.isAuth)

  return (
    <div className="cartModal__inner">
      {cartItems.length === 0 && (
        <p className="cartModal__message">Cart is empty!</p>
      )}
      {cartItems.length !== 0 && (
        <>
          <ul className="cartModal__list">
            <p></p>
            {cartItems.map((el) => {
              return <CartItem key={el.id} info={{ ...el }} />
            })}
          </ul>
          <Link to="/checkout">
            <button
              disabled={!isLoggedIn}
              onClick={props.onModalClosing}
              className={`checkoutBtn ${
                isLoggedIn ? '' : 'checkoutBtn--disabled'
              }`}
            >
              Go to checkout
            </button>
          </Link>
        </>
      )}
    </div>
  )
}

export default CartModal
