import React, { Component } from "react";
import { MdAddShoppingCart } from "react-icons/md";
import { connect } from "react-redux";

import { ProductList } from "./styles";
import { formatPrice } from "../../util/format";
import api from "../../services/api";

class Home extends Component {
  
  constructor(props){
    super(props);
    this.state = {
      products: [],
      stock: [],
    }
    // Binding methods
    this.handleAddProduct = this.handleAddProduct.bind(this);
  }
  
  async componentDidMount() {
    const response = await api.get("/products");
    console.tron.log(response);
    const data = response.data.map(product => ({
      ...product,
      priceFormatted: formatPrice(product.price),
    }));
    
    this.setState({
      products: data,
    });
  }
  
  handleAddProduct(product) {
    const { dispatch } = this.props;
    dispatch({
      type: "ADD_TO_CART",
      product
    });
  }

  render() {
    const { products } = this.state;
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
                onClick={() => this.handleAddProduct(product)}
              >
                <div>
                  <MdAddShoppingCart size={16} color="#fff" />
                </div>
                <span>Add to Cart</span>
              </button>
            </li>
          ))
        }
      </ProductList>
    );
  }
}

export default connect()(Home);