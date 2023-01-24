import "./App.css";
import { Routes, Route } from "react-router-dom";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Home from "./Home";
import Auth from "./pages/Auth";
import MainLayout from "./pages/MainLayout";
import Basket from "./components/Basket";

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<MainLayout />}>
          <Route path='/' element={<Home />} />
          <Route path='sepet' element={<Basket />} />
        </Route>
        <Route to='/' element={<Auth />}>
          <Route path='/signup' element={<SignUp />} />
          <Route path='/signin' element={<SignIn />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
