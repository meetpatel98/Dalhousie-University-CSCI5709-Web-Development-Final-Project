import "./Header.css";
import rentlogo from "../../assets/images/rent.png";
import user from "../../assets/images/user.png";
import { Badge } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link } from "react-router-dom";

const Header = (props) => {
  return (
    <nav class="navbar  navbar-expand-lg navbar-light bg-light  sticky-top">
      <a class="navbar-brand" href="/signup">
        {/* rent logo has been taken from the "https://www.flaticon.com/free-icon/for-rent_1009805" */}
        <img src={rentlogo} alt="For rent" className="rent-logo" />
      </a>
      <button
        class="navbar-toggler"
        aria-controls="signup"
        aria-expanded="false"
        aria-label="Signup navigation"
        type="button"
        data-toggle="collapse"
        data-target="#signup"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="signup">
        <ul class="navbar-nav">
          <li class="nav-item">
            <a class="nav-link" href="/communityforum">
              Community Forum
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/productpage">
              Reviews
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/products">
              Take on rent
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/addproducts">
              Put on rent
            </a>
          </li>
          {/* <li class="nav-item">
            <a class="nav-link" href="/editproduct">
              Edit Product
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/deleteproduct">
              Delete Product
            </a>
          </li> */}
          <li class="nav-item">
            <a class="nav-link" href="/createcoupon">
              Create Coupon
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/MainBillingPage">
              Billing
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/analytic">
              Analytics
            </a>
          </li>
        </ul>
        <ul class="navbar-nav" style={{ marginLeft: "auto" }}>
          <li class="nav-item">
            <a class="nav-link" href="">
              <Badge badgeContent={props.countCartItems} color="secondary">
                <Link to="/cart">
                  {" "}
                  <ShoppingCartIcon />{" "}
                </Link>
              </Badge>
            </a>
          </li>

          <li class="nav-item">
            <a class="nav-link" href="/signin">
              Login
            </a>
          </li>
          <li class="nav-item  active">
            <a class="nav-link" href="/signup">
              Signup
            </a>
          </li>
          <li class="nav-item dropdown">
            <a
              class="nav-link"
              href="#"
              id="navbarDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="true"
            >
              <img
                src={user}
                alt="user profile pic"
                className="user-profile-pic"
              />
            </a>
            <div
              class="dropdown-menu dropdown-menu-md-right"
              aria-labelledby="navbarDropdown"
            >
              <a class="dropdown-item" href="/userprofile">
                Profile
              </a>
              <a class="dropdown-item" href="/signup">
                Signout
              </a>
              {/* <div class="dropdown-divider"></div>
              <a class="dropdown-item" href="#">
                Something else here
              </a> */}
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;
