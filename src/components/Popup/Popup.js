import "./Popup.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { HIDE_POPUP } from "../../redux/action";
import { useNavigate } from "react-router-dom";
import { stateFormatPrice } from "../../redux/selector";

const Popup = ({ dataList }) => {
  const formatPrice = useSelector(stateFormatPrice);
  //console.log(dataList);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //an popup
  const btnCloseHandler = () => {
    dispatch(HIDE_POPUP());
  };
  //chuyen sang trang detail
  const navigatingDetailHanler = () => {
    navigate(`/detail/${dataList._id}`);
    dispatch(HIDE_POPUP());
  };
  return (
    <div className="wapperPopup">
      <div className="containerPopup row">
        <div className="itemPopup1 col-md-6">
          <img src={dataList.img1} alt="" />
        </div>
        <div className="itemPopup2 col-md-6">
          <div className="btnX row">
            <button className="btnClose" onClick={btnCloseHandler}>
              ×
            </button>
          </div>
          <div className="col-md-12">
            <h3>{dataList.name}</h3>
            <p>{formatPrice(dataList.price)} VND</p>
            <p>{dataList.short_desc}</p>
            <button className="btnDetail" onClick={navigatingDetailHanler}>
              <FontAwesomeIcon icon={faCartShopping} /> View Detail
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Popup;
