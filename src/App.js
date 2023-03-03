import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Homepage from "./pages/HomePage/Homepage";
import ShopPage from "./pages/ShopPage/ShopPage";
import CartPage from "./pages/CartPage/CartPage";
import DetailPage from "./pages/DetailPage/DetailPage";
import CheckoutPage from "./pages/CheckoutPage/CheckoutPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { DATA_HOME } from "./redux/action";
import History from "./pages/History/History";
import DetailHistory from "./pages/History/Component/DetailHistory";
import axiosClient from "./components/axios/axios";

function App() {
  //ham truyen action
  const dispatch = useDispatch();
  //xu ly api
  useEffect(() => {
    axiosClient.get("/products").then((res) => dispatch(DATA_HOME(res.data))); //truyen data
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Homepage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/detail/:id" element={<DetailPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/history" element={<History />} />
          <Route path="/history/:id" element={<DetailHistory />} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
