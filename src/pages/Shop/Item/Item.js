import { useDispatch } from 'react-redux'
import { cartActions } from '../../../store/cartSlice'

import './Item.css'

const Item = (props) => {
  const dispatch = useDispatch()

  const addToCartHandler = () => {
    dispatch(
      cartActions.addItemToCart({
        id: props.id,
        imageUrl: props.imageUrl,
        name: props.name,
        price: props.price,
        quantity: 1,
      })
    )
  }

  return (
    <li className="shopItem">
      <div className="shopItem__imageSection">
        <img
          className="shopItem__image"
          src={props.imageUrl}
          alt={props.name}
        />
        <button onClick={addToCartHandler} className="shopItem__modalBtn">
          Add To Cart
        </button>
      </div>
      <div className="shopItem__info">
        <p>{props.name}</p>
        <p>${props.price}</p>
      </div>
    </li>
  )
}

export default Item
