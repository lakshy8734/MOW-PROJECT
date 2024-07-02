import React, { useState, useEffect } from "react";
import styles from "./Forums.module.css";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers, faKey } from "@fortawesome/free-solid-svg-icons";
import "react-toastify/dist/ReactToastify.css";
import side from "../../assets/mow.webp";
import img from "../../assets/logo.webp";
import { GiHamburgerMenu } from "react-icons/gi";
import { ImCross } from "react-icons/im";

import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

import Aos from "aos";
import "aos/dist/aos.css";

import { IoChatbubblesOutline } from "react-icons/io5";
import { AiOutlineClockCircle } from "react-icons/ai";
import { LuNewspaper } from "react-icons/lu";
import { FiHome } from "react-icons/fi";
import { LuUser2 } from "react-icons/lu";
import { ImSearch } from "react-icons/im";
import axios from "axios";

import {
  faHome,
  faUser,
} from "@fortawesome/free-solid-svg-icons";


const Forums = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    // setIsVisible(true);
    navigate("/");
  };



  const userToken = localStorage.getItem("userToken");
  const adminToken = localStorage.getItem("adminToken");
  const subAdminToken = localStorage.getItem("subAdminToken");

  const roleKey = userToken ? "User" : adminToken ? "Admin" : subAdminToken ? "SubAdmin" : null;

  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const [latestArticles, setLatestArticles] = useState([]);
  const [topViewedArticles, setTopViewedArticles] = useState([]);

  const userId = localStorage.getItem("userId");

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

  useEffect(() => {
    const fetchLatestArticles = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/api/blog`
        );
        const articles = response.data;
        const publishedBlogs = articles.filter(blog => blog.publish);
        const latest = publishedBlogs.slice(-5).reverse(); // Get the last 5 articles
        setLatestArticles(latest);
      } catch (error) {
        console.error("Error fetching latest articles:", error);
      }
    };

    fetchLatestArticles();
  }, []);

  useEffect(() => {
    const fetchTopViewedArticles = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/api/blog`
        );
        const articles = response.data;
        const publishedBlogs = articles.filter(blog => blog.publish);
        // Sort articles by views in descending order and get the top 5
        const topViewed = publishedBlogs
          .sort((a, b) => b.views - a.views)
          .slice(0, 5);
        setTopViewedArticles(topViewed);
      } catch (error) {
        console.error("Error fetching top viewed articles:", error);
      }
    };

    fetchTopViewedArticles();
  }, []);

  const handleArticleClick = (slug, blogId) => {
    navigate(`/${slug}`, { state: { blogId: blogId } });
    window.scrollTo(0, 0);
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

  const handleGoogleSignInSuccess = (credentialResponse) => {
    var credentialResponseDecoded = jwtDecode(credentialResponse.credential);
    console.log(credentialResponseDecoded);
  };

  // Function to handle Google Sign-In failure
  const handleGoogleSignInError = () => {
    console.log("Login Failed");
  };

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const [captchaCompleted, setCaptchaCompleted] = useState(false);
  const [showCaptchaPopup, setShowCaptchaPopup] = useState(false);

  // Callback function to handle reCAPTCHA completion
  const handleRecaptchaChange = (value) => {
    console.log("Recaptcha value:", value);
    // Update state to indicate reCAPTCHA is completed
    setCaptchaCompleted(true);
  };

  // const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate("/");
  };

  const [isLoading, setIsLoading] = useState(true);

  // Simulate data fetching
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000); // 2-second delay to simulate data loading
  }, []);

  return (
    <>
      <div className={styles.sidebar}>
        <div className={styles.logo} onClick={handleLogoClick}>
          <img src={img} alt="Logo" className={styles.logo} />
        </div>
        <div className={styles.iconsContainer}>
          <FiHome
            onClick={() => navigate("/")}
            className={styles.iconss}
            title="Home"
          />

          <LuUser2
            onClick={() => navigate("/members")}
            className={styles.iconss}
            title="People"
          />

          <LuNewspaper
            onClick={() => navigate("/Blogs")}
            className={styles.iconss}
            title="Blogs"
          />

          <IoChatbubblesOutline
            onClick={() => navigate("/forums")}
            className={styles.iconss}
            title="Forums"
          />
        </div>
      </div>

      <div>
        <nav className={styles.nav}>
          <div>
            <li onClick={toggleSidebar}>
              <GiHamburgerMenu className={styles.hamburgerIcon} />
            </li>
          </div>

          {!userId && (
            <ul>
              <li onClick={handleLoginClick}>Login</li>
              <li
                onClick={() => {
                  navigate("/register");
                }}
              >
                Register
              </li>
            </ul>
          )}
          {roleKey === "Admin" && (
            <li
              onClick={() => {
                navigate("/dashboard");
              }}
            >
              Dashboard
            </li>
          )}
          {roleKey === "SubAdmin" && (
            <li
              onClick={() => {
                navigate("/profile");
              }}
            >
              Profile
            </li>
          )}
        </nav>

        {/* Sidebar */}
        <div
          className={`${styles.sidebar2} ${isSidebarOpen ? styles.open : ""}`}
        >
          {isSidebarOpen && (
            <div className={styles.close} onClick={closeSidebar}>
              <ImCross />
            </div>
          )}

          <div className={styles.mainbox}>
            <div className={styles.sidelogin}>
              <div className={styles.img}>
                <img src={side} alt="" />
                <p>My Otaku World</p>

                <div className={styles.sideform}>
                  <h1>Login Now</h1>

                  <div className={styles.input2}>
                    <FontAwesomeIcon className={styles.icons} icon={faUsers} />
                    <input
                      required
                      name="email"
                      type={"email"}
                      placeholder="Email"
                    />
                  </div>
                  <div className={styles.input2}>
                    <FontAwesomeIcon className={styles.icons} icon={faKey} />
                    <input
                      required
                      name="password"
                      type="password"
                      placeholder="Password"
                    />
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      marginTop: "2rem",
                      gap: "1rem",
                      alignItems: "center",
                      width: "80%",
                    }}
                  >
                    <button className={styles.btn3}>
                      Login into your Account
                    </button>
                    <button
                      className={styles.btn4}
                      onClick={() => navigate("/register")}
                    >
                      Create your Account
                    </button>

                    <GoogleLogin
                      onSuccess={handleGoogleSignInSuccess} // Handle successful Google Sign-In
                      onError={handleGoogleSignInError} // Handle Google Sign-In failure
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.Sideicons}>
              <div className={styles.sideTop}>
                <div className={styles.div1}>
                  <FiHome
                    onClick={() => {
                      navigate("/");
                    }}
                    icon={faHome}
                  />
                  <h6>Home</h6>
                </div>
                <div className={styles.div1}>
                  <LuUser2 icon={faUser} />
                  <h6>People</h6>
                </div>
              </div>

              <div className={styles.sideTop2}>
                <div className={styles.div1}>
                  <LuNewspaper icon={faUser} />

                  <h6>Blog</h6>
                </div>

                <div className={styles.div1}>
                  <IoChatbubblesOutline icon={faUser} />
                  <h6>Forums</h6>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Overlay */}
        {isSidebarOpen && (
          <div className={styles.overlay} onClick={closeSidebar}></div>
        )}
      </div>

      <section className={styles.leftcontainer}>
        <div className={styles.mainbox}>
          <div className={styles.sidelogin}>
            <div className={styles.img}>
              <img src={side} alt="" />
              <p>My Otaku World</p>

              <div className={styles.sideform}>
                <h1>Login Now</h1>

                <div className={styles.input2}>
                  <FontAwesomeIcon className={styles.icons} icon={faUsers} />
                  <input
                    required
                    name="email"
                    type={"email"}
                    placeholder="Email"
                  />
                </div>
                <div className={styles.input2}>
                  <FontAwesomeIcon className={styles.icons} icon={faKey} />
                  <input
                    required
                    name="password"
                    type="password"
                    placeholder="Password"
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    marginTop: "2rem",
                    gap: "1rem",
                    alignItems: "center",
                    width: "80%",
                  }}
                >
                  <button className={styles.btn3}>
                    Login into your Account
                  </button>
                  <button
                    className={styles.btn4}
                    onClick={() => navigate("/register")}
                  >
                    Create your Account
                  </button>

                  <GoogleLogin
                    onSuccess={handleGoogleSignInSuccess} // Handle successful Google Sign-In
                    onError={handleGoogleSignInError} // Handle Google Sign-In failure
                  />
                </div>
              </div>
            </div>
          </div>

          <div className={styles.Sideicons}>
            <div className={styles.MsideTop}>
              <div onClick={() => {
                navigate("/");
              }} className={styles.diva1}>
                <FiHome

                  icon={faHome}
                />
                <h6>Home</h6>
              </div>

              <div onClick={() => {
                navigate("/Members");
              }} className={styles.diva1}>
                <LuUser2 icon={faUser} />
                <h6>People</h6>
              </div>
            </div>

            <div className={styles.MsideTop2}>
              <div onClick={() => {
                navigate("/Blogs");
              }} className={styles.diva1}>
                <LuNewspaper icon={faUser} />

                <h6>Blog</h6>
              </div>

              <div style={{ color: "#d33" }} className={styles.diva1}>
                <IoChatbubblesOutline icon={faUser} />
                <h6>Forums</h6>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.maincontainer}>
        <div className={styles.midcontainer}>
          <div className={styles.head}>
            <h1>All Forums</h1>
            <h1>Topics</h1>
          </div>

          <div className={styles.searching}>
            <input type="text" placeholder="Search Members..." />
            <div>
              <ImSearch className={styles.searchingIcon} />
            </div>
          </div>

          {isLoading ? (
            <div className={styles.loader}>
              <div className={styles.box}>
                <AiOutlineClockCircle
                  style={{ color: "#d33", marginRight: "5px" }}
                />
                Loading the members of your community. Please wait.
              </div>
            </div>
          ) : (
            <table className={styles.table}>
              <thead className={styles.thead}>
                <tr className={styles.tr}>
                  <th className={styles.th}>Forum</th>
                  <th className={styles.th3}>Topics</th>
                  <th className={styles.th3}>Posts</th>
                  <th className={styles.th3}>Last Post</th>
                </tr>
              </thead>
              <tbody className={styles.tbody}>
                <tr data-aos="fade-up" className={styles.tr}>
                  <td className={styles.td2}>
                    <div>
                      <IoChatbubblesOutline className={styles.TopicIcons} />
                    </div>
                    <div>
                      <a href="">MOW</a>
                      <ul>
                        <li>MOW Guidelines & FAQ (0, 0)</li>
                        <li>Updates & Announcements (1, 0)</li>
                        <li>Suggestions (0, 0)</li>
                      </ul>
                    </div>
                  </td>
                  <td className={styles.td3} data-label="Header 2">
                    1
                  </td>
                  <td className={styles.td3} data-label="Header 3">
                    1
                  </td>
                  <td
                    className={styles.td3}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <p>7 months, 1 week ago</p>
                    <p style={{ display: "flex", alignItems: "center" }}>
                      <img src={img} alt="" /> anukul
                    </p>
                  </td>
                </tr>
                <tr data-aos="fade-up" className={styles.tr}>
                  <td className={styles.td2}>
                    <div>
                      <IoChatbubblesOutline className={styles.TopicIcons} />
                    </div>
                    <div>
                      <a href="">MOW</a>
                      <ul>
                        <li>MOW Guidelines & FAQ (0, 0)</li>
                        <li>Updates & Announcements (1, 0)</li>
                        <li>Suggestions (0, 0)</li>
                      </ul>
                    </div>
                  </td>
                  <td className={styles.td3} data-label="Header 2">
                    1
                  </td>
                  <td className={styles.td3} data-label="Header 3">
                    1
                  </td>
                  <td
                    className={styles.td3}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <p>7 months, 1 week ago</p>
                    <p style={{ display: "flex", alignItems: "center" }}>
                      <img src={img} alt="" /> anukul
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>
          )}
        </div>

        <div className={styles.asideContainer}>
          <div style={{ marginTop: "5em" }} className={styles.aside}>
            <h2>Recommended Articles</h2>
            <hr className={styles.line} />
            <ul className={styles.articleList}>
              {topViewedArticles.map((article) => (
                <li
                  key={article.blogId}
                  className={styles.articleItem}
                  onClick={() =>
                    handleArticleClick(article.slug, article.blogId)
                  }
                >
                  <img
                    src={article.mediaUrl}
                    alt={article.title}
                    className={styles.articleImage}
                  />
                  <span>{article.title}</span>
                </li>
              ))}
            </ul>
          </div>

          <div style={{ marginTop: "5em" }} className={styles.aside}>
            <h2>Recent Topics</h2>
            <hr className={styles.line} />
            <ul className={styles.articleList}>
              {latestArticles.map((article) => (
                <li
                  key={article.id}
                  className={styles.articleItem}
                  onClick={() =>
                    handleArticleClick(article.slug, article.blogId)
                  }
                >
                  <img
                    src={article.mediaUrl}
                    alt={article.title}
                    className={styles.articleImage}
                  />
                  <span>{article.title}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* <div style={{ marginTop: '5em' }} className={styles.aside}>
                        <h1>
                            Recent Topics

                        </h1>
                        <hr />

                        <ul>
                            <li>
                                <img src={COD} alt="" />
                                Call of Duty Modern Warfare 3 and Warzone Launch New Double XP
                                Event
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

                        </ul>

                    </div> */}
        </div>
      </section>
    </>
  );
};

export default Forums;
