import "./Footer.css";
const Footer = () => {
  return (
    <div className="wapperFooter row">
      <div className="col-md-3">
        <h3>Customer</h3>
        <a href="#">Help & Contact Us</a>
        <a href="#">Return & Refunds</a>
        <a href="#">Online Store</a>
        <a href="#">Term & Conditions</a>
      </div>
      <div className="col-md-3">
        <h3>Company</h3>
        <a href="#">What We Do</a>
        <a href="#">Available Services</a>
        <a href="#">Latest Posts</a>
        <a href="#">FAQs</a>
      </div>
      <div className="col-md-3">
        <h3>Social media</h3>
        <a href="#">Twitter</a>
        <a href="#">Instagram</a>
        <a href="#">Facebook</a>
        <a href="#">Pinterest</a>
      </div>
    </div>
  );
};

export default Footer;
