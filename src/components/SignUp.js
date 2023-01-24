import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useState, useCallback } from "react";
import { auth } from "../Firebase";

const SignUp = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [name, setName] = useState();

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (!email || !password) {
        alert("Kullanıcı adı ya da şifre boş olamaz ! ");
      } else if (email.length < 8 || password.length < 8) {
        alert("Hatalı E-mail ya da şifre 8 haneden küçük tekrar deneyiniz");
      } else {
        createUserWithEmailAndPassword(auth, email, password)
          .then((auth) => {
            updateProfile(auth.user, { displayName: name });
          })
          .catch((e) =>
            e.code === "auth/email-already-in-use"
              ? alert("Bu email adresi daha önce alınmış")
              : alert("Hatalı email ya da şifre")
          );
      }
    },
    [name, email, password]
  );
  return (
    <div className='max-w-md mx-auto py-6 mt-5 p-3'>
      <h1 className='text-2xl'>Kayıt Ol</h1>
      <form action='' className='flex flex-col' onSubmit={handleSubmit}>
        <input
          type='Ad Soyad'
          className='p-4 bg-gray-100 rounded-md my-4'
          placeholder='Ad Soyad'
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
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
          className='p-4 bg-red-400 rounded-md mt-3'
          placeholder='Kayıt Ol'
        />
      </form>
    </div>
  );
};

export default SignUp;
