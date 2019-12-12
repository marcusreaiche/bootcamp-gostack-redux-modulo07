import React from "react";
import { MdRemoveCircleOutline, MdAddCircleOutline, MdDelete } from "react-icons/md";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { FaShoppingCart, FaSpinner } from "react-icons/fa";

import * as CartActions from "../../store/modules/cart/actions";
import { Container, ProductTable, Total, EmptyShoppingCart, LoadingProduct } from "./styles";
import { formatPrice } from "../../util/format";

function Cart({ cart, total, cartSize, removeFromCart, updateAmountRequest }) {
  
  function increment(product) {
    return updateAmountRequest(product.id, product.amount + 1);
  }
  
  function decrement(product) {
    return updateAmountRequest(product.id, product.amount - 1);
  }
    
  return (
    <Container>
      {
        cartSize 
          ? (
        <>
        <ProductTable>
        <thead>
          <tr>
            <th />
            <th>PRODUCT</th>
            <th>QTY</th>
            <th>SUBTOTAL</th>
          </tr>
        </thead>
        <tbody>
          { cart.map(product => (
            <tr key={product.id}>
              <td>
                <img 
                  src={product.image} 
                  alt={product.title}/>
              </td>
              <td>
                <strong>{product.title}</strong>
                <span>{product.priceFormatted}</span>
              </td>
              <td>
                <div>
                  <button 
                    type="button"
                    onClick={() => decrement(product)}
                  >
                    <MdRemoveCircleOutline size={20} color="#7159c1" />
                  </button>
                  {
                    product.loading
                      ? (
                      <LoadingProduct>
                        <FaSpinner size={20}/>
                      </LoadingProduct>)
                      : <input type="number" readOnly value={product.amount} />
                  }
                  <button 
                    type="button"
                    onClick={() => increment(product)}
                  >
                    <MdAddCircleOutline size={20} color="#7159c1" />
                  </button>
                </div>
              </td>
              <td>
                <strong>{product.subtotal}</strong>
              </td>
              <td>
                <button 
                  type="button" 
                  onClick={() => removeFromCart(product.id)}
                >
                  <MdDelete color="#7159c1" size={20} />
                </button>
              </td>
            </tr>
          ))}          
        </tbody>
      </ProductTable>
      <footer>
        <button type="button">Place order</button>

        <Total>
          <span>TOTAL</span>
          <strong>{total}</strong>
        </Total>
      </footer>
      </>
          )
          : (
            <EmptyShoppingCart>
              <FaShoppingCart size={150} />
              <p>Your cart is empty</p> 
            </EmptyShoppingCart>
          )
      }
    </Container>
  );
}

const mapStateToProps = state => ({
  cart: state.cart.map(product => ({
    ...product,
    subtotal: formatPrice(product.price * product.amount),
  })),
  total: formatPrice(state.cart.reduce((total, product) => {
    return total + product.price * product.amount;
  }, 0)),
  cartSize: state.cart.length,
});

const mapDispatchToProps = dispatch => bindActionCreators(CartActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps)(Cart);
