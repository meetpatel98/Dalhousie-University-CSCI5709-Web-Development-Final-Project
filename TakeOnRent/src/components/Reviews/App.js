import React from "react";
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import ProductReviews from "./PostedReviews";
import ProductPage from "./ProductPage";
import CreateProductReview from "./CreateProductReview";
import CreateOwnerReview from "./CreateOwnerReview";
import Analytic from "./Analytics";

function App() {
  return (
    <Router>
    <div>
      <Routes>
          <Route exact path="/productpage" element={<ProductPage />} />
          <Route exact path="/productreviews" element={<ProductReviews/>}/>
          <Route exact path="/createproductreview" element={<CreateProductReview/>}/>
          <Route exact path="/createownerreview" element={<CreateOwnerReview/>}/>
          <Route exact path="/analytic" element={<Analytic/>}/>
      </Routes>
    </div>
    </Router>
  );
}

export default App;
