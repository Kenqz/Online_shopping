import { useSelector, useDispatch } from 'react-redux'
import useHttp from '../../hooks/use-http'
import { cartActions } from '../../store/cartSlice'
import { useHistory } from 'react-router-dom'
import CheckoutList from './CheckoutList/CheckoutList'
import CheckoutTotal from './CheckoutTotal/CheckoutTotal'

import './Checkout.css'
import Loader from '../../components/Loader/Loader'

const Checkout = () => {
  const items = useSelector((state) => state.cart.items)
  const userInfo = useSelector((state) => state.auth.userInfo)
  const { sendRequest, isLoading } = useHttp()
  const dispatch = useDispatch()
  const history = useHistory()

  const checkoutSubmitHandler = async () => {
    await sendRequest({
      url: 'https://webshop-bc01e-default-rtdb.firebaseio.com/orders.json',
      method: 'POST',
      body: {
        user: userInfo.email,
        items,
      },
    })
    dispatch(cartActions.replaceItems([]))
    localStorage.removeItem('orders')
    history.push('/')
  }

  return (
    <div className="checkout">
      {items.length === 0 && (
        <p className="checkout__message">
          Nothing in the cart friend. Buy something!
        </p>
      )}

      {items.length !== 0 && (
        <>
          {isLoading && <Loader />}
          <div className="checkout__headings">
            <p className="checkout__product">Product</p>
            <p className="checkout__description">Description</p>
            <p className="checkout__quantity">Quantity</p>
            <p className="checkout__price">Price</p>
            <p className="checkout__remove">Remove</p>
          </div>
          <CheckoutList />
          <CheckoutTotal onSubmitHandler={checkoutSubmitHandler} />
        </>
      )}
    </div>
  )
}

export default Checkout
