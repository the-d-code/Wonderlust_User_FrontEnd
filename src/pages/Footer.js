import React from 'react';

class Footer extends React.Component {
    render() {
        return (
            <>
                {/* ***site footer html start form here*** */}
                <footer id="colophon" className="site-footer footer-primary">
                    <div className="top-footer">
                        <div className="container">
                            <div className="upper-footer">
                                <div className="row">
                                    <div className="col-lg-3 col-sm-6">
                                        <aside className="widget widget_text">
                                            <div className="footer-logo">
                                                <a href="index.html">
                                                    <img src="assets/images/site-logo.png" alt="" />
                                                </a>
                                            </div>
                                            <div className="textwidget widget-text">
                                                Urna ratione ante harum provident, eleifend, vulputate
                                                molestiae proin fringilla, praesentium magna conubia at
                                                perferendis, pretium, aenean aut ultrices.
                                            </div>
                                        </aside>
                                    </div>
                                    <div className="col-lg-3 col-sm-6">
                                        <aside className="widget widget_latest_post widget-post-thumb">
                                            <h3 className="widget-title">RECENT POST</h3>
                                            <ul>
                                                <li>
                                                    <figure className="post-thumb">
                                                        <a href="blog-archive.html">
                                                            <img src="assets/images/img21.jpg" alt="" />
                                                        </a>
                                                    </figure>
                                                    <div className="post-content">
                                                        <h6>
                                                            <a href="blog-single.html">
                                                                BEST JOURNEY TO PEACEFUL PLACES
                                                            </a>
                                                        </h6>
                                                        <div className="entry-meta">
                                                            <span className="posted-on">
                                                                <a href="blog-archive.html">February 17, 2022</a>
                                                            </span>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li>
                                                    <figure className="post-thumb">
                                                        <a href="blog-archive.html">
                                                            <img src="assets/images/img22.jpg" alt="" />
                                                        </a>
                                                    </figure>
                                                    <div className="post-content">
                                                        <h6>
                                                            <a href="blog-single.html">
                                                                TRAVEL WITH FRIENDS IS BEST
                                                            </a>
                                                        </h6>
                                                        <div className="entry-meta">
                                                            <span className="posted-on">
                                                                <a href="blog-archive.html">February 17, 2022</a>
                                                            </span>
                                                        </div>
                                                    </div>
                                                </li>
                                            </ul>
                                        </aside>
                                    </div>
                                    <div className="col-lg-3 col-sm-6">
                                        <aside className="widget widget_text">
                                            <h3 className="widget-title">CONTACT US</h3>
                                            <div className="textwidget widget-text">
                                                <p>
                                                    Feel free to contact and
                                                    <br /> reach us !!
                                                </p>
                                                <ul>
                                                    <li>
                                                        <a href="tel:+01988256203">
                                                            <i aria-hidden="true" className="icon icon-phone1" />
                                                            +01(988) 256 203
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="mailtop:info@domain.com">
                                                            <i
                                                                aria-hidden="true"
                                                                className="icon icon-envelope1"
                                                            />
                                                            info@domain.com
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <i
                                                            aria-hidden="true"
                                                            className="icon icon-map-marker1"
                                                        />
                                                        3146 Koontz, California
                                                    </li>
                                                </ul>
                                            </div>
                                        </aside>
                                    </div>
                                    <div className="col-lg-3 col-sm-6">
                                        <aside className="widget">
                                            <h3 className="widget-title">Gallery</h3>
                                            <div className="gallery gallery-colum-3">
                                                <figure className="gallery-item">
                                                    <a
                                                        href="assets/images/img10.jpg"
                                                        data-fancybox="gallery-1"
                                                    >
                                                        <img src="assets/images/img21.jpg" alt="" />
                                                    </a>
                                                </figure>
                                                <figure className="gallery-item">
                                                    <a
                                                        href="assets/images/img28.jpg"
                                                        data-fancybox="gallery-1"
                                                    >
                                                        <img src="assets/images/img22.jpg" alt="" />
                                                    </a>
                                                </figure>
                                                <figure className="gallery-item">
                                                    <a
                                                        href="assets/images/img14.jpg"
                                                        data-fancybox="gallery-1"
                                                    >
                                                        <img src="assets/images/img23.jpg" alt="" />
                                                    </a>
                                                </figure>
                                                <figure className="gallery-item">
                                                    <a
                                                        href="assets/images/img15.jpg"
                                                        data-fancybox="gallery-1"
                                                    >
                                                        <img src="assets/images/img24.jpg" alt="" />
                                                    </a>
                                                </figure>
                                                <figure className="gallery-item">
                                                    <a
                                                        href="assets/images/img12.jpg"
                                                        data-fancybox="gallery-1"
                                                    >
                                                        <img src="assets/images/img25.jpg" alt="" />
                                                    </a>
                                                </figure>
                                                <figure className="gallery-item">
                                                    <a
                                                        href="assets/images/img13.jpg"
                                                        data-fancybox="gallery-1"
                                                    >
                                                        <img src="assets/images/img26.jpg" alt="" />
                                                    </a>
                                                </figure>
                                            </div>
                                        </aside>
                                    </div>
                                </div>
                            </div>
                            <div className="lower-footer">
                                <div className="row align-items-center">
                                    <div className="col-lg-6">
                                        <div className="footer-newsletter">
                                            <p>Subscribe our newsletter for more update &amp; news !!</p>
                                            <form className="newsletter">
                                                <input
                                                    type="email"
                                                    name="email"
                                                    placeholder="Enter Your Email"
                                                />
                                                <button
                                                    type="submit"
                                                    className="outline-btn outline-btn-white"
                                                >
                                                    Subscribe
                                                </button>
                                            </form>
                                        </div>
                                    </div>
                                    <div className="col-lg-6 text-right">
                                        <div className="social-icon">
                                            <ul>
                                                <li>
                                                    <a href="https://www.facebook.com/" target="_blank">
                                                        <i className="fab fa-facebook-f" aria-hidden="true" />
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="https://www.twitter.com/" target="_blank">
                                                        <i className="fab fa-twitter" aria-hidden="true" />
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="https://www.youtube.com/" target="_blank">
                                                        <i className="fab fa-youtube" aria-hidden="true" />
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="https://www.instagram.com/" target="_blank">
                                                        <i className="fab fa-instagram" aria-hidden="true" />
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="https://www.linkedin.com/" target="_blank">
                                                        <i className="fab fa-linkedin" aria-hidden="true" />
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="footer-menu">
                                            <ul>
                                                <li>
                                                    <a href="policy.html">Privacy Policy</a>
                                                </li>
                                                <li>
                                                    <a href="policy.html">Term &amp; Condition</a>
                                                </li>
                                                <li>
                                                    <a href="faq.html">FAQ</a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bottom-footer">
                        <div className="container">
                            <div className="copy-right text-center">
                                Copyright © 2022 Traveler. All rights reserved.
                            </div>
                        </div>
                    </div>
                </footer>
                {/* ***site footer html end*** */}
                <a id="backTotop" href="#" className="to-top-icon">
                    <i className="fas fa-chevron-up" />
                </a>
                {/* ***custom search field html*** */}
                <div className="header-search-form">
                    <div className="container">
                        <div className="header-search-container">
                            <form className="search-form" role="search" method="get">
                                <input type="text" name="s" placeholder="Enter your text..." />
                            </form>
                            <a href="#" className="search-close">
                                <i className="fas fa-times" />
                            </a>
                        </div>
                    </div>
                </div>
                {/* ***custom search field html*** */}
                {/* ***custom top bar offcanvas html*** */}
                <div id="offCanvas" className="offcanvas-container">
                    <div className="offcanvas-inner">
                        <div className="offcanvas-sidebar">
                            <aside className="widget author_widget">
                                <h3 className="widget-title">OUR PROPRIETOR</h3>
                                <div className="widget-content text-center">
                                    <div className="profile">
                                        <figure className="avatar">
                                            <img src="assets/images/img21.jpg" alt="" />
                                        </figure>
                                        <div className="text-content">
                                            <div className="name-title">
                                                <h4> James Watson</h4>
                                            </div>
                                            <p>
                                                Accumsan? Aliquet nobis doloremque, aliqua? Inceptos
                                                voluptatem, duis tempore optio quae animi viverra distinctio
                                                cumque vivamus, earum congue, anim velit
                                            </p>
                                        </div>
                                        <div className="socialgroup">
                                            <ul>
                                                <li>
                                                    {" "}
                                                    <a target="_blank" href="#">
                                                        {" "}
                                                        <i className="fab fa-facebook" />{" "}
                                                    </a>{" "}
                                                </li>
                                                <li>
                                                    {" "}
                                                    <a target="_blank" href="#">
                                                        {" "}
                                                        <i className="fab fa-google" />{" "}
                                                    </a>{" "}
                                                </li>
                                                <li>
                                                    {" "}
                                                    <a target="_blank" href="#">
                                                        {" "}
                                                        <i className="fab fa-twitter" />{" "}
                                                    </a>{" "}
                                                </li>
                                                <li>
                                                    {" "}
                                                    <a target="_blank" href="#">
                                                        {" "}
                                                        <i className="fab fa-instagram" />{" "}
                                                    </a>{" "}
                                                </li>
                                                <li>
                                                    {" "}
                                                    <a target="_blank" href="#">
                                                        {" "}
                                                        <i className="fab fa-pinterest" />{" "}
                                                    </a>{" "}
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </aside>
                            <aside className="widget widget_text text-center">
                                <h3 className="widget-title">CONTACT US</h3>
                                <div className="textwidget widget-text">
                                    <p>
                                        Feel free to contact and
                                        <br /> reach us !!
                                    </p>
                                    <ul>
                                        <li>
                                            <a href="tel:+01988256203">
                                                <i aria-hidden="true" className="icon icon-phone1" />
                                                +01(988) 256 203
                                            </a>
                                        </li>
                                        <li>
                                            <a href="mailtop:info@domain.com">
                                                <i aria-hidden="true" className="icon icon-envelope1" />
                                                info@domain.com
                                            </a>
                                        </li>
                                        <li>
                                            <i aria-hidden="true" className="icon icon-map-marker1" />
                                            3146 Koontz, California
                                        </li>
                                    </ul>
                                </div>
                            </aside>
                        </div>
                        <a href="#" className="offcanvas-close">
                            <i className="fas fa-times" />
                        </a>
                    </div>
                    <div className="overlay" />
                </div>
                {/* ***custom top bar offcanvas html*** */}
            </>
        );
    }
}

export default Footer;