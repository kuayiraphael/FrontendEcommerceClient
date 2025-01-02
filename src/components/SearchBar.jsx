import React from "react";
import "./search.css";

const SearchBar = () => {
  return (
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
                    placeholder="Search products, categories, brands..."
                  />
                  <i className="fas fa-search search-icon"></i>
                </div>

                <div className="quick-filters">
                  <span className="quick-filter">Price: Low to High</span>
                  <span className="quick-filter">Best Rated</span>
                  <span className="quick-filter">New Arrivals</span>
                </div>
              </div>

              <div className="category-filters">
                <div className="filter-chip active"> 
                  <i className="fas fa-globe"></i> All
                </div>
                <div className="filter-chip">
                  <i className="fas fa-laptop"></i> Electronics
                </div>
                <div className="filter-chip">
                  <i className="fas fa-tshirt"></i> Fashion
                </div>
                <div className="filter-chip">
                  <i className="fas fa-home"></i> Home & Living
                </div>
                <div className="filter-chip">
                  <i className="fas fa-dumbbell"></i> Sports
                </div>
                <div className="filter-chip">
                  <i className="fas fa-book"></i> Books
                </div>
                <div className="filter-chip">
                  <i className="fas fa-gamepad"></i> Gaming
                </div>

                <div className="suggestions">
                  <div className="suggestion-item">
                    Wireless Headphones{" "}
                    <span className="suggestion-category">in Electronics</span>
                  </div>
                  <div className="suggestion-item">
                    Running Shoes{" "}
                    <span className="suggestion-category">in Sports</span>
                  </div>
                  <div className="suggestion-item">
                    Smart Watch{" "}
                    <span className="suggestion-category">in Electronics</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
