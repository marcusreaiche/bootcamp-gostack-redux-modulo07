import React, { useState, useEffect } from "react";
import { MdAddShoppingCart } from "react-icons/md";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as CartActions from "../../store/modules/cart/actions";
import { ProductList } from "./styles";
import { formatPrice } from "../../util/format";
import api from "../../services/api";

function Home({ addToCartRequest, amount }) {
  // Initializing products state
  const [products, setProducts] = useState([]);
  // Fetching data when mounting
  useEffect(() => {
    async function fetchProducts() {
      const response = await api.get("/products");
      const data = response.data.map(product => ({
        ...product,
        priceFormatted: formatPrice(product.price),
      }));
      setProducts(data);
    }
    fetchProducts();
  }, []);
  
  function handleAddProduct(id) {
    addToCartRequest(id);
  }

  return (
    <ProductList>
      {
        products.map(product => (
          <li key={product.id}>
            <img 
              src={product.image} 
              alt={product.title}
            />
            <strong>{product.title}</strong>
            <span>{product.priceFormatted}</span>
            <button 
              type="button" 
              onClick={() => handleAddProduct(product.id)}
            >
              <div>
                <MdAddShoppingCart size={16} color="#fff" /> 
                {amount[product.id] || 0}
              </div>
              <span>Add to Cart</span>
            </button>
          </li>
        ))
      }
    </ProductList>
  );  
}

const mapStateToProps = state => ({
  amount: state.cart.reduce((amount, product) => {
    amount[product.id] = product.amount;
    return amount;
  }, {})
});

const mapDispatchToProps = dispatch => bindActionCreators(CartActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps)(Home);