import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Aos from "aos";
import "aos/dist/aos.css";
import Navbar from "../../Component/Navbar/Navbar";
import style from "./Error.module.css";
import Link from "Component/Link/Link";

import img from '../../assets/Error.webp';

import {
    FaYoutube,
    FaInstagram,
    FaPinterest,
    FaFacebook,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Error() {
    const navigate = useNavigate();


    useEffect(() => {
        Aos.init({ duration: 2000 });
    }, []);

    return (
        <div>
            <div style={{ position: "sticky", top: "0", zIndex: "1" }}>
                <Navbar />
            </div>

            <section className={style.Error}>
                <div className={style.imgdiv}>
                    <img src={img} alt="" />
                </div>
                <h2>
                    Whoops!
                </h2>
                <p>
                    It looks like nothing was found at this location. Maybe try another search?
                </p>

            </section>



            <section data-aos="fade-up" className={style.link}>
                <a href="https://www.facebook.com/myotakuworld/" className={style.tooltip}>
                    <div style={{ color: '#1877f2' }}>
                        <FaFacebook />
                        <span className={style.tooltiptext}>Facebook</span>
                    </div>
                </a>
                <a href="https://www.pinterest.com/myotakuworld/" className={style.tooltip}>
                    <div style={{ color: '#bd081c' }}>
                        <FaPinterest />
                        <span className={style.tooltiptext}>Pinterest</span>
                    </div>
                </a>
                <a href="https://www.instagram.com/myotakuworld/" className={style.tooltip}>
                    <div style={{ color: '#c13584' }}>
                        <FaInstagram />
                        <span className={style.tooltiptext}>Instagram</span>
                    </div>
                </a>
                <a href="https://www.youtube.com/channel/UCrMFWL5maGeVBYwwXuq5HMA" className={style.tooltip}>
                    <div style={{ color: '#ff0000' }}>
                        <FaYoutube />
                        <span className={style.tooltiptext}>YouTube</span>
                    </div>
                </a>
            </section>


            {/* <section className={style.Usefullink}>
                <div className={style.links}>
                    <div data-aos="fade-up">
                        <h4>Company</h4>
                        <ul>
                            <li
                                onClick={() => {
                                    navigate("/");
                                }}
                            >
                                Home
                            </li>
                            <li
                                onClick={() => {
                                    navigate("/blogs");
                                }}
                            >
                                Blog
                            </li>
                            <li
                                onClick={() => {
                                    navigate("/about");
                                }}
                            >
                                About
                            </li>
                            <li
                                onClick={() => {
                                    navigate("/contact");
                                }}
                            >
                                Contact
                            </li>
                        </ul>
                    </div>
                    <div data-aos="fade-up">
                        <h4>Community</h4>
                        <ul>
                            <li>Members</li>
                            <li>Forums</li>
                            <li
                                onClick={() => {
                                    navigate("/Contributor");
                                }}
                                style={{ color: "red" }}
                            >
                                Become a <br />
                                Contributors
                            </li>
                        </ul>
                    </div>
                </div>

                <div className={style.links}>
                    <div data-aos="fade-up">
                        <h4>Useful links</h4>
                        <ul>
                            <li>Editorial Guidelines</li>
                            <li>
                                Verification & Fact- <br /> Checking Policy
                            </li>
                        </ul>
                    </div>
                    <div data-aos="fade-up">
                        <h4>Legal</h4>
                        <ul>
                            <li>DMCA</li>
                            <li>Privacy Policy</li>
                            <li>Terms of Use</li>
                        </ul>
                    </div>
                </div>
            </section> */}

            <Link />

            <div className={style.divider}>
                <hr className={style.lines} />
            </div>

            <footer>
                <p>© 2019-2023 MyOtakuWorld</p>
                <p>
                    All other assets and trademarks are property of their original owners.
                </p>
                <p>
                    MyOtakuWorld is neither affiliated with nor endorsed any brands and
                    trademarks on this site unless explicitly stated.
                </p>
            </footer>
            <ToastContainer />
        </div>
    );
}

export default Error;
