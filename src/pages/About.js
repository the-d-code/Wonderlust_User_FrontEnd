import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";

const About = () => {
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
                    <h1 className="page-title">About Us</h1>
                  </div>
                </div>
              </div>
            </div>
            {/* ***Inner Banner html end here*** */}
            {/* ***about section html start form here*** */}
            <div className="inner-about-wrap">
              <div className="container">
                <div className="row">
                  <div className="col-lg-8">
                    <div className="about-content">
                      <figure className="about-image">
                        <img src="assets/images/img27.jpg" alt="" />
                        <div className="about-image-content">
                          <h3>
                            WE ARE BEST FOR TOURS &amp; TRAVEL SINCE 1985 !
                          </h3>
                        </div>
                      </figure>
                      <h2>HOW WE ARE BEST FOR TRAVEL !</h2>
                      <p>
                        Dictumst voluptas qui placeat omnis repellendus, est
                        assumenda dolores facilisis, nostra, inceptos. Ullam
                        laudantium deserunt duis platea. Fermentum diam,
                        perspiciatis cupidatat justo quam voluptate, feugiat,
                        quaerat. Delectus aute scelerisque blanditiis venenatis
                        aperiam rem. Tempore porttitor orci eligendi velit vel
                        scelerisque minus scelerisque? Dis! Aenean! Deleniti
                        esse aperiam adipiscing, sapiente?{" "}
                      </p>
                      <p>
                        Ratione conubia incididunt nullam! Sodales, impedit,
                        molestias consectetuer itaque magni ut neque, lobortis
                        expedita corporis voluptatem natus praesent mollis
                        quidem auctor curae, mattis laboris diamlorem iure
                        nullam esse? Pariatur primis.
                      </p>
                    </div>
                    <div className="client-slider white-bg" style={{display: "inline-flex"}}>
                      <figure className="client-item">
                        <img src="assets/images/client-img7.png" alt="" />
                      </figure>
                      <figure className="client-item">
                        <img src="assets/images/client-img8.png" alt="" />
                      </figure>
                      <figure className="client-item">
                        <img src="assets/images/client-img9.png" alt="" />
                      </figure>
                      <figure className="client-item">
                        <img src="assets/images/client-img10.png" alt="" />
                      </figure>
                      <figure className="client-item">
                        <img src="assets/images/client-img11.png" alt="" />
                      </figure>
                    </div>
                  </div>
                  <div className="col-lg-4">
                    <div className="icon-box">
                      <div className="box-icon">
                        <i
                          aria-hidden="true"
                          className="fas fa-umbrella-beach"
                        />
                      </div>
                      <div className="icon-box-content">
                        <h3>AFFORDABLE TOURS</h3>
                        <p>
                          Iure doloremque saepe? Ultrices mi aliquam dis tempore
                          incididunt sint, cumque dis temp!
                        </p>
                      </div>
                    </div>
                    <div className="icon-box">
                      <div className="box-icon">
                        <i aria-hidden="true" className="fas fa-user-tag" />
                      </div>
                      <div className="icon-box-content">
                        <h3>BEST TOUR GUIDES</h3>
                        <p>
                          Iure doloremque saepe? Ultrices mi aliquam dis tempore
                          incididunt sint, cumque dis temp!
                        </p>
                      </div>
                    </div>
                    <div className="icon-box">
                      <div className="box-icon">
                        <i aria-hidden="true" className="fas fa-headset" />
                      </div>
                      <div className="icon-box-content">
                        <h3>AFFORDABLE TOURS</h3>
                        <p>
                          Iure doloremque saepe? Ultrices mi aliquam dis tempore
                          incididunt sint, cumque dis temp!
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* ***about section html start form here*** */}
            {/* ***callback section html start form here*** */}
            <div
              className="bg-img-fullcallback"
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
            </div>
            {/* ***callback section html end here*** */}
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default About;
