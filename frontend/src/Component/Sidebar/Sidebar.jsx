import React, { useState } from "react";
import style from "./Sidebar.module.css";
import { ImCross } from "react-icons/im";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ isSidebarOpen, closeSidebar }) => {
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
      <div className={`${style.sidebar} ${isSidebarOpen ? style.open : ""}`}>
        {isSidebarOpen && (
          <div className={style.close} onClick={closeSidebar}>
            <ImCross />
          </div>
        )}
        <h2 className={style.mainMenu}>Main Menu</h2>
        <hr className={style.line} />
        <ul className={style.sidebarMenu}>
          <li onClick={() => toggleSubmenu("Recommendations")}>
            Recommendations
            <span
              className={`${style.arrow} ${
                submenus.Recommendations ? style.rotateArrow : ""
              }`}
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
                Hentai Recommendations
              </li>
            </ul>
          </li>
          <li onClick={() => toggleSubmenu("News")}>
            News
            <span
              className={`${style.arrow} ${
                submenus.News ? style.rotateArrow : ""
              }`}
            >
              +
            </span>
            <ul
              className={`${style.submenu} ${submenus.News ? style.open : ""}`}
            >
              <li
                onClick={() =>
                  handleClick("news", "anime-news", "XP7sPXbw785-8SGxTMRLM")
                }
              >
                Anime News
              </li>
              <hr className={style.line} />
              <li
                onClick={() =>
                  handleClick("news", "gaming-news", "PNIN3QyrEwILPaUXHqw3y")
                }
              >
                Gaming News
              </li>
            </ul>
          </li>
          <li
            onClick={() =>
              handleClick("fillers", "guide", "Cfdin1qXn-QmSHr7jkpWc")
            }
          >
            Fillers Guide
          </li>
          <li
            onClick={() =>
              handleClick("watch", "order", "Eb4dlK7Yn8WYrOUScs3Bf")
            }
          >
            Watch Orders
          </li>
          <li onClick={() => toggleSubmenu("Gaming")}>
            Gaming
            <span
              className={`${style.arrow} ${
                submenus.Gaming ? style.rotateArrow : ""
              }`}
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
                D&D
              </li>
              <hr className={style.line} />
              <li
                onClick={() =>
                  handleClick("gaming", "runescape", "UgGxv3aBoT-gZF_d6RAUI")
                }
              >
                Runescape
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
          <li onClick={() => toggleSubmenu("Browse")}>
            Browse
            <span
              className={`${style.arrow} ${
                submenus.Browse ? style.rotateArrow : ""
              }`}
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
                  handleClick("browse", "dragon-ball", "Mm4mvsy9GP0rn721u-T3R")
                }
              >
                Dragon Ball
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
        </ul>
      </div>
      {isSidebarOpen && (
        <div className={style.overlay} onClick={closeSidebar}></div>
      )}
    </>
  );
};

export default Sidebar;
