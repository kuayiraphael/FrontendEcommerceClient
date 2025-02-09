import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Seller = () => {
  const [formData, setFormData] = useState({
    productName: "",
    productDesc: "",
    productImg: "",
    productType: "",
    productUnit: 1,
    productPrice: 0,
    productAvailable: false,
    productSupplier: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [validationErrors, setValidationErrors] = useState({});

  const enumValues = [
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

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [id]: type === "checkbox" ? checked : value,
    });
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.productName) errors.productName = "Product name is required";
    if (!formData.productDesc)
      errors.productDesc = "Product description is required";
    if (!formData.productImg)
      errors.productImg = "Product image URL is required";
    if (!formData.productType) errors.productType = "Product type is required";
    if (!formData.productUnit || formData.productUnit <= 0)
      errors.productUnit = "Product unit must be a positive number";
    if (!formData.productPrice || formData.productPrice <= 0)
      errors.productPrice = "Product price must be a positive number";
    if (!formData.productSupplier)
      errors.productSupplier = "Supplier name is required";

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    if (!validateForm()) return; // Stop form submission if validation fails

    const bearerToken = "your_bearer_token_here"; // Replace with the actual token
    const url = "https://products-microservice-kprm.onrender.com/product/create";

    const bodyData = {
      name: formData.productName,
      desc: formData.productDesc,
      img: formData.productImg,
      type: formData.productType,
      unit: formData.productUnit,
      price: formData.productPrice,
      available: formData.productAvailable,
      supplier: formData.productSupplier,
    };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${bearerToken}`,
        },
        body: JSON.stringify(bodyData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to create product");
      }

      setSuccess("Product created successfully!");
    } catch (error) {
      setError(error.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow-sm">
            <div className="card-header bg-primary text-white text-center">
              <h4>Seller Product Form</h4>
            </div>
            <div className="card-body">
              {error && <div className="alert alert-danger">{error}</div>}
              {success && <div className="alert alert-success">{success}</div>}
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="productName" className="form-label">
                    Product Name
                  </label>
                  <input
                    type="text"
                    className={`form-control ${
                      validationErrors.productName ? "is-invalid" : ""
                    }`}
                    id="productName"
                    placeholder="Enter product name"
                    value={formData.productName}
                    onChange={handleChange}
                    required
                  />
                  {validationErrors.productName && (
                    <div className="invalid-feedback">
                      {validationErrors.productName}
                    </div>
                  )}
                </div>
                <div className="mb-3">
                  <label htmlFor="productDesc" className="form-label">
                    Description
                  </label>
                  <textarea
                    className={`form-control ${
                      validationErrors.productDesc ? "is-invalid" : ""
                    }`}
                    id="productDesc"
                    rows="3"
                    placeholder="Enter product description"
                    value={formData.productDesc}
                    onChange={handleChange}
                    required></textarea>
                  {validationErrors.productDesc && (
                    <div className="invalid-feedback">
                      {validationErrors.productDesc}
                    </div>
                  )}
                </div>
                <div className="mb-3">
                  <label htmlFor="productImg" className="form-label">
                    Image URL
                  </label>
                  <input
                    type="url"
                    className={`form-control ${
                      validationErrors.productImg ? "is-invalid" : ""
                    }`}
                    id="productImg"
                    placeholder="Enter product image URL"
                    value={formData.productImg}
                    onChange={handleChange}
                    required
                  />
                  {validationErrors.productImg && (
                    <div className="invalid-feedback">
                      {validationErrors.productImg}
                    </div>
                  )}
                </div>
                <div className="mb-3">
                  <label htmlFor="productType" className="form-label">
                    Type
                  </label>
                  <input
                    type="text"
                    className={`form-control ${
                      validationErrors.productType ? "is-invalid" : ""
                    }`}
                    id="productType"
                    placeholder="Select or enter product type"
                    value={formData.productType}
                    onChange={handleChange}
                    list="productTypeOptions"
                    required
                  />
                  <datalist id="productTypeOptions">
                    {enumValues.map((type) => (
                      <option key={type} value={type} />
                    ))}
                  </datalist>
                  {validationErrors.productType && (
                    <div className="invalid-feedback">
                      {validationErrors.productType}
                    </div>
                  )}
                </div>
                <div className="mb-3">
                  <label htmlFor="productUnit" className="form-label">
                    Unit
                  </label>
                  <input
                    type="number"
                    className={`form-control ${
                      validationErrors.productUnit ? "is-invalid" : ""
                    }`}
                    id="productUnit"
                    placeholder="Enter unit count"
                    min="1"
                    value={formData.productUnit}
                    onChange={handleChange}
                    required
                  />
                  {validationErrors.productUnit && (
                    <div className="invalid-feedback">
                      {validationErrors.productUnit}
                    </div>
                  )}
                </div>
                <div className="mb-3">
                  <label htmlFor="productPrice" className="form-label">
                    Price
                  </label>
                  <input
                    type="number"
                    className={`form-control ${
                      validationErrors.productPrice ? "is-invalid" : ""
                    }`}
                    id="productPrice"
                    placeholder="Enter price"
                    step="0.01"
                    min="0"
                    value={formData.productPrice}
                    onChange={handleChange}
                    required
                  />
                  {validationErrors.productPrice && (
                    <div className="invalid-feedback">
                      {validationErrors.productPrice}
                    </div>
                  )}
                </div>
                <div className="mb-3 form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="productAvailable"
                    checked={formData.productAvailable}
                    onChange={handleChange}
                  />
                  <label
                    className="form-check-label"
                    htmlFor="productAvailable">
                    Available
                  </label>
                </div>
                <div className="mb-3">
                  <label htmlFor="productSupplier" className="form-label">
                    Supplier
                  </label>
                  <input
                    type="text"
                    className={`form-control ${
                      validationErrors.productSupplier ? "is-invalid" : ""
                    }`}
                    id="productSupplier"
                    placeholder="Enter supplier name"
                    value={formData.productSupplier}
                    onChange={handleChange}
                    required
                  />
                  {validationErrors.productSupplier && (
                    <div className="invalid-feedback">
                      {validationErrors.productSupplier}
                    </div>
                  )}
                </div>
                <div className="text-center">
                  <button
                    type="submit"
                    className="btn btn-primary w-100"
                    disabled={loading}>
                    {loading ? "Submitting..." : "Submit"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Seller;
