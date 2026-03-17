import "./App.css";

// Import routing components
import { Routes, Route } from "react-router-dom";

// Import components
import Navbar from "./components/Navbar";

// Import pages
import Home from "./pages/Home";
import Collection from "./pages/Collection";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Cart from "./pages/Cart";
import Product from "./pages/Product";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] bg-white">
      {/* Navbar visible on all pages */}
      <Navbar />

      {/* Define application routes */}
      <Routes>
        {/* Home page */}
        <Route path="/" element={<Home />} />

        {/* Product collection page */}
        <Route path="/collection" element={<Collection />} />

        {/* About page */}
        <Route path="/about" element={<About />} />

        {/* Contact page */}
        <Route path="/contact" element={<Contact />} />

        {/* Cart page */}
        <Route path="/cart" element={<Cart />} />

        <Route path="/product/:id" element={<Product />}></Route>

        {/* Fallback route for undefined pages */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
