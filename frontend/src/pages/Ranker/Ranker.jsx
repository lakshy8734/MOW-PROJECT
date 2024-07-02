import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "Component/Navbar/Navbar";

import style from "./Ranker.module.css";

import COD from "../../assets/Callofduty.webp";
import { FaArrowDown } from "react-icons/fa";
import { FaArrowUp } from "react-icons/fa";
import demon from '../../assets/Demonslayer.webp'
import horimiya from '../../assets/horimiya.webp'

import Link from "Component/Link/Link";


import {
    FaHeart,
    FaComment,
    FaYoutube,
    FaInstagram,
    FaPinterest,
    FaFacebook,
    FaShare,
    FaArrowRight
} from "react-icons/fa";


import { ImCross } from "react-icons/im";

import Aos from "aos";
import 'aos/dist/aos.css'
import Shareit from "Component/Shareit/Shareit";

function Ranker() {

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



    const [isCommentbarOpen, setIsCommentbarOpen] = useState(false);

    const closeSidebar2 = () => {
        setIsCommentbarOpen(false);
    };

    const toggleSidebar2 = () => {
        setIsCommentbarOpen(!isCommentbarOpen);
    };

    useEffect(() => {
        Aos.init({ duration: 2000 })
    }, [])


    const rankings = [
        {
            imgSrc: demon,
            premiered: 'April 6, 2019',
            title: 'Demon Slayer',
            characters: 'Tanjiro ,Giyu ,Kibutshuchi ,Firebreathing',
            agreement: '76',
            moreInfo: [
                { title: 'anime...', description: 'Unleash the power within and slay the darkness' },
                { title: 'Rengoku...', description: 'Unleash the power of Fire breathing...' },
                { title: 'First Breathing...', description: 'Sun Breathing technique is considered as first breathing...' }
            ]
        },
        {
            imgSrc: COD,
            premiered: 'April 6, 2019',
            title: 'Demon Slayer',
            characters: 'Tanjiro ,Giyu ,Kibutshuchi ,Firebreathing',
            agreement: '76',
            moreInfo: [
                { title: 'anime...', description: 'Unleash the power within and slay the darkness' },
                { title: 'Rengoku...', description: 'Unleash the power of Fire breathing...' },
                { title: 'First Breathing...', description: 'Sun Breathing technique is considered as first breathing...' }
            ]
        },
        {
            imgSrc: horimiya,
            premiered: 'October 19, 2020,',
            title: 'Horimiya',
            characters: ' Kyouko Hori, Izumi Miyamura, Remi Ayasaki, Kakeru Sengoku',
            agreement: '76',
            moreInfo: [
                { title: 'Remi...', description: 'Remi Ayasaki red hair girl' },
                { title: 'Loner...', description: ' Izumi Miyamura is lonner till high school...' },
                { title: 'Sengoku', description: 'School president at his high school' }
            ]
        },

    ];


    const [agreement, setAgreement] = useState(rankings.map(() => 0));

    const handleUpvote = (index) => {
        const newAgreement = [...agreement];
        newAgreement[index]++;
        setAgreement(newAgreement);
    };

    const handleDownvote = (index) => {
        const newAgreement = [...agreement];
        if (newAgreement[index] > 0) {

            newAgreement[index]--;
        }
        setAgreement(newAgreement);
    };


    const messages =
        [
            'hello',
            'the One Piece is real',
            'Wake up to reality. Nothing ever goes as planned in this world. The longer you live, the more you realize that only pain, suffering, and futility exist in this reality.'
        ];



    return (
        <div >
            <div style={{ position: "sticky", top: "0", zIndex: "1" }}>
                <Navbar />
            </div>

            <section className={style.container}>

                <div className={style.leftcontainer}>
                    <h1 data-aos="fade-up">
                        Best Anime of All Time
                    </h1>



                    <div data-aos="fade-up" className={style.comment}>
                        <div className={style.Subcomment}>
                            <div>
                                <FaHeart />
                            </div>
                            <div>
                                <FaComment onClick={toggleSidebar2} />
                            </div>
                        </div>

                        <div className={style.Subcomment}>
                            <div>
                                <FaShare />
                            </div>
                            <div>
                                <FaComment /> {/* Display comment icon */}

                            </div>
                            <div>
                                <FaComment /> {/* Display comment icon */}

                            </div>
                        </div>
                    </div>

                    <div data-aos="fade-down" className={style.buttons}>

                        <div className={style.button1}>

                            <h6>Ranked by</h6>

                            <button className={style.menu}>
                                Category
                            </button>

                            <button className={style.menu}>
                                SubCategory
                            </button>

                            <button>Tags</button>

                        </div>


                        {/* <div className={style.button2}>
                            <button>Rank it your way</button>
                        </div> */}
                    </div>

                    {rankings.map((item, index) => (

                        <div className={style.Ranks} key={index}>

                            <div className={style.Rankschildone}>

                                <h1>{index + 1}</h1>


                                <div className={style.imgs}>

                                    <img src={item.imgSrc} alt="" />

                                    <h6 style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', color: 'black' }} >
                                        More : &#8239;
                                        <strong style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', color: 'black' }} onMouseOver={(e) => e.currentTarget.style.color = 'red'} onMouseOut={(e) => e.currentTarget.style.color = 'black'}>
                                            {item.title} &#8239; <FaArrowRight />
                                        </strong>
                                    </h6>
                                </div>

                                <div className={style.content}>
                                    <h1>{item.title}</h1>
                                    <h6>{item.characters}</h6>

                                    <div className={style.vote}>
                                        <button className={style.one} onClick={() => handleUpvote(index)}><FaArrowUp /></button>

                                        <button className={style.Two} onClick={() => handleDownvote(index)}><FaArrowDown /></button>
                                    </div>
                                    <h6>{agreement[index]}% people agree!</h6>
                                </div>

                            </div>

                            <div className={style.more}>
                                {item.moreInfo.map((info, infoIndex) => (
                                    <div key={infoIndex}>
                                        <h5>{info.title}</h5>
                                        <p>{info.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}

                </div>

                <div className={style.rightcontainer}>
                    <div data-aos="fade-right" className={style.aside}>
                        <h2>Recommended Articles</h2>
                        <hr className={style.line} />
                        <ul>
                            <li>
                                <img src={COD} alt="" />
                                15 Games Like Tekken 3

                            </li>
                            <li>
                                <img src={COD} alt="" />
                                15 Games Like The Quarry
                            </li>
                            <li>
                                <img src={COD} alt="" />
                                World of Warcraft Reveals How Many Mounts Can Use Dynamic Flying
                                in The War Within
                            </li>

                            <li>
                                <img src={COD} alt="" />
                                World of Warcraft Reveals How Many Mounts Can Use Dynamic Flying
                                in The War Within
                            </li>
                            <li>
                                <img src={COD} alt="" />
                                World of Warcraft Reveals
                            </li>

                            <li>
                                <img src={COD} alt="" />
                                World of Warcraft Reveals How Many Mounts Can Use Dynamic Flying.
                            </li>

                        </ul>
                    </div>
                </div>
            </section>

            <Shareit/>



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
        </div>
    );
}

export default Ranker;
