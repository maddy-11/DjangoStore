import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ChangePassword from "./Pages/ChangePassword";
import EmailVerification from "./Pages/EmailVerification";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import ResetPassword from "./Pages/ResetPassword";
import ResetPasswordConfirm from "./Pages/ResetPasswordConfirm";
import Signup from "./Pages/Signup";
import Layout from "./High Order Function/Layout";
import ShopLayout from "./High Order Function/ShopLayout";
import HomeLayout from "./High Order Function/HomeLayout";
import "./css/main.css";
import { Provider } from "react-redux";
import Store from "./Store";
import Shop from "./Pages/Shop";
import ProductDetail from "./Pages/ProductDetail";
import AboutPage from "./Pages/About";
import AddProduct from "./Pages/AddProduct";
import Cart from "./Pages/Cart";
import Checkout from "./Pages/Checkout";
import Contact from "./Pages/ContactPage";
import Profile from "./Pages/Profile";
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51NurHQDKJaSz4I59SYuGWb6VPSuLCHGyYs3b0UrVesTtBv6jg1YzbxgFK9nKmAaRAwJdeYHv8AYjY3JM9sF6poCd00UOe63BZO');
const App = () => {
  return (
    <Provider store={Store}>
      <Router>
        <Routes>
          {/* ShopLayout */}
          <Route exact path="/shop" element={<ShopLayout><Shop/></ShopLayout>} />
          {/* HomeLayout */}
          <Route path="/profile" element={<HomeLayout><Profile /></HomeLayout>} />

          <Route path="/product/:id/" element={<HomeLayout><ProductDetail /></HomeLayout>} />
          <Route path="/cart" element={<HomeLayout><Cart /></HomeLayout>} />
          {/* Checkout should be wrapped with Elements */}
          <Route path="/checkout" element={<HomeLayout><Elements stripe={stripePromise}><Checkout /></Elements></HomeLayout>} />

          {/* Layout */}
          <Route exact path="/" element={<Layout><Home /></Layout>}></Route>
          <Route path="/about" element={<Layout><AboutPage/></Layout>}></Route>
          <Route path="/contact" element={<Layout><Contact/></Layout>}></Route>
          <Route path="/add-product" element={<Layout><AddProduct/></Layout>}></Route>
          <Route path="login/" element={<Layout><Login/></Layout>}></Route>
          <Route path="signup/" element={<Layout><Signup/></Layout>}></Route>
          <Route path="change/password/" element={<Layout><ChangePassword/></Layout>}></Route>
          <Route path="reset/password/" element={<Layout><ResetPassword/></Layout>}></Route>
          <Route path="dj-rest-auth/registration/account-confirm-email/:key/" element={<Layout><EmailVerification/></Layout>}></Route>
          <Route path="reset-password/confirm/:uid/:token" element={<Layout><ResetPasswordConfirm/></Layout>}></Route>
        </Routes>
      </Router>
    </Provider>
  )
}

export default App;
