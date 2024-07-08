import React, { useState, useContext } from "react";
import style from "./Sidebar.module.css";
import { ImCross } from "react-icons/im";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../../contexts/ThemeContext";

const Sidebar = ({ isSidebarOpen, closeSidebar }) => {
  const { theme } = useContext(ThemeContext);

  const navigate = useNavigate();
  const [submenus, setSubmenus] = useState({
    Recommendations: false,
    News: false,
    Gaming: false,
    Browse: false,
    More: false,
  });

  const toggleSubmenu = (menu) => {
    setSubmenus((prev) => {
      const updatedSubmenus = Object.keys(prev).reduce((acc, key) => {
        acc[key] = key === menu ? !prev[key] : false;
        return acc;
      }, {});
      return updatedSubmenus;
    });
  };

  const handleClick = (category, subcategory, subcategoryId) => {
    navigate(`/${category}/${subcategory}`, { state: { subcategoryId } });
  };

  return (
    <>
      <div
        className={`${style.sidebar} ${isSidebarOpen ? style.open : ""} ${
          theme === "dark" ? style.dark : ""
        }`}
      >
        {isSidebarOpen && (
          <div
            className={`${style.close} ${theme === "dark" ? style.dark : ""}`}
            onClick={closeSidebar}
          >
            <ImCross />
          </div>
        )}
        <h2
          className={`${style.mainMenu} ${theme === "dark" ? style.dark : ""}`}
        >
          Main Menu
        </h2>
        <hr className={`${style.line} ${theme === "dark" ? style.dark : ""}`} />
        <ul
          className={`${style.sidebarMenu} ${
            theme === "dark" ? style.dark : ""
          }`}
        >
          <li
            className={theme === "dark" ? style.dark : ""}
            onClick={() => toggleSubmenu("Recommendations")}
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
              } ${theme === "dark" ? style.dark : ""}`}
            >
              <li
                onClick={() =>
                  handleClick(
                    "recommendations",
                    "anime",
                    "4cXwk4rwIli2RwUm-NeJv"
                  )
                }
                className={theme === "dark" ? style.dark : ""}
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
                className={theme === "dark" ? style.dark : ""}
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
                className={theme === "dark" ? style.dark : ""}
              >
                Hentai Recommendations
              </li>
            </ul>
          </li>
          <li
            className={theme === "dark" ? style.dark : ""}
            onClick={() => toggleSubmenu("News")}
          >
            News
            <span
              className={`${style.arrow} ${
                submenus.News ? style.rotateArrow : ""
              } ${theme === "dark" ? style.dark : ""}`}
            >
              +
            </span>
            <ul
              className={`${style.submenu} ${submenus.News ? style.open : ""} ${
                theme === "dark" ? style.dark : ""
              }`}
            >
              <li
                onClick={() =>
                  handleClick("news", "anime-news", "XP7sPXbw785-8SGxTMRLM")
                }
                className={theme === "dark" ? style.dark : ""}
              >
                Anime News
              </li>
              <hr
                className={`${style.line} ${
                  theme === "dark" ? style.dark : ""
                }`}
              />
              <li
                onClick={() =>
                  handleClick("news", "gaming-news", "PNIN3QyrEwILPaUXHqw3y")
                }
                className={theme === "dark" ? style.dark : ""}
              >
                Gaming News
              </li>
            </ul>
          </li>
          <li
            onClick={() =>
              handleClick("fillers", "guide", "Cfdin1qXn-QmSHr7jkpWc")
            }
            className={theme === "dark" ? style.dark : ""}
          >
            Fillers Guide
          </li>
          <li
            onClick={() =>
              handleClick("watch", "order", "Eb4dlK7Yn8WYrOUScs3Bf")
            }
            className={theme === "dark" ? style.dark : ""}
          >
            Watch Orders
          </li>
          <li
            className={theme === "dark" ? style.dark : ""}
            onClick={() => toggleSubmenu("Gaming")}
          >
            Gaming
            <span
              className={`${style.arrow} ${
                submenus.Gaming ? style.rotateArrow : ""
              } ${theme === "dark" ? style.dark : ""}`}
            >
              +
            </span>
            <ul
              className={`${style.submenu} ${
                submenus.Gaming ? style.open : ""
              } ${theme === "dark" ? style.dark : ""}`}
            >
              <li
                onClick={() =>
                  handleClick("gaming", "call-of-duty", "TLISFSiThIftwKYJ5Ahs0")
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
                  handleClick("gaming", "minecraft", "JYRssjDPZRv9FjkzxiLuK")
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
                D&D
              </li>
              <hr
                className={`${style.line} ${
                  theme === "dark" ? style.dark : ""
                }`}
              />
              <li
                onClick={() =>
                  handleClick("gaming", "runescape", "UgGxv3aBoT-gZF_d6RAUI")
                }
                className={theme === "dark" ? style.dark : ""}
              >
                Runescape
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
                  handleClick("gaming", "super-mario", "rAOnH2rTRl2F_dN4d3gQp")
                }
                className={theme === "dark" ? style.dark : ""}
              >
                Super Mario
              </li>
            </ul>
          </li>
          <li
            className={theme === "dark" ? style.dark : ""}
            onClick={() => toggleSubmenu("Browse")}
          >
            Browse
            <span
              className={`${style.arrow} ${
                submenus.Browse ? style.rotateArrow : ""
              } ${theme === "dark" ? style.dark : ""}`}
            >
              +
            </span>
            <ul
              className={`${style.submenu} ${
                submenus.Browse ? style.open : ""
              } ${theme === "dark" ? style.dark : ""}`}
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
                  handleClick("browse", "memes", "0Ra5uJNS6f6Go-xP9KxM0")
                }
                className={theme === "dark" ? style.dark : ""}
              >
                Memes
              </li>
              <hr
                className={`${style.line} ${
                  theme === "dark" ? style.dark : ""
                }`}
              />
              <li
                onClick={() =>
                  handleClick("browse", "cosplay", "Br7OGTElIww6PntAd9miV")
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
                  handleClick("browse", "videos", "O48zEdgWXxH4Edz0vZnuN")
                }
                className={theme === "dark" ? style.dark : ""}
              >
                Videos
              </li>
              <hr
                className={`${style.line} ${
                  theme === "dark" ? style.dark : ""
                }`}
              />
              <li
                onClick={() =>
                  handleClick("browse", "latest", "hbNXFwRPRp0GxtzgnksVP")
                }
                className={theme === "dark" ? style.dark : ""}
              >
                Latest
              </li>
              <hr
                className={`${style.line} ${
                  theme === "dark" ? style.dark : ""
                }`}
              />
              <li
                onClick={() =>
                  handleClick("browse", "most-visited", "Cr9uKNq1NKKs6CL1HpVtF")
                }
                className={theme === "dark" ? style.dark : ""}
              >
                Most Visited
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
