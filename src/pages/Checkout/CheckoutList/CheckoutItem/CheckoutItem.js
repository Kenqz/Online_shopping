import { useDispatch } from 'react-redux'
import { cartActions } from '../../../../store/cartSlice'

import './CheckoutItem.css'

const CheckoutItem = (props) => {
  const dispatch = useDispatch()

  const { id, imageUrl, name, price, quantity } = props.info

  const removeItemHandler = () => {
    dispatch(cartActions.removeItemFromCart(id))
  }

  const incrementItemHandler = () => {
    dispatch(cartActions.incrementItemAmount(id))
  }

  const decrementItemHandler = () => {
    dispatch(cartActions.decrementItemAmount(id))
  }

  return (
    <li className="checkoutItem">
      <img className="checkoutItem__img" src={imageUrl} alt={name} />
      <p className="checkoutItem__description">{name}</p>
      <div className="checkoutItem__quantity">
        <div
          className="checkoutItem__decrement"
          onClick={decrementItemHandler}
        ></div>
        <p>{quantity}</p>
        <div
          className="checkoutItem__increment"
          onClick={incrementItemHandler}
        ></div>
      </div>
      <p className="checkoutItem__price">${price}</p>
      <div className="checkoutItem__remove">
        <p className="checkoutItem__removeBtn" onClick={removeItemHandler}>
          &#10005;
        </p>
      </div>
    </li>
  )
}

export default CheckoutItem
