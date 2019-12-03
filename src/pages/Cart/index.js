import React from "react";
import { MdRemoveCircleOutline, MdAddCircleOutline, MdDelete } from "react-icons/md";
import { connect } from "react-redux";

import { Container, ProductTable, Total } from "./styles";


function Cart({ cart }) {
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
            <tr>
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
                  <button type="button">
                    <MdRemoveCircleOutline size={20} color="#7159c1" />
                  </button>
                  <input type="number" readOnly value={product.amount} />
                  <button type="button">
                    <MdAddCircleOutline size={20} color="#7159c1" />
                  </button>
                </div>
              </td>
              <td>
                <strong>$259.80</strong>
              </td>
              <td>
                <button type="button">
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
          <strong>$1920.28</strong>
        </Total>
      </footer>
    </Container>
  );
}

const mapStateToProps = state => ({
  cart: state.cart,
});

export default connect(mapStateToProps)(Cart);