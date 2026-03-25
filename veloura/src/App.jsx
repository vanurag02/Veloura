// =============== STYLES ===============
import "./App.css";

// =============== LIBRARIES ===============
import { Routes, Route } from "react-router-dom";

// =============== PAGES ===============
import Home from "./pages/Home";
import Collection from "./pages/Collection";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Cart from "./pages/Cart";
import Product from "./pages/Product";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";

// =============== COMPONENTS ===============
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import SearchBar from "./components/SearchBar";
import TitleUpdater from "./components/TitleUpdater";
import CartDrawer from "./components/CartDrawer";

function App() {
  // =============== ROUTES CONFIG ===============
  const routes = [
    { path: "/", element: <Home /> },
    { path: "/collection", element: <Collection /> },
    { path: "/about", element: <About /> },
    { path: "/contact", element: <Contact /> },
    { path: "/cart", element: <Cart /> },
    { path: "/product/:productId", element: <Product /> },
    { path: "/login", element: <Login /> },
    { path: "*", element: <NotFound /> },
  ];

  return (
    <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] bg-white">
      {/* =============== GLOBAL COMPONENTS =============== */}
      <TitleUpdater />
      <Navbar />
      <SearchBar />
      <CartDrawer />

      {/* =============== ROUTES =============== */}
      <Routes>
        {routes.map((route, index) => (
          <Route key={index} path={route.path} element={route.element} />
        ))}
      </Routes>

      {/* =============== FOOTER =============== */}
      <Footer />
    </div>
  );
}

export default App;
