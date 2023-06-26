import { Link } from 'react-router-dom'
import './CategoryButton.css'

const CategoryButton = (props) => {
  return (
    <Link to={`/category/${props.path}`}>
      <div className="categoryBtn">
        <p className="categoryBtn__title">{props.path}</p>
        <p>shop now</p>
      </div>
    </Link>
  )
}

export default CategoryButton
