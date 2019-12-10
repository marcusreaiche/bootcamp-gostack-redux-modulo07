import React from "react";
import { MdRemoveCircleOutline, MdAddCircleOutline, MdDelete } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";


import * as CartActions from "../../store/modules/cart/actions";
import { Container, ProductTable, Total } from "./styles";
import { formatPrice } from "../../util/format";

export default function Cart({ removeFromCart }) {
  const dispatch = useDispatch();
  
  const total = useSelector(state => (
    formatPrice(
      state.cart.reduce(
        (totalSum, product) => {
          return totalSum + product.price * product.amount;
        }, 0
      )
    )
  ));
  
  const cart = useSelector(state => state.cart
    .map(product => ({
      ...product,
      subtotal: formatPrice(product.price * product.amount),
    }))
  );

  function increment(product) {
    return dispatch(CartActions.updateAmountRequest(product.id, product.amount + 1));
  }
  
  function decrement(product) {
    return dispatch(CartActions.updateAmountRequest(product.id, product.amount - 1));
  }
  
  return (
    <Container>
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
                  <input type="number" readOnly value={product.amount} />
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
                  onClick={() => dispatch(CartActions.removeFromCart(product.id))}
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
    </Container>
  );
}
