import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Home from './Home';

const Header = () => {
  //   const getLoggedUserData = JSON.parse(localStorage.getItem("user_data"));
  const [isLogged, setIsLogged] = useState(false);
  const [userData, setData] = useState([]);

  useEffect(() => {
    const storedUsername = JSON.parse(localStorage.getItem("user_data"));
    if (storedUsername !== "") {
      setIsLogged(true);
      setData(storedUsername);
    }
  }, [isLogged, userData]);


  const logoutComponent = () => {
    // Function to be called on button click
    localStorage.removeItem('authorization_token');
    localStorage.removeItem('user_data');

    toast.success("Logout Successfully.", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  return (
    <>
      {/* site header html start  */}
      <header id="masthead" className="site-header">
        {/* header html start */}
        <div className="top-header">
          <div className="container">
            <div className="top-header-inner">
              <div className="header-contact text-left">
                <a href="telto:01977259912">
                  <i aria-hidden="true" className="icon icon-phone-call2" />
                  <div className="header-contact-details d-none d-sm-block">
                    <span className="contact-label">
                      For Further Inquires :
                    </span>
                    <h5 className="header-contact-no">+01 (977) 2599 12</h5>
                  </div>
                </a>
              </div>
              <div className="site-logo text-center">
                <h1 className="site-title">
                  <a href="index.html">
                    <img src="assets/images/site-logo.png" alt="Logo" />
                  </a>
                </h1>
              </div>
              <div className="header-icon text-right">
                <div className="header-search-icon d-inline-block">
                  <a href="#">
                    <i aria-hidden="true" className="fas fa-search" />
                  </a>
                </div>
                <div className="offcanvas-menu d-inline-block">
                  <a href="#">
                    <i aria-hidden="true" className="icon icon-burger-menu" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bottom-header">
          <div className="container">
            <div className="bottom-header-inner d-flex justify-content-between align-items-center">
              <div className="header-social social-icon">
                <ul>
                  <li>
                    <a href="https://www.facebook.com/" target="_blank">
                      <i className="fab fa-facebook-f" aria-hidden="true" />
                    </a>
                  </li>
                  <li>
                    <a href="https://www.twitter.com/"
                    
                     target="_blank">
                      <i className="fab fa-twitter" aria-hidden="true" />
                    </a>
                  </li>
                  <li>
                    <a href="https://www.youtube.com/" target="_blank">
                      <i className="fab fa-youtube" aria-hidden="true" />
                    </a>
                  </li>
                </ul>
              </div>
              <div className="navigation-container d-none d-lg-block">
                <nav id="navigation" className="navigation">
                  <ul>
                    <li className="menu-active">
                      <Link to="/">Home</Link>
                    </li>
                    <li>
                      <Link to="/categories">Categories</Link>
                    </li>
                    <li>
                      <Link to="/packages">Packages</Link>
                    </li>
                    <li>
                      <Link to="/about-us">About Us</Link>
                    </li>
                    <li>
                      <Link to="/contact-us">Contact Us</Link>
                    </li>
                    {(() => {
                      if (userData) {
                        return (
                          <li className="menu-item-has-children">
                            <a href="#">
                              {userData.firstName + " " + userData.lastName}
                            </a>
                            <ul>
                              {/* <li>
                                <a href="home-banner.html">My Cart</a>
                              </li>
                              <li>
                                <a href="home-banner.html">My Profile</a>
                              </li> */}
                              <li>
                                <a onClick={logoutComponent}>Logout</a>
                              </li>
                            </ul>
                          </li>
                        );
                      } else {
                        return (
                          <li>
                            <Link to="/sign-in">Login</Link>
                          </li>
                        );
                      }
                    })()}
                  </ul>
                </nav>
              </div>
              <div className="header-btn">
                {/* <a href="booking.html" className="round-btn">
                  Book Now
                </a> */}
              </div>
            </div>
          </div>
        </div>
        <div className="mobile-menu-container" />
      </header>
      {/* site header html end  */}
    </>
  );
};

export default Header;
