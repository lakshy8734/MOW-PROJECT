import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import style from './Link.module.css';
import Aos from 'aos';
import 'aos/dist/aos.css';

function Link() {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        Aos.init({ duration: 2000 });
    }, []);

    const isActive = (path) => location.pathname === path;

    return (
        <div>
            <section className={style.Usefullink}>
                <div className={style.links}>
                    <div data-aos="fade-up">
                        <h4>Company</h4>
                        <ul>
                            <li
                                onClick={() => {
                                    navigate('/');
                                }}
                                style={isActive('/') ? { color: '#d33' } : {}}
                            >
                                Home
                            </li>
                            <li
                                onClick={() => {
                                    navigate('/blogs');
                                }}
                                style={isActive('/blogs') ? { color: '#d33' } : {}}
                            >
                                Blog
                            </li>
                            <li
                                onClick={() => {
                                    navigate('/About');
                                }}
                                style={isActive('/About') ? { color: '#d33' } : {}}
                            >
                                About
                            </li>
                            <li
                                onClick={() => {
                                    navigate('/contact');
                                }}
                                style={isActive('/contact') ? { color: '#d33' } : {}}
                            >
                                Contact
                            </li>
                        </ul>
                    </div>
                    <div data-aos="fade-up">
                        <h4>Community</h4>
                        <ul>
                            <li
                                onClick={() => {
                                    navigate('/members');
                                }}
                                style={isActive('/members') ? { color: '#d33' } : {}}
                            >
                                Members
                            </li>
                            <li
                                onClick={() => {
                                    navigate('/forums');
                                }}
                                style={isActive('/forums') ? { color: '#d33' } : {}}
                            >
                                Forums
                            </li>
                            <li
                                onClick={() => {
                                    navigate('/Contributor');
                                }}
                                style={isActive('/Contributor') ? { color: '#d33' } : {}}
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
                            <li
                                onClick={() => {
                                    navigate('/Editorialguidelines');
                                }}
                                style={isActive('/Editorialguidelines') ? { color: '#d33' } : {}}
                            >
                                Editorial Guidelines
                            </li>
                            <li
                                onClick={() => {
                                    navigate('/verification-fact-checking-policy');
                                }}
                                style={isActive('/verification-fact-checking-policy') ? { color: '#d33' } : {}}
                            >
                                Verification & Fact- <br /> Checking Policy
                            </li>
                        </ul>
                    </div>
                    <div data-aos="fade-up">
                        <h4>Legal</h4>
                        <ul>
                            <li
                                onClick={() => {
                                    navigate('/DMCA');
                                }}
                                style={isActive('/DMCA') ? { color: '#d33' } : {}}
                            >
                                DMCA
                            </li>
                            <li
                                onClick={() => {
                                    navigate('/PrivacyPolicy');
                                }}
                                style={isActive('/PrivacyPolicy') ? { color: '#d33' } : {}}
                            >
                                Privacy Policy
                            </li>
                            <li
                                onClick={() => {
                                    navigate('/TermsofUse');
                                }}
                                style={isActive('/TermsofUse') ? { color: '#d33' } : {}}
                            >
                                Terms of Use
                            </li>
                        </ul>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Link;
