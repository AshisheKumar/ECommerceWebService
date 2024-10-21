import axios from "../utils/axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Loading from "./Loading";
import { ProductContext } from "../utils/Context";
import { toast } from "react-toastify";

const Details = () => {
  const navigate = useNavigate();
  const [products, setproducts] = useContext(ProductContext);
  const [product, setProduct] = useState(null);
  const { id } = useParams();
  

  useEffect(() => {
    if (!product) {
      setProduct(products.filter((p) => p.id == id)[0]);
    }
    
  }, []);

  const ProductDeleteHandler = (id) => {
    const FilteredProducts = products.filter((p) => p.id !== id);
    setproducts(FilteredProducts);
    localStorage.setItem("products", JSON.stringify(FilteredProducts));
    navigate("/");
    toast.success("Product Delete successfully!", {
      className: "bg-red-500 text-white",
    });
  };

  return product ? (
    <div className="w-[70%] flex justify-between items-center  m-auto p-[10%]">
      <img
        className=" object-contain h-[80%] w-[40%]"
        src={product.image}
        alt=""
      />

      <div className="content w-[50%]">
        <h1 className="text-3xl">{product.category}</h1>
        <h3 className="text-zinc-400 my-5">{product.title}</h3>
        <h2 className="text-red-500 mb-3">$ {product.price}</h2>
        <p className="mb-[10%]">{product.description}</p>

        <Link
          to={`/edit/${product.id}`}
          className="mr-5 py-3 px-5 border rounded border-blue-200 text-blue-300"
        >
          Edit
        </Link>
        <button
          onClick={() => ProductDeleteHandler(product.id)}
          className="py-3 px-5 border rounded border-red-200 text-red-300"
        >
          Delete
        </button>
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default Details;
