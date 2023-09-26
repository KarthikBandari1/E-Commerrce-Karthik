import Header from '../Header'
import CartListView from '../CartListView'

import CartContext from '../../context/CartContext'
import EmptyCartView from '../EmptyCartView'

import './index.css'

const Cart = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList, removeAllCartItems} = value
      const showEmptyView = cartList.length === 0
      let totalAmount = 0

      cartList.forEach(each => {
        totalAmount += each.price * each.quantity
      })

      return (
        <>
          <Header />
          <div className="cart-container">
            {showEmptyView ? (
              <EmptyCartView />
            ) : (
              <div className="cart-content-container">
                <h1 className="cart-heading">My Cart</h1>
                <button
                  data-testid="remove"
                  type="button"
                  onClick={removeAllCartItems}
                >
                  Remove All
                </button>
                <CartListView />
                <div>
                  <h1>
                    Order Total: <span>Rs {totalAmount}/-</span>
                  </h1>
                  <p>{cartList.length} items in Cart</p>
                  <button type="button">Checkout</button>
                </div>
              </div>
            )}
          </div>
        </>
      )
    }}
  </CartContext.Consumer>
)
export default Cart
