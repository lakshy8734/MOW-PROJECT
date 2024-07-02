import img from '../../assets/mow.webp'
import style from './Verification.module.css'
import React, { useState, useEffect } from 'react';
import Link from 'Component/Link/Link';

import Navbar from 'Component/Navbar/Navbar';

import {
    FaYoutube,
    FaInstagram,
    FaPinterest,
    FaFacebook,
} from "react-icons/fa";
// import { Link } from 'react-router-dom';



import Aos from "aos";
import 'aos/dist/aos.css';
import { useNavigate } from 'react-router-dom';
import Shareit from 'Component/Shareit/Shareit';


function Verification() {
    const navigate = useNavigate();

    const handleLogoClick = () => {
        navigate("/");
    };

    const [submenus, setSubmenus] = useState({
        Recommendations: false,
        News: false,
        Gaming: false,
        Browse: false,
        More: false,
    });


    useEffect(() => {
        Aos.init({ duration: 2000 })
    }, [])



    return (
        <div>

            <div style={{ position: "sticky", top: "0", zIndex: "1" }}>
                <Navbar />
            </div>

            <section className={style.About}>

                <p data-aos="fade-up">At My Otaku World, we place the utmost importance on delivering accurate and trustworthy information to our cherished community of anime and gaming enthusiasts.</p>

                <p data-aos="fade-up">Our editorial process is designed to ensure that every piece of content we produce meets the highest standards of accuracy and reliability.</p>

                <h2>Writers’ Responsibility</h2>
                <p data-aos="fade-up">Our dedicated team of writers carries the primary responsibility for researching, reporting, and fact-checking their stories.</p>

                <p data-aos="fade-up">They are passionate about the topics they cover and work diligently to provide our readers with the most up-to-date and accurate information.</p>

                <h2>Editorial Review</h2>
                <p data-aos="fade-up">Multi-Level Editing: Each piece of content published on My Otaku World goes through a multi-level editing process. Our editorial team collaborates closely to review and refine the content.</p>

                <p data-aos="fade-up">Fact-Checking: Fact-checking is an integral part of our editorial process. We take great care to ensure that the information presented in our articles is accurate and reliable.</p>

                <h2>Ensuring Accurate Headlines</h2>
                <p data-aos="fade-up">We firmly believe that the headline should accurately reflect the content of the article. Our team actively works to provide 100% accurate headlines that align with the content presented in each piece of news.</p>

                <h2>Confirming Sources</h2>
                <p data-aos="fade-up">Reaching Out to Sources: When we cover rumors, potential leaks, or unconfirmed announcements from sources such as social media, credits, YouTube channels, and more, we take proactive steps to confirm the accuracy of the news.</p>

                <p data-aos="fade-up">Verification from Studios and Individuals: We reach out to the relevant studios or individuals to seek confirmation of the news. Only after receiving confirmation, or when no official statement is provided, do we proceed with publishing.</p>

                <h2>When We Are the Original Source</h2>
                <p data-aos="fade-up">Adherence to Journalism Principles: When we are the original source of a news story, we follow fundamental principles of journalism. Our aim is to provide our readers with accurate and unbiased reporting.</p>

                <h2>Transparency in Reporting</h2>
                <p data-aos="fade-up">No Official Statement: In cases where official entities do not respond to our inquiries, we are committed to providing the most accurate information available.</p>

                <p data-aos="fade-up">We include a note at the bottom of the post to inform our readers that no official statement on the topic has been made.</p>

                <h2>Our Commitment to You</h2>
                <p data-aos="fade-up">At My Otaku World, our dedication to accuracy and transparency is unwavering. We understand that you rely on us for credible information in the world of anime and gaming, and we take this responsibility seriously.</p>

                <p data-aos="fade-up">If you ever have questions, concerns, or feedback about our content or editorial process, please don’t hesitate to reach out to us. We value your engagement and are here to provide you with the best possible experience.</p>

                <p data-aos="fade-up">Thank you for being part of the My Otaku World community, where accuracy and trust are the foundations of our content.</p>


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

export default Verification