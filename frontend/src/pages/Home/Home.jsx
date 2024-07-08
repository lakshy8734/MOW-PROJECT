import React, { useState, useEffect, useContext } from "react";
import Login from "../../Component/Login/Login";
import style from "./Home.module.css";
import img from "../../assets/mow.webp";
import anime from "../../assets/anime.png";
import axios from "axios";
import zen from "../../assets/Default.webp";
import { useNavigate } from "react-router-dom";

import sims from "../../assets/sims.webp";
import naruto from "../../assets/Naruto.webp";
import COD from "../../assets/COD.webp";
import Fortnite from "../../assets/Fortnite.webp";
import Pokemon from "../../assets/Ashe-and-Pikachu-meeting.webp";
import minicarft from "../../assets/minecraft-game.webp";
import fantasy from "../../assets/final-fantasy.webp";
import onepeice from "../../assets/one-piece.webp";

import GTA from "../../assets/acid-lab.webp";
import GTA2 from "../../assets/gta-online.webp";
import cod from "../../assets/Callofduty.webp";
import pokemon from "../../assets/Pokemon.webp";
import pokemonG from "../../assets/PokmonGrid.webp";
import digimon from "../../assets/Digimon.webp";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import ReactPlayer from "react-player";
import { TypeAnimation } from "react-type-animation";

import { GiHamburgerMenu } from "react-icons/gi";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ImCross } from "react-icons/im";
import Link from "Component/Link/Link";
import Aos from "aos";
import "aos/dist/aos.css";
import { ThemeContext } from "../../contexts/ThemeContext";
import ToggleSwitch from "../../Component/ToggleSwitch/ToggleSwitch";


function Home() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  const navigate = useNavigate();
  // const userId = localStorage.getItem("userId");

  const [isVisible, setIsVisible] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [latestVideoUrl, setLatestVideoUrl] = useState("");
  const [latestArticles, setLatestArticles] = useState([]);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [userProfile, setUserProfile] = useState({});
  const [user, setUser] = useState(null);
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

  const toggleSubmenu = (menu) => {
    setSubmenus((prev) => {
      const updatedSubmenus = Object.keys(prev).reduce((acc, key) => {
        acc[key] = key === menu ? !prev[key] : false;
        return acc;
      }, {});
      return updatedSubmenus;
    });
  };

  useEffect(() => {
    const fetchLatestArticles = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/api/blog`
        );
        const articles = response.data;
        const publishedArticles = articles.filter((article) => article.publish); // Filter published articles
        const latest = publishedArticles.slice(-6).reverse(); // Get the last 6 articles
        setLatestArticles(latest);
      } catch (error) {
        console.error("Error fetching latest articles:", error);
      }
    };

    fetchLatestArticles();
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    const adminToken = localStorage.getItem("adminToken");
    const subAdminToken = localStorage.getItem("subAdminToken");
    const userId = localStorage.getItem("userId");

    if ((token || adminToken || subAdminToken) && userId) {
      setIsLoggedIn(true);
      fetchUserProfile(userId);
    } else {
      toast.error("Login unsuccessful");
      navigate("/");
    }
  }, [navigate]);

  const handleNavigation = (path, errorMessage) => {
    const adminToken = localStorage.getItem("adminToken");
    const subAdminToken = localStorage.getItem("subAdminToken");
    const userId = localStorage.getItem("userId");

    if (adminToken && userId) {
      navigate("/dashboard");
    } else if (subAdminToken && userId) {
      navigate("/profile");
    } else {
      toast.error(errorMessage);
      navigate("/");
    }
  };

  const handleDashboard = () => {
    handleNavigation(
      "/dashboard",
      "Unauthorized access. Redirecting to homepage."
    );
  };

  const handleProfile = () => {
    handleNavigation(
      "/profile",
      "Unauthorized access. Redirecting to homepage."
    );
  };

  // const isLoggedIn = (localStorage.getItem("adminToken") || localStorage.getItem("subAdminToken")) && localStorage.getItem("userId");

  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);

  useEffect(() => {
    const fetchLatestVideoUrl = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/api/latest-video-url`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch the latest video URL");
        }
        const data = await response.json();
        setLatestVideoUrl(data.videoUrls);
      } catch (error) {
        console.error("Error fetching latest video URL:", error);
      }
    };

    fetchLatestVideoUrl();
  }, []);

  const handleCloseLogin = () => {
    setIsVisible(false);
  };

  const handleLoginClick = () => {
    setIsVisible(true);
  };

  const [scrolled, setScrolled] = useState(false);

  // useEffect(() => {
  //   const token = localStorage.getItem("userToken");
  //   if (token) {
  //     setIsLoggedIn(true);
  //     fetchUserProfile();
  //   }
  // }, [userId]);

  const fetchUserProfile = async (userId) => {
    // const userId = localStorage.getItem("userId");
    console.log(userId);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/user/${userId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            // Include any other headers required for authentication
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch user profile");
      }

      const userData = await response.json();
      console.log(userData.token);
      console.log(JSON.stringify(userData));
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
    } catch (error) {
      console.error("Error fetching user profile:", error);
      // Handle error (e.g., show a message to the user)
    }
  };

  const handleLogout = () => {
    localStorage.clear(); // Clear everything from local storage
    setIsLoggedIn(false);
    setUser(null);
    setIsVisible(true);
  };

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleLoginSuccess = (userData) => {
    setIsLoggedIn(true);
    setUser(userData.user);
    setIsVisible(false);
  };

  const handleClick = (category, subcategory, subcategoryId) => {
    navigate(`/${category}/${subcategory}`, { state: { subcategoryId } });
  };

  const handleArticleClick = (slug, blogId) => {
    navigate(`/${slug}`, { state: { blogId: blogId } });
    window.scrollTo(0, 0);
  };

  const handleContinueReading = async (blogId, slug) => {
    try {
      await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/blog/${blogId}/view`
      );
      navigate(`/${slug}`, { state: { blogId: blogId } });
    } catch (error) {
      console.error("Failed to increment view count", error);
    }
  };

  return (
    <div style={{ minHeight: "100vh" }}>
      <div className={style.videoContainer}>
        <div style={{ minHeight: "100vh" }}>
          <ReactPlayer
            className={style.video}
            url="https://youtu.be/YGZLvKAFeYI?si=KNLxLGtbMpt_fCrC"
            playing
            muted
            loop
            width="100%"
            height="100vh"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              minHeight: "100vh",
            }}
          />
        </div>
      </div>
      {isLoggedIn ||
        (!isVisible && (
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: 10,
              textAlign: "center",
              display: "flex",
              alignItems: "center",
              gap: "3em",
            }}
          >
            <h2 className={style.title}>MOW</h2>
            <TypeAnimation
              data-aos="fade-up"
              sequence={["NEWS", 2000, "GAMING", 2000, ""]}
              speed={30}
              repeat={Infinity}
              className={style.textAnimation}
            />
          </div>
        ))}

      <nav
        style={{ zIndex: "999999999" }}
        className={`${style.nav} ${scrolled ? style.scrolled : ""}`}
      >
        <div className={style.logo}>
          <img src={img} alt="" />
          <h2> My Otaku World</h2>
        </div>

        <ul>
          {!isLoggedIn ? (
            <>
              <li onClick={handleLoginClick}>Login</li>
              <li onClick={() => navigate("/register")}>Register</li>
            </>
          ) : (
            <>
              <li className={style.profileContainer}>
                {user && user.profilePicture ? (
                  <img
                    src={user.profilePicture}
                    alt="User Profile"
                    className={style.profilePic}
                    onError={(e) => {
                      e.target.src = "fallback_image_url"; // Replace with a fallback image URL
                      e.target.alt = "Fallback Image";
                    }}
                  />
                ) : (
                  <span>No profile picture available</span>
                )}
              </li>
              {isLoggedIn && (
                <>
                  {localStorage.getItem("adminToken") && (
                    <li onClick={handleDashboard}>Dashboard</li>
                  )}
                  {localStorage.getItem("subAdminToken") && (
                    <li onClick={handleProfile}>Profile</li>
                  )}
                </>
              )}
              <li onClick={handleLogout}>Logout</li>
            </>
          )}

          <li onClick={toggleSidebar}>
            <GiHamburgerMenu className={style.hamburgerIcon} />
          </li>
        </ul>
      </nav>

      <div style={{ minHeight: "100vh" }}>
        {!isLoggedIn && (
          <Login
            isVisible={isVisible}
            onClose={handleCloseLogin}
            onLoginSuccess={handleLoginSuccess}
          />
        )}

        {/* <ReactPlayer
          className={style.video}
          url="https://youtu.be/YGZLvKAFeYI?si=KNLxLGtbMpt_fCrC"
          playing
          muted
          loop
          width="100vw"
          style={{ position: "absolute", top: 0, left: 0, minHeight: "100vh" }}
        /> */}
      </div>

      {/* Sidebar */}
      <div
        className={`${style.sidebar} ${isSidebarOpen ? style.open : ""} ${
          theme === "dark" ? style.dark : ""
        }`}
      >
        {isSidebarOpen && (
          <div className={style.close} onClick={closeSidebar}>
            <ImCross />
          </div>
        )}
        {/* Main Menu Heading */}
        <h2
          className={`${style.mainMenu} ${theme === "dark" ? style.dark : ""}`}
        >
          Main Menu
        </h2>
        {/* Line */}
        <hr
          className={`${theme === "dark" ? style.dark : ""}`}
          style={{ marginBottom: "2em" }}
        />

        <ul className={style.sidebarMenu}>
          <li
            onClick={() => toggleSubmenu("Recommendations")}
            className={`${theme === "dark" ? style.dark : ""}`}
          >
            Recommendations
            <span
              className={`${style.arrow} ${
                submenus.Recommendations ? style.rotateArrow : ""
              } ${theme === "dark" ? style.dark : ""}`}
            >
              +
            </span>
            <ul
              className={`${style.submenu} ${
                submenus.Recommendations ? style.open : ""
              }`}
            >
              <li
                onClick={() =>
                  handleClick(
                    "recommendations",
                    "anime",
                    "4cXwk4rwIli2RwUm-NeJv"
                  )
                }
                className={`${theme === "dark" ? style.dark : ""}`}
              >
                Anime Recommendations
              </li>
              <hr
                className={`${style.line} ${
                  theme === "dark" ? style.dark : ""
                }`}
              />
              <li
                onClick={() =>
                  handleClick(
                    "recommendations",
                    "manga",
                    "ORIX6kz1CrlXy7g6lCxEI"
                  )
                }
                className={`${theme === "dark" ? style.dark : ""}`}
              >
                Manga Recommendations
              </li>
              <hr
                className={`${style.line} ${
                  theme === "dark" ? style.dark : ""
                }`}
              />
              <li
                onClick={() =>
                  handleClick(
                    "recommendations",
                    "hentai",
                    "wz4rRU9GVo6zGUZ0JrBgq"
                  )
                }
                className={`${theme === "dark" ? style.dark : ""}`}
              >
                Hentai Anime
              </li>
            </ul>
          </li>

          <li
            onClick={() => toggleSubmenu("News")}
            className={`${theme === "dark" ? style.dark : ""}`}
          >
            News
            <span
              className={`${style.arrow} ${
                submenus.Recommendations ? style.rotateArrow : ""
              } ${theme === "dark" ? style.dark : ""}`}
            >
              +
            </span>
            <ul
              className={`${style.submenu} ${submenus.News ? style.open : ""}`}
            >
              <li
                onClick={() =>
                  handleClick("news", "anime", "XP7sPXbw785-8SGxTMRLM")
                }
                className={`${theme === "dark" ? style.dark : ""}`}
              >
                Anime News
              </li>
              <li
                onClick={() =>
                  handleClick("news", "gaming", "PNIN3QyrEwILPaUXHqw3y")
                }
                className={`${theme === "dark" ? style.dark : ""}`}
              >
                Gaming News
              </li>
            </ul>
          </li>

          <li
            onClick={() =>
              handleClick("fillers", " Guide", "Cfdin1qXn-QmSHr7jkpWc")
            }
            className={`${theme === "dark" ? style.dark : ""}`}
          >
            Fillers Guide
          </li>

          <li
            onClick={() =>
              handleClick("watch", " orders", "Eb4dlK7Yn8WYrOUScs3Bf")
            }
            className={`${theme === "dark" ? style.dark : ""}`}
          >
            Watch Orders
          </li>

          <li
            onClick={() => toggleSubmenu("Gaming")}
            className={`${theme === "dark" ? style.dark : ""}`}
          >
            Gaming
            <span
              className={`${style.arrow} ${
                submenus.Recommendations ? style.rotateArrow : ""
              } ${theme === "dark" ? style.dark : ""}`}
            >
              +
            </span>
            <ul
              className={`${style.submenu} ${
                submenus.Gaming ? style.open : ""
              }`}
            >
              <li
                onClick={() =>
                  handleClick("gaming", "cod", "TLISFSiThIftwKYJ5Ahs0")
                }
                className={`${theme === "dark" ? style.dark : ""}`}
              >
                Call of Duty
              </li>
              <li
                onClick={() =>
                  handleClick("gaming", "fortnite", "-PzwmFsl52UXzf846MvGm")
                }
                className={`${theme === "dark" ? style.dark : ""}`}
              >
                Fortnite
              </li>
              <li
                onClick={() =>
                  handleClick("gaming", "sims", "QUsIBQCjx_ssECnQuuxYs")
                }
                className={`${theme === "dark" ? style.dark : ""}`}
              >
                Sims
              </li>
              <li
                onClick={() =>
                  handleClick("gaming", "minecraft", "JYRssjDPZRv9FjkzxiLuK")
                }
                className={`${theme === "dark" ? style.dark : ""}`}
              >
                MineCraft
              </li>
              <li
                onClick={() =>
                  handleClick("gaming", "genshin", "HnKRa97F7hZOjgUp6Nl-T")
                }
                className={`${theme === "dark" ? style.dark : ""}`}
              >
                GenShin Impact
              </li>
              <li
                onClick={() =>
                  handleClick("gaming", "dnd", "9xAbNuoa7hUbX6IVUOoUl")
                }
                className={`${theme === "dark" ? style.dark : ""}`}
              >
                D&D
              </li>
              <li
                onClick={() =>
                  handleClick("gaming", "runescape", "UgGxv3aBoT-gZF_d6RAUI")
                }
                className={`${theme === "dark" ? style.dark : ""}`}
              >
                RuneScape
              </li>
              <li
                onClick={() =>
                  handleClick("gaming", "skyrim", "f50kmfVNH6_VKB2VNLAY1")
                }
                className={`${theme === "dark" ? style.dark : ""}`}
              >
                Skyrim
              </li>
              <li
                onClick={() =>
                  handleClick("gaming", "finalFantasy", "bOOKI1PV4QXVc2t-p28_M")
                }
                className={`${theme === "dark" ? style.dark : ""}`}
              >
                Final Fantasy
              </li>
              <li
                onClick={() =>
                  handleClick("gaming", "seaOfThieves", "M7qVpEtK0C6fSzCYpruCg")
                }
                className={`${theme === "dark" ? style.dark : ""}`}
              >
                Sea Of Thieves
              </li>
              <li
                onClick={() =>
                  handleClick("gaming", "acnh", "mVAgidZyGLiC_ESo0Qz0Q")
                }
                className={`${theme === "dark" ? style.dark : ""}`}
              >
                ACNH
              </li>
              <li
                onClick={() =>
                  handleClick("gaming", "superMario", "rAOnH2rTRl2F_dN4d3gQp")
                }
                className={`${theme === "dark" ? style.dark : ""}`}
              >
                Super Mario
              </li>
            </ul>
          </li>

          <li
            onClick={() => toggleSubmenu("Browse")}
            className={`${theme === "dark" ? style.dark : ""}`}
          >
            Browse
            <span
              className={`${style.arrow} ${
                submenus.Recommendations ? style.rotateArrow : ""
              } ${theme === "dark" ? style.dark : ""}`}
            >
              +
            </span>
            <ul
              className={`${style.submenu} ${
                submenus.Browse ? style.open : ""
              }`}
            >
              <li
                onClick={() =>
                  handleClick("browse", "characters", "-oDl7-pEus8vU9F1h5fiZ")
                }
                className={`${theme === "dark" ? style.dark : ""}`}
              >
                Characters
              </li>
              <li
                onClick={() =>
                  handleClick("browse", "featured", "k8yfvXBLuOaVwzMbYA0-T")
                }
                className={`${theme === "dark" ? style.dark : ""}`}
              >
                Featured
              </li>
              <li
                onClick={() =>
                  handleClick("browse", "fanTheories", "YPrUcLj6TK4pauv15RU4N")
                }
                className={`${theme === "dark" ? style.dark : ""}`}
              >
                Fan Theories
              </li>
              <li
                onClick={() =>
                  handleClick("browse", "japan", "GioLhWWNvePrVr97KFtme")
                }
                className={`${theme === "dark" ? style.dark : ""}`}
              >
                Japan
              </li>
              <li
                onClick={() =>
                  handleClick("browse", "animeQuotes", "jJW4MORPqCsQ-DtVhOZmD")
                }
                className={`${theme === "dark" ? style.dark : ""}`}
              >
                Anime Quotes
              </li>
              <li
                onClick={() =>
                  handleClick("browse", "disney", "XMnoqwAjfKfAmit5Z0eG9")
                }
                className={`${theme === "dark" ? style.dark : ""}`}
              >
                Disney
              </li>
              <li
                onClick={() =>
                  handleClick("browse", "dragonBall", "Mm4mvsy9GP0rn721u-T3R")
                }
                className={`${theme === "dark" ? style.dark : ""}`}
              >
                Dragon Ball
              </li>
              <li
                onClick={() =>
                  handleClick("browse", "naruto", "V9R6Hs9SaMXotVQzbx7hK")
                }
                className={`${theme === "dark" ? style.dark : ""}`}
              >
                Naruto
              </li>
              <li
                onClick={() =>
                  handleClick("browse", "onePiece", "I2WSPLVsHzo2pyTVmiHCR")
                }
                className={`${theme === "dark" ? style.dark : ""}`}
              >
                One Piece
              </li>
              <li
                onClick={() =>
                  handleClick("browse", "pokemon", "9QayKOWIHGQyIceq24nZa")
                }
                className={`${theme === "dark" ? style.dark : ""}`}
              >
                Pokemon
              </li>
              <li
                onClick={() =>
                  handleClick("browse", "cosplay", "7t-hzkEYBWZD6LtBVfTvn")
                }
                className={`${theme === "dark" ? style.dark : ""}`}
              >
                Cosplay
              </li>
              <li
                onClick={() =>
                  handleClick("browse", "giftGuides", "DOfoBalSvvw5OV9_BBwII")
                }
                className={`${theme === "dark" ? style.dark : ""}`}
              >
                Gift Guides
              </li>
            </ul>
          </li>
          <li className={`${style.more} ${theme === "dark" ? style.dark : ""}`}>
            Forums
          </li>
          

          <ToggleSwitch onChange={toggleTheme} checked={theme === "dark"} />

        </ul>
      </div>
      {/* Overlay */}
      {isSidebarOpen && (
        <div className={style.overlay} onClick={closeSidebar}></div>
      )}

      <section className={style.welcome}>
        <div className={style.left}>
          <img src={img} alt="" />
        </div>

        <div className={style.right}>
          <h1>WELCOME TO MYOTAKUWORLD</h1>
          <h2>What We Do?</h2>
          <p>
            We’re part of a generation that loves anime, movies, and video
            games. It’s like these things are in our DNA, right?
          </p>
          <p>
            Now, think about when you stumble upon an awesome series – the
            excitement is real! You want to dive deep, learn everything there is
            to know, and maybe even share your newfound knowledge with friends.
          </p>
          <p>
            Well, that’s what our special place My Otaku World, is all about!
          </p>
          <p>
            It’s a bit like a magical playground for all the fantastic shows we
            enjoy watching. Inside, we have lots of fun lists, gaming guides,
            recommendations, and some seriously cool gift ideas as well!
          </p>
          <p>
            See if you find something that makes you say, ‘Wow, that’s cool!’
            Have fun!”
          </p>
          <div>
            <h1
              onClick={() => {
                navigate("/Blogs");
              }}
            >
              BROWSE THE BLOG
            </h1>
            <FontAwesomeIcon className={style.icon} icon={faArrowRight} />
          </div>
        </div>
      </section>

      <section className={style.Popular}>
        <h1>Popular on MOW</h1>

        <div className={style.gridMain}>
          <div className={style.grid}>
            <div
              data-aos="fade-up"
              style={{
                position: "relative",
                overflow: "hidden",
                borderRadius: "5px",
              }}
              onClick={() =>
                handleClick("gaming", "sims", "QUsIBQCjx_ssECnQuuxYs")
              }
            >
              <h3>The Sims</h3>
              <div className={style.bg1}></div>
              <img style={{ width: "58vw" }} src={sims} alt="The Sims" />
            </div>

            <div
              data-aos="fade-up"
              style={{
                position: "relative",
                overflow: "hidden",
                borderRadius: "5px",
              }}
              onClick={() =>
                handleClick("browse", "naruto", "V9R6Hs9SaMXotVQzbx7hK")
              }
            >
              <h3>Naruto</h3>
              <div className={style.bg2}></div>
              <img style={{ width: "38vw" }} src={naruto} alt="Naruto" />
            </div>
          </div>

          <div className={style.grid}>
            <div
              data-aos="fade-up"
              style={{
                position: "relative",
                overflow: "hidden",
                borderRadius: "5px",
              }}
              onClick={() =>
                handleClick("gaming", "call-of-duty", "TLISFSiThIftwKYJ5Ahs0")
              }
            >
              <h3>Call of Duty</h3>
              <div className={style.bg3}></div>
              <img style={{ width: "38vw" }} src={COD} alt="Call of Duty" />
            </div>

            <div
              data-aos="fade-up"
              style={{
                position: "relative",
                overflow: "hidden",
                borderRadius: "5px",
              }}
              onClick={() =>
                handleClick("gaming", "fortnite", "-PzwmFsl52UXzf846MvGm")
              }
            >
              <h3>Fortnite</h3>
              <div className={style.bg4}></div>
              <img style={{ width: "58vw" }} src={Fortnite} alt="Fortnite" />
            </div>
          </div>

          <div className={style.grid}>
            <div
              data-aos="fade-up"
              style={{
                position: "relative",
                overflow: "hidden",
                borderRadius: "5px",
              }}
              onClick={() =>
                handleClick("browse", "pokemon", "9QayKOWIHGQyIceq24nZa")
              }
            >
              <h3>Pokemon</h3>
              <div className={style.bg5}></div>
              <img style={{ width: "58vw" }} src={Pokemon} alt="Pokemon" />
            </div>

            <div
              data-aos="fade-up"
              style={{
                position: "relative",
                overflow: "hidden",
                borderRadius: "5px",
              }}
              onClick={() =>
                handleClick("gaming", "minecraft", "JYRssjDPZRv9FjkzxiLuK")
              }
            >
              <h3>Minecraft</h3>
              <div className={style.bg6}></div>
              <img style={{ width: "38vw" }} src={minicarft} alt="Minecraft" />
            </div>
          </div>

          <div className={style.grid}>
            <div
              data-aos="fade-up"
              style={{
                position: "relative",
                overflow: "hidden",
                borderRadius: "5px",
              }}
              onClick={() =>
                handleClick("gaming", "final-fantasy", "bOOKI1PV4QXVc2t-p28_M")
              }
            >
              <h3>Final Fantasy</h3>
              <div className={style.bg7}></div>
              <img
                style={{ width: "38vw" }}
                src={fantasy}
                alt="Final Fantasy"
              />
            </div>

            <div
              data-aos="fade-up"
              style={{
                position: "relative",
                overflow: "hidden",
                borderRadius: "5px",
              }}
              onClick={() =>
                handleClick("browse", "one-piece", "I2WSPLVsHzo2pyTVmiHCR")
              }
            >
              <h3>One Piece</h3>
              <div className={style.bg8}></div>
              <img style={{ width: "58vw" }} src={onepeice} alt="One Piece" />
            </div>
          </div>
        </div>
      </section>

      <section className={style.Contributor}>
        <img src={anime} alt="Anime Image" />
        <div style={{ position: "relative", zIndex: "3" }}>
          <h2>Become a Contributor Now</h2>

          <div>
            <p>
              Contributors are passionate individuals who share a love for anime
              & games.
            </p>
            <p>
              They are otakus, gamers, and fans who want to share their
              knowledge and creativity with the world.
            </p>

            <button
              className={style.btn1}
              onClick={() => navigate("/contributor")}
            >
              Become a Contributor
              <FontAwesomeIcon className={style.icon2} icon={faArrowRight} />
            </button>
          </div>
        </div>
      </section>

      <section className={style.maincard}>
        <h1>Recent on</h1>

        <h1>My Otaku World</h1>

        <div className={style.card}>
          {latestArticles.map((article) => (
            <div
              key={article.blogId}
              data-aos="fade-up"
              className={style.cards}
              onClick={() =>
                handleContinueReading(article.blogId, article.slug)
              }
              style={{ cursor: "pointer" }} // Optional: change cursor to pointer
            >
              <div className={style.imageContainer}>
                <img
                  src={article.mediaUrl}
                  alt={article.title}
                  className={style.cardImage}
                />
              </div>
              <h3>{article.title}</h3>
            </div>
          ))}
        </div>

        <div className={style.btncontainer}>
          <button onClick={() => navigate("/Blogs")} className={style.btn2}>
            SEE ALL ARTICLES
          </button>
        </div>
      </section>

      <section className={style.bottomcontainer}>
        <ul>
          <li
            onClick={() => {
              navigate("/Blogs");
            }}
          >
            Blog
          </li>
          <li
            onClick={() => {
              navigate("/forums");
            }}
          >
            Forums
          </li>
          <li
            onClick={() => {
              navigate("/contributor");
            }}
          >
            Contributors
          </li>
          <li
            onClick={() => {
              navigate("/members");
            }}
          >
            Members
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
      </section>

      <div className={style.divider}>
        <hr className={style.line} />
      </div>

      <footer className={theme === "dark" ? style.dark : ""}>
        <p className={theme === "dark" ? "dark" : ""}>
          © 2019-2023 MyOtakuWorld
        </p>
        <p className={theme === "dark" ? "dark" : ""}>
          All other assets and trademarks are property of their original owners.
        </p>
        <p className={theme === "dark" ? "dark" : ""}>
          MyOtakuWorld is neither affiliated with nor endorsed by any brands and
          trademarks on this site unless explicitly stated.
        </p>
      </footer>
    </div>
  );
}

export default Home;
