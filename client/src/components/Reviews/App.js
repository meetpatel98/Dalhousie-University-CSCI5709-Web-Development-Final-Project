import React from "react";
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import ProductReviews from "./PostedReviews";
import ProductPage from "./ProductPage";
import CreateProductReview from "./CreateProductReview";
import UpdateProductReview from "./UpdateProductReview";
import CreateOwnerReview from "./CreateOwnerReview";
import Analytic from "./Analytics";

function App() {
  return (
    <Router>
    <div>
      <Routes>
          <Route exact path="/productpage" element={<ProductPage />} />
          <Route exact path="/review/:id" element={<ProductReviews/>}/>
          <Route exact path="/reviews/createproductreview" element={<CreateProductReview/>}/>
          <Route exact path="/reviews/createownerreview" element={<UpdateProductReview/>}/>
          <Route exact path="/createownerreview" element={<CreateOwnerReview/>}/>
          <Route exact path="/analytic" element={<Analytic/>}/>
      </Routes>
    </div>
    </Router>
  );
}

export default App;
