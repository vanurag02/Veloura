import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";

const ProductItem = ({ id, name, image, price }) => {
  const { currency } = useContext(ShopContext);

  return (
    <Link
      className="group block text-gray-700 cursor-pointer hover:shadow-[0_8px_20px_rgba(0,0,0,0.15)] p-2 transition-all ease-in-out duration-400"
      to={`/product/${id}`}
    >
      {/* Image */}
      <div className="overflow-hidden bg-[#f0ede8] aspect-3/4 relative">
        <img
          src={image[0]}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 ease-in-out"
        />
      </div>

      {/* Info */}
      <div className="pt-3">
        <p className="text-sm font-medium text-gray-800 truncate">{name}</p>
        <p className="text-sm font-medium text-gray-700 mt-1">
          {currency}
          {price}
        </p>
      </div>
    </Link>
  );
};

export default ProductItem;
