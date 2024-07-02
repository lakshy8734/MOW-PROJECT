import style from './MyAnimelist.module.css'

import React, { useState, useEffect } from 'react';

import Navbar from 'Component/Navbar/Navbar';

import LoginPop from 'Component/LoginPop/LoginPop';
import Demon from '../../assets/Demonslayer.jpg'
import S4 from '../../assets/Season4.webp'
import S2 from '../../assets/Season2.webp'

import { TiSocialFacebook } from "react-icons/ti";
import { FaTwitter } from "react-icons/fa";
import { GrReddit } from "react-icons/gr";
import { FaDiscord } from "react-icons/fa6";


import Tanjiro from '../../assets/Tanjiro.webp'
import Natsu from '../../assets/Natsu.jpg'
import Taka from '../../assets/Taka.jpg'
import Hiro from '../../assets/Hiro.jpg'
import Reina from '../../assets/Rina.jpg'
import Giyuu from '../../assets/Giyuu.webp'
import Zenitsu from '../../assets/Zenitsue.webp'
import Kano from '../../assets/Kanao.webp'
import Haruo from '../../assets/Haruo.jpg'
import hyde from '../../assets/Hyden.jpg'
import Yuki from '../../assets/Yuki.jpg'
import first from '../../assets/First.jpg'


import Link from 'Component/Link/Link';



import {
    FaYoutube,
    FaInstagram,
    FaPinterest,
    FaFacebook,
} from "react-icons/fa";
import Aos from "aos";
import 'aos/dist/aos.css';
import { useNavigate } from 'react-router-dom';
import Shareit from 'Component/Shareit/Shareit';


function MyAnimelist() {
    const navigate = useNavigate();

    const handleLogoClick = () => {
        navigate("/");
    };

    const [activeSection, setActiveSection] = useState('Details');

    const handleButtonClick = (section) => {
        setActiveSection(section);
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

            <section className={style.Anime}>

                <div className={style.Heading}>
                    <h1>
                        Kimetsu no Yaiba: Hashira Geiko-hen
                    </h1>
                    <h2>
                        Demon Slayer: Kimetsu no Yaiba Hashira Training Arc
                    </h2>
                </div>


                <div className={style.bottomsec}>

                    <div data-aos="fade-up" className={style.ImgSec}>

                        <div className={style.Img} >
                            <img src={Demon} alt="" />
                        </div>

                        <div className={style.social}>
                            <TiSocialFacebook className={style.one} />
                            <FaDiscord className={style.one} />
                            <FaTwitter className={style.one} />
                            <GrReddit className={style.one} />
                        </div>

                        <div className={style.alt}>
                            <h6>Alternative Titles</h6>
                            <p>
                                <strong>Japanese:</strong> 鬼滅の刃 柱稽古編
                            </p>
                            <p>
                                <strong>English:</strong>Demon Slayer: Kimetsu no Yaiba Hashira Training Arc
                            </p>
                        </div>

                        <div className={style.alt}>
                            <h6>Information</h6>
                            <p>
                                <strong>Type:</strong> TV
                            </p>
                            <p>
                                <strong>Episodes:</strong> Unknown
                            </p>
                            <p>
                                <strong>Status:</strong> Currently Airing
                            </p>
                            <p>
                                <strong>Aired:</strong> May 12, 2024 to ?
                            </p>
                            <p>
                                <strong>Premiered:</strong> Spring 2024
                            </p>
                            <p>
                                <strong>Broadcast:</strong> Sundays at 23:15 (JST)
                            </p>
                            <p>
                                <strong>Producers:</strong> Aniplex, Shueisha
                            </p>
                            <p>
                                <strong>Licensors:</strong> None found, add some
                            </p>
                            <p>
                                <strong>Studios:</strong> ufotable
                            </p>
                            <p>
                                <strong>Source:</strong> Manga
                            </p>
                            <p>
                                <strong>Genres:</strong> Action, Fantasy
                            </p>
                            <p>
                                <strong>Theme:</strong> Historical
                            </p>
                            <p>
                                <strong>Demographic:</strong> Shounen
                            </p>
                            <p>
                                <strong>Duration:</strong> 28 min.
                            </p>
                            <p>
                                <strong>Rating:</strong> R - 17+ (violence & profanity)
                            </p>
                        </div>

                        <div className={style.alt}>
                            <h6>Statistics</h6>
                            <p>
                                <strong>Score:</strong> 8.271 (scored by 25,821 users)<sup>1</sup> indicates a weighted score.
                            </p>
                            <p>
                                <strong>Ranked:</strong> #2992
                            </p>
                            <p>
                                <strong>Popularity:</strong> #737
                            </p>
                            <p>
                                <strong>Members:</strong> 327,035
                            </p>
                            <p>
                                <strong>Favorites:</strong> 2,774
                            </p>
                        </div>

                        <div className={style.alt}>
                            <h6>Available At</h6>
                            <p>
                                <a href="">
                                    <strong style={{ display: 'flex', alignItems: 'center' }}>
                                        <FaInstagram />
                                        Instagram
                                    </strong>
                                </a>
                            </p>

                            <p>
                                <a href="">
                                    <strong style={{ display: 'flex', alignItems: 'center' }}>
                                        <FaFacebook />
                                        Facebook
                                    </strong>
                                </a>
                            </p>

                            <p>
                                <a href="">
                                    <strong style={{ display: 'flex', alignItems: 'center' }}>
                                        <FaYoutube />
                                        Youtube
                                    </strong>
                                </a>
                            </p>

                        </div>
                    </div>


                    <div data-aos="fade-up" className={style.left}>

                        <div className={`${style.buttons}`}>
                            <button
                                onClick={() => handleButtonClick('Details')}
                                className={activeSection === 'Details' ? 'active' : ''}
                            >
                                Details
                            </button>
                            <button
                                onClick={() => handleButtonClick('Characters & Staff')}
                                className={activeSection === 'Characters & Staff' ? 'active' : ''}
                            >
                                Characters & Staff
                            </button>
                            <button
                                onClick={() => handleButtonClick('Picture')}
                                className={activeSection === 'Episodes' ? 'active' : ''}
                            >
                                Picture
                            </button>
                            <button
                                onClick={() => handleButtonClick('Videos')}
                                className={activeSection === 'Videos' ? 'active' : ''}
                            >
                                Videos
                            </button>

                            <button
                                onClick={() => handleButtonClick('Stats')}
                                className={activeSection === 'Stats' ? 'active' : ''}
                            >
                                Stats
                            </button>

                            <button
                                onClick={() => handleButtonClick('Reviews')}
                                className={activeSection === 'Reviews' ? 'active' : ''}
                            >
                                Reviews
                            </button>

                            <button
                                onClick={() => handleButtonClick('Recommendations')}
                                className={activeSection === 'Recommendations' ? 'active' : ''}
                            >
                                Recommendations
                            </button>

                            <button
                                onClick={() => handleButtonClick('Interest Stacks')}
                                className={activeSection === 'Interest Stacks' ? 'active' : ''}
                            >
                                Interest Stacks
                            </button>
                        </div>


                        {activeSection === 'Details' && (
                            <div className={style.first}>

                                <div className={style.Details}>

                                    <div className={style.section}>

                                        <div className={style.score}>
                                            <h5>SCORE</h5>
                                            <h6>8.56</h6>
                                            <h4>23.540 users</h4>
                                        </div>

                                        <div className={style.Rank}>
                                            <div className={style.top}>
                                                <h1>Ranked #299</h1>
                                                <h1>Popularity #737</h1>
                                                <h1>Members 326,967</h1>
                                            </div>
                                            <div className={style.bottom}>
                                                <a>Spring 2024</a>
                                                <a>TV</a>
                                                <a href='https://www.ufotable.com/'>ufotable</a>
                                            </div>

                                        </div>
                                    </div>

                                    <div className={style.sectionimg}>
                                        <img src={Demon} alt="" />
                                    </div>
                                </div>


                                <div className={style.sec2}>
                                    <h2>New season of Kimetsu no Yaiba.</h2>
                                </div>

                                <div className={style.Poster}>
                                    <img src={S4} alt="" />
                                    <img src={S2} alt="" />
                                </div>


                                <div className={style.sec3}>
                                    <h2>Related Entries</h2>
                                </div>

                                <div className={style.Related}>

                                    <div className={style.one}>

                                        <img src={S4} alt="" />

                                        <div className={style.content}>
                                            <h6>
                                                Adaptation (Manga)
                                            </h6>
                                            <p>
                                                Kimetsu no Yaiba
                                            </p>
                                        </div>

                                    </div>
                                    <div className={style.two}>

                                        <img src={S4} alt="" />

                                        <div className={style.content}>
                                            <h6>
                                                Prequel (TV)
                                            </h6>
                                            <p>
                                                Kimetsu no Yaiba: Katanakaji no Sato-hen
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className={style.sec4}>
                                    <h2>Characters & Voice Actors</h2>
                                </div>


                                <div className={style.Characters}>

                                    <div style={{ width: '50%' }}>


                                        <div className={style.Charactersone}>

                                            <div className={style.char}>
                                                <div className={style.img}>
                                                    <img src={Tanjiro} alt="" />
                                                </div>

                                                <div>
                                                    <h5>
                                                        Kamado, Tanjirou
                                                    </h5>
                                                    <h6>
                                                        Main
                                                    </h6>
                                                </div>
                                            </div>

                                            <div className={style.char2}>

                                                <div className={style.img}>
                                                    <img src={Natsu} alt="" />
                                                </div>

                                                <div>
                                                    <h5>
                                                        Hanae, Natsuki
                                                    </h5>
                                                    <h6>
                                                        Japanese
                                                    </h6>
                                                </div>
                                            </div>
                                        </div>

                                        <div className={style.Charactersone}>

                                            <div className={style.char}>
                                                <div className={style.img}>
                                                    <img src={Zenitsu} alt="" />
                                                </div>

                                                <div>
                                                    <h5>
                                                        Agatsuma, Zenitsu
                                                    </h5>
                                                    <h6>
                                                        Main
                                                    </h6>
                                                </div>
                                            </div>

                                            <div className={style.char2}>

                                                <div className={style.img}>
                                                    <img src={Hiro} alt="" />
                                                </div>

                                                <div>
                                                    <h5>
                                                        Shimono, Hiro
                                                    </h5>
                                                    <h6>
                                                        Japanese
                                                    </h6>
                                                </div>
                                            </div>
                                        </div>

                                        <div className={style.Charactersone}>

                                            <div className={style.char}>
                                                <div className={style.img}>
                                                    <img src={Zenitsu} alt="" />
                                                </div>

                                                <div>
                                                    <h5>
                                                        Agatsuma, Zenitsu
                                                    </h5>
                                                    <h6>
                                                        Main
                                                    </h6>
                                                </div>
                                            </div>

                                            <div className={style.char2}>

                                                <div className={style.img}>
                                                    <img src={Hiro} alt="" />
                                                </div>

                                                <div>
                                                    <h5>
                                                        Shimono, Hiro
                                                    </h5>
                                                    <h6>
                                                        Japanese
                                                    </h6>
                                                </div>
                                            </div>
                                        </div>
                                    </div>


                                    <div style={{ width: '50%' }}>

                                        <div className={style.Characterstwo}>
                                            <div className={style.char}>
                                                <div className={style.img}>
                                                    <img src={Giyuu} alt="" />
                                                </div>

                                                <div>
                                                    <h5>
                                                        Tomioka, Giyuu
                                                    </h5>
                                                    <h6>
                                                        Supporting
                                                    </h6>
                                                </div>
                                            </div>

                                            <div className={style.char2}>

                                                <div className={style.img}>
                                                    <img src={Taka} alt="" />
                                                </div>

                                                <div>
                                                    <h5>
                                                        Sakurai, Takahiro
                                                    </h5>
                                                    <h6>
                                                        Japanese
                                                    </h6>
                                                </div>
                                            </div>
                                        </div>

                                        <div className={style.Characterstwo}>
                                            <div className={style.char}>
                                                <div className={style.img}>
                                                    <img src={Kano} alt="" />
                                                </div>

                                                <div>
                                                    <h5>
                                                        Tsuyuri, Kanao
                                                    </h5>
                                                    <h6>
                                                        Supporting
                                                    </h6>
                                                </div>
                                            </div>

                                            <div className={style.char2}>

                                                <div className={style.img}>
                                                    <img src={Reina} alt="" />
                                                </div>

                                                <div>
                                                    <h5>
                                                        Ueda, Reina
                                                    </h5>
                                                    <h6>
                                                        Japanese
                                                    </h6>
                                                </div>
                                            </div>
                                        </div>

                                        <div className={style.Characterstwo}>
                                            <div className={style.char}>
                                                <div className={style.img}>
                                                    <img src={Giyuu} alt="" />
                                                </div>

                                                <div>
                                                    <h5>
                                                        Tsuyuri, Kanao
                                                    </h5>
                                                    <h6>
                                                        Supporting
                                                    </h6>
                                                </div>
                                            </div>

                                            <div className={style.char2}>

                                                <div className={style.img}>
                                                    <img src={Reina} alt="" />
                                                </div>

                                                <div>
                                                    <h5>
                                                        Ueda, Reina
                                                    </h5>
                                                    <h6>
                                                        Japanese
                                                    </h6>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>


                                <div className={style.sec4}>
                                    <h2>Staff</h2>
                                </div>

                                <div className={style.Characters}>

                                    <div style={{ width: '50%' }}>


                                        <div className={style.Charactersone}>

                                            <div className={style.char}>
                                                <div className={style.img}>
                                                    <img src={Haruo} alt="" />
                                                </div>

                                                <div>
                                                    <h5>
                                                        Sotozaki, Haruo
                                                    </h5>
                                                    <h6>
                                                        Director
                                                    </h6>
                                                </div>
                                            </div>
                                        </div>

                                        <div className={style.Charactersone}>

                                            <div className={style.char}>
                                                <div className={style.img}>
                                                    <img src={Yuki} alt="" />
                                                </div>

                                                <div>
                                                    <h5>
                                                        Kajiura, Yuki
                                                    </h5>
                                                    <h6>
                                                        Theme Song Composition, Theme Song Lyrics, Theme Song Arrangement
                                                    </h6>
                                                </div>
                                            </div>
                                        </div>


                                    </div>


                                    <div style={{ width: '50%' }}>

                                        <div className={style.Characterstwo}>
                                            <div className={style.char}>
                                                <div className={style.img}>
                                                    <img src={hyde} alt="" />
                                                </div>

                                                <div>
                                                    <h5>
                                                        Hyde
                                                    </h5>
                                                    <h6>

                                                        Theme Song Performance
                                                    </h6>
                                                </div>
                                            </div>

                                        </div>
                                        <div className={style.Characterstwo}>
                                            <div className={style.char}>
                                                <div className={style.img}>
                                                    <img src={first} alt="" />
                                                </div>

                                                <div>
                                                    <h5>
                                                        MY FIRST STORY
                                                    </h5>
                                                    <h6>

                                                        Theme Song Performance
                                                    </h6>
                                                </div>
                                            </div>

                                        </div>



                                    </div>

                                </div>


                                <div className={style.sec4}>
                                    <h2>Recommendations</h2>
                                </div>

                                <div className={style.carosal}>
                                    <img src={Demon} alt="" />
                                    <img src={Demon} alt="" />
                                    <img src={Demon} alt="" />
                                    <img src={Demon} alt="" />
                                    <img src={Demon} alt="" />
                                    <img src={Demon} alt="" />
                                    <img src={Demon} alt="" />
                                </div>
                            </div>
                        )}

                        {activeSection === 'Characters & Staff' && (
                            <div className={style.first}>

                                <div className={style.sec4}>
                                    <h2>Characters & Voice Actors</h2>
                                </div>


                                <div className={style.Characters}>

                                    <div style={{ width: '50%' }}>


                                        <div className={style.Charactersone}>

                                            <div className={style.char}>
                                                <div className={style.img}>
                                                    <img src={Tanjiro} alt="" />
                                                </div>

                                                <div>
                                                    <h5>
                                                        Kamado, Tanjirou
                                                    </h5>
                                                    <h6>
                                                        Main
                                                    </h6>
                                                </div>
                                            </div>

                                            <div className={style.char2}>

                                                <div className={style.img}>
                                                    <img src={Natsu} alt="" />
                                                </div>

                                                <div>
                                                    <h5>
                                                        Hanae, Natsuki
                                                    </h5>
                                                    <h6>
                                                        Japanese
                                                    </h6>
                                                </div>
                                            </div>
                                        </div>

                                        <div className={style.Charactersone}>

                                            <div className={style.char}>
                                                <div className={style.img}>
                                                    <img src={Zenitsu} alt="" />
                                                </div>

                                                <div>
                                                    <h5>
                                                        Agatsuma, Zenitsu
                                                    </h5>
                                                    <h6>
                                                        Main
                                                    </h6>
                                                </div>
                                            </div>

                                            <div className={style.char2}>

                                                <div className={style.img}>
                                                    <img src={Hiro} alt="" />
                                                </div>

                                                <div>
                                                    <h5>
                                                        Shimono, Hiro
                                                    </h5>
                                                    <h6>
                                                        Japanese
                                                    </h6>
                                                </div>
                                            </div>
                                        </div>

                                        <div className={style.Charactersone}>

                                            <div className={style.char}>
                                                <div className={style.img}>
                                                    <img src={Zenitsu} alt="" />
                                                </div>

                                                <div>
                                                    <h5>
                                                        Agatsuma, Zenitsu
                                                    </h5>
                                                    <h6>
                                                        Main
                                                    </h6>
                                                </div>
                                            </div>

                                            <div className={style.char2}>

                                                <div className={style.img}>
                                                    <img src={Hiro} alt="" />
                                                </div>

                                                <div>
                                                    <h5>
                                                        Shimono, Hiro
                                                    </h5>
                                                    <h6>
                                                        Japanese
                                                    </h6>
                                                </div>
                                            </div>
                                        </div>
                                    </div>


                                    <div style={{ width: '50%' }}>

                                        <div className={style.Characterstwo}>
                                            <div className={style.char}>
                                                <div className={style.img}>
                                                    <img src={Giyuu} alt="" />
                                                </div>

                                                <div>
                                                    <h5>
                                                        Tomioka, Giyuu
                                                    </h5>
                                                    <h6>
                                                        Supporting
                                                    </h6>
                                                </div>
                                            </div>

                                            <div className={style.char2}>

                                                <div className={style.img}>
                                                    <img src={Taka} alt="" />
                                                </div>

                                                <div>
                                                    <h5>
                                                        Sakurai, Takahiro
                                                    </h5>
                                                    <h6>
                                                        Japanese
                                                    </h6>
                                                </div>
                                            </div>
                                        </div>

                                        <div className={style.Characterstwo}>
                                            <div className={style.char}>
                                                <div className={style.img}>
                                                    <img src={Kano} alt="" />
                                                </div>

                                                <div>
                                                    <h5>
                                                        Tsuyuri, Kanao
                                                    </h5>
                                                    <h6>
                                                        Supporting
                                                    </h6>
                                                </div>
                                            </div>

                                            <div className={style.char2}>

                                                <div className={style.img}>
                                                    <img src={Reina} alt="" />
                                                </div>

                                                <div>
                                                    <h5>
                                                        Ueda, Reina
                                                    </h5>
                                                    <h6>
                                                        Japanese
                                                    </h6>
                                                </div>
                                            </div>
                                        </div>

                                        <div className={style.Characterstwo}>
                                            <div className={style.char}>
                                                <div className={style.img}>
                                                    <img src={Giyuu} alt="" />
                                                </div>

                                                <div>
                                                    <h5>
                                                        Tsuyuri, Kanao
                                                    </h5>
                                                    <h6>
                                                        Supporting
                                                    </h6>
                                                </div>
                                            </div>

                                            <div className={style.char2}>

                                                <div className={style.img}>
                                                    <img src={Reina} alt="" />
                                                </div>

                                                <div>
                                                    <h5>
                                                        Ueda, Reina
                                                    </h5>
                                                    <h6>
                                                        Japanese
                                                    </h6>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>


                                <div className={style.sec4}>
                                    <h2>Staff</h2>
                                </div>

                                <div className={style.Characters}>

                                    <div style={{ width: '50%' }}>


                                        <div className={style.Charactersone}>

                                            <div className={style.char}>
                                                <div className={style.img}>
                                                    <img src={Haruo} alt="" />
                                                </div>

                                                <div>
                                                    <h5>
                                                        Sotozaki, Haruo
                                                    </h5>
                                                    <h6>
                                                        Director
                                                    </h6>
                                                </div>
                                            </div>
                                        </div>

                                        <div className={style.Charactersone}>

                                            <div className={style.char}>
                                                <div className={style.img}>
                                                    <img src={Yuki} alt="" />
                                                </div>

                                                <div>
                                                    <h5>
                                                        Kajiura, Yuki
                                                    </h5>
                                                    <h6>
                                                        Theme Song Composition, Theme Song Lyrics, Theme Song Arrangement
                                                    </h6>
                                                </div>
                                            </div>
                                        </div>


                                    </div>


                                    <div style={{ width: '50%' }}>

                                        <div className={style.Characterstwo}>
                                            <div className={style.char}>
                                                <div className={style.img}>
                                                    <img src={hyde} alt="" />
                                                </div>

                                                <div>
                                                    <h5>
                                                        Hyde
                                                    </h5>
                                                    <h6>

                                                        Theme Song Performance
                                                    </h6>
                                                </div>
                                            </div>

                                        </div>
                                        <div className={style.Characterstwo}>
                                            <div className={style.char}>
                                                <div className={style.img}>
                                                    <img src={first} alt="" />
                                                </div>

                                                <div>
                                                    <h5>
                                                        MY FIRST STORY
                                                    </h5>
                                                    <h6>

                                                        Theme Song Performance
                                                    </h6>
                                                </div>
                                            </div>

                                        </div>



                                    </div>

                                </div>




                            </div>
                        )}

                        {activeSection === 'Picture' && (
                            <div style={{ marginTop: '1em' }} className={style.Poster}>
                                <img style={{ padding: '2px' }} src={S4} alt="" />
                                <img style={{ padding: '2px' }} src={S2} alt="" />
                            </div>
                        )}
                    </div>
                </div>
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
                            <li onClick={() => { navigate('/about') }}>About</li>
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
                            <li onClick={() => { navigate('/Contributor') }} style={{ color: 'red' }} >Become a <br />Contributors</li>

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

export default MyAnimelist