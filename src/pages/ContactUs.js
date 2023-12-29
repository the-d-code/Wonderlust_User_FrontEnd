import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import API_URL from "./../Config";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ContactUs = () => {
  const storedUsername = JSON.parse(localStorage.getItem("user_data"));
  console.log("userid",storedUsername);
  if (storedUsername === null) {
    var userId = "";
  } else {
    var userId = storedUsername.userId;
  }

  const navigate = useNavigate();
  const [redirect, setRedirect] = useState(false);
  const [formData, setFormData] = useState({
    userId: userId,
    name: "",
    emailId: "",
    contactNumber: "",
    message: "",
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

    fetch(`${API_URL}/api/Enquiry`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((responseData) => {
        console.log(responseData, "responseData.value===>");
        if (responseData.success) {
          if (responseData.success === "false") {
            toast.error(responseData.message, {
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
            toast.success(responseData.message, {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });

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
          <section className="contact-inner-page">
            {/* ***Inner Banner html start form here*** */}
            <div className="inner-banner-wrap">
              <div
                className="inner-baner-container"
                style={{ backgroundImage: "url(assets/images/img7.jpg)" }}
              >
                <div className="container">
                  <div className="inner-banner-content">
                    <h1 className="page-title">Contact US</h1>
                  </div>
                </div>
              </div>
            </div>
            {/* ***Inner Banner html end here*** */}
            {/* ***contact section html start form here*** */}
            <div className="inner-contact-wrap">
              <div className="container">
                <div className="row">
                  <div className="col-lg-6">
                    <div className="section-heading">
                      <h5 className="sub-title">GET IN TOUCH</h5>
                      <h2 className="section-title">REACH &amp; CONTACT US!</h2>
                      <p>
                        Fusce hic augue velit wisi quibusdam pariatur, iusto
                        primis, nec nemo, rutrum. Vestibulum cumque laudantium.
                        Sit ornare mollitia tenetur, aptent. Eget feugiat error
                        necessitatibus taciti..
                      </p>
                      <div className="social-icon">
                        <ul>
                          <li>
                            <a href="https://www.facebook.com/" target="_blank">
                              <i
                                className="fab fa-facebook-f"
                                aria-hidden="true"
                              />
                            </a>
                          </li>
                          <li>
                            <a href="https://www.twitter.com/" target="_blank">
                              <i
                                className="fab fa-twitter"
                                aria-hidden="true"
                              />
                            </a>
                          </li>
                          <li>
                            <a href="https://www.youtube.com/" target="_blank">
                              <i
                                className="fab fa-youtube"
                                aria-hidden="true"
                              />
                            </a>
                          </li>
                          <li>
                            <a
                              href="https://www.instagram.com/"
                              target="_blank"
                            >
                              <i
                                className="fab fa-instagram"
                                aria-hidden="true"
                              />
                            </a>
                          </li>
                          <li>
                            <a
                              href="https://www.pinterest.com/"
                              target="_blank"
                            >
                              <i
                                className="fab fa-pinterest"
                                aria-hidden="true"
                              />
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="contact-map">
                      <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2483.540423056448!2d-0.12174238402827448!3d51.50330061882345!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487604b900d26973%3A0x4291f3172409ea92!2slastminute.com%20London%20Eye!5e0!3m2!1sen!2snp!4v1646314586610!5m2!1sen!2snp"
                        width={600}
                        height={400}
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                      />
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="contact-from-wrap primary-bg">
                      <form onSubmit={handleSubmit} className="contact-from">
                        <p>
                          <label>User Name</label>
                          <input
                            type="text"
                            name="name"
                            placeholder="Your Name*"
                            value={formData.name || ""}
                            onChange={handleInputChange}
                            required
                          />
                        </p>
                        <p>
                          <label>Email Address</label>
                          <input
                            type="email"
                            name="emailId"
                            placeholder="Your Email*"
                            value={formData.emailId || ""}
                            onChange={handleInputChange}
                            required
                          />
                        </p>
                        <p>
                          <label>Contact Number</label>
                          <input
                            type="number"
                            name="contactNumber"
                            placeholder="Your Number*"
                            value={formData.contactNumber || ""}
                            onChange={handleInputChange}
                            required
                          />
                        </p>
                        <p>
                          <label>Comments / Questions</label>
                          <textarea
                            rows={8}
                            name="message"
                            placeholder="Your Message*"
                            defaultValue={formData.message}
                            onChange={handleInputChange}
                            required
                          />
                        </p>
                        <p>
                          <input
                            type="submit"
                            name="submit"
                            defaultValue="SUBMIT MESSAGE"
                          />
                        </p>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* ***contact section html start form here*** */}
            {/* ***iconbox section html start form here*** */}
            <div className="contact-details-section bg-light-grey">
              <div className="container">
                <div className="row align-items-center">
                  <div className="col-lg-4">
                    <div className="icon-box border-icon-box">
                      <div className="box-icon">
                        <i
                          aria-hidden="true"
                          className="fas fa-envelope-open-text"
                        />
                      </div>
                      <div className="icon-box-content">
                        <h4>EMAIL ADDRESS</h4>
                        <ul>
                          <li>
                            <a href="mailto:support@gmail.com">
                              support@gmail.com
                            </a>
                          </li>
                          <li>
                            <a href="mailto:name@comapny.com">
                              name@comapny.com
                            </a>
                          </li>
                          <li>
                            <a href="mailto:info@domain.com">info@domain.com</a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4">
                    <div className="icon-box border-icon-box">
                      <div className="box-icon">
                        <i aria-hidden="true" className="fas fa-phone-alt" />
                      </div>
                      <div className="icon-box-content">
                        <h4>PHONE NUMBER</h4>
                        <ul>
                          <li>
                            <a href="tell:+132599254669">+132 (599) 254 669</a>
                          </li>
                          <li>
                            <a href="callto:123669255587">+123 (669) 255 587</a>
                          </li>
                          <li>
                            <a href="callto:01977259912">+01 (977) 2599 12</a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4">
                    <div className="icon-box border-icon-box">
                      <div className="box-icon">
                        <i
                          aria-hidden="true"
                          className="fas fa-map-marker-alt"
                        />
                      </div>
                      <div className="icon-box-content">
                        <h4>ADDRESS LOCATION</h4>
                        <ul>
                          <li>3146 Koontz, California</li>
                          <li>Quze.24 Second floor</li>
                          <li>36 Street, Melbourne</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* ***iconbox section html end here*** */}
          </section>
        </main>

        <Footer />

        <ToastContainer />
      </div>
    </>
  );
};

export default ContactUs;
