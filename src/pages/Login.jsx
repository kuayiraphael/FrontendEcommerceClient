import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Footer, Navbar } from "../components";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // const handleLogin = async (e) => {
  //   e.preventDefault();
  //   setIsLoading(true);
  //   try {
  //     const response = await axios.post(
  //       "https://authentication-microservice-4kai.onrender.com/login",
  //       { email, password }
  //     );

  //     if (response.status === 200) {
  //       localStorage.setItem("accessToken", response.data.accessToken);
  //       localStorage.setItem("refreshToken", response.data.refreshToken);
  //       navigate("/home");
  //     }
  //   } catch (error) {
  //     const message =
  //       error.response?.data?.message ||
  //       "Invalid email or password. Please try again.";
  //     setErrorMessage(message);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };
  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post(
        "https://authentication-microservice-4kai.onrender.com/login",
        { email, password }
      );

      if (response.status === 200) {
        const { id, accessToken, refreshToken } = response.data;

        // Store tokens in localStorage
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);

        // Fetch user's role using their ID
        const roleResponse = await axios.get(
          `https://authentication-microservice-4kai.onrender.com/role/${id}`,
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        );
        console.log(roleResponse);

        if (roleResponse.status === 200 && roleResponse.data.role) {
          sessionStorage.setItem("userRole", roleResponse.data.role);
        }

        // Navigate to home
        navigate("/home");
      }
    } catch (error) {
      const message =
        error.response?.data?.message ||
        "Invalid email or password. Please try again.";
      setErrorMessage(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container my-3 py-3">
        <h1 className="text-center">Login</h1>
        <hr />
        <div className="row my-4 h-100">
          <div className="col-md-4 col-lg-4 col-sm-8 mx-auto">
            <form onSubmit={handleLogin}>
              <div className="my-3">
                <label htmlFor="email">Email address</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  value={email}
                  placeholder="name@example.com"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                />
              </div>
              <div className="my-3">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="password"
                />
              </div>
              {errorMessage && (
                <div className="text-danger my-2">{errorMessage}</div>
              )}

              <div className="my-3">
                <p>
                  New Here?{" "}
                  <Link
                    to="/register"
                    className="text-decoration-underline text-info"
                  >
                    Register
                  </Link>{" "}
                </p>
              </div>

              <div className="text-center">
                <button
                  className="my-2 mx-auto btn btn-dark"
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <span
                        className="spinner-border spinner-border-sm"
                        role="status"
                        aria-hidden="true"
                      ></span>
                      <span className="ms-2">Logging in...</span>
                    </>
                  ) : (
                    "Login"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
