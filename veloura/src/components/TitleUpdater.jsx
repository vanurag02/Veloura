import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const routeTitles = {
  "/": "Veloura – Modern Fashion Store",
  "/collection": "Veloura – Collection",
  "/about": "Veloura – About Us",
  "/contact": "Veloura – Contact",
  "/cart": "Veloura – Your Cart",
};

const TitleUpdater = () => {
  const location = useLocation();

  useEffect(() => {
    const title = routeTitles[location.pathname] || "Page Not Found";

    document.title = title;
  }, [location]);

  return null;
};

export default TitleUpdater;
