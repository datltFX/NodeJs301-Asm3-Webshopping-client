import Banner from "../../components/Banner/Banner";
import Category from "../../components/Category/Category";
import ListProducts from "../../components/ListProducts/ListProducts";
import Livechat from "../../components/Livechat/Livechat";
import OtherInformations from "../../components/OtherInformations/OtherInformations";

const Homepage = () => {
  return (
    <div>
      <Banner />
      <Category />
      <ListProducts />
      <OtherInformations />
      <Livechat />
    </div>
  );
};

export default Homepage;
