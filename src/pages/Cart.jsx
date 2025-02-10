// export default Cart;
import React from "react";
import { Footer, Navbar } from "../components";
import { useSelector, useDispatch } from "react-redux";
import { addCart, delCart } from "../redux/action";
import { Link } from "react-router-dom";
import axios from "axios";

const Cart = () => {
  const state = useSelector((state) => state.handleCart);
  const dispatch = useDispatch();

  const EmptyCart = () => {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12 py-5 bg-light text-center">
            <h4 className="p-3 display-5">Your Cart is Empty</h4>
            <Link to="/" className="btn btn-outline-dark mx-4">
              <i className="fa fa-arrow-left"></i> Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  };

  const getAuthToken = () => {
    return localStorage.getItem("accessToken"); // Retrieve the token from localStorage
  };

  const addItem = async (product) => {
    try {
      const token = getAuthToken();
      if (!token) {
        alert("Please login to modify cart!");
        return;
      }

      await axios.put(
        "https://products-microservice-kprm.onrender.com/cart",
        { _id: product._id, qty: 1 },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Verify backend returns updated product with _id
      const { data } = await axios.get(
        `https://products-microservice-kprm.onrender.com/${product._id}`
      );

      dispatch(addCart(data));
    } catch (error) {
      console.error("Cart update failed:", error);
    }
  };

  // Remove item from cart (DELETE /cart/:id)
const removeItem = async (product) => {
  try {
    const token = getAuthToken();
    if (!token) {
      alert("Please login to modify cart!");
      return;
    }

    // Remove item from backend cart
    await axios.delete(
      `https://products-microservice-kprm.onrender.com/cart/${product._id}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    // Remove item from Redux store
    dispatch(delCart(product)); // Pass the full product object
  } catch (error) {
    console.error("Error removing item from cart:", error);
    alert("Failed to remove item from cart!");
  }
};

  const ShowCart = () => {
    let subtotal = 0;
    let shipping = 30.0;
    let totalItems = 0;

    state.map((item) => {
      subtotal += item.price * item.qty;
      totalItems += item.qty;
    });

    return (
      <>
        <section className="h-100 gradient-custom">
          <div className="container py-5">
            <div className="row d-flex justify-content-center my-4">
              <div className="col-md-8">
                <div className="card mb-4">
                  <div className="card-header py-3">
                    <h5 className="mb-0">Item List</h5>
                  </div>
                  <div className="card-body">
                    {state.length > 0 ? (
                      state.map((item) => (
                        <div key={item._id}>
                          <div className="row d-flex align-items-center">
                            <div className="col-lg-3 col-md-12">
                              <div
                                className="bg-image rounded"
                                data-mdb-ripple-color="light"
                              >
                                <img
                                  src={item.img}
                                  alt={item.name}
                                  width={100}
                                  height={75}
                                />
                              </div>
                            </div>

                            <div className="col-lg-5 col-md-6">
                              <p>
                                <strong>{item.name}</strong>
                              </p>
                            </div>

                            <div className="col-lg-4 col-md-6">
                              <div
                                className="d-flex mb-4"
                                style={{ maxWidth: "300px" }}
                              >
                                <button
                                  className="btn px-3"
                                  onClick={() => removeItem(item)}
                                >
                                  <i className="fas fa-minus"></i>
                                </button>

                                <p className="mx-5">{item.qty}</p>

                                <button
                                  className="btn px-3"
                                  onClick={() => addItem(item)}
                                >
                                  <i className="fas fa-plus"></i>
                                </button>
                              </div>

                              <p className="text-start text-md-center">
                                <strong>
                                  <span className="text-muted">{item.qty}</span>{" "}
                                  x ${item.price}
                                </strong>
                              </p>
                            </div>
                          </div>
                          <hr className="my-4" />
                        </div>
                      ))
                    ) : (
                      <p>Your cart is empty.</p>
                    )}
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card mb-4">
                  <div className="card-header py-3 bg-light">
                    <h5 className="mb-0">Order Summary</h5>
                  </div>
                  <div className="card-body">
                    <ul className="list-group list-group-flush">
                      <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                        Products ({totalItems})
                        <span>${Math.round(subtotal)}</span>
                      </li>
                      <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                        Shipping <span>${shipping}</span>
                      </li>
                      <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                        <strong>Total amount</strong>
                        <span>
                          <strong>${Math.round(subtotal + shipping)}</strong>
                        </span>
                      </li>
                    </ul>

                    <Link
                      to="/checkout"
                      className="btn btn-dark btn-lg btn-block"
                    >
                      Go to checkout
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  };

  return (
    <>
      <Navbar />
      <div className="container my-3 py-3">
        <h1 className="text-center">Cart</h1>
        <hr />
        {state.length > 0 ? <ShowCart /> : <EmptyCart />}
      </div>
      <Footer />
    </>
  );
};

export default Cart;
