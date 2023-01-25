import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../Firebase";
import { Navigate, Link } from "react-router-dom";

import {
  collection,
  onSnapshot,
  deleteDoc,
  updateDoc,
  doc,
  increment,
} from "firebase/firestore";
import { useState, useEffect } from "react";

const ref2 = () => {
  if (auth.currentUser.uid === null) {
    return collection(db, "products");
  } else {
    return collection(db, auth.currentUser.uid);
  }
};
const Basket = () => {
  const [basket, setBasket] = useState([]);

  let total = basket.map((item) => item.amount * item.productPrice);
  let totalPrice = total.reduce((a, b) => a + b, 0);

  useEffect(() => {
    onSnapshot(ref2(), (snapshot) => {
      setBasket(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
  }, [ref2]);

  const [user, isLoading] = useAuthState(auth);
  if (isLoading) {
    return <h1>Lütfen Bekleyiniz</h1>;
  }
  if (!user) {
    return <Navigate to='signIn' />;
  }

  const incrementProduct = async (id) => {
    const update = doc(db, auth.currentUser.uid, id);

    updateDoc(update, {
      amount: increment(1),
    });
  };

  const decrementProduct = async (id, amount) => {
    const update = doc(db, auth.currentUser.uid, id);

    if (amount > 1) {
      updateDoc(update, {
        amount: increment(-1),
      });
    } else {
      await deleteDoc(update);
    }
  };

  if (basket.length === 0) {
    return (
      <div className='container mx-auto h-full flex items-center flex-col gap-2 p-10 w-3/5'>
        <h1 className=' tracking-wider'>
          Sepetinizde Ürün Bulunmamaktadır. Ürün eklemek için{" "}
          <Link to='/' className='hover:text-red-500 underline'>
            tıklayınız
          </Link>
        </h1>
      </div>
    );
  }
  return (
    <div className='container mx-auto h-full flex flex-col gap-2 p-10 w-3/5 '>
      <Link className='hover:text-red-500' to='/'>
        Mağazaya Dön..
      </Link>
      {basket.map((item) => (
        <div
          className='flex justify-center flex-col border-2  p-3'
          key={item.id}
        >
          <div>
            <img src={item.productImage} alt='' className='w-20' />
            <p>Ürün Adı : {item.productName}</p>
          </div>

          <div className='flex justify-between'>
            <p> Toplam : {Math.floor(item.amount * item.productPrice)} ₺</p>
            <div className='flex items-center gap-3'>
              <button
                className='px-2 bg-red-400 text-white'
                onClick={() => incrementProduct(item.id, item.amount)}
              >
                +
              </button>
              <p className='border p-1 w-10 flex items-center justify-center'>
                {item.amount}
              </p>
              <button
                className='px-2 bg-red-400 text-white'
                onClick={() => decrementProduct(item.id, item.amount)}
              >
                -
              </button>
            </div>
          </div>
        </div>
      ))}
      <div className='flex items-center justify-between border-b p-2 rounded-md'>
        {totalPrice && (
          <p>
            Toplam Tutar : {parseFloat(totalPrice).toLocaleString("tr-TR")} ₺
          </p>
        )}
        <p className='bg-red-400 text-white p-1 rounded-md'>
          Alışverişi Tamamla
        </p>
      </div>
    </div>
  );
};

export default Basket;
