import CategoryButton from './CategoryButton/CategoryButton'
import './Home.css'

const Home = () => {
  return (
    <>
      <div className="homepage__categoryType">
        <div className="homepage__category homepage__hats">
          <CategoryButton path="hats" />
        </div>
        <div className="homepage__category homepage__jackets">
          <CategoryButton path="jackets" />
        </div>
        <div className="homepage__category homepage__sneakers">
          <CategoryButton path="sneakers" />
        </div>
      </div>
      <div className="homepage__categoryGender">
        <div className="homepage__category homepage__womens">
          <CategoryButton path="womens" />
        </div>
        <div className="homepage__category homepage__mens">
          <CategoryButton path="mens" />
        </div>
      </div>
    </>
  )
}

export default Home
