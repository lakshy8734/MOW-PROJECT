import style from './Editorialguidelines.module.css'
import React, { useState, useEffect,useContext } from 'react';
import Link from 'Component/Link/Link';
import Navbar from 'Component/Navbar/Navbar';
import { ThemeContext } from "../../contexts/ThemeContext";


import Aos from "aos";
import 'aos/dist/aos.css';
import { useNavigate } from 'react-router-dom';
import Shareit from 'Component/Shareit/Shareit';


function Editorialguidelines() {
    const { theme, toggleTheme } = useContext(ThemeContext);
    const navigate = useNavigate();

    const handleLogoClick = () => {
        navigate("/");
    };
    return (
        <div>

            <div style={{ position: "sticky", top: "0", zIndex: "1" }}>
                <Navbar />
            </div>

            <section className={` ${style.About}  ${theme === "dark" ? style.dark : ""}`}>
                <p  data-aos="fade-up">
                    At My Otaku World, our passion lies in creating content that resonates with our incredible community of anime enthusiasts and dedicated gamers.
                </p>

                <p data-aos="fade-up">
                    We understand that you, our valued readers, deserve nothing but the best.
                </p>

                <p data-aos="fade-up">
                    That’s why we hold ourselves to the highest standards when it comes to content creation.
                </p>

                <h2 >Originality and Creativity</h2>

                <p data-aos="fade-up">
                    Every piece of content you find on My Otaku World is born from creativity and a dedication to originality.
                </p>

                <p data-aos="fade-up">
                    We promise you content that’s fresh, never seen before, and bursting with unique perspectives.
                </p>

                <p data-aos="fade-up">
                    Plagiarism?
                </p>

                <p data-aos="fade-up">
                    Not in our dictionary. We ensure that our content is as unique as each member of our vibrant community.
                </p>


                <h2>
                    Quality and Value
                </h2>

                <p data-aos="fade-up">
                    Your time matters to us.
                </p>

                <p data-aos="fade-up">
                    We’re committed to delivering content that not only entertains but also enlightens.
                </p>
                <p data-aos="fade-up">
                    Our team invests in extensive research to provide you with accurate and credible information.
                </p>
                <p data-aos="fade-up">
                    Whether it’s anime reviews, gaming guides, or the latest news, you can trust that it’s top-notch quality.
                </p>

                <h3 style={{ fontWeight: '600' }}>
                    Engaging Style and Tone
                </h3>
                <p data-aos="fade-up">
                    We don’t speak in jargon or jumbled language.
                </p>

                <p data-aos="fade-up">Our articles are your companions, written in a conversational tone that you’ll connect with effortlessly.</p>

                <p data-aos="fade-up">Clear and concise, our content aims to engage, inform, and, most importantly, entertain you.</p>

                <p data-aos="fade-up">Our world is vast, just like yours. From anime insights to gaming strategies, from news to opinions – we’ve got it all.</p>

                <p data-aos="fade-up">We know that your interests are diverse, and so is our content.</p>

                <p data-aos="fade-up">Feel free to explore the different facets of My Otaku World; you’ll always find something that resonates with you.</p>

                <h2>Unbiased and Authentic</h2>
                <p data-aos="fade-up">We’re not here to sway opinions or sell you a product.</p>

                <p data-aos="fade-up">Our commitment is to deliver unbiased, honest, and authentic content.</p>

                <p data-aos="fade-up">We want you to make informed decisions and form your own opinions.</p>

                <p data-aos="fade-up">No promotions, no hidden agendas, just pure content.</p>

                <h2>For Our Community</h2>
                <p data-aos="fade-up">My Otaku World is not just a website; it’s a community.</p>

                <p data-aos="fade-up">We create content with you in mind – passionate anime lovers and dedicated gamers.</p>

                <p data-aos="fade-up">Our aim is to provide you with the latest updates, reviews, and insights tailored to your interests.</p>

                <h2>Your Feedback Matters</h2>
                <p data-aos="fade-up">Your opinions are invaluable. We encourage you to engage with us, leave comments, and provide feedback.</p>

                <p data-aos="fade-up">Your thoughts guide us in our mission to continually improve the accuracy, relevance, and quality of our content.</p>

                <h2>A Dedicated Team</h2>
                <p data-aos="fade-up">Behind every article, review, and news update is a dedicated team of writers, editors, reviewers, reporters, and experts.</p>

                <p data-aos="fade-up">We live and breathe anime and gaming, just like you. Our diverse team collaborates to ensure you receive the most comprehensive and informative content.</p>

                <h2>Trust and Transparency</h2>
                <p data-aos="fade-up">Our commitment to trust and transparency is unwavering.</p>

                <p data-aos="fade-up">We credit sources, fact-check rigorously, and ensure that our content remains authentic and plagiarism-free.</p>

                <p data-aos="fade-up">You can always rely on us for accurate information.</p>

                <h2>A Community of Experts</h2>
                <p data-aos="fade-up">Our experts are not just names; they are authorities in their respective fields. Their passion and expertise shine through in every piece they create, be it a review, guide, or opinion piece.</p>

                <p data-aos="fade-up">So, as you embark on your journey through My Otaku World, rest assured that our commitment to you, our beloved community, remains steadfast.</p>

                <p data-aos="fade-up">These editorial guidelines are not just words; they are a promise of quality, authenticity, and a shared love for anime and gaming. Welcome to My Otaku World, your home for all things anime and gaming!</p>




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

export default Editorialguidelines