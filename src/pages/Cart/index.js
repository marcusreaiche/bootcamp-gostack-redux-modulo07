import React from "react";
import { MdRemoveCircleOutline, MdAddCircleOutline, MdDelete } from "react-icons/md";
import { connect } from "react-redux";

import { Container, ProductTable, Total } from "./styles";
import { formatPrice } from "../../util/format";

function Cart({ basket }) {
  console.tron.log(basket);
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
          {basket.map(product => (
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
                  <button type="button">
                    <MdRemoveCircleOutline size={20} color="#7159c1" />
                  </button>
                  <input type="number" readOnly value={product.qty} />
                  <button type="button">
                    <MdAddCircleOutline size={20} color="#7159c1" />
                  </button>
                </div>
              </td>
              <td>
                <strong>{product.subtotal}</strong>
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

const mapStateToProps = state => {
  const {cart} = state;
  // Aggregate the product list
  const basket = cart.reduce((acc, item) => {
    const { id } = item;
    const search = acc.find(elem => elem.id === id);
    
    if (search) {
      // product already in basket
      search.qty += 1;
      return acc;
    }
    else {
      // new product in basket
      const itemCopy = {...item}; // this is a shallow copy!
      itemCopy.qty = 1;
      return [...acc, itemCopy];
    }
  }, []);
  return { 
    basket: basket.map(product => {
      product.subtotal = formatPrice(product.price * product.qty);
      return product;
    }), 
  };
}

export default connect(mapStateToProps)(Cart);