import "./Contact.css";

const Aboutus = () => {
  return (
    <div className="form-container">
      <h3>About Us</h3>
      <p className="text-left">
        {/* <center>Already a user? <Link to="/signin">sign in</Link></center> */}
        TakeOnRent is a go-to platform for users to take equipment on rent which required a good
        amount of upfront investment. TakeOnRent acts as a bridge between users who own such
        equipment but are not in active use as well as idle users who are looking for such
        equipment but they are not in a position to invest some amount in the purchase of that
        equipment. Instead of investing a huge amount in equipment for single-use.
        <br/>
        
        TakeOnRent provides an opportunity to take such equipment on rent at a good price.
        TakeOnRent aims to provide benefits to both parties, to one by giving a chance to earn
        some money by taking advantage of idle equipment and others to not spend a huge amount
        on the purchase of equipment for a single-use instead tiny proportion of amount for rental
        of equipment.

      </p>
    </div>
  );
};

export default Aboutus;