import "./OtherInformations.css";
const OtherInformations = () => {
  return (
    <div>
      <div className="row itemOther1">
        <div className="col-md-4">
          <h3>Freeshipping</h3>
          <p>FreeShipping worldwide</p>
        </div>
        <div className="col-md-4">
          <h3>24x7 service</h3>
          <p>FreeShipping worldwide</p>
        </div>
        <div className="col-md-4">
          <h3>festival offer</h3>
          <p>FreeShipping worldwide</p>
        </div>
      </div>
      <div className="row itemOther2">
        <div className="col-md-6">
          <h3>Let's be friends!</h3>
          <p>Nisi nisi tempor consequat laboris nisi</p>
        </div>
        <div className="col-md-6">
          <input type="text" placeholder="Enter your email address" />
          <button>Subcribe</button>
        </div>
      </div>
    </div>
  );
};

export default OtherInformations;
