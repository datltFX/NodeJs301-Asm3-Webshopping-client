import { useNavigate } from "react-router-dom";
import "./Banner.css";

function Banner() {
  const navigate = useNavigate();
  const handdleClick = () => {
    navigate("/shop");
  };

  return (
    <div>
      <div className="wapperBanner">
        <p>NEW INSPIRATION 2020</p>
        <h3>20% OFF ON NEW SEASON</h3>
        <button onClick={handdleClick}>Browse collections</button>
      </div>
    </div>
  );
}

export default Banner;
