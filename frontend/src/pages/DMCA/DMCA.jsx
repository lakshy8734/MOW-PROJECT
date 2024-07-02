import img from '../../assets/mow.webp'
import style from './DMCA.module.css'
import React, { useState, useEffect } from 'react';
import Link from 'Component/Link/Link';
import Navbar from 'Component/Navbar/Navbar';


import LoginPop from 'Component/LoginPop/LoginPop';

import {
    FaYoutube,
    FaInstagram,
    FaPinterest,
    FaFacebook,
} from "react-icons/fa";

import { GiHamburgerMenu } from "react-icons/gi";

import { ImCross } from "react-icons/im";

import Aos from "aos";
import 'aos/dist/aos.css';
import { useNavigate } from 'react-router-dom';
import Shareit from 'Component/Shareit/Shareit';


function DMCA() {
    const navigate = useNavigate();

    const handleLogoClick = () => {
        navigate("/");
    };




    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    const handleCloseLogin = () => {
        setIsVisible(false);
    };

    const handleLoginClick = () => {
        setIsVisible(true);
    };

    const [submenus, setSubmenus] = useState({
        Recommendations: false,
        News: false,
        Gaming: false,
        Browse: false,
        More: false,
    });

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const closeSidebar = () => {
        setIsSidebarOpen(false);
    };


    const toggleSubmenu = (menu) => {
        setSubmenus((prev) => {
            const updatedSubmenus = Object.keys(prev).reduce((acc, key) => {
                acc[key] = key === menu ? !prev[key] : false;
                return acc;
            }, {});
            return updatedSubmenus;
        });
    };



    useEffect(() => {
        Aos.init({ duration: 2000 })
    }, [])


    const [scrolled, setScrolled] = useState(false);
    useEffect(() => {
        const handleScroll = () => {
            const offset = window.scrollY;
            if (offset > 100) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);


    return (
        <div>

            <div style={{ position: "sticky", top: "0", zIndex: "1" }}>
                <Navbar />
            </div>

            <section className={style.About}>

                <h6>Last Modified: 16/09/2023</h6>

                <h2 >Terms of Use Agreement</h2>

                <p data-aos="fade-up">
                    At My Otaku World, we are committed to respecting and upholding copyright laws. We take claims of copyright infringement seriously and will respond promptly to notices of alleged copyright violations in compliance with applicable law, including the Digital Millennium Copyright Act (DMCA).
                </p>
                <p data-aos="fade-up">
                    If you believe that any materials accessible on or from this website (the “Website”) infringe your copyright, you may request the removal of those materials (or access thereto) by submitting a written notification to our designated Copyright Agent. Please follow the DMCA guidelines below when reporting copyright infringement:
                </p>

                <h3>DMCA Notice Guidelines:</h3>

                <ul data-aos="fade-up">
                    <div data-aos="fade-up">
                        <li>
                            Your Physical or Electronic Signature: Your DMCA Notice must include your physical or electronic signature
                        </li>
                        <li>
                            Identification of the Copyrighted Work: Please identify the copyrighted work you believe has been infringed or, if multiple works on the Website are involved, provide a representative list of these works.

                        </li>
                        <li>
                            Precise Identification of Infringing Material: Clearly specify the material you believe is infringing your copyright in a manner that allows us to locate it. Providing URLs within the body of your email is the most effective way to help us identify and address the issue quickly.
                        </li>
                        <li>
                            Contact Information: Include your name, postal address, telephone number, and, if available, your email address to allow us to contact you.
                        </li>
                        <li>
                            Good Faith Belief Statement: State that you have a good faith belief that the use of the copyrighted material is not authorized by the copyright owner, its agent, or the law.
                        </li>
                        <li>
                            Accuracy Statement: Confirm that the information provided in your DMCA Notice is accurate to the best of your knowledge.
                        </li>
                        <li>
                            Statement Under Penalty of Perjury: Include a statement, made under penalty of perjury, that you are authorized to act on behalf of the copyright owner.
                        </li>
                    </div>
                </ul>

                <p data-aos="fade-up">
                    Failure to comply with all the requirements of Section 512(c)(3) of the DMCA may render your DMCA Notice ineffective.
                </p>

                <p data-aos="fade-up">
                    Please be aware that knowingly misrepresenting that material or activity on the Website infringes your copyright may result in liability for damages, including costs and attorneys’ fees, under Section 512(f) of the DMCA.
                </p>

                <h3 style={{ fontWeight: '600' }}>Counter-Notification Procedures</h3>
                <p data-aos="fade-up">
                    If you believe that material you posted on the site was removed or access to it was disabled by mistake or misidentification, you may file a counter-notification with us (a “Counter-Notice”) following the DMCA guidelines below:
                </p>

                <p data-aos="fade-up">
                    Counter-Notice Guidelines:
                </p>

                <ul data-aos="fade-up">

                    <div data-aos="fade-up">

                        <li data-aos="fade-up" >
                            Your Physical or Electronic Signature: Include your physical or electronic signature.
                        </li>

                        <li data-aos="fade-up">
                            Identification of Removed Material: Provide identification of the material that was removed or disabled, along with its previous location on the Website.
                        </li>

                        <li data-aos="fade-up">
                            Contact Information: Include your name, postal address, telephone number, and, if available, your email address.
                        </li>

                        <li data-aos="fade-up">
                            Statement Under Penalty of Perjury: State, under penalty of perjury, that you have a good faith belief that the material was removed or disabled due to a mistake or misidentification.
                        </li>

                        <li data-aos="fade-up">
                            Consent to Jurisdiction: Confirm that you will accept the jurisdiction of the Federal District Court for the judicial district in which your address is located (or, if you reside outside the United States, for any judicial district in which the Website may be found) and that you will accept service from the person (or an agent of that person) who provided the Website with the complaint at issue.
                        </li>

                    </div>
                </ul>

                <p data-aos="fade-up">
                    The DMCA allows us to restore the removed content if the party filing the original DMCA Notice does not file a court action against you within ten business days of receiving your Counter-Notice.
                </p>

                <p data-aos="fade-up">
                    Please be aware that knowingly misrepresenting that material or activity on the Website was removed or disabled by mistake or misidentification may result in liability for damages, including costs and attorneys’ fees, under Section 512(f) of the DMCA.
                </p>

                <p >
                    Repeat Infringers
                </p>
                <p>
                    It is our policy to disable and/or terminate the accounts of users who are repeat infringers.
                </p>
                <p>
                    Our Copyright Agent
                </p>
                <p>
                    Our designated Copyright Agent to receive DMCA Notices is:
                </p>
                <p>
                    Designated Agent
                </p>
                <h5>
                    Media Senpai
                </h5>
                <h5>
                    C-01,Durga Colony
                </h5>
                <h5>
                    Roorkee, UK, IN 247667
                </h5>
                <h5>
                    Email: <span style={{ color: '#d33' }}>anukul@mediasenpai.com</span>
                </h5>
                <p data-aos="fade-up">
                    The above procedure is exclusively for providing notice that your copyrighted content has been infringed or that the content you posted has been removed or disabled in error. Any other communications sent to our Copyright Agent may be disregarded.
                </p>
            </section>

            <Shareit/>

            

            <Link />

            <div className={style.divider}>
                <hr className={style.lines} />
            </div>

            <footer>
                <p>© 2019-2023 MyOtakuWorld</p>
                <p>All other assets and trademarks are property of their original owners.</p>
                <p>MyOtakuWorld is neither affiliated with nor endorsed any brands and trademarks on this site unless explicitly stated.</p>
            </footer>

        </div>
    )
}

export default DMCA