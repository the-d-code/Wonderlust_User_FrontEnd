import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import API_URL from "./../Config";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./Home";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate()
  const [redirect, setRedirect] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmedPassword: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    })
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = formData;

    fetch(`${API_URL}/Auth/Register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((responseData) => {
        console.log(responseData.value, "responseData.value===>");
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
    if(redirect){
      setTimeout(() => {
        navigate("/")
      }, 1500);
    }
  },[redirect])

  return (
    <>
      <div id="page" className="page">
        <Header />
        <main id="content" className="site-main">
          <section className="booking-inner-page">
            <div className="inner-banner-wrap pb-5">
              <div
                className="inner-baner-container"
                style={{ backgroundImage: "url(assets/images/img7.jpg)" }}
              >
                <div className="container">
                  <div className="inner-banner-content">
                    <h1 className="page-title">Sign Up</h1>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <div className="booking-section inner-about-wrap">
            <div className="container">
              <div className="row">
                <div className="col-lg-7 m-auto">
                  <div className="about-content">
                    <figure className="about-image">
                      <img src="assets/images/register.jpg" alt="" />
                    </figure>
                  </div>
                </div>
                <div className="col-lg-5 right-sidebar">
                  {/* <!-- step one form html start --> */}
                  <div className="booking-form-wrap">
                    <form onSubmit={handleSubmit}>
                      <div className="booking-content">
                        <div className="form-title">
                          <h3 className="section-title">SIGN UP</h3>
                        </div>
                        <div className="col-sm-12">
                          <div className="form-group">
                            <label>
                              First Name
                              <span className="text-danger"> *</span>
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              name="firstName"
                              value={formData.firstName || ""}
                              onChange={handleInputChange}
                              required
                            />
                          </div>
                        </div>
                        <div className="col-sm-12">
                          <div className="form-group">
                            <label>
                              Last Name <span className="text-danger">*</span>
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              name="lastName"
                              value={formData.lastName || ''}
                              onChange={handleInputChange}
                              required
                            />
                          </div>
                        </div>
                        <div className="col-sm-12">
                          <div className="form-group">
                            <label>
                              Email <span className="text-danger">*</span>
                            </label>
                            <input
                              type="email"
                              className="form-control"
                              name="email"
                              value={formData.email || ''}
                              onChange={handleInputChange}
                              required
                            />
                          </div>
                        </div>
                        <div className="col-sm-12">
                          <div className="form-group">
                            <label>
                              Password <span className="text-danger">*</span>
                            </label>
                            <input
                              type="password"
                              className="form-control"
                              name="password"
                              value={formData.password || ''}
                              onChange={handleInputChange}
                              required
                            />
                          </div>
                        </div>

                        <div className="col-sm-12">
                          <div className="form-group">
                            <label>
                              Confirm Password
                              <span className="text-danger"> *</span>
                            </label>
                            <input
                              type="password"
                              className="form-control"
                              name="confirmedPassword"
                              value={formData.confirmedPassword || ''}
                              onChange={handleInputChange}
                              required
                            />
                          </div>
                        </div>

                        <div className="col-sm-12 mt-4">
                          <button type="submit" className="round-btn w-100">
                            Register
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
        <ToastContainer />
        <Footer />
      </div>
    </>
  );
};

export default Register;
