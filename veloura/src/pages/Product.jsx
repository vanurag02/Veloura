import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { getProducts } from "../services/api";
import { ShopContext } from "../context/ShopContext";

/* =============== 1. DELIVERY OPTIONS COMPONENT - HANDLES PINCODE CHECK + DELIVERY STATUS =============== */
const DeliveryOptions = () => {
  /* ---------------- STATE ---------------- */
  const [pincode, setPincode] = useState("");
  const [status, setStatus] = useState(null);
  // null | "checking" | "available" | "unavailable"

  /* ---------------- CHECK DELIVERY LOGIC ---------------- */
  const checkDelivery = () => {
    if (pincode.length !== 6) return;

    setStatus("checking");

    // FAKE API DELAY
    setTimeout(() => {
      // SIMULATION: PINCODE STARTING WITH 4 IS VALID
      setStatus(pincode.startsWith("4") ? "available" : "unavailable");
    }, 800);
  };

  /* ---------------- DELIVERY DATE LOGIC ---------------- */
  const deliveryDate = new Date();
  deliveryDate.setDate(deliveryDate.getDate() + 5);

  const formattedDate = deliveryDate.toLocaleDateString("en-IN", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });

  return (
    <div className="border border-gray-100 p-4 mt-2">
      {/* TITLE */}
      <p className="text-[14px] font-semibold tracking-wide uppercase text-gray-700 mb-3">
        Delivery Options
      </p>

      {/* =============== PINCODE INPUT + CHECK BUTTON =============== */}
      <div className="flex items-center border border-gray-200 mb-4">
        <input
          type="text"
          maxLength={6}
          value={pincode}
          onChange={(e) => {
            // ALLOW ONLY NUMBERS
            setPincode(e.target.value.replace(/\D/g, ""));
            setStatus(null);
          }}
          onKeyDown={(e) => e.key === "Enter" && checkDelivery()}
          placeholder="Enter pincode"
          className="flex-1 px-3 py-2.5 text-sm outline-none"
        />

        {/* SUCCESS ICON */}
        {status === "available" && (
          <i className="bi bi-check-circle-fill text-green-500 px-2 text-sm" />
        )}

        <button
          onClick={checkDelivery}
          disabled={pincode.length !== 6}
          className="font-medium bg-gray-950 text-white hover:bg-black text-[12px] uppercase px-3 py-2.5 transition-all cursor-pointer disabled:text-gray-300 border-l border-gray-200"
        >
          {status === "checking" ? "..." : "Check"}
        </button>
      </div>

      {/* ERROR MESSAGE */}
      {status === "unavailable" && (
        <p className="text-sm font-medium text-red-500 mb-3 -mt-2">
          Delivery not available for this pincode.
        </p>
      )}

      {/* =============== DELIVERY INFO =============== */}
      <div className="flex flex-col gap-3">
        {/* DELIVERY DATE */}
        <div className="flex items-center gap-3">
          <i className="bi bi-truck text-gray-900 text-base w-5 text-center" />
          <p className="text-sm text-gray-600">
            {status === "available" ? (
              <>
                Get it by{" "}
                <span className="font-medium text-gray-900">
                  {formattedDate}
                </span>
              </>
            ) : (
              "Enter pincode to check delivery date"
            )}
          </p>
        </div>

        {/* COD */}
        <div className="flex items-center gap-3">
          <i className="bi bi-cash-coin text-gray-900 text-base w-5 text-center" />
          <p className="text-sm text-gray-600">Pay on delivery available</p>
        </div>

        {/* RETURN POLICY */}
        <div className="flex items-center gap-3">
          <i className="bi bi-arrow-counterclockwise text-gray-900 text-base w-5 text-center" />
          <p className="text-sm text-gray-600">Easy 7 days return & exchange</p>
        </div>
      </div>
    </div>
  );
};

/* =============== 2. PRODUCT PAGE COMPONENT =============== */
const Product = () => {
  /* ---------------- ROUTE PARAM ---------------- */
  const { productId } = useParams();

  /* ---------------- STATE ---------------- */
  const [product, setProduct] = useState(null);
  const [image, setImage] = useState("");
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);

  /* ---------------- CONTEXT ---------------- */
  const { addToCart } = useContext(ShopContext);

  /* =============== 3. FETCH PRODUCT DATA =============== */
  useEffect(() => {
    const fetchProduct = async () => {
      const data = await getProducts();

      const foundProduct = data.find((item) => item.id === Number(productId));

      setProduct(foundProduct);
      setImage(foundProduct?.images[0]);
    };

    fetchProduct();
  }, [productId]);

  /* ---------------- LOADING STATE ---------------- */
  if (!product)
    return <p className="text-center py-10 text-gray-400">Loading...</p>;

  /* =============== 4. DERIVED VALUES - CURRENT PRICE BASED ON SIZE
     - DISCOUNT CALCULATION
     - SELECTED VARIANT
  =============== */
  const currentPrice = selectedSize
    ? product.variants.find((v) => v.size === selectedSize)?.price
    : product.basePrice;

  const discount = product.originalPrice
    ? Math.round(
        ((product.originalPrice - currentPrice) / product.originalPrice) * 100,
      )
    : null;

  const selectedVariant = product.variants.find((v) => v.size === selectedSize);

  return (
    <div className="max-w-6xl mx-auto px-6 sm:px-10 py-10 border-t border-gray-300">
      {/* =============== 5. MAIN LAYOUT (IMAGES + DETAILS) =============== */}
      <div className="flex flex-col md:flex-row gap-12">
        {/* ================= LEFT: IMAGES ================= */}
        <div className="flex-1 flex gap-5">
          {/* -------- THUMBNAILS -------- */}
          <div className="flex flex-col gap-2">
            {product.images
              .slice(0, product.images.length - (product.colors?.length || 0))
              .map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt="product thumbnail"
                  onClick={() => setImage(img)}
                  className={`w-16 h-20 object-cover cursor-pointer border-2 transition-all duration-200 ${
                    image === img
                      ? "border-gray-400"
                      : "border-transparent hover:border-gray-300"
                  }`}
                />
              ))}
          </div>

          {/* -------- MAIN IMAGE -------- */}
          <div className="flex-1">
            <img
              src={image}
              alt={product.name}
              className="w-full object-cover"
            />
          </div>
        </div>

        {/* =============== RIGHT: DETAILS =============== */}
        <div className="flex-1 flex flex-col gap-5">
          {/* PRODUCT NAME */}
          <h1 className="text-xl font-semibold text-gray-900">
            {product.name}
          </h1>

          {/* RATING */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 bg-green-600 text-white text-xs font-medium px-2 py-0.5 rounded-sm">
              <span>{product.rating}</span>
              <i className="bi bi-star-fill text-[10px]"></i>
            </div>
            <span className="text-sm text-gray-600">
              {product.reviews} Ratings
            </span>
          </div>

          <div className="h-px bg-gray-300" />

          {/* PRICE */}
          <div className="flex items-baseline gap-3 flex-wrap">
            <p className="text-2xl font-bold text-gray-900">₹{currentPrice}</p>

            {product.originalPrice && (
              <>
                <p className="text-sm text-gray-400 line-through">
                  MRP ₹{product.originalPrice}
                </p>
                <p className="text-sm font-medium text-orange-500">
                  ({discount}% OFF)
                </p>
              </>
            )}
          </div>

          <p className="text-[14px] text-gray-500 -mt-3">
            Inclusive of all taxes
          </p>

          {/* =============== COLOR SELECTION =============== */}
          {product.colors?.length > 0 && (
            <div>
              <p className="text-[12px] font-semibold uppercase text-gray-700 mb-3">
                More Colors
              </p>

              <div className="flex flex-wrap gap-2">
                {product.colors.map((color, i) => {
                  const index =
                    product.images.length - product.colors.length + i;

                  const colorImg = product.images[index];

                  return (
                    <button
                      key={i}
                      onClick={() => {
                        setSelectedColor(color);
                        setImage(colorImg);
                      }}
                      className={`w-14 h-16 border-2 transition-all ${
                        selectedColor === color
                          ? "border-gray-900"
                          : "border-transparent hover:border-gray-300"
                      }`}
                    >
                      <img
                        src={colorImg}
                        alt={color}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* =============== SIZE SELECTION =============== */}
          {product.variants && (
            <div>
              <p className="text-xs font-semibold uppercase text-gray-700 mb-3">
                Select Size
              </p>

              <div className="flex gap-2 flex-wrap">
                {product.variants.map((variant, i) => (
                  <button
                    key={i}
                    onClick={() =>
                      variant.stock !== 0 && setSelectedSize(variant.size)
                    }
                    disabled={variant.stock === 0}
                    className={`w-16 h-12 text-sm border ${
                      variant.stock === 0
                        ? "border-gray-200 text-gray-300 line-through cursor-not-allowed"
                        : selectedSize === variant.size
                          ? "border-gray-900 bg-gray-900 text-white"
                          : "border-gray-300 hover:border-gray-900"
                    }`}
                  >
                    {variant.size}
                  </button>
                ))}
              </div>

              {/* STOCK WARNING */}
              {selectedVariant?.stock > 0 && selectedVariant.stock < 5 && (
                <p className="text-[14px] font-medium text-orange-500 mt-2">
                  Only {selectedVariant.stock} left — hurry!
                </p>
              )}
            </div>
          )}

          {/* =============== ADD TO CART =============== */}
          <button
            onClick={() => addToCart(product, selectedSize)}
            className="bg-gray-950 text-white hover:bg-black text-[12px] font-medium tracking-[0.14em] uppercase px-7 py-3 w-full cursor-pointer transition-all duration-200 mt-2"
          >
            Add to Cart
          </button>

          {/* DELIVERY OPTIONS */}
          <DeliveryOptions />
        </div>
      </div>
    </div>
  );
};

export default Product;

/* =========================================================
   COMPONENT SUMMARY

   1. THIS COMPONENT DISPLAYS SINGLE PRODUCT DETAILS.

   2. MAIN FEATURES:
      - PRODUCT FETCH USING ID
      - IMAGE PREVIEW + THUMBNAILS
      - COLOR SELECTION
      - SIZE SELECTION WITH STOCK CHECK
      - DYNAMIC PRICE + DISCOUNT CALCULATION
      - ADD TO CART FUNCTIONALITY
      - DELIVERY CHECK (PINCODE)

   3. LOGIC IMPLEMENTED:
      - DERIVED STATE (PRICE, DISCOUNT)
      - CONDITIONAL RENDERING (COLORS, SIZES)
      - STOCK VALIDATION
      - FAKE DELIVERY SERVICE CHECK

   4. USER EXPERIENCE:
      - INTERACTIVE PRODUCT SELECTION
      - VISUAL FEEDBACK (SELECTED STATE)
      - DELIVERY AVAILABILITY CHECK

========================================================= */
