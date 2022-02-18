import { Link, useLocation } from "react-router-dom";
import "./Product.css";
import Chart from "../../components/chart/Chart";
// import { productData } from "../../utils/dummyData";
import { Publish } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { useMemo, useState, useEffect } from "react";
import { userRequest } from "../../utils/requestMethods";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../firebase";
import { updateProduct } from "../../redux/apiCalls";

export default function Product() {
  const location = useLocation();
  const productId = location.pathname.split("/")[2];
  const [productStats, setProductStats] = useState([]);
  const [inputs, setInputs] = useState({});
  const [imgFile, setImgFile] = useState(null);
  const [oldImage, setOldImage] = useState("");
  const [categories, setCategories] = useState([]);
  const [size, setSize] = useState([]);
  const [color, setColor] = useState([]);
  const dispatch = useDispatch();

  const handleInputsChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleCategories = (e) => {
    setCategories(e.target.value.split(","));
  };
  const handleSize = (e) => {
    setSize(e.target.value.split(","));
  };
  const handleColor = (e) => {
    setColor(e.target.value.split(","));
  };

  const handleUpdateProduct = (e) => {
    e.preventDefault();
    if (imgFile) {
      const fileName = new Date().getTime() + imgFile.name;
      const storage = getStorage(app);
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, imgFile);
      uploadTask.on(
        "state_changed",
        (error) => {
          // Handle unsuccessful uploads
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            const product = {
              ...inputs,
              img: downloadURL,
              categories,
              size,
              color,
            };
            updateProduct(productId, product, dispatch);
          });
        }
      );
    } else {
      const product = {
        ...inputs,
        img: oldImage,
        categories,
        size,
        color,
      };
      updateProduct(productId, product, dispatch);
    }
  };

  const product = useSelector((state) =>
    state?.product?.products?.find((product) => product?._id === productId)
  );

  const MONTHS = useMemo(
    () => [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    []
  );

  useEffect(() => {
    const getStats = async () => {
      try {
        const response = await userRequest.get(
          "orders/income?pid=" + productId
        );
        const list = response.data.sort((a, b) => {
          return a._id - b._id;
        });
        list.map((item) =>
          setProductStats((prev) => [
            ...prev,
            { name: MONTHS[item._id - 1], Sales: item.total },
          ])
        );
      } catch (error) {
        console.log(error);
      }
    };
    getStats();
  }, [MONTHS, productId]);

  useEffect(() => {
    setOldImage(product?.img);
  }, [product]);

  useEffect(() => {
    setCategories(product?.categories);
    setSize(product?.size);
    setColor(product?.color);
  }, []);

  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">Product</h1>
        <Link to="/newProduct">
          <button className="productAddButton">Create</button>
        </Link>
      </div>
      <div className="productTop">
        <div className="productTopLeft">
          <Chart
            data={productStats}
            dataKey="Sales"
            title="Sales Performance"
          />
        </div>
        <div className="productTopRight">
          <div className="productInfoTop">
            <img
              src={product?.img}
              alt={product?.title}
              className="productInfoImage"
            />
            <span className="productName">{product?.title}</span>
          </div>
          <div className="productInfoBottom">
            <div className="productInfoItem">
              <span className="productInfoKey">id:</span>
              <span className="productInfoValue">{product?._id}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">sales:</span>
              <span className="productInfoValue">5123</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">in stock:</span>
              <span className="productInfoValue">{product?.inStock}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="productBottom">
        <form className="productForm">
          <div className="productFormLeft">
            <label>Product Title</label>
            <textarea
              type="text"
              name="title"
              placeholder={product?.title}
              defaultValue={product?.title}
              onChange={handleInputsChange}
            />
            <label>Product Description</label>
            <textarea
              type="text"
              name="desc"
              placeholder={product?.desc}
              defaultValue={product?.desc}
              onChange={handleInputsChange}
            />
            <label>Price</label>
            <input
              type="number"
              name="price"
              placeholder={product?.price}
              defaultValue={product?.price}
              onChange={handleInputsChange}
            />
            <label>Categories</label>
            <input
              type="text"
              placeholder="shirt,kurti"
              defaultValue={categories}
              onChange={handleCategories}
            />
            <label>Size</label>
            <input
              type="text"
              placeholder="42,43"
              defaultValue={size}
              onChange={handleSize}
            />
            <label>Color</label>
            <input
              type="text"
              placeholder="red,blue"
              defaultValue={color}
              onChange={handleColor}
            />
            <label>In Stock</label>
            <select onChange={handleInputsChange} name="inStock" id="inStock">
              <option defaultValue={product?.inStock}>
                {product?.inStock ? "Yes" : "No"}
              </option>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>
          <div className="productFormRight">
            <div className="productUpload">
              <img
                src={product?.img}
                alt={product?.title}
                className="productUploadImage"
              />
              <label htmlFor="file">
                <Publish />
              </label>
              <input
                type="file"
                name="file"
                id="file"
                style={{ display: "none" }}
                onChange={(e) => setImgFile(e.target.files[0])}
              />
            </div>
            <button onClick={handleUpdateProduct} className="productButton">
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
