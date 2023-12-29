import { React, useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import API_URL from "../Config";
import { ToastContainer, toast } from "react-toastify";

const PackageDetails = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("id");

  const [packageDetailsList, setPackageDetailsList] = useState([]);
  const [busDetails, setBusDetails] = useState([]);
  const [countryDetails, setCountryDetails] = useState([]);
  const [hotelDetails, setHotelDetails] = useState([]);
  const [hotelCountryDetails, setHotelCountryDetails] = useState([]);
  const [hotelStateDetails, setHotelStateDetails] = useState([]);
  const [hotelCityDetails, setHotelCityDetails] = useState([]);

  const storedUsername = JSON.parse(localStorage.getItem("user_data"));
  const navigate = useNavigate();
  const [redirect, setRedirect] = useState(false);

  const [imageSrc, setImageSrc] = useState('');

  const [paymentMethod, setSelectedOption] = useState("");
  const [formData, setFormData] = useState({
    emailId: "",
    contactNumber: "",
    noOfTravelers: "",
    cardNumber: "",
    expiryMonth: "",
    expiryYear: "",
    cvv: "",
  });

  const handleDropdownChange = (event) => {
    setSelectedOption(event.target.value);
  };

  useEffect(() => {
    getPackageDetails();
    if (redirect) {
      setTimeout(() => {
        navigate("/");
      }, 3000);
    }
  }, [redirect]);

  async function getPackageDetails() {
    try {
      const response = await fetch(`${API_URL}/api/Package/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const responseData = await response.json();
      if (responseData.data) {
        setPackageDetailsList(responseData.data);

        const dynamicImageUrl = `http://localhost:9515/images/package/${responseData.data.image}`;
        const packageAmount = responseData.data.amount;
        setImageSrc(dynamicImageUrl);

        // get categories
        const categoryResponse = await fetch(
          `${API_URL}/api/Categories/${responseData.data.categoryId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const categoryData = await categoryResponse.json();
        if (categoryData.data) {
          const updatedPackageDetailsList = {
            ...responseData.data,
            categoryName: categoryData.data.categoryName,
          };
          setPackageDetailsList(updatedPackageDetailsList);
        }

        // get bus details
        const busResponse = await fetch(
          `${API_URL}/api/Bus/${responseData.data.busId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const busData = await busResponse.json();
        if (busData.data) {
          console.log("busData.data", busData.data);
          setBusDetails(busData.data);
        }

        // get Country details
        const countryResponse = await fetch(
          `${API_URL}/api/Country/${responseData.data.countryId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const country = await countryResponse.json();
        if (country.data) {
          console.log("country.data", country.data);
          setCountryDetails(country.data);
        }

        /* --------------------------------------- 
        ------------ STRAT HOTEL DATA ------------ 
        --------------------------------------- */

        const hotelResponse = await fetch(
          `${API_URL}/api/Hotel/${responseData.data.countryId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const hotel = await hotelResponse.json();
        if (hotel.data) {
          console.log("hotel.data", hotel.data);
          var hotelCountryId = hotel.data.countryId;
          var hotelStateId = hotel.data.stateId;
          var hotelCityId = hotel.data.cityId;

          setHotelDetails(hotel.data);
        }

        // Hotel Country Details
        const hotelCountryResponse = await fetch(
          `${API_URL}/api/Country/${hotelCountryId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const hotelCountry = await hotelCountryResponse.json();
        if (hotelCountry.data) {
          setHotelCountryDetails(hotelCountry.data);
        }

        // Hotel State Details
        const hotelStateResponse = await fetch(
          `${API_URL}/api/States/${hotelStateId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const hotelState = await hotelStateResponse.json();
        if (hotelState.data) {
          setHotelStateDetails(hotelState.data);
        }

        // Hotel City Details
        const hotelCityResponse = await fetch(
          `${API_URL}/api/City/${hotelCityId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const hotelCity = await hotelCityResponse.json();
        if (hotelCity.data) {
          setHotelCityDetails(hotelCity.data);
        }

        /* ---------------------------------------- 
        -------------- END HOTEL DATA -------------- 
        ----------------------------------------- */
      }
    } catch (error) {
      // Handle any errors
    }
  }

  // BOOKING

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
    if (storedUsername === null) {
      toast.error("You are not loggen In", {
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
      const currentDate = new Date();
      const noOfTravelers = data.noOfTravelers;
      const bookingPostData = {
        packageId: id,
        userId: storedUsername.userId,
        emailId: data.emailId,
        contactNumber: data.contactNumber,
        noOfTravelers: data.noOfTravelers,
        bookingDate: currentDate,
      };

      console.log("bookingPostData", bookingPostData);

      fetch(`${API_URL}/api/PackageBooking`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingPostData),
      })
        .then((response) => response.json())
        .then((responseData) => {
          if (responseData.success == "true") {
            const bookingId = responseData.data.packageBookingId;

            // PAYMENT API

            const paymentPostData = {
              packageBookingId: bookingId,
              packageId: id,
              userId: storedUsername.userId,
              amount: packageDetailsList.amount * noOfTravelers,
              payemtMode: paymentMethod,
              cardNumber: data.cardNumber,
              expiryMonth: data.expiryMonth,
              expiryYear: data.expiryYear,
              cvv: data.cvv,
            };

            fetch(`${API_URL}/api/Payment`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(paymentPostData),
            })
              .then((response) => response.json())
              .then((responseData) => {
                console.log('responseData', responseData);
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

                }
              })
              .catch((error) => {
                // Handle any errors
              });
          }
          setRedirect(true);
        })
        .catch((error) => {
          // Handle any errors
        });
    }
  };

  return (
    <>
      <div id="page" className="page">
        <Header />
        <main id="content" className="site-main">
          <section className="package-inner-page">
            {/* ***Inner Banner html start form here*** */}
            <div className="inner-banner-wrap">
              <div
                className="inner-baner-container"
                style={{ backgroundImage: "url(assets/images/img7.jpg)" }}
              >
                <div className="container">
                  <div className="inner-banner-content">
                    <h1 className="page-title">Package Deatil</h1>
                  </div>
                </div>
              </div>
            </div>
            {/* ***Inner Banner html end here*** */}
            {/* ***career section html start form here*** */}
            <div className="inner-package-detail-wrap">
              <div className="container">
                <div className="row">
                  <div className="col-lg-8 primary right-sidebar">
                    <div className="single-packge-wrap">
                      <div className="single-package-head d-flex align-items-center">
                        <div className="package-title">
                          <h2>{packageDetailsList.packageName}</h2>
                          <div className="rating-start-wrap">
                            <div className="rating-start">
                              <span style={{ width: "80%" }} />
                            </div>
                          </div>
                        </div>
                        <div className="package-price">
                          <h6 className="price-list">
                            <span>${packageDetailsList.amount}</span>/ per
                            person
                          </h6>
                        </div>
                      </div>
                      <div className="package-meta">
                        <ul>
                          <li>
                            <i className="fas fa-clock" />
                            {packageDetailsList.noOfDays}D/
                            {packageDetailsList.noOfNights}N
                          </li>
                          <li>
                            <i className="fas fa-user-friends" />
                            pax: 10
                          </li>
                          <li>
                            <i className="fas fa-swimmer" />
                            Category : {packageDetailsList.categoryName}
                          </li>
                          {countryDetails.countryName ? (
                            <li>
                              <i className="fas fa-map-marker-alt" />
                              {countryDetails.countryName}
                            </li>
                          ) : (
                            ""
                          )}
                        </ul>
                      </div>
                      <figure className="single-package-image">
                        <img src={imageSrc} alt="" />
                      </figure>
                      <div className="package-content-detail">
                        <article className="package-overview">
                          <h3>OVERVIEW :</h3>
                          <p>{packageDetailsList.description}</p>
                        </article>
                        <article className="package-include bg-light-grey">
                          <h3>Bus Details</h3>
                          <ul>
                            {busDetails.busName ? (
                              <li>
                                <i className="fas fa-check" />
                                Bus Name: {busDetails.busName}
                              </li>
                            ) : (
                              ""
                            )}

                            {busDetails.totalSeat ? (
                              <li>
                                <i className="fas fa-check" />
                                Total Seat: {busDetails.totalSeat}
                              </li>
                            ) : (
                              ""
                            )}

                            {busDetails.availableSeat ? (
                              <li>
                                <i className="fas fa-check" />
                                Available Seat: {busDetails.availableSeat}
                              </li>
                            ) : (
                              ""
                            )}
                            <br />
                            {busDetails.description ? (
                              <li style={{ width: "100%" }}>
                                <i className="fas fa-check" />
                                Description: {busDetails.description}
                              </li>
                            ) : (
                              ""
                            )}
                          </ul>
                        </article>

                        {hotelDetails ? (
                          <article className="package-ininerary">
                            <h3>{hotelDetails.hotelName}</h3>
                            <ul>
                              {hotelCountryDetails.countryName ? (
                                <li>
                                  <i
                                    aria-hidden="true"
                                    className="fas fa-dot-circle"
                                  />
                                  <span>Country: </span>
                                  {hotelCountryDetails.countryName}
                                </li>
                              ) : (
                                ""
                              )}

                              {hotelStateDetails.stateName ? (
                                <li>
                                  <i
                                    aria-hidden="true"
                                    className="fas fa-dot-circle"
                                  />
                                  <span>State: </span>
                                  {hotelStateDetails.stateName}
                                </li>
                              ) : (
                                ""
                              )}

                              {hotelCityDetails.cityName ? (
                                <li>
                                  <i
                                    aria-hidden="true"
                                    className="fas fa-dot-circle"
                                  />
                                  <span>City: </span>
                                  {hotelCityDetails.cityName}
                                </li>
                              ) : (
                                ""
                              )}
                            </ul>

                            {hotelDetails.description ? (
                              <p>{hotelDetails.description}</p>
                            ) : (
                              ""
                            )}
                          </article>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4">
                    <div className="sidebar">
                      <div className="booking-form-wrap">
                        <div className="booking-form-inner primary-bg">
                          <h3>BOOKING FORM</h3>
                          <p>
                            Malesuada incidunt excepturi proident quo eros?
                            Sinterdum praesent magnis, eius cumque.
                          </p>
                          <form
                            className="booking-form"
                            onSubmit={handleSubmit}
                          >
                            <div className="row">
                              <p>
                                <input
                                  type="number"
                                  name="contactNumber"
                                  placeholder="Your Contact Number"
                                  value={formData.contactNumber || ""}
                                  onChange={handleInputChange}
                                  required
                                />
                              </p>
                              <p>
                                <input
                                  type="email"
                                  name="emailId"
                                  placeholder="Your Email Address"
                                  value={formData.emailId || ""}
                                  onChange={handleInputChange}
                                  required
                                />
                              </p>

                              <p>
                                <input
                                  type="number"
                                  name="noOfTravelers"
                                  placeholder="No Of Travelers"
                                  value={formData.noOfTravelers || ""}
                                  onChange={handleInputChange}
                                  required
                                />
                              </p>
                              <p>
                                <select
                                  value={paymentMethod}
                                  onChange={handleDropdownChange}
                                  required
                                >
                                  <option value="">
                                    Select Payment Method
                                  </option>
                                  <option value="true">ONLINE</option>
                                  <option value="false">CASH</option>
                                </select>
                              </p>
                            </div>

                            {paymentMethod === "true" && (
                              <div className="row">
                                <label
                                  className="mb-3"
                                  style={{ color: "white" }}
                                >
                                  Bank Card Details
                                </label>
                                <p>
                                  <input
                                    type="text"
                                    name="cardNumber"
                                    placeholder="Your Card Number"
                                    value={formData.cardNumber || ""}
                                    onChange={handleInputChange}
                                    required
                                  />
                                </p>

                                <p className="width-5">
                                  <input
                                    className="input-date-picker"
                                    type="number"
                                    name="expiryMonth"
                                    placeholder="MM"
                                    value={formData.expiryMonth || ""}
                                    onChange={handleInputChange}
                                    required
                                  />
                                </p>
                                <p className="width-5">
                                  <input
                                    className="input-date-picker"
                                    type="number"
                                    name="expiryYear"
                                    placeholder="YY"
                                    autoComplete="off"
                                    value={formData.expiryYear || ""}
                                    onChange={handleInputChange}
                                    required
                                  />
                                </p>
                                <p className="width-5">
                                  <input
                                    className="input-date-picker"
                                    type="number"
                                    name="cvv"
                                    placeholder="1234"
                                    autoComplete="off"
                                    value={formData.cvv || ""}
                                    onChange={handleInputChange}
                                    required
                                  />
                                </p>
                              </div>
                            )}
                            <p>
                              <button
                                type="submit"
                                className="outline-btn outline-btn-white"
                              >
                                BOOK NOW
                              </button>
                            </p>
                          </form>
                        </div>
                      </div>
                      <div className="related-package">
                        <h3>RELATED IMAGES</h3>
                        <p>
                          Quaerat inventore! Vestibulum aenean volutpat gravida.
                          Sagittis, euismod perferendis.
                        </p>
                        <div className="related-package-slide">
                          <div className="related-package-item">
                            <img src="assets/images/img1.jpg" alt="" />
                          </div>
                        </div>
                      </div>
                      <div className="package-map">
                        <iframe
                          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2483.540423056448!2d-0.12174238402827448!3d51.50330061882345!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487604b900d26973%3A0x4291f3172409ea92!2slastminute.com%20London%20Eye!5e0!3m2!1sen!2snp!4v1646314586610!5m2!1sen!2snp"
                          width={600}
                          height={320}
                          style={{ border: 0 }}
                          allowFullScreen
                          loading="lazy"
                        />
                      </div>
                      <div className="package-list">
                        <div className="overlay" />
                        <h4>MORE PACKAGES</h4>
                        <ul>
                          <li>
                            <a href="#">
                              <i
                                aria-hidden="true"
                                className="icon icon-arrow-right-circle"
                              />
                              Vacation Packages
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              <i
                                aria-hidden="true"
                                className="icon icon-arrow-right-circle"
                              />
                              Homeymoon Packages
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              <i
                                aria-hidden="true"
                                className="icon icon-arrow-right-circle"
                              />
                              New Year Packages
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              <i
                                aria-hidden="true"
                                className="icon icon-arrow-right-circle"
                              />
                              Weekend Packages
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* ***career section html start form here*** */}
          </section>
        </main>
        <Footer />
      </div>
      {/* JavaScript */}
      <ToastContainer />
    </>
  );
};

export default PackageDetails;
