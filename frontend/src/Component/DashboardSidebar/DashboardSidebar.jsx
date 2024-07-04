import React, { useState, useEffect, useContext } from "react";
import styles from "./DashboardSidebar.module.css";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import img from "../../assets/logo.webp";
import Switch from "Component/Switch/Switch";
import { GiHamburgerMenu } from "react-icons/gi";
import { ImCross } from "react-icons/im";
import { FaRegUser } from "react-icons/fa6";
import { FiLogOut } from "react-icons/fi";
import { FaHome, FaUsers, FaBlog, FaEdit } from "react-icons/fa";
import { IoIosPricetags } from "react-icons/io";
import { MdCategory } from "react-icons/md";
import { TbCategoryFilled } from "react-icons/tb";
import EditAdminProfile from "Component/editAdminProfile/editAdminProfile";
import admin from "../../assets/admin-icon.png"; // Corrected import
import { ThemeContext } from "../../contexts/ThemeContext";
import ToggleSwitch from "../../Component/ToggleSwitch/ToggleSwitch";

const DashboardSidebar = () => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [userDetails, setUserDetails] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("adminToken");
      const userId = localStorage.getItem("userId");

      if (!token || !userId) {
        navigate("/");
        toast.error("Unauthorized access. Redirecting to homepage.");
      }
    };

    checkAuth();
  }, [navigate]);

  useEffect(() => {
    let isMounted = true;

    const fetchUserDetails = async () => {
      const userId = localStorage.getItem("userId");
      if (!userId) return;

      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/api/user/${userId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch user details");
        }
        const data = await response.json();
        console.log(data);
        if (isMounted) {
          setUserDetails(data);
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
        if (isMounted) {
          toast.error("Failed to fetch user details");
        }
      }
    };

    fetchUserDetails();

    return () => {
      isMounted = false;
    };
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
    toast.success("Logged out successfully");
  };

  const handleLogoClick = () => {
    navigate("/");
  };

  const handleEditProfile = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleSave = (updatedDetails) => {
    setUserDetails((prevDetails) => ({ ...prevDetails, ...updatedDetails }));
    // Add code to save updated details to the backend
  };

  return (
    <>
      <div className={styles.sidebar}>

        <div className={styles.logo} onClick={handleLogoClick}>
          <img
            src={img}
            alt="Logo"
            className={styles.logo}
            onClick={handleLogout}
          />
        </div>
        <div className={styles.iconsContainer}>
          <FontAwesomeIcon
            onClick={() => {
              navigate("/");
            }}
            icon={FaHome}
            className={styles.icon}
          />
          <FontAwesomeIcon icon={FaRegUser} className={styles.icon} />
          <FontAwesomeIcon
            icon={FiLogOut}
            className={styles.icon}
            onClick={handleLogout}
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

          <ul>
            <li style={{ position: "relative" }}>

              <FaRegUser />

              <div className={styles.Admin}>
                {userDetails && (
                  <>
                    <div className={styles.userDetails}>
                      <img
                        src={userDetails.profilePicture || admin}
                        alt={admin}
                        className={styles.profilePicture}
                      />
                      <p className={styles.email}>{userDetails.email}</p>
                    </div>
                    <hr />
                    <p className={styles.options} onClick={handleEditProfile}>
                      <FaEdit /> Edit Profile
                    </p>
                    <p className={styles.options} onClick={handleLogout}>
                      <FiLogOut /> Logout
                    </p>
                  </>
                )}
              </div>
            </li>
          </ul>
        </nav>

        <div className={`${styles.sidebar2} ${isSidebarOpen ? styles.open : ""}`}>
          
          {isSidebarOpen && (
            <div className={styles.close} onClick={closeSidebar}>
              <ImCross />
            </div>
          )}

          <div className={styles.mainbox}>
            <div className={styles.logo} onClick={handleLogout}>
              <img
                src={img}
                alt="Logo"
                className={styles.logo}
                onClick={handleLogout}
              />
            </div>

            <ul>
              <li
                onClick={() => {
                  navigate("/dashboard");
                }}
              >
                <FaHome /> Home
              </li>

              <li
                onClick={() => {
                  navigate("/blog");
                }}
              >
                <FaBlog /> Blogs
              </li>

              <li
                onClick={() => {
                  navigate("/Tags");
                }}
              >
                <IoIosPricetags /> Tags
              </li>

              <li
                onClick={() => {
                  navigate("/category");
                }}
              >
                <MdCategory /> Category
              </li>
              <li
                onClick={() => {
                  navigate("/Subcategory");
                }}
              >
                <FaHome /> Subcategory
              </li>

              <li
                onClick={() => {
                  navigate("/Users");
                }}
              >
                <FaUsers /> Users
              </li>
              <li
                onClick={() => {
                  navigate("/admin");
                }}
              >
                <FaUsers /> Admin/Subadmins
              </li>
              <li
                onClick={() => {
                  navigate("/contributors");
                }}
              >
                <TbCategoryFilled /> Contributors
              </li>
              <li
                onClick={() => {
                  navigate("/links");
                }}
              >
                <TbCategoryFilled /> Link Words
              </li>
              <li
                onClick={() => {
                  navigate("/contact-details");
                }}
              >
                <TbCategoryFilled /> Contact Details
              </li>
              <li onClick={() => window.open("/blogform", "_blank")}>
                <TbCategoryFilled /> Upload Blog
              </li>
            </ul>

            <div className={styles.mode}>
              <ToggleSwitch onChange={toggleTheme} checked={theme === "dark"} />
            </div>

          </div>
        </div>

        {isSidebarOpen && (
          <div className={styles.overlay} onClick={closeSidebar}></div>
        )}
      </div>

      <section className={styles.leftcontainer}>

        <div className={styles.logo} onClick={handleLogout}>
          <img
            src={img}
            alt="Logo"
            className={styles.logo}
            onClick={handleLogout}
          />
        </div>

        <ul>
          <li
            onClick={() => {
              navigate("/dashboard");
            }}
          >
            <FaHome /> Home
          </li>

          <li
            onClick={() => {
              navigate("/blog");
            }}
          >
            <FaBlog /> Blogs
          </li>

          <li
            onClick={() => {
              navigate("/Tags");
            }}
          >
            <IoIosPricetags /> Tags
          </li>

          <li
            onClick={() => {
              navigate("/category");
            }}
          >
            <MdCategory /> Category
          </li>
          <li
            onClick={() => {
              navigate("/Subcategory");
            }}
          >
            <FaHome /> Subcategory
          </li>

          <li
            onClick={() => {
              navigate("/Users");
            }}
          >
            <FaUsers /> Users
          </li>
          <li
            onClick={() => {
              navigate("/admin");
            }}
          >
            <FaUsers /> Admin/Subadmins
          </li>
          <li
            onClick={() => {
              navigate("/contributors");
            }}
          >
            <TbCategoryFilled /> Contributors
          </li>
          <li
            onClick={() => {
              navigate("/links");
            }}
          >
            <TbCategoryFilled /> Link Words
          </li>
          <li
            onClick={() => {
              navigate("/contact-details");
            }}
          >
            <TbCategoryFilled /> Contact Details
          </li>
          <li onClick={() => window.open("/blogform", "_blank")}>
            <TbCategoryFilled /> Upload Blog
          </li>
        </ul>

        <div className={styles.mode}>
          <ToggleSwitch onChange={toggleTheme} checked={theme === "dark"} />
        </div>
      </section>

      {isModalOpen && (
        <EditAdminProfile
          userDetails={userDetails}
          onClose={handleModalClose}
          onSave={handleSave}
        />
      )}
    </>
  );
};

export default DashboardSidebar;
