import { useState } from "react";
import "./PreviewImages.css";
const PreviewImages = ({ product }) => {
  //console.log(product);
  const [selectImage, setSelectIamge] = useState();
  return (
    <div className="containerPreview">
      <div className="image1234Preview">
        <img
          src={product.img1}
          alt=""
          onClick={() => setSelectIamge(product.img1)}
        />
        <img
          src={product.img2}
          alt=""
          onClick={() => setSelectIamge(product.img2)}
        />
        <img
          src={product.img3}
          alt=""
          onClick={() => setSelectIamge(product.img3)}
        />
        <img
          src={product.img4}
          alt=""
          onClick={() => setSelectIamge(product.img4)}
        />
      </div>
      <div className="imagePreviewPreview">
        <img src={selectImage ? selectImage : product.img1} alt="preview" />
      </div>
    </div>
  );
};

export default PreviewImages;
