import React, { useState, useEffect, useContext } from "react";
import style from "./Navbar.module.css";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import img from "../../assets/logo.webp";
import { GiHamburgerMenu } from "react-icons/gi";
import LoginPop from "../../Component/LoginPop/LoginPop";
import Sidebar from "Component/Sidebar/Sidebar";
import { ThemeContext } from "../../contexts/ThemeContext";
import ToggleSwitch from "../../Component/ToggleSwitch/ToggleSwitch";

const Navbar = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const userId = localStorage.getItem("userId");

  const userToken = localStorage.getItem("userToken");
  const adminToken = localStorage.getItem("adminToken");
  const subAdminToken = localStorage.getItem("subAdminToken");

  const roleKey = userToken
    ? "User"
    : adminToken
    ? "Admin"
    : subAdminToken
    ? "SubAdmin"
    : null;

  const handleCloseLogin = () => {
    setIsVisible(false);
  };

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

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleLoginClick = () => {
    // setIsVisible(true);
    navigate("/");
  };

  const handleLogoClick = () => {
    navigate("/");
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleClick = (category, subcategory, subcategoryId) => {
    navigate(`/${category}/${subcategory}`, { state: { subcategoryId } });
  };
  return (
    <>
      <nav
        className={`${style.nav} ${scrolled ? style.scrolled : ""} ${
          theme === "dark" ? style.dark : ""
        }`}
      >
        <div
          className={`${style.logo} ${theme === "dark" ? style.dark : ""}`}
          onClick={handleLogoClick}
        >
          <img src={img} alt="" />
          <h2>My Otaku World</h2>
        </div>

        <ul className={`${style.menu} ${theme === "dark" ? style.dark : ""}`}>
          <li className={`${style.more} ${theme === "dark" ? style.dark : ""}`}>
            Recommendations +
            <ul
              className={`${style.submenu} ${
                theme === "dark" ? style.dark : ""
              }`}
            >
              <li
                className={`${theme === "dark" ? style.dark : ""}`}
                onClick={() =>
                  handleClick(
                    "recommendations",
                    "anime",
                    "4cXwk4rwIli2RwUm-NeJv"
                  )
                }
              >
                Anime Recommendations
              </li>
              <hr
                className={`${style.line} ${
                  theme === "dark" ? style.dark : ""
                }`}
              />
              <li
                className={`${theme === "dark" ? style.dark : ""}`}
                onClick={() =>
                  handleClick(
                    "recommendations",
                    "manga",
                    "ORIX6kz1CrlXy7g6lCxEI"
                  )
                }
              >
                Manga Recommendations
              </li>
              <hr
                className={`${style.line} ${
                  theme === "dark" ? style.dark : ""
                }`}
              />
              <li
                className={`${theme === "dark" ? style.dark : ""}`}
                onClick={() =>
                  handleClick(
                    "recommendations",
                    "hentai",
                    "wz4rRU9GVo6zGUZ0JrBgq"
                  )
                }
              >
                Hentai Anime
              </li>
            </ul>
          </li>
          <li className={`${style.more} ${theme === "dark" ? style.dark : ""}`}>
            News +
            <ul
              className={`${style.submenu} ${
                theme === "dark" ? style.dark : ""
              }`}
            >
              <li
                className={`${theme === "dark" ? style.dark : ""}`}
                onClick={() =>
                  handleClick("news", "anime", "XP7sPXbw785-8SGxTMRLM")
                }
              >
                Anime News
              </li>
              <hr
                className={`${style.line} ${
                  theme === "dark" ? style.dark : ""
                }`}
              />
              <li
                className={`${theme === "dark" ? style.dark : ""}`}
                onClick={() =>
                  handleClick("news", "gaming", "PNIN3QyrEwILPaUXHqw3y")
                }
              >
                Gaming News
              </li>
            </ul>
          </li>
          <li
            className={`${style.more} ${theme === "dark" ? style.dark : ""}`}
            onClick={() =>
              handleClick("fillers", "Guide", "Cfdin1qXn-QmSHr7jkpWc")
            }
          >
            Fillers Guide
          </li>
          <li
            className={`${style.more} ${theme === "dark" ? style.dark : ""}`}
            onClick={() =>
              handleClick("watch", "orders", "Eb4dlK7Yn8WYrOUScs3Bf")
            }
          >
            Watch Orders
          </li>
          <li className={`${style.more} ${theme === "dark" ? style.dark : ""}`}>
            Gaming +
            <ul
              className={`${style.submenu} ${
                theme === "dark" ? style.dark : ""
              }`}
            >
              <li
                className={`${theme === "dark" ? style.dark : ""}`}
                onClick={() =>
                  handleClick("gaming", "call-of-duty", "TLISFSiThIftwKYJ5Ahs0")
                }
              >
                Call of Duty
              </li>
              <hr
                className={`${style.line} ${
                  theme === "dark" ? style.dark : ""
                }`}
              />
              <li
                className={`${theme === "dark" ? style.dark : ""}`}
                onClick={() =>
                  handleClick("gaming", "fortnite", "-PzwmFsl52UXzf846MvGm")
                }
              >
                Fortnite
              </li>
              <hr
                className={`${style.line} ${
                  theme === "dark" ? style.dark : ""
                }`}
              />
              <li
                className={`${theme === "dark" ? style.dark : ""}`}
                onClick={() =>
                  handleClick("gaming", "sims", "QUsIBQCjx_ssECnQuuxYs")
                }
              >
                Sims
              </li>
              <hr
                className={`${style.line} ${
                  theme === "dark" ? style.dark : ""
                }`}
              />
              <li
                className={`${theme === "dark" ? style.dark : ""}`}
                onClick={() =>
                  handleClick("gaming", "minecraft", "JYRssjDPZRv9FjkzxiLuK")
                }
              >
                Minecraft
              </li>
              <hr
                className={`${style.line} ${
                  theme === "dark" ? style.dark : ""
                }`}
              />
              <li
                className={`${theme === "dark" ? style.dark : ""}`}
                onClick={() =>
                  handleClick(
                    "gaming",
                    "genshin-impact",
                    "HnKRa97F7hZOjgUp6Nl-T"
                  )
                }
              >
                Genshin Impact
              </li>
              <hr
                className={`${style.line} ${
                  theme === "dark" ? style.dark : ""
                }`}
              />
              <li
                className={`${theme === "dark" ? style.dark : ""}`}
                onClick={() =>
                  handleClick("gaming", "dnd", "9xAbNuoa7hUbX6IVUOoUl")
                }
              >
                D & D
              </li>
              <hr
                className={`${style.line} ${
                  theme === "dark" ? style.dark : ""
                }`}
              />
              <li
                className={`${theme === "dark" ? style.dark : ""}`}
                onClick={() =>
                  handleClick("gaming", "ruinscape", "UgGxv3aBoT-gZF_d6RAUI")
                }
              >
                RuinScape
              </li>
              <hr
                className={`${style.line} ${
                  theme === "dark" ? style.dark : ""
                }`}
              />
              <li
                className={`${theme === "dark" ? style.dark : ""}`}
                onClick={() =>
                  handleClick("gaming", "skyrim", "f50kmfVNH6_VKB2VNLAY1")
                }
              >
                Skyrim
              </li>
              <hr
                className={`${style.line} ${
                  theme === "dark" ? style.dark : ""
                }`}
              />
              <li
                className={`${theme === "dark" ? style.dark : ""}`}
                onClick={() =>
                  handleClick(
                    "gaming",
                    "final-fantasy",
                    "bOOKI1PV4QXVc2t-p28_M"
                  )
                }
              >
                Final Fantasy
              </li>
              <hr
                className={`${style.line} ${
                  theme === "dark" ? style.dark : ""
                }`}
              />
              <li
                className={`${theme === "dark" ? style.dark : ""}`}
                onClick={() =>
                  handleClick(
                    "gaming",
                    "sea-of-thieves",
                    "M7qVpEtK0C6fSzCYpruCg"
                  )
                }
              >
                Sea of Thieves
              </li>
              <hr
                className={`${style.line} ${
                  theme === "dark" ? style.dark : ""
                }`}
              />
              <li
                className={`${theme === "dark" ? style.dark : ""}`}
                onClick={() =>
                  handleClick("gaming", "acnh", "mVAgidZyGLiC_ESo0Qz0Q")
                }
              >
                ACNH
              </li>
              <hr
                className={`${style.line} ${
                  theme === "dark" ? style.dark : ""
                }`}
              />
              <li
                className={`${theme === "dark" ? style.dark : ""}`}
                onClick={() =>
                  handleClick("gaming", "super-mario", "rAOnH2rTRl2F_dN4d3gQp")
                }
              >
                Super Mario
              </li>
            </ul>
          </li>

          <li className={`${style.more} ${theme === "dark" ? style.dark : ""}`}>
            Browse +
            <ul
              className={`${style.submenu} ${
                theme === "dark" ? style.dark : ""
              }`}
            >
              <li
                onClick={() =>
                  handleClick("browse", "characters", "-oDl7-pEus8vU9F1h5fiZ")
                }
                className={theme === "dark" ? style.dark : ""}
              >
                Characters
              </li>
              <hr
                className={`${style.line} ${
                  theme === "dark" ? style.dark : ""
                }`}
              />
              <li
                onClick={() =>
                  handleClick("browse", "featured", "k8yfvXBLuOaVwzMbYA0-T")
                }
                className={theme === "dark" ? style.dark : ""}
              >
                Featured
              </li>
              <hr
                className={`${style.line} ${
                  theme === "dark" ? style.dark : ""
                }`}
              />
              <li
                onClick={() =>
                  handleClick("browse", "fan-theories", "YPrUcLj6TK4pauv15RU4N")
                }
                className={theme === "dark" ? style.dark : ""}
              >
                Fan Theories
              </li>
              <hr
                className={`${style.line} ${
                  theme === "dark" ? style.dark : ""
                }`}
              />
              <li
                onClick={() =>
                  handleClick("browse", "japan", "GioLhWWNvePrVr97KFtme")
                }
                className={theme === "dark" ? style.dark : ""}
              >
                Japan
              </li>
              <hr
                className={`${style.line} ${
                  theme === "dark" ? style.dark : ""
                }`}
              />
              <li
                onClick={() =>
                  handleClick("browse", "anime-quotes", "jJW4MORPqCsQ-DtVhOZmD")
                }
                className={theme === "dark" ? style.dark : ""}
              >
                Anime Quotes
              </li>
              <hr
                className={`${style.line} ${
                  theme === "dark" ? style.dark : ""
                }`}
              />
              <li
                onClick={() =>
                  handleClick("browse", "disney", "XMnoqwAjfKfAmit5Z0eG9")
                }
                className={theme === "dark" ? style.dark : ""}
              >
                Disney
              </li>
              <hr
                className={`${style.line} ${
                  theme === "dark" ? style.dark : ""
                }`}
              />
              <li
                onClick={() =>
                  handleClick("browse", "dragonball", "Mm4mvsy9GP0rn721u-T3R")
                }
                className={theme === "dark" ? style.dark : ""}
              >
                Dragonball
              </li>
              <hr
                className={`${style.line} ${
                  theme === "dark" ? style.dark : ""
                }`}
              />
              <li
                onClick={() =>
                  handleClick("browse", "naruto", "V9R6Hs9SaMXotVQzbx7hK")
                }
                className={theme === "dark" ? style.dark : ""}
              >
                Naruto
              </li>
              <hr
                className={`${style.line} ${
                  theme === "dark" ? style.dark : ""
                }`}
              />
              <li
                onClick={() =>
                  handleClick("browse", "one-piece", "I2WSPLVsHzo2pyTVmiHCR")
                }
                className={theme === "dark" ? style.dark : ""}
              >
                One Piece
              </li>
              <hr
                className={`${style.line} ${
                  theme === "dark" ? style.dark : ""
                }`}
              />
              <li
                onClick={() =>
                  handleClick("browse", "pokemon", "9QayKOWIHGQyIceq24nZa")
                }
                className={theme === "dark" ? style.dark : ""}
              >
                Pokemon
              </li>
              <hr
                className={`${style.line} ${
                  theme === "dark" ? style.dark : ""
                }`}
              />
              <li
                onClick={() =>
                  handleClick("browse", "cosplay", "7t-hzkEYBWZD6LtBVfTvn")
                }
                className={theme === "dark" ? style.dark : ""}
              >
                Cosplay
              </li>
              <hr
                className={`${style.line} ${
                  theme === "dark" ? style.dark : ""
                }`}
              />
              <li
                onClick={() =>
                  handleClick("browse", "gift-guides", "DOfoBalSvvw5OV9_BBwII")
                }
                className={theme === "dark" ? style.dark : ""}
              >
                Gift Guides
              </li>
            </ul>
          </li>
          <li className={`${style.more} ${theme === "dark" ? style.dark : ""}`}>
            Forums
          </li>
          <li className={style.more2}>
            More +
            <ul className={style.submenu}>
              <li className={style.submain}>
                <div>Gaming</div>
                <div>+</div>
                <ul
                  className={`${style.submenu} ${
                    theme === "dark" ? style.dark : ""
                  }`}
                >
                  <li
                    onClick={() =>
                      handleClick(
                        "gaming",
                        "call-of-duty",
                        "TLISFSiThIftwKYJ5Ahs0"
                      )
                    }
                    className={theme === "dark" ? style.dark : ""}
                  >
                    Call of Duty
                  </li>
                  <hr
                    className={`${style.line} ${
                      theme === "dark" ? style.dark : ""
                    }`}
                  />
                  <li
                    onClick={() =>
                      handleClick("gaming", "fortnite", "-PzwmFsl52UXzf846MvGm")
                    }
                    className={theme === "dark" ? style.dark : ""}
                  >
                    Fortnite
                  </li>
                  <hr
                    className={`${style.line} ${
                      theme === "dark" ? style.dark : ""
                    }`}
                  />
                  <li
                    onClick={() =>
                      handleClick("gaming", "sims", "QUsIBQCjx_ssECnQuuxYs")
                    }
                    className={theme === "dark" ? style.dark : ""}
                  >
                    Sims
                  </li>
                  <hr
                    className={`${style.line} ${
                      theme === "dark" ? style.dark : ""
                    }`}
                  />
                  <li
                    onClick={() =>
                      handleClick(
                        "gaming",
                        "minecraft",
                        "JYRssjDPZRv9FjkzxiLuK"
                      )
                    }
                    className={theme === "dark" ? style.dark : ""}
                  >
                    Minecraft
                  </li>
                  <hr
                    className={`${style.line} ${
                      theme === "dark" ? style.dark : ""
                    }`}
                  />
                  <li
                    onClick={() =>
                      handleClick(
                        "gaming",
                        "genshin-impact",
                        "HnKRa97F7hZOjgUp6Nl-T"
                      )
                    }
                    className={theme === "dark" ? style.dark : ""}
                  >
                    Genshin Impact
                  </li>
                  <hr
                    className={`${style.line} ${
                      theme === "dark" ? style.dark : ""
                    }`}
                  />
                  <li
                    onClick={() =>
                      handleClick("gaming", "dnd", "9xAbNuoa7hUbX6IVUOoUl")
                    }
                    className={theme === "dark" ? style.dark : ""}
                  >
                    D & D
                  </li>
                  <hr
                    className={`${style.line} ${
                      theme === "dark" ? style.dark : ""
                    }`}
                  />
                  <li
                    onClick={() =>
                      handleClick(
                        "gaming",
                        "ruinscape",
                        "UgGxv3aBoT-gZF_d6RAUI"
                      )
                    }
                    className={theme === "dark" ? style.dark : ""}
                  >
                    RuinScape
                  </li>
                  <hr
                    className={`${style.line} ${
                      theme === "dark" ? style.dark : ""
                    }`}
                  />
                  <li
                    onClick={() =>
                      handleClick("gaming", "skyrim", "f50kmfVNH6_VKB2VNLAY1")
                    }
                    className={theme === "dark" ? style.dark : ""}
                  >
                    Skyrim
                  </li>
                  <hr
                    className={`${style.line} ${
                      theme === "dark" ? style.dark : ""
                    }`}
                  />
                  <li
                    onClick={() =>
                      handleClick(
                        "gaming",
                        "final-fantasy",
                        "bOOKI1PV4QXVc2t-p28_M"
                      )
                    }
                    className={theme === "dark" ? style.dark : ""}
                  >
                    Final Fantasy
                  </li>
                  <hr
                    className={`${style.line} ${
                      theme === "dark" ? style.dark : ""
                    }`}
                  />
                  <li
                    onClick={() =>
                      handleClick(
                        "gaming",
                        "sea-of-thieves",
                        "M7qVpEtK0C6fSzCYpruCg"
                      )
                    }
                    className={theme === "dark" ? style.dark : ""}
                  >
                    Sea of Thieves
                  </li>
                  <hr
                    className={`${style.line} ${
                      theme === "dark" ? style.dark : ""
                    }`}
                  />
                  <li
                    onClick={() =>
                      handleClick("gaming", "acnh", "mVAgidZyGLiC_ESo0Qz0Q")
                    }
                    className={theme === "dark" ? style.dark : ""}
                  >
                    ACNH
                  </li>
                  <hr
                    className={`${style.line} ${
                      theme === "dark" ? style.dark : ""
                    }`}
                  />
                  <li
                    onClick={() =>
                      handleClick(
                        "gaming",
                        "super-mario",
                        "rAOnH2rTRl2F_dN4d3gQp"
                      )
                    }
                    className={theme === "dark" ? style.dark : ""}
                  >
                    Super Mario
                  </li>
                </ul>
              </li>
              <hr
                className={`${style.line} ${
                  theme === "dark" ? style.dark : ""
                }`}
              />
              <li className={style.submain}>
                <div>Browse</div>
                <div>+</div>
                <ul
                  className={`${style.submenu} ${
                    theme === "dark" ? style.dark : ""
                  }`}
                >
                  <li
                    onClick={() =>
                      handleClick(
                        "browse",
                        "characters",
                        "-oDl7-pEus8vU9F1h5fiZ"
                      )
                    }
                    className={theme === "dark" ? style.dark : ""}
                  >
                    Characters
                  </li>
                  <hr
                    className={`${style.line} ${
                      theme === "dark" ? style.dark : ""
                    }`}
                  />
                  <li
                    onClick={() =>
                      handleClick("browse", "featured", "k8yfvXBLuOaVwzMbYA0-T")
                    }
                    className={theme === "dark" ? style.dark : ""}
                  >
                    Featured
                  </li>
                  <hr
                    className={`${style.line} ${
                      theme === "dark" ? style.dark : ""
                    }`}
                  />
                  <li
                    onClick={() =>
                      handleClick(
                        "browse",
                        "fan-theories",
                        "YPrUcLj6TK4pauv15RU4N"
                      )
                    }
                    className={theme === "dark" ? style.dark : ""}
                  >
                    Fan Theories
                  </li>
                  <hr
                    className={`${style.line} ${
                      theme === "dark" ? style.dark : ""
                    }`}
                  />
                  <li
                    onClick={() =>
                      handleClick("browse", "japan", "GioLhWWNvePrVr97KFtme")
                    }
                    className={theme === "dark" ? style.dark : ""}
                  >
                    Japan
                  </li>
                  <hr
                    className={`${style.line} ${
                      theme === "dark" ? style.dark : ""
                    }`}
                  />
                  <li
                    onClick={() =>
                      handleClick(
                        "browse",
                        "anime-quotes",
                        "jJW4MORPqCsQ-DtVhOZmD"
                      )
                    }
                    className={theme === "dark" ? style.dark : ""}
                  >
                    Anime Quotes
                  </li>
                  <hr
                    className={`${style.line} ${
                      theme === "dark" ? style.dark : ""
                    }`}
                  />
                  <li
                    onClick={() =>
                      handleClick("browse", "disney", "XMnoqwAjfKfAmit5Z0eG9")
                    }
                    className={theme === "dark" ? style.dark : ""}
                  >
                    Disney
                  </li>
                  <hr
                    className={`${style.line} ${
                      theme === "dark" ? style.dark : ""
                    }`}
                  />
                  <li
                    onClick={() =>
                      handleClick(
                        "browse",
                        "dragonball",
                        "Mm4mvsy9GP0rn721u-T3R"
                      )
                    }
                    className={theme === "dark" ? style.dark : ""}
                  >
                    Dragonball
                  </li>
                  <hr
                    className={`${style.line} ${
                      theme === "dark" ? style.dark : ""
                    }`}
                  />
                  <li
                    onClick={() =>
                      handleClick("browse", "naruto", "V9R6Hs9SaMXotVQzbx7hK")
                    }
                    className={theme === "dark" ? style.dark : ""}
                  >
                    Naruto
                  </li>
                  <hr
                    className={`${style.line} ${
                      theme === "dark" ? style.dark : ""
                    }`}
                  />
                  <li
                    onClick={() =>
                      handleClick(
                        "browse",
                        "one-piece",
                        "I2WSPLVsHzo2pyTVmiHCR"
                      )
                    }
                    className={theme === "dark" ? style.dark : ""}
                  >
                    One Piece
                  </li>
                  <hr
                    className={`${style.line} ${
                      theme === "dark" ? style.dark : ""
                    }`}
                  />
                  <li
                    onClick={() =>
                      handleClick("browse", "pokemon", "9QayKOWIHGQyIceq24nZa")
                    }
                    className={theme === "dark" ? style.dark : ""}
                  >
                    Pokemon
                  </li>
                  <hr
                    className={`${style.line} ${
                      theme === "dark" ? style.dark : ""
                    }`}
                  />
                  <li
                    onClick={() =>
                      handleClick("browse", "cosplay", "7t-hzkEYBWZD6LtBVfTvn")
                    }
                    className={theme === "dark" ? style.dark : ""}
                  >
                    Cosplay
                  </li>
                  <hr
                    className={`${style.line} ${
                      theme === "dark" ? style.dark : ""
                    }`}
                  />
                  <li
                    onClick={() =>
                      handleClick(
                        "browse",
                        "gift-guides",
                        "DOfoBalSvvw5OV9_BBwII"
                      )
                    }
                    className={theme === "dark" ? style.dark : ""}
                  >
                    Gift Guides
                  </li>
                </ul>
              </li>

              <hr
                className={`${style.line} ${
                  theme === "dark" ? style.dark : ""
                }`}
              />
              <li>
                <div className={theme === "dark" ? style.dark : ""}>Forums</div>
              </li>
            </ul>
          </li>
        </ul>
        <ul>
          {/* <li onClick={handleLoginClick}>Login</li> */}

          {!userId && (
            <ul>
              <li
                onClick={handleLoginClick}
                className={theme === "dark" ? style.dark : ""}
              >
                Login
              </li>
              <li
                onClick={() => {
                  navigate("/register");
                }}
                className={theme === "dark" ? style.dark : ""}
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
              className={theme === "dark" ? style.dark : ""}
            >
              Dashboard
            </li>
          )}
          {roleKey === "SubAdmin" && (
            <li
              onClick={() => {
                navigate("/profile");
              }}
              className={theme === "dark" ? style.dark : ""}
            >
              Profile
            </li>
          )}

          <div
            className={`${style.mode} ${theme === "dark" ? style.dark : ""}`}
          >
            <ToggleSwitch onChange={toggleTheme} checked={theme === "dark"} />
          </div>

          <li onClick={toggleSidebar}>
            <GiHamburgerMenu
              className={`${style.hamburgerIcon} ${
                theme === "dark" ? style.dark : ""
              }`}
            />
          </li>
        </ul>
      </nav>

      {!isLoggedIn && (
        <LoginPop isVisible={isVisible} onClose={handleCloseLogin} />
      )}

      <Sidebar isSidebarOpen={isSidebarOpen} closeSidebar={toggleSidebar} />
    </>
  );
};

export default Navbar;
