import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import API_URL from "../Config";
import { Link } from "react-router-dom";

const Home = () => {

  const custStyle = {
    overflow: 'hidden',
    display: '-webkit-box',
    WebkitLineClamp: 3,
    WebkitBoxOrient: 'vertical',
  };

    const [categoriesList, setCategoriesList] = useState([]);
    const [packagesList, setPackagesList] = useState([]);

    useEffect(() => {
      getCategories();
      getPackages();
    }, []);
  
  
    async function getCategories() {
      try {
        const response = await fetch(`${API_URL}/api/Categories`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
  
        const responseData = await response.json();
        if (responseData.data) {
          setCategoriesList(responseData.data);
        }
      } catch (error) {
        // Handle any errors
      }
    }

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
          {/* ***home banner html start form here*** */}
          <section className="home-banner-section home-banner-slider">
            <div
              className="home-banner d-flex flex-wrap align-items-center"
              style={{ backgroundImage: "url(assets/images/banner-img1.jpg)" }}
            >
              <div className="overlay" />
              <div className="container">
                <div className="banner-content text-center">
                  <div className="row">
                    <div className="col-lg-8 offset-lg-2">
                      <h2 className="banner-title">JOURNEY TO EXPLORE WORLD</h2>
                      <p>
                        Ac mi duis mollis. Sapiente? Scelerisque quae,
                        penatibus? Suscipit class corporis nostra rem quos
                        voluptatibus habitant? Fames, vivamus minim nemo enim,
                        gravida lobortis quasi, eum.
                      </p>
                      <div className="banner-btn">
                        <a href="about.html" className="round-btn">
                          LEARN MORE
                        </a>
                        <a
                          href="booking.html"
                          className="outline-btn outline-btn-white"
                        >
                          BOOK NOW
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* ***home banner html end here*** */}
          {/* ***Home search field html start from here*** */}
          <div className="home-trip-search primary-bg">
            <div className="container">
              <form method="get" className="trip-search-inner d-flex">
                <div className="group-input">
                  <label> Search Destination* </label>
                  <input type="text" name="s" placeholder="Enter Destination" />
                </div>
                <div className="group-input">
                  <label> Pax Number* </label>
                  <input type="text" name="s" placeholder="No.of People" />
                </div>
                <div className="group-input width-col-3">
                  <label> Checkin Date* </label>
                  <i className="far fa-calendar" />
                  <input
                    className="input-date-picker"
                    type="text"
                    name="s"
                    placeholder="MM / DD / YY"
                    autoComplete="off"
                    readOnly="readonly"
                  />
                </div>
                <div className="group-input width-col-3">
                  <label> Checkout Date* </label>
                  <i className="far fa-calendar" />
                  <input
                    className="input-date-picker"
                    type="text"
                    name="s"
                    placeholder="MM / DD / YY"
                    autoComplete="off"
                    readOnly="readonly"
                  />
                </div>
                <div className="group-input width-col-3">
                  <input
                    type="submit"
                    name="travel-search"
                    defaultValue="INQUIRE NOW"
                  />
                </div>
              </form>
            </div>
          </div>
          {/* ***search search field html end here*** */}
          {/* ***Home destination html start from here*** */}
          <section className="home-destination">
            <div className="container">
              <div className="row">
                <div className="col-lg-8 offset-lg-2 text-sm-center">
                  <div className="section-heading">
                    <h5 className="sub-title">UNCOVER PLACE</h5>
                    <h2 className="section-title">POPULAR DESTINATION</h2>
                    <p>
                      Fusce hic augue velit wisi quibusdam pariatur, iusto
                      primis, nec nemo, rutrum. Vestibulum cumque laudantium.
                      Sit ornare mollitia tenetur, aptent.
                    </p>
                  </div>
                </div>
              </div>
              <div className="destination-section">
                <div className="row">
                  {categoriesList.slice(0, 3).map((category) => (
                    <div className="col-lg-4 col-md-6">
                      <article
                        className="destination-item"
                        style={{
                          backgroundImage:`url(http://localhost:9515/images/category/${category.categoryImage})`,
                        }}
                      >
                        <div className="destination-content">
                          <div className="rating-start-wrap">
                            <div className="rating-start">
                              <span style={{ width: "100%" }} />
                            </div>
                          </div>
                          <span className="cat-link">
                            <a href="destination.html">{category.categoryName}</a>
                          </span>
                          <h3>
                            <a href="package-detail.html">{category.categoryName}</a>
                          </h3>
                          <p style={custStyle}>
                            {category.categoryDescription}
                          </p>
                        </div>
                      </article>
                    </div>
                  ))}
                </div>
                <div className="section-btn-wrap text-center">
                 
                  <Link className="round-btn" to={`/categories`}>View All Categories</Link>
                </div>
              </div>
            </div>
          </section>
          {/* ***Home destination html end here*** */}
          {/* ***Home package html start from here*** */}
          <section className="home-package">
            <div className="container">
              <div className="row">
                <div className="col-lg-8 offset-lg-2 text-sm-center">
                  <div className="section-heading">
                    <h5 className="sub-title">POPULAR PACKAGES</h5>
                    <h2 className="section-title">CHECKOUT OUR PACKAGES</h2>
                    <p>
                      Fusce hic augue velit wisi quibusdam pariatur, iusto
                      primis, nec nemo, rutrum. Vestibulum cumque laudantium.
                      Sit ornare mollitia tenetur, aptent.
                    </p>
                  </div>
                </div>
              </div>
              <div className="package-section">
              {packagesList.slice(0, 3).map((category) => (
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
                <div className="section-btn-wrap text-center">
                 
                  <Link className="round-btn" to={`/packages`}>VIEW ALL PACKAGES</Link>

                </div>
              </div>
            </div>
          </section>
          {/* ***Home package html end here*** */}
          {/* ***Home callback html start from here*** */}
          <section
            className="home-callback bg-img-fullcallback"
            style={{ backgroundImage: "url(assets/images/img7.jpg)" }}
          >
            <div className="overlay" />
            <div className="container">
              <div className="row">
                <div className="col-lg-8 offset-lg-2 text-center">
                  <div className="callback-content">
                    <div className="video-button">
                      <a
                        id="video-container"
                        data-fancybox="video-gallery"
                        href="https://www.youtube.com/watch?v=2OYar8OHEOU"
                      >
                        <i className="fas fa-play" />
                      </a>
                    </div>
                    <h2 className="section-title">
                      ARE YOU READY TO TRAVEL? REMEMBER US !!
                    </h2>
                    <p>
                      Fusce hic augue velit wisi quibusdam pariatur, iusto
                      primis, nec nemo, rutrum. Vestibulum cumque laudantium.
                      Sit ornare mollitia tenetur, aptent.
                    </p>
                    <div className="callback-btn">
                      <a href="package.html" className="round-btn">
                        View Packages
                      </a>
                      <a
                        href="about.html"
                        className="outline-btn outline-btn-white"
                      >
                        Learn More
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* ***Home callback html end here*** */}
          {/* ***Home counter html start from here*** */}
          <div className="home-counter">
            <div className="container">
              <div className="counter-wrap">
                <div className="counter-item">
                  <span className="counter-no">
                    <span className="counter">80</span>K+
                  </span>
                  <span className="counter-desc">SATISFIED CUSTOMER</span>
                </div>
                <div className="counter-item">
                  <span className="counter-no">
                    <span className="counter">18</span>+
                  </span>
                  <span className="counter-desc">ACTIVE MEMBERS</span>
                </div>
                <div className="counter-item">
                  <span className="counter-no">
                    <span className="counter">220</span>+
                  </span>
                  <span className="counter-desc">TOUR DESTINATION</span>
                </div>
                <div className="counter-item">
                  <span className="counter-no">
                    <span className="counter">75</span>+
                  </span>
                  <span className="counter-desc">TRAVEL GUIDES</span>
                </div>
              </div>
            </div>
          </div>
          {/* ***Home counter html end here*** */}
          {/* ***Home offer html start from here*** */}
          <section className="home-offer">
            <div className="container">
              <div className="row">
                <div className="col-lg-8 offset-lg-2 text-sm-center">
                  <div className="section-heading">
                    <h5 className="sub-title">OFFER &amp; DISCOUNT</h5>
                    <h2 className="section-title">OUR SPECIAL PACKAGES</h2>
                    <p>
                      Fusce hic augue velit wisi quibusdam pariatur, iusto
                      primis, nec nemo, rutrum. Vestibulum cumque laudantium.
                      Sit ornare mollitia tenetur, aptent.
                    </p>
                  </div>
                </div>
              </div>
              <div className="offer-section">
                <div className="row">
                  <div className="col-md-6">
                    <article
                      className="offer-item"
                      style={{ backgroundImage: "url(assets/images/img8.jpg)" }}
                    >
                      <div className="offer-badge">
                        UPTO <span>25%</span> off
                      </div>
                      <div className="offer-content">
                        <div className="package-meta">
                          <ul>
                            <li>
                              <i className="fas fa-clock" />
                              7D/6N
                            </li>
                            <li>
                              <i className="fas fa-user-friends" />
                              pax: 10
                            </li>
                            <li>
                              <i className="fas fa-map-marker-alt" />
                              Malaysia
                            </li>
                          </ul>
                        </div>
                        <h3>
                          <a href="package.html">TOUR TO SATORINI</a>
                        </h3>
                        <p>
                          Fusce hic augue velit wisi ips quibus dam pariatur,
                          iusto.
                        </p>
                        <div className="price-list">
                          price:
                          <del>$1300 </del>
                          <ins>$1105</ins>
                        </div>
                        <a href="booking.html" className="round-btn">
                          Book Now
                        </a>
                      </div>
                    </article>
                  </div>
                  <div className="col-md-6">
                    <article
                      className="offer-item"
                      style={{ backgroundImage: "url(assets/images/img9.jpg)" }}
                    >
                      <div className="offer-badge">
                        UPTO <span>17%</span> off
                      </div>
                      <div className="offer-content">
                        <div className="package-meta">
                          <ul>
                            <li>
                              <i className="fas fa-clock" />
                              5D/4N
                            </li>
                            <li>
                              <i className="fas fa-user-friends" />
                              pax: 10
                            </li>
                            <li>
                              <i className="fas fa-map-marker-alt" />
                              Malaysia
                            </li>
                          </ul>
                        </div>
                        <h3>
                          <a href="package.html">WEEKEND TO PARIS</a>
                        </h3>
                        <p>
                          Fusce hic augue velit wisi ips quibus dam pariatur,
                          iusto.
                        </p>
                        <div className="price-list">
                          price:
                          <del>$1100 </del>
                          <ins>$900</ins>
                        </div>
                        <a href="booking.html" className="round-btn">
                          Book Now
                        </a>
                      </div>
                    </article>
                  </div>
                </div>
                <div className="section-btn-wrap text-center">
                  <a href="package-offer.html" className="round-btn">
                    VIEW ALL PACKAGES
                  </a>
                </div>
              </div>
            </div>
          </section>
          {/* ***Home offer html end here*** */}
          {/* ***Home gallery html start from here*** */}
          {/* <section className="home-gallery">
                            <div className="container">
                                <div className="row">
                                    <div className="col-lg-8 offset-lg-2 text-sm-center">
                                        <div className="section-heading">
                                            <h5 className="sub-title">PHOTO GALLERY</h5>
                                            <h2 className="section-title">PHOTO'S FROM TRAVELLERS</h2>
                                            <p>
                                                Fusce hic augue velit wisi quibusdam pariatur, iusto primis,
                                                nec nemo, rutrum. Vestibulum cumque laudantium. Sit ornare
                                                mollitia tenetur, aptent.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="gallery-section">
                                    <div className="gallery-container grid">
                                        <div className="single-gallery grid-item">
                                            <figure className="gallery-img">
                                                <a href="assets/images/img14.jpg" data-fancybox="gallery">
                                                    <img src="assets/images/img14.jpg" alt="" />
                                                </a>
                                            </figure>
                                        </div>
                                        <div className="single-gallery grid-item">
                                            <figure className="gallery-img">
                                                <a href="assets/images/img11.jpg" data-fancybox="gallery">
                                                    <img src="assets/images/img11.jpg" alt="" />
                                                </a>
                                            </figure>
                                        </div>
                                        <div className="single-gallery grid-item">
                                            <figure className="gallery-img">
                                                <a href="assets/images/img12.jpg" data-fancybox="gallery">
                                                    <img src="assets/images/img12.jpg" alt="" />
                                                </a>
                                            </figure>
                                        </div>
                                        <div className="single-gallery grid-item">
                                            <figure className="gallery-img">
                                                <a href="assets/images/img13jpg.html" data-fancybox="gallery">
                                                    <img src="assets/images/img13.jpg" alt="" />
                                                </a>
                                            </figure>
                                        </div>
                                        <div className="single-gallery grid-item">
                                            <figure className="gallery-img">
                                                <a href="assets/images/img10.jpg" data-fancybox="gallery">
                                                    <img src="assets/images/img10.jpg" alt="" />
                                                </a>
                                            </figure>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section> */}
          {/* ***Home gallery html end here*** */}
          {/* ***Home client html start from here*** */}
          <section
            className="home-client client-section"
            style={{ backgroundImage: "url(assets/images/banner-img1.jpg)" }}
          >
            <div className="container">
              <div className="row align-items-center">
                <div className="col-lg-6">
                  <div className="client-content">
                    <h5 className="sub-title">DISCOUNT OFFER</h5>
                    <h2 className="section-title">
                      GET SPECIAL DISCOUNT ON SIGN UP !
                    </h2>
                    <p>
                      Fusce hic augue velit wisi quibusdam pariatur, iusto
                      primis, nec nemo, rutrum. Vestibulum cumque laudantm sit.
                    </p>
                    <a href="contact.html" className="round-btn">
                      Sign Up Now
                    </a>
                  </div>
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
            <div className="overlay" />
          </section>
          {/* ***Home client html end here*** */}
          {/* ***Home blog html start from here*** */}
          <section className="home-blog">
            <div className="container">
              <div className="section-heading d-sm-flex align-items-center justify-content-between">
                <div className="heading-group">
                  <h5 className="sub-title">LATEST BLOG</h5>
                  <h2 className="section-title">OUR RECENT POSTS</h2>
                  <p>
                    Fusce hic augue velit wisi quibusdam pariatur, iusto primis,
                    nec nemo, rutrum. <br />
                    Vestibulum cumque laudantium. Sit ornare mollitia tenetur,
                    aptent.
                  </p>
                </div>
                <div className="heading-btn">
                  <a href="blog-archive.html" className="round-btn">
                    View All Blog
                  </a>
                </div>
              </div>
              <div className="blog-section">
                <div className="row gx-4">
                  <div className="col-lg-6">
                    <article className="post">
                      <figure
                        className="featured-post"
                        style={{
                          backgroundImage: "url(assets/images/img16.jpg)",
                        }}
                      />
                      <div className="post-content">
                        <div className="cat-meta">
                          <a href="blog-archive.html">TOUR</a>
                        </div>
                        <h3>
                          <a href="blog-single.html">
                            BEST JOURNEY TO PEACEFUL PLACES
                          </a>
                        </h3>
                        <p>
                          Laboris hac erat dolor, posuere volutpat fringilla
                          gravida metus nonummy, blandit mi...
                        </p>
                        <div className="post-footer d-flex justify-content-between align-items-center">
                          <div className="post-btn">
                            <a href="blog-single.html" className="round-btn">
                              Read More
                            </a>
                          </div>
                          <div className="meta-comment">
                            <a href="blog-archive.html">
                              <i
                                aria-hidden="true"
                                className="fas fa-comment"
                              />
                              <span>0</span>
                            </a>
                          </div>
                        </div>
                      </div>
                    </article>
                  </div>
                  <div className="col-lg-6">
                    <article className="post">
                      <figure
                        className="featured-post"
                        style={{
                          backgroundImage: "url(assets/images/img17.jpg)",
                        }}
                      />
                      <div className="post-content">
                        <div className="cat-meta">
                          <a href="blog-archive.html">TRAVEL</a>
                        </div>
                        <h3>
                          <a href="blog-single.html">
                            BTRAVEL WITH FRIENDS IS BEST
                          </a>
                        </h3>
                        <p>
                          Laboris hac erat dolor, posuere volutpat fringilla
                          gravida metus nonummy, blandit mi...
                        </p>
                        <div className="post-footer d-flex justify-content-between align-items-center">
                          <div className="post-btn">
                            <a href="blog-single.html" className="round-btn">
                              Read More
                            </a>
                          </div>
                          <div className="meta-comment">
                            <a href="blog-archive.html">
                              <i
                                aria-hidden="true"
                                className="fas fa-comment"
                              />
                              <span>0</span>
                            </a>
                          </div>
                        </div>
                      </div>
                    </article>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* ***Home blog html end here*** */}
          {/* ***Home testimonial html start from here*** */}
          <section className="home-testimonial">
            <div className="container">
              <div className="row">
                <div className="col-lg-8 offset-lg-2 text-center">
                  <div className="section-heading">
                    <h5 className="sub-title">CLIENT'S REVIEWS</h5>
                    <h2 className="section-title">TRAVELLER'S TESTIMONIAL</h2>
                    <p>
                      Fusce hic augue velit wisi quibusdam pariatur, iusto
                      primis, nec nemo, rutrum. Vestibulum cumque laudantium.
                      Sit ornare mollitia tenetur, aptent.
                    </p>
                  </div>
                </div>
              </div>
              <div className="testimonial-section testimonial-slider">
                <div className="testimonial-item">
                  <div className="testimonial-content">
                    <div className="rating-start-wrap">
                      <div className="rating-start">
                        <span style={{ width: "80%" }} />
                      </div>
                    </div>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua.
                    </p>
                    <div className="author-content">
                      <figure className="testimonial-img">
                        <img src="assets/images/img18.jpg" alt="" />
                      </figure>
                      <div className="author-name">
                        <h5>WILLIAM WRIGHT</h5>
                        <span>TRAVELLERS</span>
                      </div>
                    </div>
                    <div className="testimonial-icon">
                      <i aria-hidden="true" className="fas fa-quote-left" />
                    </div>
                  </div>
                </div>
                <div className="testimonial-item">
                  <div className="testimonial-content">
                    <div className="rating-start-wrap">
                      <div className="rating-start">
                        <span style={{ width: "80%" }} />
                      </div>
                    </div>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua.
                    </p>
                    <div className="author-content">
                      <figure className="testimonial-img">
                        <img src="assets/images/img19.jpg" alt="" />
                      </figure>
                      <div className="author-name">
                        <h5>ALISON WHITE</h5>
                        <span>TRAVELLERS</span>
                      </div>
                    </div>
                    <div className="testimonial-icon">
                      <i aria-hidden="true" className="fas fa-quote-left" />
                    </div>
                  </div>
                </div>
                <div className="testimonial-item">
                  <div className="testimonial-content">
                    <div className="rating-start-wrap">
                      <div className="rating-start">
                        <span style={{ width: "80%" }} />
                      </div>
                    </div>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua.
                    </p>
                    <div className="author-content">
                      <figure className="testimonial-img">
                        <img src="assets/images/img20.jpg" alt="" />
                      </figure>
                      <div className="author-name">
                        <h5>GEORGE SMITH</h5>
                        <span>TRAVELLERS</span>
                      </div>
                    </div>
                    <div className="testimonial-icon">
                      <i aria-hidden="true" className="fas fa-quote-left" />
                    </div>
                  </div>
                </div>
                <div className="testimonial-item">
                  <div className="testimonial-content">
                    <div className="rating-start-wrap">
                      <div className="rating-start">
                        <span style={{ width: "80%" }} />
                      </div>
                    </div>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua.
                    </p>
                    <div className="author-content">
                      <figure className="testimonial-img">
                        <img src="assets/images/img19.jpg" alt="" />
                      </figure>
                      <div className="author-name">
                        <h5>ALISON WHITE</h5>
                        <span>TRAVELLERS</span>
                      </div>
                    </div>
                    <div className="testimonial-icon">
                      <i aria-hidden="true" className="fas fa-quote-left" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* ***Home testimonial html end here*** */}
          {/* ***Home callback html start from here*** */}
          <section className="home-callback bg-color-callback primary-bg">
            <div className="container">
              <div className="row align-items-center">
                <div className="col-md-8">
                  <h5 className="sub-title">CALL TO ACTION</h5>
                  <h2 className="section-title">
                    READY FOR UNFORGATABLE TRAVEL. REMEMBER US!
                  </h2>
                  <p>
                    Fusce hic augue velit wisi quibusdam pariatur, iusto primis,
                    nec nemo, rutrum. Vestibulum cumque laudantium. Sit ornare
                    mollitia tenetur, aptent.
                  </p>
                </div>
                <div className="col-md-4 text-md-end">
                  <a
                    href="contact.html"
                    className="outline-btn outline-btn-white"
                  >
                    Contact Us !
                  </a>
                </div>
              </div>
            </div>
          </section>
          {/* ***Home callback html end here*** */}
        </main>

        <Footer></Footer>
      </div>
      {/* JavaScript */}
    </>
  );
};

export default Home;
