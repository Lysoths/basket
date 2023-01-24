import { signOut } from "firebase/auth";
import { useCallback } from "react";
import { auth, db } from "./Firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link } from "react-router-dom";
import { collection, onSnapshot } from "firebase/firestore";
import AddProduct from "./components/AddProduct";
import AllProducts from "./components/AllProducts";
import { useEffect, useState } from "react";

import "./Home.css";

const ref2 = () => {
  return collection(db, auth.currentUser.uid);
};

const Home = () => {
  const [basket, setBasket] = useState([]);
  const [animation, setAnimation] = useState(
    "material-symbols-outlined text-3xl"
  );
  const [amounts, setAmounts] = useState("");

  useEffect(() => {
    onSnapshot(ref2(), (snapshot) => {
      setBasket(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
  }, [ref2]);

  const handleSignOut = useCallback(() => {
    signOut(auth);
  }, []);

  const [user, isLoading] = useAuthState(auth);
  if (isLoading) {
    return <h1>Lütfen Bekleyiniz</h1>;
  }
  if (auth.currentUser.uid === "ZsUIivEE4rUZDGnDiHlckQY6Bo93") {
    return (
      <div className='container mx-auto '>
        <div className='flex items-center justify-between p-1 bg-red-500'>
          <div>
            <p className='text-white ml-2'>Hoşgeldin {user.displayName}</p>
          </div>
          <div className='flex items-center gap-2 text-white justify-center main'>
            <Link to='/sepet' className='flex items-center justify-center'>
              <span className='material-symbols-outlined text-3xl'>
                shopping_cart
              </span>
            </Link>
            <button
              className='text-white bg-red-500 p-2 rounded-md'
              onClick={handleSignOut}
            >
              Çıkış Yap
            </button>
          </div>
        </div>
        <div className='flex flex-col items-center min-h-screen p-10 '>
          <AddProduct />
          <AllProducts />
        </div>
      </div>
    );
  } else {
    return (
      <div className='container mx-auto '>
        <div className='flex items-center justify-between p-1 bg-red-500'>
          <div>
            <p className='text-white ml-2'>Hoşgeldin {user.displayName}</p>
          </div>
          <div className='flex items-center gap-2 text-white justify-center main'>
            {amounts === 0 ? (
              <div></div>
            ) : (
              <div className='basketAmount'>{amounts}</div>
            )}

            <Link to='/sepet' className='flex items-center justify-center '>
              <span className={animation}>shopping_cart</span>
            </Link>
            <button
              className='text-white bg-red-500 p-2 rounded-md'
              onClick={handleSignOut}
            >
              Çıkış Yap
            </button>
          </div>
        </div>
        <div className='flex flex-col items-center min-h-screen p-10 '>
          <AllProducts
            animation={animation}
            setAnimation={setAnimation}
            setAmounts={setAmounts}
            amounts={amounts}
          />
        </div>
      </div>
    );
  }
};

export default Home;
