import React, { useContext, useEffect, useState } from "react";
import { ProductContext } from "../utils/Context";
import { nanoid } from "nanoid";
import { useNavigate, useParams } from "react-router-dom";
const Edit = () => {
  const [products, setproducts] = useContext(ProductContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setproduct] = useState({
    title: "",
    image: "",
    category: "",
    price: "",
    description: "",
  });

  const ChangeHandler = (e) => {
    setproduct({ ...product, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    setproduct(products.filter((p) => p.id == id)[0]);
  }, [id]);

  const AddProductHandler = (e) => {
    e.preventDefault();

    if (
      product.title.trim().length < 3 ||
      product.image.trim().length < 3 ||
      product.category.trim().length < 3 ||
      product.price.trim().length < 1 ||
      product.description.trim().length < 3
    ) {
      alert("Every field must have atleast 4 characters!");
      return;
    }

    const pi = products.findIndex((p) => p.id == id);

    const copyData = [...products];

    copyData[pi] = { ...products[pi], ...product };

    setproducts(copyData);

    localStorage.setItem("products", JSON.stringify(copyData));

    navigate(-1);
  };

  return (
    <form
      onSubmit={AddProductHandler}
      className="flex flex-col items-center p-[5%] w-screen h-screen"
    >
      <h1 className="mb-5 w-1/2 text-3xl">Edit Product</h1>
      <input
        type="url"
        placeholder="Image Link"
        className="text-2xl bg-zinc-100 rounded p-3 w-1/2 mb-3"
        name="image"
        onChange={ChangeHandler}
        value={product && product.image}
      />

      <input
        type="text"
        placeholder="Title"
        className="text-2xl bg-zinc-100 rounded p-3 w-1/2 mb-3"
        name="title"
        onChange={ChangeHandler}
        value={product && product.title}
      />

      <div className="w-1/2 flex justify-between">
        <input
          type="text"
          placeholder="Category Name"
          className="text-2xl bg-zinc-100 rounded p-3 w-[48%] mb-3"
          name="category"
          onChange={ChangeHandler}
          value={product && product.category}
        />

        <input
          type="number"
          placeholder="Price"
          className="text-2xl bg-zinc-100 rounded p-3 w-[48%] mb-3"
          name="price"
          onChange={ChangeHandler}
          value={product && product.price}
        />
      </div>

      <textarea
        name="description"
        onChange={ChangeHandler}
        placeholder="Enter product Description here..."
        className="text-2xl bg-zinc-100 rounded p-3 w-1/2 mb-3"
        value={product && product.description}
        rows="10"
      />

      <div className="w-1/2">
        <button className="py-3 px-5 border rounded border-blue-200 text-blue-300">
          Edit Product
        </button>
      </div>
    </form>
  );
};

export default Edit;
