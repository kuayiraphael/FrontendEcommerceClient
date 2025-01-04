// // import React from "react";
// import ReactDOM from "react-dom/client";
// import "../node_modules/font-awesome/css/font-awesome.min.css";
// import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { Provider } from "react-redux";
// import store from "./redux/store";
// import {ProtectedRoute} from "./components";  // Import ProtectedRoute

// import {
//   Home,
//   Product,
//   Products,
//   AboutPage,
//   ContactPage,
//   Cart,
//   Login,
//   Register,
//   Checkout,
//   PageNotFound,
// } from "./pages";
// import ScrollToTop from "./components/ScrollToTop";
// import { Toaster } from "react-hot-toast";

// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(
//   <BrowserRouter>
//     <ScrollToTop>
//       <Provider store={store}>
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/product" element={<Products />} />
//           <Route path="/product/:id" element={<Product />} />
//           <Route path="/about" element={<AboutPage />} />
//           <Route path="/contact" element={<ContactPage />} />
          
//           {/* Protect routes that require authentication */}
//           <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
//           <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
          
//           <Route path="/login" element={<Login />} />
//           <Route path="/register" element={<Register />} />
          
//           <Route path="*" element={<PageNotFound />} />
//           <Route path="/product/*" element={<PageNotFound />} />
//         </Routes>
//       </Provider>
//     </ScrollToTop>
//     <Toaster />
//   </BrowserRouter>
// );

import React from "react";
import ReactDOM from "react-dom/client";
import "../node_modules/font-awesome/css/font-awesome.min.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import { ProtectedRoute } from "./components";

import {
  Home,
  Product,
  Products,
  AboutPage,
  ContactPage,
  Cart,
  Login,
  Register,
  Checkout,
  PageNotFound,
  Seller,
} from "./pages";
import ScrollToTop from "./components/ScrollToTop";
import { Toaster } from "react-hot-toast";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <ScrollToTop>
      <Provider store={store}>
        <Routes>
          {/* Set login as the default page */}
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/product" element={<Products />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />

          {/* Protected routes */}
          <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
          <Route path="/seller" element={<ProtectedRoute><Seller /></ProtectedRoute>} />
          <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Provider>
    </ScrollToTop>
    <Toaster />
  </BrowserRouter>
);

