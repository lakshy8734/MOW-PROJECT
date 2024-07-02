import React, { useState, useEffect } from "react";
import styles from "./Members.module.css";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast } from "react-toastify";
import { faUsers, faKey } from "@fortawesome/free-solid-svg-icons";
import "react-toastify/dist/ReactToastify.css";
import side from "../../assets/mow.webp";
import img from "../../assets/logo.webp";
import { GiHamburgerMenu } from "react-icons/gi";
import COD from "../../assets/Callofduty.webp";
import { ImCross } from "react-icons/im";

import Zen from "../../assets/Zenitsue.webp";

import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

import { IoChatbubblesOutline } from "react-icons/io5";
import { LuNewspaper } from "react-icons/lu";
import { FiHome } from "react-icons/fi";
import { LuUser2 } from "react-icons/lu";
import { ImSearch } from "react-icons/im";
import { AiOutlineClockCircle } from "react-icons/ai";
import zen from "../../assets/Default.webp";
import axios from "axios";

import Aos from "aos";
import "aos/dist/aos.css";

import {
  faHome,
  faUser,
  faCog,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";

const Members = () => {
  const navigate = useNavigate();


  const userToken = localStorage.getItem("userToken");
  const adminToken = localStorage.getItem("adminToken");
  const subAdminToken = localStorage.getItem("subAdminToken");

  const roleKey = userToken ? "User" : adminToken ? "Admin" : subAdminToken ? "SubAdmin" : null;

  const handleLoginClick = () => {
    // setIsVisible(true);
    navigate("/");
  };

  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [latestArticles, setLatestArticles] = useState([]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 8;

  // New states for search and sort
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("lastActive");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/api/subadmin`
        ); // Replace with your actual API endpoint
        const subAdminUsers = response.data.map((user) => ({
          id: user.userId,
          name: user.name,
          profilePicture: user.profilePicture || zen,
          lastActive: calculateLastActive(user.lastLoggingTime),
          lastActiveDiff: calculateLastActiveDiff(user.lastLoggingTime),
          friendsCount: user.friendsCount || 0,
          email: user.email,
          username: user.username,
          bio: user.bio,
        }));
        setUsers(subAdminUsers);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    const fetchLatestArticles = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/api/blog`
        );
        const articles = response.data;
        const publishedBlogs = articles.filter(blog => blog.publish);
        const latest = publishedBlogs.slice(-5).reverse(); // Get the last 5 published articles
        setLatestArticles(latest);
      } catch (error) {
        console.error("Error fetching latest articles:", error);
      }
    };

    fetchLatestArticles();
  }, []);


  const calculateLastActive = (lastLoggingTime) => {
    const [datePart, timePart] = lastLoggingTime.split(" ");
    const [day, month, year] = datePart.split("_");
    const [hours, minutes, seconds] = timePart.split(":");

    // Create a Date object in IST
    const lastLoginDate = new Date(
      Date.UTC(year, month - 1, day, hours - 5, minutes - 30, seconds)
    );
    const currentDate = new Date();
    const differenceInTime = currentDate - lastLoginDate;

    if (differenceInTime < 0) {
      console.error("Future date provided:", lastLoggingTime);
      return "Error in date";
    }

    const differenceInDays = Math.floor(differenceInTime / (1000 * 3600 * 24));
    const differenceInHours = Math.floor(
      (differenceInTime % (1000 * 3600 * 24)) / (1000 * 3600)
    );
    const differenceInMinutes = Math.floor(
      (differenceInTime % (1000 * 3600)) / (1000 * 60)
    );

    if (differenceInDays >= 1) {
      return `${differenceInDays} day${differenceInDays !== 1 ? "s" : ""} ago`;
    } else if (differenceInHours >= 1) {
      return `${differenceInHours} hour${differenceInHours !== 1 ? "s" : ""
        } ago`;
    } else {
      return `${differenceInMinutes} minute${differenceInMinutes !== 1 ? "s" : ""
        } ago`;
    }
  };

  const totalPages = Math.ceil(users.length / usersPerPage);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1); // Reset to the first page on search
  };

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
    setCurrentPage(1); // Reset to the first page on sort change
  };

  const filteredUsers = users
    .filter((user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOption === "alphabetical") {
        return a.name.localeCompare(b.name);
      } else if (sortOption === "lastActive") {
        // Convert last active time to milliseconds for comparison
        return a.lastActiveDiff - b.lastActiveDiff;
      }
      return 0;
    });

  const calculateLastActiveDiff = (lastLoggingTime) => {
    const [datePart, timePart] = lastLoggingTime.split(" ");
    const [day, month, year] = datePart.split("_");
    const [hours, minutes, seconds] = timePart.split(":");

    const lastLoginDate = new Date(
      Date.UTC(year, month - 1, day, hours - 5, minutes - 30, seconds)
    );
    const currentDate = new Date();
    const differenceInTime = currentDate - lastLoginDate;

    if (differenceInTime < 0) {
      console.error("Future date provided:", lastLoggingTime);
      return Number.MAX_SAFE_INTEGER;
    }

    return differenceInTime;
  };

  const currentUsers = filteredUsers.slice(
    (currentPage - 1) * usersPerPage,
    currentPage * usersPerPage
  );

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleGoogleSignInSuccess = (credentialResponse) => {
    var credentialResponseDecoded = jwtDecode(credentialResponse.credential);
    console.log(credentialResponseDecoded);
  };

  // Function to handle Google Sign-In failure
  const handleGoogleSignInError = () => {
    console.log("Login Failed");
  };

  // const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate("/");
  };

  const handleArticleClick = (slug, blogId) => {
    navigate(`/${slug}`, { state: { blogId: blogId } });
    window.scrollTo(0, 0);
  };

  const openModal = (user) => {
    console.log("Selected User:", user);
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

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
                <img onClick={()=>{navigate('/')}} src={side} alt="" />
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
              <img onClick={()=>{navigate('/')}} src={side} alt="" />
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
              <div className={styles.diva1}>
                <FiHome onClick={() => navigate("/")} icon={faHome} />
                <h6>Home</h6>
              </div>

              <div style={{ color: "#d33" }} className={styles.diva1}>
                <LuUser2 onClick={() => navigate("/members")} icon={faUser} />

                <h6>People</h6>
              </div>
            </div>

            <div className={styles.MsideTop2}>
              <div className={styles.diva1}>
                <LuNewspaper onClick={() => navigate("/Blogs")} icon={faUser} />

                <h6>Blog</h6>
              </div>

              <div className={styles.diva1}>
                <IoChatbubblesOutline
                  onClick={() => navigate("/forums")}
                  icon={faUser}
                />
                <h6>Forums</h6>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.maincontainer}>
        <div className={styles.midcontainer}>
          <h1>
            All Members <span>40</span>
          </h1>

          <div className={styles.Mline}></div>

          <div className={styles.searching}>
            <input
              type="text"
              placeholder="Search Members..."
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <div>
              <ImSearch className={styles.searchingIcon} />
            </div>

            <select
              name=""
              id=""
              value={sortOption}
              onChange={handleSortChange}
            >
              <option value="lastActive">Last Active</option>
              <option value="alphabetical">Alphabetical</option>
            </select>
          </div>

          {/* <div className={styles.loader}>
            <div className={styles.box}> <AiOutlineClockCircle style={{ color: '#d33', marginRight: '5px' }} /> Loading the members of your community. Please wait.</div>
          </div> */}

          <div className={styles.cards}>
            {currentUsers.map((member) => (
              <div className={styles.card} key={member.id}>
                <img
                  src={member.profilePicture}
                  alt={member.name}
                  className={styles.cardImage}
                />
                <h3 className={styles.cardTitle} onClick={() => openModal(member)}>{member.name}</h3>
                <p className={styles.Time}>{member.lastActive}</p>
                <p className={styles.number}>{member.friendsCount}</p>
                <p className={styles.cardText}>Friends</p>
                <button
                  // onClick={() => openModal(member)}
                  className={styles.Add}
                >
                  {" "}
                  Add Friends
                </button>
              </div>
            ))}
          </div>
          {isModalOpen && selectedUser && (
            <div className={styles.modal}>
              <div data-aos="fade-up" className={styles.modalContent}>
                <span className={styles.close} onClick={closeModal}>
                  &times;
                </span>
                <h2>{selectedUser.name}</h2>
                <img
                  src={selectedUser.profilePicture}
                  alt={selectedUser.name}
                  className={styles.modalImage}
                />
                <p>Email: {selectedUser.email}</p>
                <p>Username: {selectedUser.username}</p>
                <p>Last Active: {selectedUser.lastActive}</p>
                <p>Bio: {selectedUser.bio}</p>
              </div>
            </div>
          )}
          <div className={styles.pagination}>
            <button onClick={handlePrevPage} disabled={currentPage === 1}>
              &larr;
            </button>
            <span>
              {currentPage} ... {totalPages}
            </span>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              &rarr;
            </button>
          </div>
          <div></div>
        </div>

        <div className={styles.asideContainer}>
          <div className={styles.aside}>
            <h2>Recommended Articles</h2>
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
        </div>
      </section>
    </>
  );
};

export default Members;
