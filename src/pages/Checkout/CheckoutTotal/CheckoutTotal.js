import { useSelector } from 'react-redux'

import './CheckoutTotal.css'

const CheckoutTotal = (props) => {
  const items = useSelector((state) => state.cart.items)

  return (
    <div className="checkoutTotal">
      <div className="checkoutTotal__action">
        <p className="checkoutTotal__price">
          <span>Total:</span> $
          {items.reduce((acc, el) => {
            return acc + el.price * el.quantity
          }, 0)}
        </p>
        <button className="checkout__buyBtn" onClick={props.onSubmitHandler}>
          Buy
        </button>
      </div>
    </div>
  )
}

export default CheckoutTotal
