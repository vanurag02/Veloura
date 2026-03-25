import React, { useEffect, useState } from "react";
import { getProducts } from "../services/api";
import ProductItem from "../components/ProductItem";
import Hero from "../components/Hero";
import LatestCollection from "../components/LatestCollection";
import OurPolicy from "../components/OurPolicy";
import NewsLetter from "../components/NewsLetter";

const Home = () => {
  /* =============== 1. STATE MANAGEMENT - products → STORES ALL PRODUCTS FROM API =============== */
  const [products, setProducts] = useState([]);

  /* =============== 2. FETCH PRODUCTS (API CALL) - RUNS ONLY ON COMPONENT MOUNT =============== */
  useEffect(() => {
    const fetchData = async () => {
      const data = await getProducts();
      setProducts(data);
    };

    fetchData();
  }, []);

  return (
    <>
      {/* =============== 3. HERO SECTION =============== */}
      <Hero />

      {/* =============== 4. LATEST COLLECTION SECTION - INTERNALLY HANDLES PRODUCT DISPLAY =============== */}
      <LatestCollection />

      {/* =============== 5. POLICY SECTION =============== */}
      <OurPolicy />

      {/* =============== 6. NEWSLETTER SECTION =============== */}
      <NewsLetter />
    </>
  );
};

export default Home;

/* =========================================================
   COMPONENT SUMMARY

   1. THIS COMPONENT REPRESENTS THE HOME PAGE.

   2. MAIN SECTIONS:
      - HERO (LANDING SECTION)
      - LATEST COLLECTION (PRODUCT HIGHLIGHTS)
      - OUR POLICY (TRUST BUILDING)
      - NEWSLETTER (USER ENGAGEMENT)

   3. CORE LOGIC:
      - FETCHES PRODUCTS FROM API
      - STORES IN LOCAL STATE

   4. IMPORTANT NOTE:
      - products STATE IS CURRENTLY UNUSED
      - DATA FETCHING IS ALREADY HANDLED INSIDE LatestCollection

   5. IMPROVEMENT NOTES:
      - REMOVE UNUSED STATE (CLEAN CODE)
      - OR PASS PRODUCTS AS PROPS TO CHILD COMPONENTS
      - ADD LOADING STATE FOR API CALL

========================================================= */
