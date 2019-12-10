import React from "react";
import { Link } from "react-router-dom";
import { MdShoppingBasket } from "react-icons/md";
import { useSelector } from "react-redux";

import { Container, Cart } from "./styles";
import logo from "../../assets/images/logo.svg";

export default function Header() {
  
  const cartSize = useSelector(state => state.cart.length);

  return (
    <Container>
      <Link to="/">
        <img alt="Rocketshoes" src={logo} />
      </Link>

      <Cart to="/cart">
        <div>
          <strong>My Cart</strong>
          <span>{cartSize} items</span>
        </div>
        <MdShoppingBasket size={36} color="#fff" />
      </Cart>
    </Container>
  );
}
