import img from '../../assets/mow.webp'
import style from './PrivacyPolicy.module.css'
import React, { useState, useEffect } from 'react';

import Link from 'Component/Link/Link';
import Navbar from 'Component/Navbar/Navbar';

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


function PrivacyPolicy() {
    const navigate = useNavigate();

    const handleLogoClick = () => {
        navigate("/");
    };





    useEffect(() => {
        Aos.init({ duration: 2000 })
    }, [])






    return (
        <div>

            <div style={{ position: "sticky", top: "0", zIndex: "1" }}>
                <Navbar />
            </div>
            <section className={style.About}>

                <h2>Who we are</h2>


                <p data-aos="fade-up">
                    If you are wondering what My Otaku World is All About? Then you are at the right page.
                </p>

                <p data-aos="fade-up">
                    MOW is a deep ocean, full of profound information and the most well-grounded source of news about Anime, Games, Movies, TV Shows, and Comics.
                </p>

                <p data-aos="fade-up">
                    MOW is an overflowing superstore containing everything related to the Anime world and Entertainment world, having fastidious stratification, which is available free of cost!
                </p>

                <p data-aos="fade-up">
                    Our website address is:  My Otaku World
                </p>

                <p data-aos="fade-up">
                    This Privacy Policy is incorporated by reference into the My Otaku World.com Terms of Use.
                </p>

                <p>
                    The term “<strong>Company</strong>” “MOW,” “<strong>we,</strong>” and “<strong>us</strong>” includes My Otaku World, our affiliates, subsidiaries, partners, licencors and suppliers. The Privacy Policy explains how MOW may:
                </p>

                <ul data-aos="fade-up">
                    <div data-aos="fade-up">
                        <li>
                            Collect,
                        </li>
                        <li>
                            Use, &
                        </li>
                        <li>
                            Disclose
                        </li>
                    </div>
                </ul>

                <p data-aos="fade-up">
                    Information we obtain through the “Service.”
                </p>

                <p data-aos="fade-up">
                    The “<strong>Service</strong>” means any website, mobile application, or Internet service under the control of MOW, whether partial or otherwise, in connection with providing an online platform for MOW’s services.
                </p>
                <p data-aos="fade-up">
                    “<strong>Personal Information</strong>” means information that alone or when in combination with other information may be used to readily identify, contact, or locate you, such as: name, address, email address, or phone number.
                </p>
                <p data-aos="fade-up">
                    We do not consider Personal Information to include information that has been anonymized so that it does not allow a third party to easily identify a specific individual.
                </p>

                <h3 style={{ fontWeight: '600' }}>When We Collect Your Data ?</h3>

                <p data-aos="fade-up">
                    We collect Personal Information when you:
                </p>

                <ul data-aos="fade-up">

                    <div data-aos="fade-up">

                        <li data-aos="fade-up" >
                            Register to use the Service;
                        </li>

                        <li data-aos="fade-up">
                            Log in with social networking credentials;
                        </li>

                        <li data-aos="fade-up">
                            Use the Service;
                        </li>

                        <li data-aos="fade-up">
                            Purchase items from the MOW Store; and
                        </li>

                        <li data-aos="fade-up">
                            Communicate with us.
                        </li>

                    </div>
                </ul>

                <p data-aos="fade-up">
                    We also collect information, such as anonymous usage statistics, by using cookies, server logs, and other similar technology as you use the Service.
                </p>

                <p data-aos="fade-up">
                    <strong>Personal Information Collection.</strong> You must register to use the Service. To register, you will need to provide Personal Information, such as your email address and pictures. You may also provide other optional information. When you purchase items from the MOW store or make a Pledge, you will need to provide a billing and/or shipping address.
                </p>

                <p data-aos="fade-up">
                    <strong>Social Sign-On.</strong> We collect Personal Information from the applicable social media websites when you use your social media credentials to log into the Service. For example, when you log in with your Facebook credentials, we may collect the Personal Information you have made publicly available in Facebook, such as your name and profile picture. We may also obtain other information with your permission, such as your friends list.
                </p>
                <p data-aos="fade-up">
                    <strong>Using the Service.</strong> We collect information you post through the Service. For example, when you interact with other users by posting comments or joining forum on the Service, the Service will collect the information you provide in such submissions, including any Personal Information.
                </p>

                <p data-aos="fade-up">
                    <strong>Making Payments.</strong> When you make payments through the Service, you may need to provide Personal Information to our third-party service providers, such as your credit card number. We do not share this information with any third parties other than to process payments. When you provide payment information, it is protected using secure socket layer technology (SSL) and tokenization so that only the payment processor stores credit card information. Please note that our payment processors’ use of your personal information is governed by their own policies and procedures.
                </p>

                <p data-aos="fade-up">
                    <strong>As Required By Law and Similar Disclosures.</strong> We may access, preserve, and disclose your Personal Information, other account information, and content if we believe doing so is required or appropriate to: comply with law enforcement requests and legal process, such as a court order or subpoena; respond to your requests; or protect yours’, ours’ or others’ rights, property, or safety.
                </p>

                <p data-aos="fade-up">
                    <strong>Merger, Sale, or Other Asset Transfers.</strong> If we are involved in a merger, acquisition, financing due diligence, reorganization, bankruptcy, receivership, sale of company assets, or transition of service to another provider, your information may be sold or transferred as part of such a transaction as permitted by law and/or contract. We cannot control how such entities may use or disclose such information.
                </p>
                <p data-aos="fade-up">
                    We may also disclose your Personal Information with your permission.
                </p>

                <h2>SECURITY OF YOUR INFORMATION</h2>


                <p data-aos="fade-up">
                    We take steps to ensure that your information is treated securely and in accordance with this Privacy Policy. Unfortunately, the Internet cannot be guaranteed to be 100% secure, and we cannot ensure or warrant the security of any information you provide to us. We do not accept liability for unintentional disclosure.
                </p>

                <p data-aos="fade-up">
                    By using the Service or providing Personal Information to us, you agree that we may communicate with you electronically regarding security, privacy, and administrative issues relating to your use of the Service. If we learn of a security system’s breach, we may attempt to notify you electronically by posting a notice on the Service or sending an email to you. You may have a legal right to receive this notice in writing. To receive free written notice of a security breach (or to withdraw your consent from receiving electronic notice), please notify us via the contact form.
                </p>


                <h2>CHILDREN’S PRIVACY</h2>

                <p data-aos="fade-up">
                    We do not knowingly collect information from children under 13 and we do not want it. We will take steps to delete it if we learn we have collected it.
                </p>

                <p data-aos="fade-up">
                    We do not knowingly collect, maintain, or use Personal Information from children under 13 years of age, and no part of the Service is directed to children under the age of 13.
                </p>

                <p data-aos="fade-up">
                    If you learn that your child has provided us with Personal Information without your consent, you may alert us via the contact form. If we learn that we have collected any Personal Information from children under 13, we will promptly take steps to delete such information and terminate the child’s account.
                </p>

                <h2>CHANGES TO OUR PRIVACY POLICY AND PRACTICES</h2>

                <p data-aos="fade-up">
                    We may revise this Privacy Policy, so review it periodically.
                </p>

                <p data-aos="fade-up">
                    <strong>Posting of Revised Privacy Policy.</strong> We will post any adjustments to the Privacy Policy on this web page, and the revised version will be effective when it is posted. If you are concerned about how your information is used, bookmark this page and read this Privacy Policy periodically.
                </p>

                <p data-aos="fade-up">
                    <strong>New Uses of Personal Information.</strong> From time to time, we may desire to use Personal Information for uses not previously disclosed in our Privacy Policy. If our practices change regarding previously collected Personal Information in a way that would be materially less restrictive than stated in the version of this Privacy Policy in effect at the time we collected the information, we will make reasonable efforts to provide notice and obtain consent to any such uses as may be required by law.
                </p>

                <h2>Updated Policy</h2>

                <h1>EZOIC SERVICES</h1>

                <p className={style.special}>
                    This website has an exclusive advertising contract with Ezoic Inc. (“Ezoic”), a renowned leader in website optimization, enhancing user experiences, optimizing ad performance, and generating revenue through advanced AI-powered technology. Ezoic may employ a variety of technologies on this website, including to display advertisements and enable advertising to visitors of this website. For additional information about Ezoic’s advertising partners, please see Ezoic’s Advertising Partner Page<a href="https://www.ezoic.com/privacy-policy/ad-partners/"> here</a>.
                </p>

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
                            <li style={{ color: "red" }} onClick={() => { navigate('/about') }}>About</li>
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

export default PrivacyPolicy