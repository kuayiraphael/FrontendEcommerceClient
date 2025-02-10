// export default Others;
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Navbar, Footer } from "../components";

const OTHERS_API = "https://authentication-microservice-4kai.onrender.com";
const ORDERS_API = "https://orders-microservice-h77y.onrender.com";

const Others = () => {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    dob: "",
    profilePicture: "",
  });
  const [orders, setOrders] = useState([]); // ✅ Ensuring it's always an array
  const [isLoading, setIsLoading] = useState(true);
  const [newRole, setNewRole] = useState("");

  const accessToken = localStorage.getItem("accessToken");
  const userId = sessionStorage.getItem("userId"); // Retrieve userId stored during login

  useEffect(() => {
    fetchOrders(); // Only fetching orders, since profile info is stored manually
  }, []);

  // Fetch Orders
  const fetchOrders = async () => {
    try {
      const response = await axios.get(`${ORDERS_API}/orders`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      console.log("Orders API Response:", response.data);

      if (Array.isArray(response.data)) {
        setOrders(response.data);
      } else {
        console.error("Unexpected API response format:", response.data);
        setOrders([]);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
      setOrders([]);
    } finally {
      setIsLoading(false);
    }
  };

  // **Update Profile**
  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${OTHERS_API}/profile`, user, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  // **Update Role**
  const handleRoleUpdate = async () => {
    if (!newRole) return;
    try {
      await axios.put(
        `${OTHERS_API}/role`,
        { role: newRole },
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      alert("Role updated successfully!");
      setUser({ ...user, role: newRole });
    } catch (error) {
      console.error("Error updating role:", error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container my-4">
        <h2 className="text-center mb-4">User Profile & Orders</h2>

        {/* Profile Section */}
        <div className="card mb-4 shadow-sm">
          <div className="card-body">
            <h4 className="card-title">Edit Profile</h4>
            {isLoading ? (
              <p>Loading profile...</p>
            ) : (
              <form onSubmit={handleProfileUpdate}>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label>First Name</label>
                    <input
                      type="text"
                      className="form-control"
                      value={user.firstName}
                      onChange={(e) =>
                        setUser({ ...user, firstName: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label>Last Name</label>
                    <input
                      type="text"
                      className="form-control"
                      value={user.lastName}
                      onChange={(e) =>
                        setUser({ ...user, lastName: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label>Gender</label>
                    <select
                      className="form-control"
                      value={user.gender}
                      onChange={(e) =>
                        setUser({ ...user, gender: e.target.value })
                      }
                    >
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                  </div>
                  <div className="col-md-6 mb-3">
                    <label>Date of Birth</label>
                    <input
                      type="date"
                      className="form-control"
                      value={user.dob}
                      onChange={(e) =>
                        setUser({ ...user, dob: e.target.value })
                      }
                    />
                  </div>
                </div>
                <button type="submit" className="btn btn-primary">
                  Update Profile
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Role Section */}
        <div className="card mb-4 shadow-sm">
          <div className="card-body">
            <h4 className="card-title">Change Role</h4>
            <p>Current Role: {user.role || "Unknown"}</p>
            <select
              className="form-control mb-2"
              value={newRole}
              onChange={(e) => setNewRole(e.target.value)}
            >
              <option value="">Select Role</option>
              <option value="buyer">Buyer</option>
              <option value="seller">Seller</option>
            </select>
            <button className="btn btn-warning" onClick={handleRoleUpdate}>
              Update Role
            </button>
          </div>
        </div>

        {/* Orders Section */}
        <div className="card shadow-sm">
          <div className="card-body">
            <h4 className="card-title">Your Orders</h4>
            {orders.length === 0 ? (
              <p>No orders found.</p>
            ) : (
              <div className="table-responsive">
                <table className="table table-bordered">
                  <thead className="thead-dark">
                    <tr>
                      <th>Order ID</th>
                      <th>Products</th>
                      <th>Total Price</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => (
                      <tr key={order._id}>
                        <td>{order.orderId}</td>
                        <td>
                          {Array.isArray(order.items)
                            ? order.items.map((p) => (
                                <p key={p.product._id}>
                                  {p.product.name} x{p.unit}
                                </p>
                              ))
                            : "No products"}
                        </td>
                        <td>${order.amount?.toFixed(2) || "N/A"}</td>
                        <td>{order.status || "Unknown"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Others;
