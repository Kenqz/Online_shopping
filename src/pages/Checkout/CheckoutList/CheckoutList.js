import { useSelector } from 'react-redux'

import CheckoutItem from './CheckoutItem/CheckoutItem'

const CheckoutList = () => {
  const items = useSelector((state) => state.cart.items)

  return (
    <ul className="checkout__list">
      {items.map((el) => {
        return <CheckoutItem key={el.id} info={{ ...el }} />
      })}
    </ul>
  )
}

export default CheckoutList
