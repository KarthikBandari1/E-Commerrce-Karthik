import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  incrementCartItemQuantity = product => {
    this.addCartItem(product)
  }

  decrementCartItemQuantity = (quantity, id) => {
    if (quantity > 1) {
      console.log('dec clicked')
      const {cartList} = this.state
      const ObjToDecQuantity = cartList.filter(each => each.id === id)
      const updatedData = cartList.filter(each => each.id !== id)
      const q = ObjToDecQuantity[0].quantity
      const ObjToAdd = {...ObjToDecQuantity[0], quantity: q - 1}
      this.setState({cartList: [...updatedData, ObjToAdd]})
    } else {
      this.removeCartItem(id)
    }
  }

  addCartItem = product => {
    const {cartList} = this.state
    let includes = false
    let q = product.quantity
    cartList.forEach(each => {
      if (each.id === product.id) {
        includes = true
        q = each.quantity
      }
    })
    if (includes) {
      const updated = cartList.filter(each => each.id !== product.id)
      const latest = {...product, quantity: q + 1}
      this.setState({cartList: [...updated, latest]})
    } else {
      this.setState(prevState => ({
        cartList: [...prevState.cartList, product],
      }))
    }
  }

  removeCartItem = id => {
    const {cartList} = this.state
    const updatedList = cartList.filter(each => each.id !== id)
    this.setState({cartList: updatedList})
  }

  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  render() {
    const {cartList} = this.state

    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          removeAllCartItems: this.removeAllCartItems,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/products" component={Products} />
          <ProtectedRoute
            exact
            path="/products/:id"
            component={ProductItemDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
