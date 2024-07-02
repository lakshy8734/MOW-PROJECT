import img from '../../assets/mow.webp'
import style from './About.module.css'
import React, { useState, useEffect, useContext } from 'react';
import first from '../../assets/anime-gaming.webp'
import sec from '../../assets/sec.webp'
import third from '../../assets/third.webp'
import Akio from '../../assets/Akio.webp'
import Hiroshi from '../../assets/Hiroshi.webp'
import Sanjana from '../../assets/Sanjana.webp'
import Shagun from '../../assets/Shagun.webp'

import Navbar from '../../Component/Navbar/Navbar'

import {
    FaYoutube,
    FaInstagram,
    FaPinterest,
    FaFacebook,
    FaTeamspeak,
    FaPencilRuler,
    FaUser,
    FaLinkedin,
    FaTwitter
} from "react-icons/fa";
import Link from 'Component/Link/Link';

import Aos from "aos";
import 'aos/dist/aos.css';
import { useNavigate } from 'react-router-dom';
import Shareit from 'Component/Shareit/Shareit';


function About() {
    const navigate = useNavigate();

    const handleLogoClick = () => {
        navigate("/");
    };

    const memberImages = [
        '../../assets/Anukul.webp',
        '../../assets/Garima.webp',
        '../../src/assets/Garima.webp'
    ];


    const [showFirstSection, setShowFirstSection] = useState(true);
    const [showSecondSection, setShowSecondSection] = useState(false);
    const [showThirdSection, setShowThirdSection] = useState(false);

    const handleFirstSectionClick = () => {
        setShowFirstSection(true);
        setShowSecondSection(false);
        setShowThirdSection(false);
    };

    const handleSecondSectionClick = () => {
        setShowFirstSection(false);
        setShowSecondSection(true);
        setShowThirdSection(false);
    };

    const handleThirdSectionClick = () => {
        setShowFirstSection(false);
        setShowSecondSection(false);
        setShowThirdSection(true);
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
                <h2 >About My Otaku World</h2>
                <p data-aos="fade-up">
                    At My Otaku World, we’re passionate about all things anime, manga, gaming, and Japanese pop culture. Our blog is a vibrant hub where enthusiasts like you can dive deep into the exciting realms of Japanese entertainment. Whether you’re a seasoned otaku or just starting your journey, our team of dedicated writers is here to bring you the latest news, in-depth reviews, insightful recommendations, and fascinating features from the ever-evolving world of anime and gaming.
                </p>
                <h3  >What We Offer:</h3>
                <ul data-aos="fade-up">
                    <div>
                        <li>
                            <strong>Anime and Gaming News: </strong> Stay up-to-date with the latest happenings, announcements, and developments in the anime and gaming industry.
                        </li>
                        <li>
                            <strong>Reviews and Recommendations: </strong> Explore our detailed reviews and curated recommendations for anime, manga, light novels, and video games to discover your next favorite series or game.
                        </li>
                        <li>
                            <strong>Cultural Features: </strong> Immerse yourself in Japanese culture through our articles exploring diverse aspects of this rich heritage.
                        </li>
                        <li>
                            <strong>Cosplay and Fan Art: </strong> Celebrate the creativity of the community with our showcases of anime and manga-inspired cosplay and fan art.
                        </li>
                    </div>
                </ul>
            </section>

            <section className={style.About2}>
                <h4 data-aos="fade-down" >
                    At MOW, we are connecting gamers & <br /> otakus together!
                </h4>
                <div className={style.bg}>

                    <div data-aos="fade-up" className={style.cards}>

                        <div className={style.card}>
                            <h6>500k+</h6>
                            <span>Monthly Readers</span>
                        </div>
                        <div className={style.card}>
                            <h6>3K+</h6>
                            <span>Articles</span>
                        </div>
                        <div className={style.card}>
                            <h6>1K+</h6>
                            <span>Users</span>
                        </div>
                    </div>
                    <div className={style.Aboutbtn}>
                        <button data-aos="fade-up"  >
                            Join Mow Community!
                        </button>
                    </div>

                    <p data-aos="fade-up" >
                        My Otaku World is more than just a blog; it’s a community of passionate fans sharing their love for Japanese pop culture. Whether you’re seeking news, entertainment, or a place to connect with fellow otaku, you’ve found your home here.
                    </p>
                    <p data-aos="fade-up" >
                        Join us on this exciting journey, and let’s explore the wonders of anime, manga, gaming, and beyond together.
                    </p>
                    <p data-aos="fade-up" >
                        Embrace your otaku spirit with My Otaku World – where anime and gaming come to life!
                    </p>
                </div>
            </section>

            <div className={style.section}>

                <section className={style.Aboutimg}>

                    <div data-aos="fade" className={style.AboutPara}>
                        <p>
                            We are so glad to know that you wish to know more about us!
                        </p>

                        <h2>
                            Our Vision
                        </h2>

                        <p>
                            In simple terms, My Otaku World wants to be a one-stop-shop for everything that an otaku does or might need.
                        </p>

                        <p>
                            Anime recommendations, manga recommendations, character
                            countdowns, news, gift guides, merchandise, cosplay, Games, Japanese culture and every other thing that you can dream of!
                        </p>



                    </div>

                </section>
            </div>


            <div data-aos="fade-up" className={style.cards2}>

                <div className={style.card} onClick={handleFirstSectionClick}>
                    <span className={style.icons}>
                        <FaTeamspeak />
                    </span>
                    <h6>Who we are?</h6>
                    <span>Our Team</span>
                </div>

                <div className={style.card} onClick={handleSecondSectionClick}>
                    <span className={style.icons}>
                        <FaPencilRuler />
                    </span>
                    <h6>What we Do?</h6>
                    <span>Our Team</span>

                </div>

                <div onClick={handleThirdSectionClick} className={style.card}>
                    <span className={style.icons}>
                        <FaUser />
                    </span>
                    <h6>Community!</h6>
                    <span>Games & Otaku</span>

                </div>
            </div>

            <div style={{ display: showFirstSection ? 'block' : 'none' }}>
                <section className={style.controller} >

                    <div data-aos="fade" className={style.left}>
                        <img src={first} alt="" />
                    </div>

                    <div data-aos="fade-down" className={style.right}>
                        <h1>We are Weebs & Gamers Just Like you</h1>
                        <p>
                            We are a team of dedicated creators that have come together to bring you this joint effort!
                        </p>
                        <p>
                            Content creators who pour a part of their soul into every piece of content that they make.
                        </p>
                    </div>

                </section>
            </div>

            <div style={{ display: showSecondSection ? 'block' : 'none' }}>
                <section data-aos="fade" className={style.controller} >

                    <div className={style.left}>
                        <img src={sec} alt="" />
                    </div>

                    <div className={style.right}>
                        <h1>We Just Make Awesome Content For You!</h1>
                        <p>
                            We makes sure our soul reaches you in the form of articles, and our design team that aims to reach your heart rather than eyes and so many more unsung individuals at the with only one thought in their mind, to make awesome content for you.
                        </p>
                    </div>

                </section>
            </div>

            <div style={{ display: showThirdSection ? 'block' : 'none' }} >
                <section data-aos="fade" className={style.controller} >

                    <div className={style.left}>
                        <img src={third} alt="" />
                    </div>

                    <div className={style.right}>
                        <p>
                            Obviously, the biggest part of this endeavor is…
                        </p>
                        <h1>YOU!</h1>
                        <p>
                            We will never be able to achieve what we want if you are not with us on our journey. Without your support, we will never be able to get anywhere.
                        </p>

                        <p>
                            he fact that you have come here and have read until here is something that we are very grateful for. Every single interaction that you have with us means so much to us.
                        </p>

                        <p>
                            Sounds like a big responsibility, but it actually is not. You do your bit, the way you can. We shall do our bit, the best we can.
                        </p>
                    </div>

                </section>
            </div>


            <section className={style.Team}>
                <h1>
                    Meet the Core Team
                </h1>
                <p data-aos="fade-up" >
                    Unleashing Our Anime & Gaming Heroes: Meet the Powerhouse Behind the Screens!
                </p>


                <div data-aos="fade" className={style.teamcard}>

                    <div className={style.handler}>
                        <div>
                            <div className={style.member}>
                                <a href="">
                                    <FaLinkedin className={style.icon} />
                                </a>
                            </div>
                        </div>
                        <h1>Anukul Saini</h1>
                        <h6>Owner</h6>
                    </div>

                    <div className={style.handler}>
                        <div>
                            <div className={style.member2}>
                                <a href="">
                                    <FaLinkedin className={style.icon} />
                                </a>
                            </div>
                        </div>
                        <h1>Garima Singh</h1>
                        <h6>Content Manager</h6>
                    </div>

                    <div className={style.handler}>
                        <div>
                            <div className={style.member3}>
                                <a href="">
                                    <FaTwitter className={style.icon} />
                                </a>
                            </div>
                        </div>
                        <h1>Azmarine</h1>
                        <h6>Content Writer</h6>
                    </div>
                </div>
            </section>


            <section className={style.Writers}>

                <h1>
                    Meet Our Writers
                </h1>
                <p data-aos="fade-up">
                    Our writers are seasoned experts in the world of anime and gaming. They are not only knowledgeable but also passionate enthusiasts who live and breathe anime and gaming culture.
                </p>
                <p data-aos="fade-up">
                    With their extensive experience and genuine passion, our writers offer unique insights and expertise, ensuring you get the most authentic and informed content about your favorite anime and games.
                </p>
            </section>

            <section className={style.aboutwriters}>

                <div data-aos="fade-up" className={style.Aiko}>

                    <img src={Akio} alt="" />

                    <div>
                        <h2>
                            Aiko Nakamura
                        </h2>
                        <p>
                            Meet Aiko Nakamura, our passionate anime expert! Hailing from the anime hub of Tokyo, Aiko, at 28, is a master of Media Studies, specializing in the intricate art of anime creation and watch order guides. With a heart deeply immersed in the anime universe, Aiko doesn't just explore the world of anime; she shapes it. When she's not crafting compelling fillers or curating watch order guides, you'll spot her at conventions, bringing her favorite characters to life through cosplay. Aiko doesn't just consider anime a passion—it's her life's calling.
                        </p>
                    </div>
                </div>

                <div data-aos="fade-down" className={style.Aiko}>

                    <img src={Hiroshi} alt="" />

                    <div>
                        <h2>
                            Hiroshi Tanaka
                        </h2>
                        <p>
                            Meet Hiroshi Tanaka, your anime aficionado straight from Tokyo! Since childhood, Hiroshi has been captivated by the epic tales of Dragon Ball, One Piece, and Naruto. Growing up in the heart of the anime universe, Hiroshi absorbed the essence of these series like a true connoisseur. Now, he's on a mission to share his passion and authentic Japanese insights with fans across the globe.
                        </p>
                    </div>
                </div>

                <div data-aos="fade-up" className={style.Aiko}>

                    <img src={Sanjana} alt="" />

                    <div>
                        <h2>
                            Sanjana Mukhiya
                        </h2>
                        <p>
                            Meet Sanjana Mukhiya, our dedicated anime news expert! With a keen eye for the latest trends and stories in the anime community, Sanjana is your go-to person for staying in the loop. She dives deep, uncovering exciting narratives, and independently shares them, fostering a strong connection with fellow otakus like you. If you're eager to know what's buzzing in the anime world, Sanjana has you covered. Stay informed and entertained with her timely updates and insightful analysis!
                        </p>
                    </div>
                </div>

                <div data-aos="fade-down" className={style.Aiko}>

                    <img src={Shagun} alt="" />

                    <div>
                        <h2>
                            Shagun Singh
                        </h2>
                        <p>
                            Meet Shagun Singh, the passionate Sims enthusiast at the heart of our Sims Content section. With an unbridled love for the virtual world of The Sims, Shagun dives deep into gameplay, uncovering secrets, sharing experiences, and offering invaluable tips. As your dedicated guide, Shagun is committed to transforming ordinary Sims gameplay into extraordinary adventures. Through Shagun's expertise, our readers are invited to explore the limitless creativity and excitement that The Sims universe has to offer.
                        </p>
                    </div>
                </div>

            </section>


            <section data-aos="fade-up" className={style.Quote}>

                <h2>
                    What Our Readers Say
                </h2>

                <p  >
                    "My Otaku World has become my go-to source for everything anime and gaming related. The reviews are comprehensive and honest, helping me discover new series and games I'd have otherwise missed. The cultural features are insightful, giving me a deeper understanding of the world behind my favorite anime. It's not just a website; it's a community where my passion for otaku culture is truly understood and celebrated."
                </p>

                <h6>
                    Emily
                </h6>

            </section>


            <Shareit/>

            {/* <section className={style.Usefullink} >

                <div className={style.links}>
                    <div data-aos="fade-up">
                        <h4>
                            Company
                        </h4>
                        <ul>
                            <li onClick={() => { navigate('/') }}>Home</li>
                            <li onClick={() => { navigate('/blogs') }} >Blog</li>
                            <li  style={{ color: "red" }} onClick={() => { navigate('/about') }}>About</li>
                            <li onClick={() => { navigate('/contact') }}>Contact</li>
                        </ul>
                    </div>
                    <div data-aos="fade-up">
                        <h4>
                            Community
                        </h4>
                        <ul>
                            <li>Members</li>
                            <li>Forums</li>
                            <li onClick={() => { navigate('/Contributor') }}>Become a <br />Contributors</li>

                        </ul>
                    </div>
                </div>

                <div className={style.links}>
                    <div data-aos="fade-up">
                        <h4>
                            Useful links
                        </h4>
                        <ul>
                            <li>Editorial Guidelines</li>
                            <li>Verification & Fact- <br /> Checking Policy</li>
                        </ul>
                    </div>
                    <div data-aos="fade-up">
                        <h4>
                            Legal
                        </h4>
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
                <p>All other assets and trademarks are property of their original owners.</p>
                <p>MyOtakuWorld is neither affiliated with nor endorsed any brands and trademarks on this site unless explicitly stated.</p>
            </footer>

        </div>
    )
}

export default About