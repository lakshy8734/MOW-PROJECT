import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Aos from "aos";
import "aos/dist/aos.css";
import Navbar from "../../Component/Navbar/Navbar";
import style from "./Contributor.module.css";
import contribute from "../../assets/contribute.webp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserAstronaut,
  faAward,
  faComment,
  faUser,
  faFileContract,
  faPenToSquare,
  faFileWaveform,
} from "@fortawesome/free-solid-svg-icons";
import {
  FaYoutube,
  FaInstagram,
  FaPinterest,
  FaFacebook,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import Link from "Component/Link/Link";
import Shareit from "Component/Shareit/Shareit";

function Contributor() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    name: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/contributors",
        formData
      );
      toast.success("Request submitted successfully!");
      setFormData({
        userName: "",
        email: "",
        name: "",
      });
    } catch (error) {
      if (error.response) {
        const { errors, error: errorMessage } = error.response.data;
        if (errors && Array.isArray(errors)) {
          errors.forEach((err) => toast.error(err.msg));
        } else if (errorMessage) {
          toast.error(errorMessage);
        } else {
          toast.error("An error occurred. Please try again.");
        }
      } else {
        toast.error("An error occurred. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);

  return (
    <div>
      <div style={{ position: "sticky", top: "0", zIndex: "1" }}>
        <Navbar />
      </div>
      <section style={{ overflow: "hidden" }} className={style.container}>
        <div data-aos="fade-right" className={style.left}>
          <h1>Contributors</h1>
          <p>
            Contributors are passionate individuals who share a love for anime &
            games.
          </p>
          <p>
            They are otakus, gamers, and fans who want to share their knowledge
            and creativity with the world.
          </p>
        </div>
        <div data-aos="fade-left" className={style.right}>
          <img src={contribute} alt="" />
        </div>
      </section>

      <section className={style.Contributor}>
        <h1 style={{ overflow: "hidden" }} data-aos="fade-up">
          Why Become a Contributor?
        </h1>

        <div className={style.boxes}>
          <div
            style={{ overflow: "hidden" }}
            data-aos="fade-up"
            className={style.box}
          >
            <FontAwesomeIcon className={style.icon} icon={faUserAstronaut} />
            <h2>Audience Engagement</h2>
            <p>
              Reach a dedicated audience of anime and gaming enthusiasts who
              appreciate your passion and expertise.
            </p>
          </div>

          <div
            style={{ overflow: "hidden" }}
            data-aos="fade-up"
            className={style.box}
          >
            <FontAwesomeIcon className={style.icon} icon={faAward} />
            <h2>Recognition</h2>
            <p>
              Gain recognition for your work through our contributor spotlight
              features, social media shout-outs, and special mentions in our
              articles.
            </p>
          </div>

          <div
            style={{ overflow: "hidden" }}
            data-aos="fade-up"
            className={style.box}
          >
            <FontAwesomeIcon className={style.icon} icon={faComment} />
            <h2>Community Support</h2>
            <p>
              Connect with a supportive community of fellow contributors.
              Collaborate on projects, exchange ideas, and make friends who
              share your interests.
            </p>
          </div>
        </div>
      </section>

      <section style={{ overflow: "hidden" }} className={style.Contributor2}>
        <div data-aos="fade-right" className={style.left}>
          <h1>What Do Contributors Do?</h1>
        </div>

        <div data-aos="fade-left" className={style.right}>
          <div>
            <h1>Anime Reviews</h1>
            <p>
              Write insightful reviews about the latest anime series, movies, or
              manga. Share your opinions and analyses, helping fellow fans
              discover new titles.
            </p>
          </div>
          <div>
            <h1>Gaming Guides</h1>
            <p>
              Create detailed game guides, walkthroughs, and tips to assist
              gamers in mastering their favorite titles. Help players navigate
              challenges and uncover hidden secrets.
            </p>
          </div>
          <div>
            <h1>Write Content</h1>
            <p>
              Contribute well-researched and engaging content or if you find any
              mistake in our existing articles help us improve.
            </p>
          </div>
          <div>
            <h1>Gaming Strategies</h1>
            <p>
              Share advanced gaming strategies, character builds, and tactics
              for popular games. Help players enhance their skills and dominate
              the virtual battlefield.
            </p>
          </div>
        </div>
      </section>

      <section style={{ overflow: "hidden" }} className={style.Contributor3}>
        <h1 data-aos="fade-up">How to Become a Contributor?</h1>
        <div className={style.boxes2}>
          <div
            style={{ overflow: "hidden" }}
            data-aos="fade-up"
            className={style.box2}
          >
            <FontAwesomeIcon className={style.icon2} icon={faUser} />
            <h2>Sign Up</h2>
            <p>
              Create an account on our website to get started. If you're already
              a member, log in to your account.
            </p>
          </div>

          <div data-aos="fade-up" className={style.box2}>
            <FontAwesomeIcon className={style.icon2} icon={faFileWaveform} />

            <h2>Request To Become A Contributor</h2>
            <p>
              Come to this page and fill the form at the end of the page to
              submit a request to become a contributor.
            </p>
          </div>

          <div data-aos="fade-up" className={style.box2}>
            <FontAwesomeIcon className={style.icon2} icon={faFileContract} />
            <h2>Submit Your Creations</h2>
            <p>
              Share your anime reviews, game guides, fan art, cosplay photos, or
              gaming strategies with us through our submission form.
            </p>
          </div>
          <div data-aos="fade-up" className={style.box2}>
            <FontAwesomeIcon className={style.icon2} icon={faPenToSquare} />
            <h2>Review And Publish</h2>
            <p>
              Our team will review your submissions. Once approved, your content
              will be published, and you'll officially become a valued
              contributor.
            </p>
          </div>
        </div>
      </section>

      <section data-aos="fade-right" className={style.Contributor4}>
        <div>
          <h1 data-aos="fade-up">Become a Contributor Now</h1>
          <h4 data-aos="fade-up">Ready to level up your contributions?</h4>
          <h4 data-aos="fade-up">
            Become a Contributor Now by filling up the form below.
          </h4>
        </div>

        <div className={style.form}>
          <form onSubmit={handleSubmit}>
            <div data-aos="fade-up" className={style.input}>
              <input
                required
                name="userName"
                type="text"
                placeholder="User Name"
                value={formData.userName}
                onChange={handleInputChange}
              />
            </div>

            <div data-aos="fade-up" className={style.input}>
              <input
                required
                name="email"
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>

            <div data-aos="fade-up" className={style.input}>
              <input
                required
                name="name"
                type="text"
                placeholder="Name"
                value={formData.name}
                onChange={handleInputChange}
              />
            </div>

            <div data-aos="fade-up" className={style.formbtn}>
              <button className={style.btn1} disabled={isLoading}>
                {isLoading ? "Submitting..." : "Submit Request!"}
              </button>
            </div>
          </form>
        </div>
      </section>

      <Shareit/>



      {/* <div className={style.links}>
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
            <h4

            >Community</h4>
            <ul>
              <li
                onClick={() => {
                  navigate("/members");
                }}
              >Members
              </li>
              <li
                onClick={() => {
                  navigate("/forums");
                }}
              >Forums
              </li>
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
              <li
                onClick={() => { navigate('/Editorialguidelines') }}
              >Editorial Guidelines</li>
              <li

                onClick={() => { navigate('/verification-fact-checking-policy') }}
              >
                Verification & Fact- <br /> Checking Policy
              </li>
            </ul>
          </div>
          <div data-aos="fade-up">
            <h4>Legal</h4>
            <ul>
              <li
                onClick={() => { navigate('/DMCA') }}
              >DMCA</li>
              <li
                onClick={() => { navigate('/PrivacyPolicy') }}
              >Privacy Policy</li>
              <li
                onClick={() => { navigate('/TermsofUse') }}
              >Terms of Use</li>
            </ul>
          </div>
        </div> */}

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

export default Contributor;
