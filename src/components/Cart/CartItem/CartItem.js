import './CartItem.css'

const CartItem = (props) => {
  const { imageUrl, name, quantity, price } = props.info

  return (
    <li className="cartItem">
      <img className="cartItem__img" src={imageUrl} alt={name} />
      <div className="cartItem__info">
        <p>{name}</p>
        <p>
          {quantity} x ${price}
        </p>
      </div>
    </li>
  )
}

export default CartItem
