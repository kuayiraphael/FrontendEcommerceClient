// import React from "react";
// import { NavLink, useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";

// const Navbar = () => {
//   const state = useSelector((state) => state.handleCart);
//   const navigate = useNavigate();

//   // Check if user is logged in by looking for the access token in localStorage
//   const isLoggedIn = !!localStorage.getItem("accessToken");

//   // Handle logout
//   const handleLogout = () => {
//     // Remove tokens from localStorage
//     localStorage.removeItem("accessToken");
//     localStorage.removeItem("refreshToken");

//     // Redirect to login page
//     navigate("/login");
//   };

//   return (
//     <nav className="navbar navbar-expand-lg navbar-light bg-light py-3 sticky-top">
//       <div className="container">
//         <NavLink className="navbar-brand fw-bold fs-4 px-2" to="/">
//           EShop
//         </NavLink>
//         <button
//           className="navbar-toggler mx-2"
//           type="button"
//           data-toggle="collapse"
//           data-target="#navbarSupportedContent"
//           aria-controls="navbarSupportedContent"
//           aria-expanded="false"
//           aria-label="Toggle navigation"
//         >
//           <span className="navbar-toggler-icon"></span>
//         </button>

//         <div className="collapse navbar-collapse" id="navbarSupportedContent">
//           <ul className="navbar-nav m-auto my-2 text-center">
//             {/* Only show these links if user is logged in */}
//             {isLoggedIn && (
//               <>
//                 <li className="nav-item">
//                   <NavLink className="nav-link" to="/home">
//                     Home
//                   </NavLink>
//                 </li>
//                 <li className="nav-item">
//                   <NavLink className="nav-link" to="/product">
//                     Products
//                   </NavLink>
//                 </li>
//                 <li className="nav-item">
//                   <NavLink className="nav-link" to="/about">
//                     About
//                   </NavLink>
//                 </li>
//                 <li className="nav-item">
//                   <NavLink className="nav-link" to="/contact">
//                     Contact
//                   </NavLink>
//                 </li>
//                 <li>
//                   {isLoggedIn && (
//                     <NavLink to="/seller" className="nav-link">
//                       Seller Management
//                     </NavLink>
//                   )}
//                 </li>
//                 <li>
//                   {isLoggedIn && (
//                     <NavLink to="/Others" className="nav-link">
//                       Others
//                     </NavLink>
//                   )}
//                 </li>
//               </>
//             )}
//           </ul>
//           <div className="buttons text-center">
//             {/* Show Login and Register if not logged in */}
//             {!isLoggedIn ? (
//               <>
//                 <NavLink to="/login" className="btn btn-outline-dark m-2">
//                   <i className="fa fa-sign-in-alt mr-1"></i> Login
//                 </NavLink>
//                 <NavLink to="/register" className="btn btn-outline-dark m-2">
//                   <i className="fa fa-user-plus mr-1"></i> Register
//                 </NavLink>
//               </>
//             ) : (
//               // Show Logout button if logged in
//               <button
//                 className="btn btn-outline-dark m-2"
//                 onClick={handleLogout}
//               >
//                 <i className="fa fa-sign-out-alt mr-1"></i> Logout
//               </button>
//             )}

//             {/* Show Cart */}
//             {isLoggedIn && (
//               <NavLink to="/cart" className="btn btn-outline-dark m-2">
//                 <i className="fa fa-cart-shopping mr-1"></i> Cart (
//                 {state.length})
//               </NavLink>
//             )}

//             {/* Show Cart */}
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;
import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Navbar = () => {
  const state = useSelector((state) => state.handleCart);
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState("");

  // Check if user is logged in by looking for the access token in localStorage
  const isLoggedIn = !!localStorage.getItem("accessToken");

  useEffect(() => {
    const role = sessionStorage.getItem("userRole"); // Get role from sessionStorage
    setUserRole(role); // Store in state
  }, []);

  // Handle logout
  const handleLogout = () => {
    // Remove tokens from localStorage & sessionStorage
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    sessionStorage.removeItem("userRole"); // Clear role

    // Redirect to login page
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light py-3 sticky-top">
      <div className="container">
        <NavLink className="navbar-brand fw-bold fs-4 px-2" to="/">
          EShop
        </NavLink>
        <button
          className="navbar-toggler mx-2"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav m-auto my-2 text-center">
            {/* Only show these links if user is logged in */}
            {isLoggedIn && (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/home">
                    Home
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/product">
                    Products
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/about">
                    About
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/contact">
                    Contact
                  </NavLink>
                </li>

                {/* Only show Seller Management if the user is NOT a buyer */}
                {userRole !== "buyer" && (
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/seller">
                      Seller Management
                    </NavLink>
                  </li>
                )}

                <li className="nav-item">
                  <NavLink to="/others" className="nav-link">
                    Others
                  </NavLink>
                </li>
              </>
            )}
          </ul>

          <div className="buttons text-center">
            {/* Show Login and Register if not logged in */}
            {!isLoggedIn ? (
              <>
                <NavLink to="/login" className="btn btn-outline-dark m-2">
                  <i className="fa fa-sign-in-alt mr-1"></i> Login
                </NavLink>
                <NavLink to="/register" className="btn btn-outline-dark m-2">
                  <i className="fa fa-user-plus mr-1"></i> Register
                </NavLink>
              </>
            ) : (
              // Show Logout button if logged in
              <button
                className="btn btn-outline-dark m-2"
                onClick={handleLogout}
              >
                <i className="fa fa-sign-out-alt mr-1"></i> Logout
              </button>
            )}

            {/* Show Cart */}
            {isLoggedIn && (
              <NavLink to="/cart" className="btn btn-outline-dark m-2">
                <i className="fa fa-cart-shopping mr-1"></i> Cart (
                {state.length})
              </NavLink>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
