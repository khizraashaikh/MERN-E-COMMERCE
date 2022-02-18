import { useState } from "react";
import "./NewProduct.css";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../firebase";
import { useDispatch } from "react-redux";
import { addProduct } from "../../redux/apiCalls";

export default function NewProduct() {
  const [inputs, setInputs] = useState({});
  const [imgFile, setImgFile] = useState(null);
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

  const handleCreateProduct = (e) => {
    e.preventDefault();
    const fileName = new Date().getTime() + imgFile.name;
    const storage = getStorage(app);
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, imgFile);

    // Register three observers:
    // 1. 'state_changed' observer, called any time the state changes
    // 2. Error observer, called on failure
    // 3. Completion observer, called on successful completion
    uploadTask.on(
        "state_changed",
      //   (snapshot) => {
      //     // Observe state change events such as progress, pause, and resume
      //     // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      //     const progress =
      //       (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      //     console.log("Upload is " + progress + "% done");
      //     switch (snapshot.state) {
      //       case "paused":
      //         console.log("Upload is paused");
      //         break;
      //       case "running":
      //         console.log("Upload is running");
      //         break;
      //       default:
      //     }
      //   },
      (error) => {
        // Handle unsuccessful uploads
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          const product = {
            ...inputs,
            img: downloadURL,
            categories,
            size,
            color,
          };
          addProduct(product, dispatch);
        });
      }
    );
  };

  return (
    <div className="newProduct">
      <h1 className="addProductTitle">New Product</h1>
      <form className="addProductForm">
        <div className="addProductItem">
          <label>Image</label>
          <input
            type="file"
            name="file"
            id="file"
            onChange={(e) => setImgFile(e.target.files[0])}
          />
        </div>
        <div className="addProductItem">
          <label>Title</label>
          <textarea
            type="text"
            name="title"
            placeholder="Apple Airpods"
            onChange={handleInputsChange}
          />
        </div>
        <div className="addProductItem">
          <label>Description</label>
          <textarea
            type="text"
            name="desc"
            placeholder="description..."
            onChange={handleInputsChange}
          />
        </div>
        <div className="addProductItem">
          <label>Price</label>
          <input
            type="number"
            name="price"
            placeholder="100"
            onChange={handleInputsChange}
          />
        </div>
        <div className="addProductItem">
          <label>Categories</label>
          <input
            type="text"
            placeholder="shirt,kurti"
            onChange={handleCategories}
          />
        </div>
        <div className="addProductItem">
          <label>Size</label>
          <input type="text" placeholder="42,43" onChange={handleSize} />
        </div>
        <div className="addProductItem">
          <label>Color</label>
          <input type="text" placeholder="red,blue" onChange={handleColor} />
        </div>
        <div className="addProductItem">
          <label>Stock</label>
          <select name="inStock" id="inStock" onChange={handleInputsChange}>
            <option value="true">Yes</option>
            <option value="False">No</option>
          </select>
        </div>
        <button onClick={handleCreateProduct} className="addProductButton">
          Create
        </button>
      </form>
    </div>
  );
}
