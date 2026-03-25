import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";
import { getProducts } from "../services/api";

const Collection = () => {
  /* =============== 1. CONTEXT VALUES (SEARCH STATE) =============== */
  const { search, showSearch } = useContext(ShopContext);

  /* ===============
     2. STATE MANAGEMENT
     - products → ALL PRODUCTS FROM API
     - filterProducts → FINAL FILTERED + SORTED PRODUCTS
     - category → SELECTED CATEGORY FILTERS
     - subCategory → SELECTED SUB-CATEGORY FILTERS
     - sortType → SORTING OPTION
     - showFilter → MOBILE FILTER TOGGLE
  =============== */
  const [products, setProducts] = useState([]);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState("relevance");
  const [showFilter, setShowFilter] = useState(false);

  /* =============== 3. FETCH PRODUCTS (API CALL) =============== */
  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getProducts();
      setProducts(data);
    };

    fetchProducts();
  }, []);

  /* =============== 4. COMMON TOGGLE FUNCTION
     - USED FOR CATEGORY & SUB-CATEGORY
     - ADDS / REMOVES VALUE FROM ARRAY
  =============== */
  const toggleValue = (value, state, setState) => {
    if (state.includes(value)) {
      setState((prev) => prev.filter((item) => item !== value));
    } else {
      setState((prev) => [...prev, value]);
    }
  };

  /* -------- CATEGORY TOGGLE -------- */
  const toggleCategory = (e) => {
    toggleValue(e.target.value, category, setCategory);
  };

  /* -------- SUB-CATEGORY TOGGLE -------- */
  const toggleSubCategory = (e) => {
    toggleValue(e.target.value, subCategory, setSubCategory);
  };

  /* =============== 5. FILTER + SORT LOGIC
     - APPLIES:
       1) SEARCH
       2) CATEGORY FILTER
       3) SUB-CATEGORY FILTER
       4) SORTING
  =============== */
  const applyFilterAndSort = () => {
    let productsCopy = [...products];

    /* -------- SEARCH FILTER -------- */
    if (showSearch && search) {
      productsCopy = productsCopy.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase()),
      );
    }

    /* -------- CATEGORY FILTER -------- */
    if (category.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        category.some(
          (val) =>
            val.toLowerCase().trim() === item.category.toLowerCase().trim(),
        ),
      );
    }

    /* -------- SUB-CATEGORY FILTER -------- */
    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        subCategory.some(
          (val) =>
            val.toLowerCase().trim() === item.subCategory.toLowerCase().trim(),
        ),
      );
    }

    /* -------- SORTING -------- */
    switch (sortType) {
      case "low-high":
        productsCopy.sort((a, b) => a.basePrice - b.basePrice);
        break;

      case "high-low":
        productsCopy.sort((a, b) => b.basePrice - a.basePrice);
        break;

      default:
        break;
    }

    /* -------- UPDATE FINAL STATE -------- */
    setFilterProducts(productsCopy);
  };

  /* =============== 6. EFFECT TO APPLY FILTERS - RUNS WHEN ANY DEPENDENCY CHANGES =============== */
  useEffect(() => {
    applyFilterAndSort();
  }, [products, category, subCategory, sortType, search, showSearch]);

  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t border-gray-300">
      {/* =============== 7. FILTER SECTION (LEFT SIDE) =============== */}
      <div className="min-w-60">
        {/* FILTER TOGGLE (MOBILE) */}
        <p
          className="my-2 text-lg font-semibold flex items-center cursor-pointer gap-4"
          onClick={() => setShowFilter(!showFilter)}
        >
          FILTERS
          <img
            src="/images/dropdown_icon.png"
            className={`h-3 sm:hidden ${
              showFilter ? "rotate-90" : ""
            } transition-all duration-200`}
            alt="Toggle Filters"
          />
        </p>

        {/* -------- CATEGORY FILTER -------- */}
        <div
          className={`border border-gray-300 pl-5 py-3 mt-6 ${
            showFilter ? "" : "hidden"
          } sm:block`}
        >
          <p className="mb-3 text-sm font-medium">CATEGORIES</p>

          <div className="flex flex-col gap-2 text-sm text-gray-700">
            {["Men", "Women"].map((item) => (
              <label key={item} className="flex gap-2">
                <input
                  type="checkbox"
                  className="w-3"
                  value={item}
                  onChange={toggleCategory}
                />
                {item}
              </label>
            ))}
          </div>
        </div>

        {/* -------- SUB-CATEGORY FILTER -------- */}
        <div
          className={`border border-gray-300 pl-5 py-3 my-5 ${
            showFilter ? "" : "hidden"
          } sm:block`}
        >
          <p className="mb-3 text-sm font-medium">TYPE</p>

          <div className="flex flex-col gap-2 text-sm text-gray-700">
            {["Top wear", "Bottom wear"].map((item) => (
              <label key={item} className="flex gap-2">
                <input
                  type="checkbox"
                  className="w-3"
                  value={item}
                  onChange={toggleSubCategory}
                />
                {item}
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* =============== 8. PRODUCTS SECTION (RIGHT SIDE) =============== */}
      <div className="flex-1">
        {/* HEADER */}
        <div className="flex justify-between mb-4">
          <Title text1={"ALL"} text2={"COLLECTION"} />

          {/* SORT DROPDOWN */}
          <select
            onChange={(e) => setSortType(e.target.value)}
            className="border border-gray-300 text-sm px-3 py-2 outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-500 cursor-pointer hover:shadow-md transition-all duration-300"
          >
            <option value="relevance">Relevance</option>
            <option value="low-high">Price: Low to High</option>
            <option value="high-low">Price: High to Low</option>
          </select>
        </div>

        {/* PRODUCTS GRID */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
          {filterProducts.map((item) => (
            <ProductItem key={item.id} product={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Collection;

/* =========================================================
   COMPONENT SUMMARY

   1. THIS COMPONENT HANDLES PRODUCT LISTING PAGE.

   2. CORE FEATURES:
      - PRODUCT FETCHING (API)
      - SEARCH FILTER
      - CATEGORY FILTER
      - SUB-CATEGORY FILTER
      - SORTING (PRICE BASED)

   3. CORE LOGIC FLOW:
      PRODUCTS → FILTER → SORT → DISPLAY

   4. KEY FUNCTIONS:
      - toggleValue() → REUSABLE FILTER TOGGLE
      - applyFilterAndSort() → MAIN LOGIC FUNCTION

   5. REACT CONCEPTS USED:
      - useState (STATE MANAGEMENT)
      - useEffect (SIDE EFFECTS)
      - useContext (GLOBAL SEARCH STATE)

   6. UX FEATURES:
      - MOBILE FILTER TOGGLE
      - REAL-TIME FILTERING
      - RESPONSIVE GRID

   7. IMPROVEMENT NOTES:
      - ADD LOADING STATE (API CALL)
      - ADD EMPTY RESULT STATE
      - USE useMemo FOR PERFORMANCE
      - EXTRACT FILTER LOGIC INTO UTILITY FILE

========================================================= */
