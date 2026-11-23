
import { useMemo } from "react";
import { CartContext } from "./cart-context.js";
import { useLocalStorage } from "../hooks/useLocalStorage.js";
import { useAuth } from "../hooks/useAuth.js";

export function CartProvider({ children }) {
  const { user } = useAuth();

  // Preserve Week 4 cart and order storage
  const [cart, setCart] = useLocalStorage("campuseats-cart", []);
  const [orders, setOrders] = useLocalStorage("campuseats-orders", []);

  // Save notes separately for each authenticated user
  const notesKey = user
    ? `campuseats-notes-${user.uid}`
    : "campuseats-notes-guest";

  const [notes, setNotes] = useLocalStorage(
    notesKey,
    {},
    Boolean(user)
  );

  // Show only the current user's notes
  const cartWithUserNotes = cart.map((line) => ({
    ...line,
    note: user ? notes[line.item.id] ?? "" : "",
  }));

  const count = cart.reduce(
    (sum, line) => sum + line.qty,
    0
  );

  const total = cart.reduce(
    (sum, line) => sum + line.item.price * line.qty,
    0
  );

  function addToCart(item) {
    setCart((prev) => {
      const existing = prev.find(
        (line) => line.item.id === item.id
      );

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

    if (user) {
      setNotes((prev) => {
        const updated = { ...prev };
        delete updated[itemId];
        return updated;
      });
    }
  }

  function updateNote(itemId, note) {
    if (!user) return;

    // Save the note using the user's UID-specific key
    setNotes((prev) => ({
      ...prev,
      [itemId]: note,
    }));

    // Keep the note inside its cart line
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
      items: cartWithUserNotes,
      total,
      id: Date.now(),
    };

    setOrders((prev) => [...prev, order]);
    setCart([]);

    // Clear the current user's notes after checkout
    if (user) {
      setNotes({});
    }
  }

  const value = useMemo(
    () => ({
      cart: cartWithUserNotes,
      orders,
      count,
      total,
      addToCart,
      changeQty,
      removeFromCart,
      updateNote,
      placeOrder,
    }),
    [cart, orders, notes, user, count, total]
  );

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}
