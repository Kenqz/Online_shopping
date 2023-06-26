import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

import './MobileMenu.css';
import crown from '../../../../assets/crown.svg';
import ShoppingBag from '../../../../assets/shopping-bag.svg';

const MobileMenu = (props) => {
  const isAuth = useSelector((state) => state.auth.isAuth);
  const items = useSelector((state) => state.cart.items);

  return (
    <div className={props.classes}>
      <div className="mobileMenu__top">
        <img className="logo" src={crown} alt="logo-crown" />

        <div onClick={props.onMenuClosing} className="menuClose">
          &#10005;
        </div>
      </div>

      <nav>
        <ul className="mobileMenu__nav">
          <li onClick={props.onMenuClosing} className="mobileMenu__item">
            <NavLink exact activeClassName="mobileMenu__item--active" to="/">
              Home
            </NavLink>
          </li>
          <li onClick={props.onMenuClosing} className="mobileMenu__item">
            <NavLink activeClassName="mobileMenu__item--active" to="/shop">
              Shop
            </NavLink>
          </li>
          <li onClick={props.onMenuClosing} className="mobileMenu__item">
            <NavLink activeClassName="mobileMenu__item--active" to="/contact">
              Contact
            </NavLink>
          </li>
          {!isAuth && (
            <li onClick={props.onMenuClosing} className="mobileMenu__item">
              <NavLink activeClassName="mobileMenu__item--active" to="/login">
                Sign In
              </NavLink>
            </li>
          )}
          {isAuth && (
            <li onClick={props.onMenuClosing} className="mobileMenu__item">
              <NavLink activeClassName="mobileMenu__item--active" to="/signout">
                Sign out
              </NavLink>
            </li>
          )}

          <li onClick={props.onMenuClosing} className="mobileMenu__item">
            <NavLink activeClassName="mobileMenu__item--active" to="/checkout">
              <p className="cart__title">
                <img
                  className="cart__shoppingBag"
                  src={ShoppingBag}
                  alt="shopping bag icon"
                />
                <span className="cart__itemsNumber">{items.length}</span>
              </p>
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default MobileMenu;
