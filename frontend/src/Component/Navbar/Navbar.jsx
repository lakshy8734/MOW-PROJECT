import React, { useState, useEffect } from "react";
import style from "./Navbar.module.css";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import img from "../../assets/logo.webp";
import { GiHamburgerMenu } from "react-icons/gi";
import LoginPop from "../../Component/LoginPop/LoginPop";
import Sidebar from "Component/Sidebar/Sidebar";

const Navbar = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const userId = localStorage.getItem("userId");

  const userToken = localStorage.getItem("userToken");
  const adminToken = localStorage.getItem("adminToken");
  const subAdminToken = localStorage.getItem("subAdminToken");

  const roleKey = userToken ? "User" : adminToken ? "Admin" : subAdminToken ? "SubAdmin" : null;


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
      <nav className={`${style.nav} ${scrolled ? style.scrolled : ""}`}>
        <div className={style.logo} onClick={handleLogoClick}>
          <img src={img} alt="" />
          <h2> My Otaku World</h2>
        </div>

        <ul className={style.menu}>
          <li>
            Recommendations +
            <ul className={style.submenu}>
              <li
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
              <hr className={style.line} />
              <li
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
              <hr className={style.line} />
              <li
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
          <li>
            News +
            <ul className={style.submenu}>
              <li
                onClick={() =>
                  handleClick("news", "anime", "XP7sPXbw785-8SGxTMRLM")
                }
              >
                Anime News
              </li>
              <hr className={style.line} />
              <li
                onClick={() =>
                  handleClick("news", "gaming", "PNIN3QyrEwILPaUXHqw3y")
                }
              >
                Gaming News
              </li>
            </ul>
          </li>
          <li
            onClick={() =>
              handleClick("fillers", "Guide", "Cfdin1qXn-QmSHr7jkpWc")
            }
          >
            Fillers Guide
          </li>

          <li
            onClick={() =>
              handleClick("watch", "orders", "Eb4dlK7Yn8WYrOUScs3Bf")
            }
          >
            Watch Orders
          </li>
          <li className={style.more}>
            Gaming +
            <ul className={style.submenu}>
              <li
                onClick={() =>
                  handleClick("gaming", "call-of-duty", "TLISFSiThIftwKYJ5Ahs0")
                }
              >
                Call of Duty
              </li>
              <hr className={style.line} />
              <li
                onClick={() =>
                  handleClick("gaming", "fortnite", "-PzwmFsl52UXzf846MvGm")
                }
              >
                Fortnite
              </li>
              <hr className={style.line} />
              <li
                onClick={() =>
                  handleClick("gaming", "sims", "QUsIBQCjx_ssECnQuuxYs")
                }
              >
                Sims
              </li>
              <hr className={style.line} />
              <li
                onClick={() =>
                  handleClick("gaming", "minecraft", "JYRssjDPZRv9FjkzxiLuK")
                }
              >
                Minecraft
              </li>
              <hr className={style.line} />
              <li
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
              <hr className={style.line} />
              <li
                onClick={() =>
                  handleClick("gaming", "dnd", "9xAbNuoa7hUbX6IVUOoUl")
                }
              >
                D & D
              </li>
              <hr className={style.line} />
              <li
                onClick={() =>
                  handleClick("gaming", "ruinscape", "UgGxv3aBoT-gZF_d6RAUI")
                }
              >
                RuinScape
              </li>
              <hr className={style.line} />
              <li
                onClick={() =>
                  handleClick("gaming", "skyrim", "f50kmfVNH6_VKB2VNLAY1")
                }
              >
                Skyrim
              </li>
              <hr className={style.line} />
              <li
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
              <hr className={style.line} />
              <li
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
              <hr className={style.line} />
              <li
                onClick={() =>
                  handleClick("gaming", "acnh", "mVAgidZyGLiC_ESo0Qz0Q")
                }
              >
                ACNH
              </li>
              <hr className={style.line} />
              <li
                onClick={() =>
                  handleClick("gaming", "super-mario", "rAOnH2rTRl2F_dN4d3gQp")
                }
              >
                Super Mario
              </li>
            </ul>
          </li>
          <li className={style.more}>
            Browse +
            <ul className={style.submenu}>
              <li
                onClick={() =>
                  handleClick("browse", "characters", "-oDl7-pEus8vU9F1h5fiZ")
                }
              >
                Characters
              </li>
              <hr className={style.line} />
              <li
                onClick={() =>
                  handleClick("browse", "featured", "k8yfvXBLuOaVwzMbYA0-T")
                }
              >
                Featured
              </li>
              <hr className={style.line} />
              <li
                onClick={() =>
                  handleClick("browse", "fan-theories", "YPrUcLj6TK4pauv15RU4N")
                }
              >
                Fan Theories
              </li>
              <hr className={style.line} />
              <li
                onClick={() =>
                  handleClick("browse", "japan", "GioLhWWNvePrVr97KFtme")
                }
              >
                Japan
              </li>
              <hr className={style.line} />
              <li
                onClick={() =>
                  handleClick("browse", "anime-quotes", "jJW4MORPqCsQ-DtVhOZmD")
                }
              >
                Anime Quotes
              </li>
              <hr className={style.line} />
              <li
                onClick={() =>
                  handleClick("browse", "disney", "XMnoqwAjfKfAmit5Z0eG9")
                }
              >
                Disney
              </li>
              <hr className={style.line} />
              <li
                onClick={() =>
                  handleClick("browse", "dragonball", "Mm4mvsy9GP0rn721u-T3R")
                }
              >
                Dragonball
              </li>
              <hr className={style.line} />
              <li
                onClick={() =>
                  handleClick("browse", "naruto", "V9R6Hs9SaMXotVQzbx7hK")
                }
              >
                Naruto
              </li>
              <hr className={style.line} />
              <li
                onClick={() =>
                  handleClick("browse", "one-piece", "I2WSPLVsHzo2pyTVmiHCR")
                }
              >
                One Piece
              </li>
              <hr className={style.line} />
              <li
                onClick={() =>
                  handleClick("browse", "pokemon", "9QayKOWIHGQyIceq24nZa")
                }
              >
                Pokemon
              </li>
              <hr className={style.line} />
              <li
                onClick={() =>
                  handleClick("browse", "cosplay", "7t-hzkEYBWZD6LtBVfTvn")
                }
              >
                Cosplay
              </li>
              <hr className={style.line} />
              <li
                onClick={() =>
                  handleClick("browse", "gift-guides", "DOfoBalSvvw5OV9_BBwII")
                }
              >
                Gift Guides
              </li>
            </ul>
          </li>
          <li className={style.more}>Forums</li>

          <li className={style.more2}>
            More +
            <ul className={style.submenu}>
              <li className={style.submain}>
                <div>Gaming</div>
                <div>+</div>
                <ul className={style.submenu}>
                  <li
                    onClick={() =>
                      handleClick(
                        "gaming",
                        "call-of-duty",
                        "TLISFSiThIftwKYJ5Ahs0"
                      )
                    }
                  >
                    Call of Duty
                  </li>
                  <hr className={style.line} />
                  <li
                    onClick={() =>
                      handleClick("gaming", "fortnite", "-PzwmFsl52UXzf846MvGm")
                    }
                  >
                    Fortnite
                  </li>
                  <hr className={style.line} />
                  <li
                    onClick={() =>
                      handleClick("gaming", "sims", "QUsIBQCjx_ssECnQuuxYs")
                    }
                  >
                    Sims
                  </li>
                  <hr className={style.line} />
                  <li
                    onClick={() =>
                      handleClick(
                        "gaming",
                        "minecraft",
                        "JYRssjDPZRv9FjkzxiLuK"
                      )
                    }
                  >
                    Minecraft
                  </li>
                  <hr className={style.line} />
                  <li
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
                  <hr className={style.line} />
                  <li
                    onClick={() =>
                      handleClick("gaming", "dnd", "9xAbNuoa7hUbX6IVUOoUl")
                    }
                  >
                    D & D
                  </li>
                  <hr className={style.line} />
                  <li
                    onClick={() =>
                      handleClick(
                        "gaming",
                        "ruinscape",
                        "UgGxv3aBoT-gZF_d6RAUI"
                      )
                    }
                  >
                    RuinScape
                  </li>
                  <hr className={style.line} />
                  <li
                    onClick={() =>
                      handleClick("gaming", "skyrim", "f50kmfVNH6_VKB2VNLAY1")
                    }
                  >
                    Skyrim
                  </li>
                  <hr className={style.line} />
                  <li
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
                  <hr className={style.line} />
                  <li
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
                  <hr className={style.line} />
                  <li
                    onClick={() =>
                      handleClick("gaming", "acnh", "mVAgidZyGLiC_ESo0Qz0Q")
                    }
                  >
                    ACNH
                  </li>
                  <hr className={style.line} />
                  <li
                    onClick={() =>
                      handleClick(
                        "gaming",
                        "super-mario",
                        "rAOnH2rTRl2F_dN4d3gQp"
                      )
                    }
                  >
                    Super Mario
                  </li>
                </ul>
              </li>
              <hr className={style.line} />
              <li className={style.submain}>
                <div>Browse</div>
                <div>+</div>
                <ul className={style.submenu}>
                  <li
                    onClick={() =>
                      handleClick(
                        "browse",
                        "characters",
                        "-oDl7-pEus8vU9F1h5fiZ"
                      )
                    }
                  >
                    Characters
                  </li>
                  <hr className={style.line} />
                  <li
                    onClick={() =>
                      handleClick("browse", "featured", "k8yfvXBLuOaVwzMbYA0-T")
                    }
                  >
                    Featured
                  </li>
                  <hr className={style.line} />
                  <li
                    onClick={() =>
                      handleClick(
                        "browse",
                        "fan-theories",
                        "YPrUcLj6TK4pauv15RU4N"
                      )
                    }
                  >
                    Fan Theories
                  </li>
                  <hr className={style.line} />
                  <li
                    onClick={() =>
                      handleClick("browse", "japan", "GioLhWWNvePrVr97KFtme")
                    }
                  >
                    Japan
                  </li>
                  <hr className={style.line} />
                  <li
                    onClick={() =>
                      handleClick(
                        "browse",
                        "anime-quotes",
                        "jJW4MORPqCsQ-DtVhOZmD"
                      )
                    }
                  >
                    Anime Quotes
                  </li>
                  <hr className={style.line} />
                  <li
                    onClick={() =>
                      handleClick("browse", "disney", "XMnoqwAjfKfAmit5Z0eG9")
                    }
                  >
                    Disney
                  </li>
                  <hr className={style.line} />
                  <li
                    onClick={() =>
                      handleClick(
                        "browse",
                        "dragonball",
                        "Mm4mvsy9GP0rn721u-T3R"
                      )
                    }
                  >
                    Dragonball
                  </li>
                  <hr className={style.line} />
                  <li
                    onClick={() =>
                      handleClick("browse", "naruto", "V9R6Hs9SaMXotVQzbx7hK")
                    }
                  >
                    Naruto
                  </li>
                  <hr className={style.line} />
                  <li
                    onClick={() =>
                      handleClick(
                        "browse",
                        "one-piece",
                        "I2WSPLVsHzo2pyTVmiHCR"
                      )
                    }
                  >
                    One Piece
                  </li>
                  <hr className={style.line} />
                  <li
                    onClick={() =>
                      handleClick("browse", "pokemon", "9QayKOWIHGQyIceq24nZa")
                    }
                  >
                    Pokemon
                  </li>
                  <hr className={style.line} />
                  <li
                    onClick={() =>
                      handleClick("browse", "cosplay", "7t-hzkEYBWZD6LtBVfTvn")
                    }
                  >
                    Cosplay
                  </li>
                  <hr className={style.line} />
                  <li
                    onClick={() =>
                      handleClick(
                        "browse",
                        "gift-guides",
                        "DOfoBalSvvw5OV9_BBwII"
                      )
                    }
                  >
                    Gift Guides
                  </li>
                </ul>
              </li>

              <hr className={style.line} />
              <li>
                <div>Forums</div>
              </li>
            </ul>
          </li>
        </ul>
        <ul>
          {/* <li onClick={handleLoginClick}>Login</li> */}

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

          <li onClick={toggleSidebar}>
            <GiHamburgerMenu className={style.hamburgerIcon} />
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
