import { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

import Item from '../Item/Item'
import './ItemList.css'

const ItemList = (props) => {
  const { pathName } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathName])

  const categoryName =
    props.category.charAt(0).toUpperCase() + props.category.slice(1)

  return (
    <ul className="shopItemList">
      <h2 className="shopItemList__heading">
        <Link to={`/category/${props.category.toLowerCase()}#top`}>
          <span>{categoryName}</span>
        </Link>
      </h2>
      <div className={`shopItemList__inner ${props.categoryItemList}`}>
        {props.items.map((el) => (
          <Item
            key={el.id}
            id={el.id}
            imageUrl={el.imageUrl}
            name={el.name}
            price={el.price}
          />
        ))}
      </div>
    </ul>
  )
}

export default ItemList
