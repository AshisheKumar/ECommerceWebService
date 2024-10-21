import axios from "./axios";
import React, { useState, createContext, useEffect } from "react";

export const ProductContext = createContext();

const Context = (props) => {
  const [products, setproducts] = useState(
    JSON.parse(localStorage.getItem("products")) || null
  );

  return (
    <ProductContext.Provider value={[products, setproducts]}>
      {props.children}
    </ProductContext.Provider>
  );
};

export default Context;
