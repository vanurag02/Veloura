// React utility to create a global context
import { createContext } from "react";

// Static product data used across the shop
import { products } from "../assets/assets";

// Create a context for sharing shop-related data across components
export const ShopContext = createContext();

// Provider component that wraps the app and supplies shared data
const ShopContextProvider = (props) => {
  // Global shop configuration
  const currency = "₹";
  const delivery_charges = 80;

  // Values that will be accessible from any component using this context
  const value = {
    products,
    currency,
    delivery_charges,
  };

  // Provide the shared values to all child components
  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};

// Export provider so it can wrap the application
export default ShopContextProvider;
