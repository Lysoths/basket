import {
  collection,
  onSnapshot,
  setDoc,
  updateDoc,
  doc,
  increment,
} from "firebase/firestore";
import { useState, useEffect } from "react";

import Select from "react-select";
import { db, auth } from "../Firebase";

const ref2 = () => {
  if (auth.currentUser.uid === null) {
    return collection(db, "products");
  } else {
    return collection(db, auth.currentUser.uid);
  }
};

const options = [
  { value: "products", label: "Laptop" },
  { value: "phone", label: "Telefon" },
  { value: "other", label: "Diğer Ürünler" },
];
const AllProducts = ({ setAnimation, amounts, setAmounts }) => {
  const [selected, setSelected] = useState("products");
  const handleChange = (selectedOption) => {
    setSelected(selectedOption.value);
  };
  const [data, setData] = useState([]);
  const [basket, setBasket] = useState([]);

  const ref = () => {
    if (selected === null) {
      return collection(db, "products");
    } else {
      return collection(db, selected);
    }
  };

  useEffect(() => {
    setAmounts(basket.length);
  }, [basket.length]);
  useEffect(() => {
    onSnapshot(ref(), (snapshot) => {
      setData(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
  }, [ref]);

  useEffect(() => {
    onSnapshot(ref2(), (snapshot) => {
      setBasket(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
  }, [ref2]);

  const addBasket = async (id, name, price, image) => {
    const update = doc(db, auth.currentUser.uid, id);

    const basketId = basket.map((item) => item.productId);

    if (basketId.includes(id)) {
      updateDoc(update, {
        amount: increment(1),
      });
    } else {
      await setDoc(doc(db, auth.currentUser.uid, id), {
        productName: name,
        productId: id,
        productPrice: price,
        amount: 1,
        productImage: image,
      });
    }
  };
  return (
    <div className='flex flex-col items-center gap-5 '>
      <div className='w-60'>
        <div className='mt-5 m-auto w-50'>
          <Select options={options} onChange={handleChange} autoFocus={true} />
        </div>
      </div>
      <div className='flex gap-5 flex-wrap items-between justify-center '>
        {data.map((item) => (
          <div
            className='w-80 h-96 max-h-[500px] border pb-3 rounded-md p-2'
            key={item.id}
          >
            <div className='flex flex-col items-center'>
              <div>
                <img
                  src={item.productImage}
                  alt=''
                  className=' h-48 rounded-top-md mb-7'
                />
              </div>
              <div className='text-center h-10 mb-1'>
                <p className='text-xl text-center p-1 mb-2'>
                  {item.productName}
                </p>
              </div>
              <div className='mt-5'>
                <b>₺{item.productPrice}</b>
              </div>
              <div className='mt-2'>
                <button
                  className='p-2 bg-red-500 text-white rounded-md active:scale-95'
                  onClick={(e) => {
                    addBasket(
                      item.id,
                      item.productName,
                      item.productPrice,
                      item.productImage
                    );

                    e.target.innerText = "Ürün Eklendi";
                  }}
                >
                  Sepete Ekle
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllProducts;
