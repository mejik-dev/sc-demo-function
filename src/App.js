import "./App.css";

import * as React from "react";
import { useApp } from "./hooks/useApp";

export const App = () => {
  const {
    cart,
    getTotal,
    handleAddtoCart,
    handleCheckout,
    setName,
    setPrice,
    setQuantity,
    toDecimal,
  } = useApp();

  return (
    <div className="App">
      <div className="form">
        <label>Product name:</label>
        <input type="text" onChange={(e) => setName(e.target.value)} />
        <label>Price in USD:</label>
        <input type="number" onChange={(e) => setPrice(e.target.value)} />
        <label>Quantity:</label>
        <input type="number" onChange={(e) => setQuantity(e.target.value)} />
      </div>
      <button onClick={handleAddtoCart}>Add item to cart</button>
      <h1>Cart</h1>
      <h3>Total: ${toDecimal(getTotal(cart))}</h3>
      <ul>
        {cart.map((item, index) => {
          return (
            <li key={index}>
              {item.name} x{item.quantity} ($
              {toDecimal(item.price * item.quantity)})
            </li>
          );
        })}
      </ul>
      <button onClick={handleCheckout}>Checkout</button>
    </div>
  );
};

export default App;
