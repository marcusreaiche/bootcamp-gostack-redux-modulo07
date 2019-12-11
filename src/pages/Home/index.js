import React, { Component } from "react";
import { FaSpinner } from "react-icons/fa";
import { MdAddShoppingCart } from "react-icons/md";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as CartActions from "../../store/modules/cart/actions";
import { ProductList, Loading } from "./styles";
import { formatPrice } from "../../util/format";
import api from "../../services/api";

class Home extends Component {
  
  constructor(props){
    super(props);
    this.state = {
      products: [],
      stock: [],
      loading: true,
    }
    // Binding methods
    this.handleAddProduct = this.handleAddProduct.bind(this);
  }
  
  async componentDidMount() {
    const response = await api.get("/products");
    const data = response.data.map(product => ({
      ...product,
      priceFormatted: formatPrice(product.price),
    }));
    
    this.setState({
      products: data,
      loading: false,
    });
  }
  
  handleAddProduct(id) {
    const { addToCartRequest } = this.props;
    addToCartRequest(id);
  }

  render() {
    const { products, loading } = this.state;
    const { amount } = this.props;
    if(loading) {
      return (
        <Loading>
          <FaSpinner size={100} />
        </Loading>
        );
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
                onClick={() => this.handleAddProduct(product.id)}
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