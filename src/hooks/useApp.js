import * as React from "react";

export const useApp = () => {
  const [cart, setCart] = React.useState([]);
  const [name, setName] = React.useState("");
  const [price, setPrice] = React.useState(0);
  const [quantity, setQuantity] = React.useState(1);
  const [loading, setLoading] = React.useState(false);

  const handleAddtoCart = () => {
    if (name === "" || price <= 0 || quantity <= 0) {
      return;
    }

    setCart((prev) => [...prev, { name, price, quantity }]);
  };

  const toDecimal = (num) => (Math.round(num * 100) / 100).toFixed(2);

  const getTotal = (items) => {
    let value = 0;

    for (let i = 0; i < items.length; i++) {
      value += items[i].price * items[i].quantity;
    }

    return value;
  };

  const handleCheckout = async () => {
    if (loading) {
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        "https://dev-pocfordemolm81l.microgen.id/function/stripe-checkout",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ items: cart }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to request to function");
      }

      const { url } = await response.json();

      window.location = url;
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    cart,
    getTotal,
    handleAddtoCart,
    handleCheckout,
    setName,
    setPrice,
    setQuantity,
    toDecimal,
  };
};
