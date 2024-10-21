import axios from "./axios";
import React, { useState, createContext, useEffect } from "react";
import fallbackData from "../utils/fallBackData"; // import the fallback data

export const ProductContext = createContext();

const Context = (props) => {
  const [products, setProducts] = useState(
    JSON.parse(localStorage.getItem("products")) || null
  );

  useEffect(() => {
    if (!products) {
      console.log("No products in localStorage, fetching data...");
      axios
        .get("/products")
        .then((response) => {
          console.log("Fetched products from API:", response.data);
          setProducts(response.data);
          localStorage.setItem("products", JSON.stringify(response.data));
        })
        .catch((error) => {
          console.error(
            "Error fetching products from API, using fallback data",
            error
          );
          setProducts(fallbackData); // Use fallback data if API request fails
        });
    } else {
      console.log("Products found in localStorage:", products);
    }
  }, [products]);

  return (
    <ProductContext.Provider value={[products, setProducts]}>
      {props.children}
    </ProductContext.Provider>
  );
};

export default Context;
