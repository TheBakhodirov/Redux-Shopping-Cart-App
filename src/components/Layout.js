import React from "react";
import Header from "./Header";
import Products from "./Products";
import "./Layout.css";
import CartItems from "./CartItems";
import { useSelector } from "react-redux";
const Layout = () => {
  const isCartShown = useSelector((state) => state.cart.showCart);
  const total = useSelector((state) => state.cart.totalPrice);

  return (
    <React.Fragment>
      <div className="layout">
        <Header />
        <Products />
        {isCartShown && <CartItems />}
        <div className="total-price">
          <h3>Total: ${total}</h3>
          <button className="orderBtn">Place Order</button>
        </div>{" "}
      </div>
    </React.Fragment>
  );
};

export default Layout;
