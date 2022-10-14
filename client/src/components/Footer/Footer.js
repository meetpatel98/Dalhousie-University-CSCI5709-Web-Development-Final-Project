import "./Footer.css";
import { Navbar, Nav, Container } from "react-bootstrap";

const Footer = () => {
  return (
    // <footer class="py-4 bg-light">
    //   <div class="container text-center ">
    //     <small>Copyright &copy; takeonrent</small>
       
    //   </div>
    // </footer>


      <Navbar
        className="p-2 mb-3 bg-light footer"
        collapseOnSelect
        expand="md"
        bg="light"
        sticky="bottom"
      >
        <div className="container-fluid" id="navbar">
          {/* <Navbar.Toggle aria-controls="responsive-navbar-nav" /> */}
          
            <Nav>
              <Nav.Link href="/aboutus">About Us</Nav.Link>
              <Nav.Link href="/contactus">Contact Us</Nav.Link>
            </Nav>
          
        </div>
      </Navbar>

  );
};

export default Footer;
