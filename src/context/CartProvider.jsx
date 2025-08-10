import { createContext, useContext, useEffect, useMemo, useState } from "react";

const CartContext = createContext({
  cart: [],
  addItem: () => {},
  removeItem: () => {},
  increment: () => {},
  decrement: () => {},
  clearCart: () => {},
  total: 0,
  itemCount: 0,
});

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem("cart");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addItem = (item, qty = 1) => {
    setCart((prev) => {
      const idx = prev.findIndex((p) => p.id === item.id);
      if (idx !== -1) {
        const updated = [...prev];
        updated[idx] = { ...updated[idx], quantity: updated[idx].quantity + qty };
        return updated;
      }
      const { id, name, price, img } = item;
      return [...prev, { id, name, price, img, quantity: qty }];
    });
  };

  const removeItem = (id) => {
    setCart((prev) => prev.filter((p) => p.id !== id));
  };

  const increment = (id) => {
    setCart((prev) =>
      prev.map((p) => (p.id === id ? { ...p, quantity: p.quantity + 1 } : p))
    );
  };

  const decrement = (id) => {
    setCart((prev) =>
      prev
        .map((p) =>
          p.id === id ? { ...p, quantity: Math.max(0, p.quantity - 1) } : p
        )
        .filter((p) => p.quantity > 0)
    );
  };

  const clearCart = () => setCart([]);

  const { total, itemCount } = useMemo(() => {
    return cart.reduce(
      (acc, p) => {
        acc.total += p.price * p.quantity;
        acc.itemCount += p.quantity;
        return acc;
      },
      { total: 0, itemCount: 0 }
    );
  }, [cart]);

  return (
    <CartContext.Provider
      value={{ cart, addItem, removeItem, increment, decrement, clearCart, total, itemCount }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);

