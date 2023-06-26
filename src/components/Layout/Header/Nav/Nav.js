import { NavLink, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signOut, getAuth } from 'firebase/auth';
import { authActions } from '../../../../store/authSlice';

import './Nav.css';

const Nav = (props) => {
  const isAuth = useSelector((state) => state.auth.isAuth);
  const dispatch = useDispatch();
  const auth = getAuth();
  const history = useHistory();

  const logoutUser = () => {
    dispatch(authActions.logout());
    localStorage.clear();
    signOut(auth);
    history.push('/');
  };

  return (
    <nav className="nav">
      <ul className={`${props.classNav ? props.classNav : ''} nav__ul`}>
        <li className={props.classLi}>
          <NavLink
            activeClassName={`${!props.classNav && 'nav__li--active'}`}
            to="/shop">
            Shop
          </NavLink>
        </li>
        <li className={props.classLi}>
          <NavLink
            activeClassName={`${!props.classNav && 'nav__li--active'}`}
            to="/contact">
            Contact
          </NavLink>
        </li>
        {!isAuth && (
          <li className={props.classLi}>
            <NavLink
              activeClassName={`${!props.classNav && 'nav__li--active'}`}
              to="/login">
              Sign In
            </NavLink>
          </li>
        )}
        {isAuth && (
          <li className={`${props.classLi} nav__li`} onClick={logoutUser}>
            Logout
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Nav;
