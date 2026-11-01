import { useMemo } from "react";
import { CartContext } from "./cart-context.js";
import { useLocalStorage } from "../hooks/useLocalStorage.js";

export function CartProvider({ children }) {
  const [cart, setCart] = useLocalStorage("campuseats-cart", []);
  const [orders, setOrders] = useLocalStorage("campuseats-orders", []);

  const count = cart.reduce((sum, line) => sum + line.qty, 0);

  const total = cart.reduce(
    (sum, line) => sum + line.item.price * line.qty,
    0
  );

  function addToCart(item) {
    setCart((prev) => {
      const existing = prev.find((line) => line.item.id === item.id);

      if (existing) {
        return prev.map((line) =>
          line.item.id === item.id
            ? { ...line, qty: line.qty + 1 }
            : line
        );
      }

      return [{ item, qty: 1, note: "" }, ...prev];
    });
  }

  function changeQty(itemId, delta) {
    setCart((prev) =>
      prev
        .map((line) =>
          line.item.id === itemId
            ? { ...line, qty: line.qty + delta }
            : line
        )
        .filter((line) => line.qty > 0)
    );
  }

  function removeFromCart(itemId) {
    setCart((prev) =>
      prev.filter((line) => line.item.id !== itemId)
    );
  }

  function updateNote(itemId, note) {
    setCart((prev) =>
      prev.map((line) =>
        line.item.id === itemId
          ? { ...line, note }
          : line
      )
    );
  }

  function placeOrder(details) {
    const order = {
      ...details,
      items: cart,
      total,
      id: Date.now(),
    };

    setOrders((prev) => [...prev, order]);
    setCart([]);
  }

  const value = useMemo(
    () => ({
      cart,
      orders,
      count,
      total,
      addToCart,
      changeQty,
      removeFromCart,
      updateNote,
      placeOrder,
    }),
    [cart, orders, count, total]
  );

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}
