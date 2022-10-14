import React from "react";
import { MDBContainer, MDBRow, MDBCol } from "mdb-react-ui-kit";
import "../Reviews/AnalyticPage.css";
import Analytics1 from "../Reviews/Analytics_1";
import Analytics2 from "../Reviews/Analytics_2";
import Analytics3 from "../Reviews/Analytics_3";
import Analytics4 from "../Reviews/Analytics_4";
function Analytics() {
  return (
    <div>
      <MDBContainer>
        <div className="analytic-heading">
          <h1>Analytics</h1>
        </div>
        <MDBRow>
          <MDBCol lg="6" md="6">
            <div className="analytic-1">
              <Analytics1 />
            </div>
          </MDBCol>
          <MDBCol lg="6" md="6">
            <div className="analytic-1">
              <Analytics2 />
            </div>
          </MDBCol>
        </MDBRow>
        <hr></hr>
        <MDBRow>
          <MDBCol lg="6" md="6">
            <div className="analytic-1">
              <Analytics4 />
            </div>
          </MDBCol>
          <MDBCol lg="6" md="6">
            <div className="analytic-1">
              <Analytics3 />
            </div>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
}

export default Analytics;
