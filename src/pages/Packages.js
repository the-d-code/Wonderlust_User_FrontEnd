import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { useEffect } from "react";
import API_URL from "./../Config";
import { Link } from "react-router-dom";

const Packages = () => {
  
  const custStyle = {
    overflow: 'hidden',
    display: '-webkit-box',
    WebkitLineClamp: 3,
    WebkitBoxOrient: 'vertical',
  };

  const [packagesList, setPackagesList] = useState([]);

  useEffect(() => {
    getPackages();
  }, []);

  async function getPackages() {
    try {
      const response = await fetch(`${API_URL}/api/Package`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const responseData = await response.json();
      if (responseData.data) {
        /* ------------ CATEGORY NAME ------------ */
        const packageCategoryName = await Promise.all(
          responseData.data.map(async (item) => {
            const newItem = { ...item };
            // Call the API for each item in the array
            const packageResponse = await fetch(
              `${API_URL}/api/Categories/${item.categoryId}`,
              {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                },
              }
            );

            const packageData = await packageResponse.json();
            newItem.categoryName = packageData.data.categoryName;

            return newItem;
          })
        );

        setPackagesList(packageCategoryName);

        /* ------------ COUNTRY NAME ------------ */
        const packageCountryName = await Promise.all(
          packageCategoryName.map(async (item) => {
            const newCountryName = { ...item };
            // Call the API for each item in the array
            const CountryResponse = await fetch(
              `${API_URL}/api/Country/${item.countryId}`,
              {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                },
              }
            );

            const CountryData = await CountryResponse.json();
            newCountryName.countryName = CountryData.data.countryName;

            return newCountryName;
          })
        );

        setPackagesList(packageCountryName);

        console.log("packageCountryName", packageCountryName);
      }
    } catch (error) {
      // Handle any errors
    }
  }

  return (
    <>
      <div id="page" className="page">
        <Header />
        <main id="content" className="site-main">
          <section className="inner-page-wrap">
            {/* ***Inner Banner html start form here*** */}
            <div className="inner-banner-wrap">
              <div
                className="inner-baner-container"
                style={{ backgroundImage: "url(assets/images/img7.jpg)" }}
              >
                <div className="container">
                  <div className="inner-banner-content">
                    <h1 className="page-title">Tour Packages</h1>
                  </div>
                </div>
              </div>
            </div>
            {/* ***Inner Banner html end here*** */}
            {/* ***package section html start form here*** */}
            <div className="package-item-wrap">
              <div className="container">
                {packagesList.map((category) => (
                  <article className="package-item">
                    <figure
                      className="package-image"
                      style={{ backgroundImage: `url(http://localhost:9515/images/package/${category.image})` }}
                    />
                    <div className="package-content">
                      <h3>
                        <Link to={`/package-details?id=${category.packageId}`}>
                          {category.packageName}
                        </Link>
                      </h3>
                      <p style={custStyle}>{category.description}</p>
                      <div className="package-meta">
                        <ul>
                          <li>
                            <i className="fas fa-clock" />
                            {category.noOfDays}D/{category.noOfNights}N
                          </li>
                          {category.categoryName ? (
                          <li>
                            <i className="fas fa-map" />
                            {category.categoryName}
                          </li>
                           ) : (
                            ""
                          )}

                          <li>
                            <i className="fas fa-user-friends" />
                            pax: 10
                          </li>
                          {category.countryName ? (
                            <li>
                              <i className="fas fa-map-marker-alt" />
                              {category.countryName}
                            </li>
                          ) : (
                            ""
                          )}
                        </ul>
                      </div>
                    </div>
                    <div className="package-price">
                      <div className="review-area">
                        <span className="review-text">(25 reviews)</span>
                        <div className="rating-start-wrap d-inline-block">
                          <div className="rating-start">
                            <span style={{ width: "80%" }} />
                          </div>
                        </div>
                      </div>
                      <h6 className="price-list">
                        <span>${category.amount}</span>/ per person
                      </h6>
                      <Link className="outline-btn outline-btn-white" to={`/package-details?id=${category.packageId}`}>Book now</Link>
                    </div>
                  </article>
                ))}
              </div>
            </div>
            {/* ***package section html start form here*** */}
            {/* ***client section html start form here*** */}
            <div
              className="client-section"
              style={{ backgroundImage: "url(assets/images/banner-img1.jpg)" }}
            >
              <div className="overlay" />
              <div className="container">
                <div className="row align-items-center">
                  <div className="col-lg-6">
                    <article className="client-content">
                      <h5 className="sub-title">DISCOUNT OFFER</h5>
                      <h2 className="section-title">
                        GET SPECIAL DISCOUNT ON SIGN UP !
                      </h2>
                      <p>
                        Fusce hic augue velit wisi quibusdam pariatur, iusto
                        primis, nec nemo, rutrum. Vestibulum cumque laudantm
                        sit.
                      </p>
                      <a href="contact.html" className="round-btn">
                        Sign Up Now
                      </a>
                    </article>
                  </div>
                  <div className="col-lg-6">
                    <div className="client-logo">
                      <ul>
                        <li>
                          <img src="assets/images/client-img1.png" alt="" />
                        </li>
                        <li>
                          <img src="assets/images/client-img2.png" alt="" />
                        </li>
                        <li>
                          <img src="assets/images/client-img3.png" alt="" />
                        </li>
                        <li>
                          <img src="assets/images/client-img4.png" alt="" />
                        </li>
                        <li>
                          <img src="assets/images/client-img5.png" alt="" />
                        </li>
                        <li>
                          <img src="assets/images/client-img6.png" alt="" />
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* ***clinet section html end here*** */}
          </section>
        </main>

        <Footer />
      </div>
      {/* JavaScript */}
    </>
  );
};

export default Packages;
