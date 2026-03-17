// Import React core library
import React from "react";

// Import ReactDOM to render React app into the DOM
import ReactDOM from "react-dom/client";

// Import the main App component
import App from "./App.jsx";

// Import global CSS
import "./index.css";

// Import BrowserRouter to enable routing in the app
import { BrowserRouter } from "react-router-dom";

// Import global context provider for shop data
import ShopContextProvider from "./context/ShopContext.jsx";

// Render the React app into the root HTML element
ReactDOM.createRoot(document.getElementById("root")).render(
  // Enable routing across the entire application
  <BrowserRouter>
    {/* Provide global shop data to all components */}
    <ShopContextProvider>
      {/* Main application component */}
      <App />
    </ShopContextProvider>
  </BrowserRouter>,
);
