import { createContext, useState } from "react";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  // ================= CONFIG =================
  const currency = "₹";
  const deliveryCharges = 80;

  // ================= SEARCH =================
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);

  // ================= CART =================
  const [cartItems, setCartItems] = useState([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const addToCart = (product, size) => {
    setCartItems((prev) => {
      const existing = prev.find(
        (item) => item.id === product.id && item.size === size,
      );
      if (existing) {
        return prev.map((item) =>
          item.id === product.id && item.size === size
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }
      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          image: product.images[0],
          price:
            product.variants.find((v) => v.size === size)?.price ||
            product.basePrice,
          size,
          quantity: 1,
        },
      ];
    });
    setIsDrawerOpen(true);
  };

  const removeFromCart = (id, size) => {
    setCartItems((prev) =>
      prev.filter((item) => !(item.id === id && item.size === size)),
    );
  };

  const updateQuantity = (id, size, quantity) => {
    if (quantity < 1) return removeFromCart(id, size);
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id && item.size === size ? { ...item, quantity } : item,
      ),
    );
  };

  const clearCart = () => setCartItems([]);

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const shipping = subtotal === 0 ? 0 : subtotal > 999 ? 0 : deliveryCharges;
  const total = subtotal + shipping;

  // ================= CONTEXT VALUE =================
  const value = {
    currency,
    deliveryCharges,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    isDrawerOpen,
    setIsDrawerOpen,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalItems,
    subtotal,
    shipping,
    total,
  };

  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};

export default ShopContextProvider;
