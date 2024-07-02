import React, { useState, useEffect } from "react";
import style from "./contact.module.css";
import { useNavigate } from 'react-router-dom';
import Link from "Component/Link/Link";
import Navbar from '../../Component/Navbar/Navbar';
import { FaYoutube, FaInstagram, FaPinterest, FaFacebook, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import Aos from "aos";
import 'aos/dist/aos.css';
import axios from "axios";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from "pages/Loader/Loader";
import { Share } from "@material-ui/icons";
import Shareit from "Component/Shareit/Shareit";

function Contact() {
  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false); // Add loading state

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form data
    const namePattern = /^[A-Za-z\s]+$/;
    if (!formData.name) {
      toast.error("Name is required.");
      return;
    } else if (!namePattern.test(formData.name)) {
      toast.error("Name should only contain alphabets and spaces.");
      return;
    }

    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!formData.email) {
      toast.error("Email is required.");
      return;
    } else if (!emailPattern.test(formData.email)) {
      toast.error("Please enter a valid email.");
      return;
    }

    if (!formData.subject) {
      toast.error("Subject is required.");
      return;
    } else if (formData.subject.length > 50) {
      toast.error("Subject should be within 50 words.");
      return;
    }

    if (!formData.message) {
      toast.error("Message is required.");
      return;
    } else if (formData.message.length > 200) {
      toast.error("Message should be within 200 words.");
      return;
    }

    setLoading(true); // Set loading to true when form submission starts

    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/contact`, formData);
      toast.success("Message sent successfully!");
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      if (error.response && error.response.data && error.response.data.errors) {
        error.response.data.errors.forEach(err => toast.error(err.msg));
      } else {
        toast.error("Failed to send message. Please try again later.");
      }
    } finally {
      setLoading(false); // Set loading to false when form submission ends
    }
  };

  return (
    <div>
      <ToastContainer />
      {loading && <Loader />} {/* Display the Loader component when loading */}
      <div>
        <div style={{ position: "sticky", top: "0", zIndex: "1" }}>
          <Navbar />
        </div>
        <section className={style.contact}>
          <div className={style.bgcontact}>
            <div data-aos="fade" className={style.content}>
              <h2>Contact Us</h2>
              <h1>Let's Connect & Talk</h1>
              <p>Reach out to us with your inquiries, feedback, or just to say hello!</p>
              <p>We can’t wait to hear from you. Don’t hesitate – let’s start this conversation and make great things happen together!</p>
            </div>
          </div>
        </section>
        <section data-aos="fade-up" className={style.cart}>
          <div className={style.section}>
            <h2>Reach Us</h2>
            <div data-aos="fade-up" className={style.contectlinks}>
              <FaFacebook className={style.one} />
              <FaPinterest className={style.two} />
              <FaYoutube className={style.three} />
              <FaInstagram className={style.four} />
            </div>
            <div data-aos="fade-up" className={style.loccards}>
              <div className={style.loccard}>
                <div><FaMapMarkerAlt /></div>
                <h2>Address</h2>
                <p>1525 NJ-38, Moorestown, NJ 08057, USA</p>
              </div>
              <div className={style.loccard}>
                <div><FaEnvelope /></div>
                <h2>Email</h2>
                <p style={{ marginBottom: '2em' }}>admin@myotakuworld.com</p>
              </div>
            </div>
            <section data-aos="fade-up" className={style.map}>
              <iframe
                style={{ borderRadius: '8px', border: 'none' }}
                title="Your Location"
                width="100%"
                height="300"
                loading="lazy"
                allowFullScreen
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d307154.91938712683!2d-74.8436!3d39.9815!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c133adfaea5a4f%3A0x55e66e3832dc4e34!2s1525+NJ-38%2C+Hainesport%2C+NJ+08036%2C+USA!5e0!3m2!1sen!2sus!4v1620650192532!5m2!1sen!2sus"
              ></iframe>
            </section>
            <section className={style.msg}>
              <h2>Send Message</h2>
              <form data-aos="fade-up" className={style.form} onSubmit={handleSubmit}>
                <div className={style.basic}>
                  <input
                    type="text"
                    name="name"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Your email"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>
                <div className={style.sub}>
                  <input
                    type="text"
                    name="subject"
                    placeholder="Subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                  />
                </div>
                <div className={style.message}>
                  <textarea
                    cols="40"
                    rows="10"
                    name="message"
                    placeholder="Message"
                    value={formData.message}
                    onChange={handleInputChange}
                  ></textarea>
                </div>
                <div>
                  <button type="submit">Send Message</button>
                </div>
              </form>
            </section>
          </div>
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
    </div>
  );
}

export default Contact;
