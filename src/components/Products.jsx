import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addCart } from "../redux/action";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import "./search.css";

const Products = () => {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // State for the search term
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const addProduct = (product) => {
    dispatch(addCart(product));
  };

  useEffect(() => {
    let componentMounted = true;
    const getProducts = async () => {
      setLoading(true);
      try {
        const response = await fetch("https://products-microservice-kprm.onrender.com/");
        const products = await response.json();
        if (componentMounted) {
          setData(products.products);
          setFilter(Array.isArray(products.products) ? products.products : []); // Ensure filter is always an array
        }
      } catch (error) {
        console.error("Failed to fetch products", error);
        setFilter([]); // Reset filter on error
      } finally {
        if (componentMounted) {
          setLoading(false);
        }
      }
    };

    getProducts();

    return () => {
      componentMounted = false;
    };
  }, []);

  const Loading = () => (
    <>
      <div className="col-12 py-5 text-center">
        <Skeleton height={40} width={560} />
      </div>
      {[...Array(7)].map((_, index) => (
        <div key={index} className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={592} />
        </div>
      ))}
    </>
  );

  const filterProduct = (type) => {
    const updatedList = data.filter((item) => item.type === type);
    setFilter(updatedList);
  };

  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
    if (searchTerm === "") {
      setFilter(data); // If search is empty, reset to all products
    } else {
      const filteredData = data.filter(
        (item) => item.name.toLowerCase().includes(searchTerm.toLowerCase()) // Filter by product name
      );
      setFilter(filteredData);
    }
  };

  const ShowProducts = () => (
    <>
      <div className="buttons text-center py-5">
        <button
          className="btn btn-outline-dark btn-sm m-2"
          onClick={() => setFilter(data)}>
          All
        </button>
        <button
          className="btn btn-outline-dark btn-sm m-2"
          onClick={() => filterProduct("Fashion")}>
          Fashion
        </button>
        <button
          className="btn btn-outline-dark btn-sm m-2"
          onClick={() => filterProduct("Electronics")}>
          Electronics
        </button>
        <button
          className="btn btn-outline-dark btn-sm m-2"
          onClick={() => filterProduct("Accessories")}>
          Accessories
        </button>
      </div>

      {Array.isArray(filter) && filter.length > 0 ? (
        filter.map((product) => (
          <div
            key={product._id}
            className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
            <div className="card text-center h-100">
              <img
                className="card-img-top p-3"
                src={product.img}
                alt="Card"
                height={300}
              />
              <div className="card-body">
                <h5 className="card-title">
                  {product.name.substring(0, 12)}...
                </h5>
                <p className="card-text">{product.desc.substring(0, 90)}...</p>
              </div>
              <ul className="list-group list-group-flush">
                <li className="list-group-item lead">$ {product.price}</li>
              </ul>
              <div className="card-body">
                <Link
                  to={`/product/${product._id}`}
                  className="btn btn-dark m-1">
                  Buy Now
                </Link>
                <button
                  className="btn btn-dark m-1"
                  onClick={() => {
                    toast.success("Added to cart");
                    addProduct(product);
                  }}>
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>No products available</p>
      )}
    </>
  );

  return (
    <div className="container my-3 py-3">
      <div className="row">
        <div>
          <div className="bg-light">
            <div className="container py-5">
              <div className="search-container">
                <div className="search-wrapper">
                  <div className="search-header">
                    <div className="search-input-group">
                      <input
                        type="text"
                        className="search-input form-control"
                        placeholder="Search products by name..."
                        value={searchTerm}
                        onChange={(e) => handleSearch(e.target.value)} // Trigger search on change
                      />
                      <i className="fas fa-search search-icon"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12">
          <h2 className="display-5 text-center">Latest Products</h2>
          <hr />
        </div>
      </div>
      <div className="row justify-content-center">
        {loading ? <Loading /> : <ShowProducts />}
      </div>
    </div>
  );
};

export default Products;
