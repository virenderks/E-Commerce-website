import React, { useContext, useState, Suspense } from "react";
import Footer from "./Components/Layout/Footer";
import Header from "./Components/Layout/Header";
import Loading from "./Components/UI/Loading";
import CartContext from "./Components/Store/cart-context";
import { Route, Routes, Navigate } from "react-router-dom";

const AuthForm = React.lazy(() => import("./Components/pages/Auth/AuthForm"));
const ProductDetails = React.lazy(() =>
  import("./Components/pages/ProductDetails/ProductDetails")
);
const Contact = React.lazy(() =>
  import("./Components/pages/Contact.js/Contact")
);
const Home = React.lazy(() => import("./Components/pages/Home"));
const About = React.lazy(() => import("./Components/pages/About"));
const Cart = React.lazy(() => import("./Components/Cart/Cart"));
const AvailableMusicAlbums = React.lazy(() =>
  import("./Components/Music/AvailableMusicAlbums")
);

function App(prop) {
  const [initCart, setInitCart] = useState(false);
  const cartctx = useContext(CartContext);

  const openCartHandler = () => {
    setInitCart(true);
  };

  const closeCartButtonHandler = () => {
    setInitCart(false);
  };

  return (
    <React.Fragment>
      <Header openCart={openCartHandler} />
      <Suspense fallback={<Loading>Loading...</Loading>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/store"
            element={
              cartctx.userIsLogin ? (
                <>
                  {initCart && <Cart closeCart={closeCartButtonHandler} />}
                  <AvailableMusicAlbums />
                </>
              ) : (
                <Navigate to="/auth" />
              )
            }
          />
          <Route path="/about" element={<About />} />
          {!cartctx.userIsLogin && (
            <Route path="/auth" element={<AuthForm />} />
          )}
          <Route path="/contact" element={<Contact />} />
          <Route
            path="/product-details"
            element={
              cartctx.userIsLogin ? (
                <ProductDetails />
              ) : (
                <Navigate to="/auth" />
              )
            }
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Suspense>
      <Footer />
    </React.Fragment>
  );
}

export default App;
