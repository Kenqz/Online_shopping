import { Route, Switch, Redirect } from 'react-router-dom'
import { authActions } from './store/authSlice'
import { cartActions } from './store/cartSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import React, { Suspense } from 'react'

import SignIn from './pages/SignIn/SignIn'
import Loader from './components/Loader/Loader'

const Layout = React.lazy(() => import('./components/Layout/Layout'))
const Home = React.lazy(() => import('./pages/Home/Home'))
const Contact = React.lazy(() => import('./pages/Contact/Contact'))
const Checkout = React.lazy(() => import('./pages/Checkout/Checkout'))
const Shop = React.lazy(() => import('./pages/Shop/Shop'))
const Category = React.lazy(() => import('./pages/Category/Category'))
const PageNotFound = React.lazy(() => import('./pages/404/404'))

function App() {
  const dispatch = useDispatch()
  const email = localStorage.getItem('email')
  const token = localStorage.getItem('token')

  const isLoggedIn = useSelector((state) => state.auth.isAuth)

  useEffect(() => {
    if (localStorage.getItem('orders') !== null) {
      const itemsArr = JSON.parse(localStorage.getItem('orders'))
      dispatch(cartActions.replaceItems(itemsArr))
    }
  }, [dispatch])

  useEffect(() => {
    if (email && token) {
      dispatch(
        authActions.login({
          email: email,
          token: token,
        })
      )
    }
    return () => {}
  }, [email, token, dispatch])

  return (
    <Suspense fallback={<Loader />}>
      <Layout>
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/shop">
            <Shop />
          </Route>
          <Route path="/contact">
            <Contact />
          </Route>
          <Route path="/login">
            {isLoggedIn ? <Redirect to="/" /> : <SignIn />}
          </Route>
          <Route path="/checkout">
            {isLoggedIn ? <Checkout /> : <Redirect to="/" />}
          </Route>
          <Route path="/category/:type">
            <Category />
          </Route>
          <Route path="*">
            <PageNotFound />
          </Route>
        </Switch>
      </Layout>
    </Suspense>
  )
}

export default App
