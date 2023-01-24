import { signInWithEmailAndPassword } from "firebase/auth";
import { Link } from "react-router-dom";
import { auth } from "../Firebase";
import { useState, useCallback } from "react";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();

      if (!email || !password) {
        alert("Kullanıcı adı ya da şifre boş olamaz !");
      }
      signInWithEmailAndPassword(auth, email, password).catch((e) =>
        e.code === "auth/user-not-found"
          ? alert("Böyle bir email kayıtlı değil.")
          : alert("Kullanıcı adı ya da şifre yanlış")
      );
    },
    [email, password]
  );
  return (
    <div className='max-w-md mx-auto py-6 mt-5 p-3'>
      <h1 className='text-2xl'>Giriş Yap</h1>
      <form action='' className='flex flex-col' onSubmit={handleSubmit}>
        <input
          type='email'
          className='p-4 bg-gray-100 rounded-md my-4'
          placeholder='Email'
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <input
          type='password'
          className='p-4 bg-gray-100 rounded-md my-4'
          placeholder='Şifre'
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <input
          type='Submit'
          name=''
          id=''
          className='p-4 bg-green-300 rounded-md mt-3'
          placeholder='Giriş Yap'
        />

        <div className='flex justify-between mt-4'>
          <Link className=' ' to='/signup'>
            Üye değil misin? Üye ol
          </Link>
          <Link className='' to='/forgotpassword'>
            Şifremi Unuttum
          </Link>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
