import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ShoppingCart from "./pages/ShoppingCart";
import NotFound from "./pages/NotFound";
import Layout from "./layout/Layout";
import ProductInfo from "./pages/ProductInfo";
import { ScrollToTop } from "./components/ScrollTop";
import Categories from "./pages/Categories";
import Orders from "./pages/Orders";
import { useAuthSync } from "./hooks/useAuthSync";

function App() {
  // Sincronizar el estado de autenticación con Firebase
  useAuthSync();

  return (
    <>
      <Layout>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductInfo />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/cart" element={<ShoppingCart />} />
          <Route path="/orders" element={<Orders />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </>
  );
}

export default App;
