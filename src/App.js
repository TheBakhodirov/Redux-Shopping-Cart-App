import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import Auth from "./components/Auth";
import Layout from "./components/Layout";
import Notification from "./components/Notification";
import { uiActions } from "./store/uiSlice";
let isFirstRender = true;

function App() {
  const cart = useSelector((state) => state.cart);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const notification = useSelector((state) => state.ui.notification);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isFirstRender) {
      isFirstRender = false;
      return;
    }

    const sendRequest = async () => {
      dispatch(
        uiActions.showNotification({
          open: true,
          message: "Sending request",
          type: "warning",
        })
      );

      const res = await fetch(
        "https://redux-shop-cart-app-default-rtdb.firebaseio.com/cartItems.json",
        {
          method: "PUT",
          body: JSON.stringify(cart),
        }
      );
      const data = await res.json();
      dispatch(
        uiActions.showNotification({
          open: true,
          message: "Request sent to database successfully",
          type: "success",
        })
      );
    };
    sendRequest().catch((err) => {
      console.log(err.message);
      dispatch(
        uiActions.showNotification({
          open: true,
          message: "Sending request failed",
          type: "error",
        })
      );
    });
  }, [cart, dispatch]);

  return (
    <div className="App">
      {notification && (
        <Notification type={notification.type} message={notification.message} />
      )}
      {!isLoggedIn && <Auth />}
      {isLoggedIn && <Layout />}
    </div>
  );
}

export default App;
