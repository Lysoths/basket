import { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../Firebase";

const ref = () => {
  return collection(db, "products");
};

const AddProduct = () => {
  const [productName, setproductName] = useState("");
  const [productImage, setproductImage] = useState("");
  const [productPrice, setproductPrice] = useState("");
  const [productAmount, setproductAmount] = useState("");

  const addNewProduct = async (e) => {
    e.preventDefault();

    await addDoc(ref(), {
      productName: productName,
      productImage: productImage,
      productPrice: productPrice,
      productAmount: productAmount,
    });
  };

  return (
    <form className='flex flex-col items-center' onSubmit={addNewProduct}>
      <input
        type='text'
        placeholder='Ürün Adı'
        className='bg-stone-200 rounded-md m-2 p-2'
        onChange={(e) => setproductName(e.target.value)}
        value={productName}
      />
      <input
        type='text'
        placeholder='Ürün Fotoğraf Link'
        className='bg-stone-200 rounded-md m-2 p-2'
        onChange={(e) => setproductImage(e.target.value)}
        value={productImage}
      />
      <input
        type='number'
        placeholder='Ürün Fiyat'
        className='bg-stone-200 rounded-md m-2 p-2'
        onChange={(e) => setproductPrice(e.target.value)}
        value={productPrice}
      />
      <input
        type='text'
        placeholder='Ürün Adet'
        className='bg-stone-200 rounded-md m-2 p-2'
        onChange={(e) => setproductAmount(e.target.value)}
        value={productAmount}
      />
      <button className='bg-red-400 p-2 rounded-md text-white w-2/4 m-2'>
        Ürün Ekle
      </button>
    </form>
  );
};

export default AddProduct;
