import axios from "./axios";
import React, { useState, createContext, useEffect } from "react";
import fallBackData from "./fallBackData";

export const ProductContext = createContext();

const Context = (props) => {
  const [products, setProducts] = useState(
    JSON.parse(localStorage.getItem("products")) || []
  );

  useEffect(() => {
    const isLocalhost = window.location.hostname === "localhost";

    if (!products.length) {
      if (isLocalhost) {
        // Fetch products from the live API when on localhost
        axios
          .get("/products")
          .then((response) => {
            setProducts(response.data);
            localStorage.setItem("products", JSON.stringify(response.data));
          })
          .catch((error) => {
            console.error("Failed to fetch products:", error);
          });
      } else {
        // Use fallback products data when not on localhost (Render deployment)
        setProducts(fallbackProducts);
        localStorage.setItem("products", JSON.stringify(fallbackProducts));
      }
    }
  }, []);

  return (
    <ProductContext.Provider value={[products, setProducts]}>
      {props.children}
    </ProductContext.Provider>
  );
};

export default Context;
