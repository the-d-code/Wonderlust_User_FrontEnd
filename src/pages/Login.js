import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Link, useNavigate } from "react-router-dom";
import API_URL from "../Config";
import { ToastContainer, toast } from "react-toastify";

const fontBold = {
  fontWeight: 500,
};

const Login = () => {
  const navigate = useNavigate();
  const [redirect, setRedirect] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = formData;

    fetch(`${API_URL}/Auth/Login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((responseData) => {
        console.log(responseData, "responseData.value===>");
        if (responseData.value) {
          if (responseData.value.success === "false") {
            toast.error(responseData.value.message, {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
          } else {
            toast.success(responseData.value.message, {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });

            const storedTokenData = localStorage.setItem("authorization_token",responseData.value.data.login_token);
            const storedUserData = localStorage.setItem("user_data",JSON.stringify(responseData.value.data.user_data));

            setRedirect(true);
          }
        }
      })
      .catch((error) => {
        // Handle any errors
      });
  };

  useEffect(() => {
    if (redirect) {
      setTimeout(() => {
        navigate("/");
      }, 3000);
    }
  }, [redirect]);

  return (
    <>
      <div id="page" className="page">
        <Header />
        <main id="content" className="site-main">
          <section class="booking-inner-page">
            <div class="inner-banner-wrap pb-5">
              <div
                class="inner-baner-container"
                style={{ backgroundImage: "url(assets/images/img7.jpg)" }}
              >
                <div class="container">
                  <div class="inner-banner-content">
                    <h1 class="page-title">Sign In</h1>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <div class="booking-section inner-about-wrap pb-5">
            <div class="container">
              <div class="row">
                <div class="col-lg-7 m-auto">
                  <div class="about-content">
                    <figure class="about-image">
                      <img src="assets/images/login.jpg" alt="" />
                    </figure>
                  </div>
                </div>
                <div class="col-lg-5 right-sidebar">
                  {/* <!-- step one form html start --> */}
                  <div class="booking-form-wrap">
                    <form onSubmit={handleSubmit}>
                      <div class="booking-content">
                        <div class="form-title">
                          <h3 className="section-title">SIGN IN</h3>
                        </div>

                        <div class="col-sm-12">
                          <div class="form-group">
                            <label>
                              Email <span className="text-danger">*</span>
                            </label>
                            <input
                              type="email"
                              class="form-control"
                              name="email"
                              value={formData.email || ""}
                              onChange={handleInputChange}
                              required
                            />
                          </div>
                        </div>

                        <div class="col-sm-12">
                          <div class="form-group">
                            <label>
                              Password <span className="text-danger">*</span>
                            </label>
                            <input
                              type="password"
                              class="form-control"
                              name="password"
                              value={formData.password || ""}
                              onChange={handleInputChange}
                              required
                            />
                          </div>
                        </div>

                        <div class="form-group text-right">
                          <label class="checkbox-list">
                            <Link
                              to="/sign-up"
                              className="w-100"
                              style={fontBold}
                            >
                              {" "}
                              Forget Password
                            </Link>
                          </label>
                        </div>

                        <div class="col-sm-12">
                          <button type="submit" class="w-100 round-btn">
                            Login
                          </button>
                        </div>

                        <div class="col-sm-12 text-center mt-2">
                          <p>
                            New user?
                            <Link to="/sign-up" className="w-100">
                              {" "}
                              Create an account
                            </Link>
                          </p>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>

      <ToastContainer />
    </>
  );
};

export default Login;
