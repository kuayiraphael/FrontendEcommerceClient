import React, { useState, useEffect } from "react";
import axios from "axios";
import { Navbar, Footer } from "../components";
import { useNavigate } from "react-router-dom";
import {
    FiSearch,
    FiPlus,
    FiEdit,
    FiTrash2,
    FiBox,
    FiDollarSign,
    FiCheckCircle,
    FiRefreshCw, // Added for clear button icon
} from "react-icons/fi";

const productTypes = [
    "Electronics",
    "Fashion",
    "Home and Kitchen",
    "Health and Personal Care",
    "Books and Stationery",
    "Sports and Outdoors",
    "Toys and Games",
    "Beauty and Cosmetics",
    "Automotive",
    "Jewelry and Accessories",
    "Groceries and Food",
    "Baby Products",
    "Pet Supplies",
    "Tools and Hardware",
    "Office Supplies",
    "Musical Instruments",
    "Furniture",
    "Art and Craft",
    "Industrial and Scientific",
    "Video Games and Consoles",
    "Music",
];

const initialFormState = {
    name: "",
    desc: "",
    img: "",
    type: "",
    unit: "",
    price: "",
    available: true,
    supplier: "",
}; // Added to store initial state

const SellerManagement = () => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [showEditProductModal, setShowEditProductModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(initialFormState);

  const navigate = useNavigate();
  const API_URL = "http://localhost:8003";
  const accessToken = localStorage.getItem("accessToken");

  const CLOUD_NAME = "dprosgsvm";
  const UPLOAD_PRESET = "productform";

  useEffect(() => {
    fetchSellerProducts();
  }, []);

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        formData
      );
      if (response.data.secure_url) {
        setFormData((prev) => ({ ...prev, img: response.data.secure_url }));
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const fetchSellerProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/user-products`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      if (response.data && Array.isArray(response.data.data)) {
        setProducts(response.data.data);
      } else {
        setProducts([]);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddProduct = async () => {
    try {
      const response = await axios.post(`${API_URL}/product/create`, formData, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      if (response.data) {
        setShowAddProductModal(false);
        fetchSellerProducts();
        setFormData(initialFormState);
      }
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  const handleEditProduct = async () => {
    try {
      const response = await axios.put(
        `${API_URL}/product/${selectedProduct._id}`,
        formData,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      if (response.data) {
        setShowEditProductModal(false);
        fetchSellerProducts();
      }
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const handleDeleteProduct = async (productId) => {
    try {
      const response = await axios.delete(`${API_URL}/product/${productId}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      if (response.data) {
        fetchSellerProducts();
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const openEditModal = (product) => {
    setSelectedProduct(product);
    setFormData({
      name: product.name,
      desc: product.desc,
      img: product.img,
      type: product.type,
      unit: product.unit,
      price: product.price,
      available: product.available,
      supplier: product.supplier,
    });
    setShowEditProductModal(true);
  };

  const handleClearFields = () => {
    setFormData(initialFormState);
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderFormFields = () => (
    <form className="d-grid gap-3">
      <div className="row g-3">
        <div className="col-md-6">
          <label className="form-label">Product Name</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="col-md-6">
          <label className="form-label">Price</label>
          <div className="input-group">
            <span className="input-group-text">$</span>
            <input
              type="number"
              className="form-control"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>
      </div>

      <div>
        <label className="form-label">Description</label>
        <textarea
          className="form-control"
          name="desc"
          value={formData.desc}
          onChange={handleInputChange}
          rows="3"
        />
      </div>

      <div>
        <label className="form-label">Supplier</label>
        <input
          type="text"
          className="form-control"
          name="supplier"
          value={formData.supplier}
          onChange={handleInputChange}
          required
        />
      </div>

      <div>
        <label className="form-label">Product Image</label>
        <input
          type="file"
          className="form-control"
          onChange={handleFileUpload}
          accept="image/*"
        />
      </div>

      <div className="row g-3">
        <div className="col-md-6">
          <label className="form-label">Product Type</label>
          <select
            className="form-select"
            name="type"
            value={formData.type}
            onChange={handleInputChange}
            required
          >
            <option value="">Select type</option>
            {productTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-6">
          <label className="form-label">Unit</label>
          <input
            type="text"
            className="form-control"
            name="unit"
            value={formData.unit}
            onChange={handleInputChange}
            required
          />
        </div>
      </div>

      <div className="form-check form-switch mt-3">
        <input
          className="form-check-input"
          type="checkbox"
          role="switch"
          id="available"
          name="available"
          checked={formData.available}
          onChange={(e) =>
            setFormData({ ...formData, available: e.target.checked })
          }
        />
        <label className="form-check-label" htmlFor="available">
          Available
        </label>
      </div>
      <button
        type="button"
        className="btn btn-outline-secondary mt-3"
        onClick={handleClearFields}
      >
        <FiRefreshCw className="me-1" /> Clear All Fields
      </button>
    </form>
  );

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="container my-5 text-center">
          <div className="spinner-border text-primary" role="status" />
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="container my-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h2 className="text-primary fw-bold mb-0">Manage Products</h2>
            <small className="text-muted">
              {products.length} products listed
            </small>
          </div>
          <button
            className="btn btn-primary d-flex align-items-center"
            onClick={() => setShowAddProductModal(true)}
          >
            <FiPlus className="me-2" /> Add Product
          </button>
        </div>

        <div className="input-group mb-4 shadow-sm">
          <span className="input-group-text bg-white border-end-0">
            <FiSearch className="text-muted" />
          </span>
          <input
            type="text"
            className="form-control border-start-0"
            placeholder="Search products by name..."
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>

        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div key={product._id} className="col">
                <div className="card h-100 shadow-sm hover-shadow transition-all">
                  <div
                    className="card-img-top overflow-hidden"
                    style={{ height: "200px" }}
                  >
                    <img
                      src={product.img || "https://via.placeholder.com/300x200"}
                      className="w-100 h-100 object-fit-cover"
                      alt={product.name}
                    />
                  </div>
                  <div className="card-body d-flex flex-column">
                    <div className="d-flex justify-content-between align-items-start mb-3">
                      <h5 className="card-title fw-semibold mb-0">
                        {product.name}
                      </h5>
                      <span className="badge bg-primary bg-opacity-10 text-primary">
                        {product.type}
                      </span>
                    </div>
                    <p className="card-text text-muted small flex-grow-1">
                      {product.desc}
                    </p>

                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <div className="d-flex align-items-center">
                        <FiDollarSign className="me-1" />
                        <span className="fw-semibold">{product.price}</span>
                        <span className="text-muted ms-1">/{product.unit}</span>
                      </div>
                      <span
                        className={`badge ${
                          product.available ? "bg-success" : "bg-danger"
                        }`}
                      >
                        {product.available ? "In Stock" : "Out of Stock"}
                      </span>
                    </div>

                    <div className="d-flex gap-2">
                      <button
                        className="btn btn-outline-primary btn-sm d-flex align-items-center flex-grow-1"
                        onClick={() => openEditModal(product)}
                      >
                        <FiEdit className="me-1" /> Edit
                      </button>
                      <button
                        className="btn btn-outline-danger btn-sm d-flex align-items-center"
                        onClick={() => handleDeleteProduct(product._id)}
                      >
                        <FiTrash2 className="me-1" /> Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-12 text-center py-5">
              <FiBox className="display-4 text-muted mb-3" />
              <h4 className="text-muted">No products found</h4>
            </div>
          )}
        </div>
      </div>

      {(showAddProductModal || showEditProductModal) && (
        <div
          className="modal fade show"
          style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-0 shadow-lg">
              <div className="modal-header bg-primary text-white">
                <h5 className="modal-title">
                  {showAddProductModal ? "Add New Product" : "Edit Product"}
                </h5>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  onClick={() =>
                    showAddProductModal
                      ? setShowAddProductModal(false)
                      : setShowEditProductModal(false)
                  }
                />
              </div>
              <div className="modal-body">{renderFormFields()}</div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={() =>
                    showAddProductModal
                      ? setShowAddProductModal(false)
                      : setShowEditProductModal(false)
                  }
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={
                    showAddProductModal ? handleAddProduct : handleEditProduct
                  }
                >
                  <FiCheckCircle className="me-1" />
                  {showAddProductModal ? "Create Product" : "Save Changes"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
};

export default SellerManagement;
