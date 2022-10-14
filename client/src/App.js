import "./App.css";
import Signup from "./components/useraccount/Signup";
import Signin from "./components/useraccount/Signin";
import Forgetpswd from "./components/useraccount/Forgetpswd";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Posts from "./components/CommunityForum/Posts";
import Profile from "./components/useraccount/Profile";
import ProductReviews from "./components/Reviews/PostedReviews";
import PostedOwnerReviews from "./components/Reviews/PostedOwnerReviews";
import ProductPage from "./components/Reviews/ProductPage";
import AddProduct from "./components/CreateProduct/AddProduct";
import CreateProductReview from "./components/Reviews/CreateProductReview";
import CreateOwnerReview from "./components/Reviews/CreateOwnerReview";
import UpdateProductReview from "./components/Reviews/UpdateProductReview";
import Analytic from "./components/Reviews/Analytics";
import CouponCreation from "./components/CreateProduct/CouponCreation";
import MainBillingPage from "./components/Billing/MainBillingPage";
import { useState } from "react";
import Main from "./components/productcatalogue/Main";
import Cart from "./components/productcatalogue/Cart";
import Product1 from "./components/productcatalogue/Product1";
import data from "./data";
import Contactus from "./components/Footer/Contact";
import Aboutus from "./components/Footer/Aboutus";
import "react-toastify/dist/ReactToastify.css";
import Verifyaccount from "./components/useraccount/VerifyAccount";
import { ToastContainer } from "react-toastify";
import Authenticator from "./components/Authenticator/Authenticator";
import UnAuthenticatedRoute from "./components/Authenticator/UnAuthenticatedRoute";
import ResetPassword from "./components/useraccount/ResetPassword";
import Thank from "./components/Billing/Thank";

function App() {
  const { products } = data;
  const [cartItems, setCartItems] = useState([]);

  const onAdd = (product) => {
    const exist = cartItems.find((x) => x.id === product.id);
    if (exist) {
      setCartItems(
        cartItems.map((x) =>
          x.id === product.id ? { ...exist, qty: exist.qty + 1 } : x
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, qty: 1 }]);
    }
  };
  const onRemove = (product) => {
    const exist = cartItems.find((x) => x.id === product.id);
    if (exist.qty === 1) {
      setCartItems(cartItems.filter((x) => x.id !== product.id));
    } else {
      setCartItems(
        cartItems.map((x) =>
          x.id === product.id ? { ...exist, qty: exist.qty - 1 } : x
        )
      );
    }
  };
  return (
    <div>
      <ToastContainer />
      {/* <header className="App-header"></header> */}

      <BrowserRouter>
        <Header countCartItems={cartItems.length} />
        <div className="container">
		
			
          <Routes>
            <Route exact path="/contactus" element={<Contactus />} />
            <Route exact path="/aboutus" element={<Aboutus />}></Route>
          </Routes>
		
          <Routes>
            <Route path="/" element={<Authenticator />}>
              <Route path="/communityforum" element={<Posts />}></Route>
              <Route path="/userprofile" element={<Profile />}></Route>
              <Route exact path="/productpage" element={<ProductPage />} />
              <Route path="/thank" element={<Thank />} />
              <Route
                exact
                path="/addproducts"
                element={<AddProduct></AddProduct>}
              />
              <Route
                exact
                path="/createcoupon"
                element={<CouponCreation></CouponCreation>}
              />
              <Route exact path="/review/:id" element={<ProductReviews />} />
              <Route
                exact
                path="/review/owner/:id"
                element={<PostedOwnerReviews />}
              />
              <Route
                exact
                path="/MainBillingPage"
                element={<MainBillingPage />}
              />
              <Route
                exact
                path="/product/:id/review/createproductreview"
                element={<CreateProductReview />}
              />
              <Route
                exact
                path="/product/:id/review/updateproductreview"
                element={<UpdateProductReview />}
              />
              <Route
                exact
                path="/product/:id/review/createownerreview"
                element={<CreateOwnerReview />}
              />
              <Route
                exact
                path="/products"
                element={
                  <div className="row">
                    <Main products={products} onAdd={onAdd}></Main>
                  </div>
                }
              ></Route>
              <Route
                exact
                path="/product/:id"
                element={
                  <div className="row">
                    <Product1 products={products} onAdd={onAdd}></Product1>
                  </div>
                }
              ></Route>
              <Route
                exact
                path="/cart"
                element={
                  <Cart
                    className="block"
                    cartItems={cartItems}
                    onAdd={onAdd}
                    onRemove={onRemove}
                  ></Cart>
                }
              />
            </Route>
          </Routes>

          <Routes>
            <Route
              path="/"
              element={<UnAuthenticatedRoute restrictedToPublicOnly={true} />}
            >
              <Route path="/" element={<Signin />}></Route>
              <Route path="/signup" element={<Signup />}></Route>
              <Route path="/signin" element={<Signin />}></Route>
              <Route path="/forgetpswd" element={<Forgetpswd />}></Route>
              <Route
                exact
                path="/verifyaccount/:id"
                element={<Verifyaccount />}
              />
              <Route
                exact
                path="/resetpassword/:token"
                element={<ResetPassword />}
              />
            </Route>
          </Routes>
        </div>
      </BrowserRouter>

      <Footer />
    </div>
  );
}

export default App;
