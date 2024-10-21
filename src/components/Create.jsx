import React, { useContext, useState } from "react";
import { ProductContext } from "../utils/Context";
import { nanoid } from "nanoid";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Create = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [products, setproducts] = useContext(ProductContext);

  const AddProductHandler = (e) => {
    e.preventDefault();

    if (
      title.trim().length < 3 ||
      image.trim().length < 3 ||
      category.trim().length < 3 ||
      price.trim().length < 1 ||
      description.trim().length < 3
    ) {
      alert("Every field must have atleast 4 characters!");
      return;
    }

    const product = {
      id: nanoid(),
      title,
      image,
      category,
      price,
      description,
    };
    setproducts([...products, product]);

    localStorage.setItem("products", JSON.stringify([...products, product]));

toast.success("Product Added successfully!");

    navigate("/");
  };

  return (
    <form
      onSubmit={AddProductHandler}
      className="flex flex-col items-center p-[5%] w-screen h-screen"
    >
      <h1 className="mb-5 w-1/2 text-3xl">Add New Product</h1>
      <input
        type="url"
        placeholder="Image Link"
        className="text-2xl bg-zinc-100 rounded p-3 w-1/2 mb-3"
        onChange={(e) => setImage(e.target.value)}
        value={image}
      />

      <input
        type="text"
        placeholder="Title"
        className="text-2xl bg-zinc-100 rounded p-3 w-1/2 mb-3"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
      />

      <div className="w-1/2 flex justify-between">
        <input
          type="text"
          placeholder="Category Name"
          className="text-2xl bg-zinc-100 rounded p-3 w-[48%] mb-3"
          onChange={(e) => setCategory(e.target.value)}
          value={category}
        />

        <input
          type="number"
          placeholder="Price"
          className="text-2xl bg-zinc-100 rounded p-3 w-[48%] mb-3"
          onChange={(e) => setPrice(e.target.value)}
          value={price}
        />
      </div>

      <textarea
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Enter product Description here..."
        className="text-2xl bg-zinc-100 rounded p-3 w-1/2 mb-3"
        value={description}
        rows="10"
      />

      <div className="w-1/2">
        <button className="py-3 px-5 border rounded border-blue-200 text-blue-300">
          Add New Product
        </button>
      </div>
    </form>
  );
};

export default Create;
