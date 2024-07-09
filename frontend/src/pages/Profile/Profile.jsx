import React, { useState, useEffect, useContext } from "react";
import styles from "./Profile.module.css";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast } from "react-toastify";
import { faUsers, faKey } from "@fortawesome/free-solid-svg-icons";
import "react-toastify/dist/ReactToastify.css";
import side from "../../assets/mow.webp";
import img from "../../assets/logo.webp";
import { GiHamburgerMenu } from "react-icons/gi";
import { ImCross } from "react-icons/im";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import zen from "../../assets/Default.webp";
import { LuImagePlus } from "react-icons/lu";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import { FaArrowAltCircleRight } from "react-icons/fa";
import { MdOutlineNotificationAdd } from "react-icons/md";
import crossover from "../../assets/crossover.jpg";

import { IoChatbubblesOutline } from "react-icons/io5";
import { LuNewspaper } from "react-icons/lu";
import { FiHome } from "react-icons/fi";
import { LuUser2 } from "react-icons/lu";
import { ImSearch } from "react-icons/im";

import {
  faHome,
  faUser,
  faCog,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";

import UsersList from "../../Component/UsersList/UsersList";
import ProfileBlog from "../../Component/ProfileBlog/ProfileBlog";
import { ThemeContext } from "../../contexts/ThemeContext";


const Profile = () => {
  const { theme } = useContext(ThemeContext);

  const navigate = useNavigate();

  const [showSubMenu, setShowSubMenu] = useState(false);
  const [user, setUser] = useState(null);

  const [view, setView] = useState("view");
  const [profile, setProfile] = useState(null);
  const [tempProfile, setTempProfile] = useState({
    name: "",
    email: "",
    username: "",
    profilePicture: "",
  });

  const [activeTab, setActiveTab] = useState("profile");
  const [errors, setErrors] = useState({});
  const [showTable, setShowTable] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [image, setImage] = useState(null);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const subAdminToken = localStorage.getItem("subAdminToken");
    const userId = localStorage.getItem("userId");

    if (!subAdminToken || !userId) {
      toast.error("Unauthorized access. Redirecting to homepage.");
      navigate("/");
    } else {
      fetchUserProfile(userId);
    }
  }, [navigate]);

  const handleMouseEnter = () => {
    if (window.innerWidth > 768) {
      setShowSubMenu(true);
    }
  };

  const handleMouseLeave = () => {
    if (window.innerWidth > 768) {
      setShowSubMenu(false);
    }
  };

  const handleClick = () => {
    setShowSubMenu(!showSubMenu);
  };

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
      setUserId(userId);
      setTempProfile({
        name: userData.name,
        email: userData.email,
        username: userData.username,
        profilePicture: userData.profilePicture,
      });
      setImage(userData.profilePicture || zen);
      localStorage.setItem("user", JSON.stringify(userData));
    } catch (error) {
      console.error("Error fetching user profile:", error);
      // Handle error (e.g., show a message to the user)
    }
  };

  // Function to handle tab click
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleViewClick = () => {
    setView("view");
  };

  const handleEditClick = () => {
    setView("edit");
  };

  const handleChange2 = (e) => {
    const { name, value } = e.target;
    setTempProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const validate = () => {
    let validationErrors = {};
    if (!tempProfile.name) validationErrors.name = "Name is required";
    if (!tempProfile.email) validationErrors.email = "Email is required";
    if (!tempProfile.username)
      validationErrors.username = "Username is required";
    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const handleSubmit2 = async (e) => {
    e.preventDefault();
    const isValid = validate();
    if (isValid && userId) {
      try {
        const formData = new FormData();
        formData.append("name", tempProfile.name);
        formData.append("email", tempProfile.email);
        formData.append("username", tempProfile.username);
        if (tempProfile.profilePicture) {
          formData.append("profilePicture", tempProfile.profilePicture);
        }

        // Log the formData values
        for (let [key, value] of formData.entries()) {
          console.log(`${key}: ${value}`);
        }

        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/api/user/${userId}`,
          {
            method: "PUT",
            body: formData,
          }
        );

        if (!response.ok) {
          throw new Error("Failed to update user profile");
        }

        const updatedUser = await response.json();
        console.log("Updated User:", updatedUser); // Log updated user data
        setUser(updatedUser);
        setTempProfile({
          name: updatedUser.name,
          email: updatedUser.email,
          username: updatedUser.username,
          profilePicture: updatedUser.profilePicture,
        });
        setImage(updatedUser.profilePicture || zen); // Update the image state after profile update
        setView("view");
        setShowTable(true);
        setShowToast(true);
        toast.success("Profile updated successfully");
      } catch (error) {
        console.error("Error updating user profile:", error);
        toast.error("Failed to update profile");
      }
    } else {
      setShowToast(true);
    }
  };

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const handleImageChange = (event) => {
    const selectedImage = event.target.files[0];
    if (selectedImage) {
      setImage(URL.createObjectURL(selectedImage));
      setTempProfile((prevProfile) => ({
        ...prevProfile,
        profilePicture: selectedImage,
      }));
    }
  };

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

  // Define handleChange function to update form data
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // const navigate = useNavigate();

  const handleLogoClick = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <>
      <div
        className={`${styles.sidebar} ${theme === "dark" ? styles.dark : ""}`}
      >
        <div
          className={`${styles.logo} ${theme === "dark" ? styles.dark : ""}`}
          onClick={handleLogoClick}
        >
          <img
            src={img}
            alt="Logo"
            className={`${styles.logo} ${theme === "dark" ? styles.dark : ""}`}
          />
        </div>
        <div
          className={`${styles.iconsContainer} ${
            theme === "dark" ? styles.dark : ""
          }`}
        >
          <FiHome
            onClick={() => navigate("/")}
            className={`${styles.iconss} ${
              theme === "dark" ? styles.dark : ""
            }`}
            title="Home"
          />
          <LuUser2
            onClick={() => navigate("/members")}
            className={`${styles.iconss} ${
              theme === "dark" ? styles.dark : ""
            }`}
            title="People"
          />
          <LuNewspaper
            onClick={() => navigate("/Blogs")}
            className={`${styles.iconss} ${
              theme === "dark" ? styles.dark : ""
            }`}
            title="Blogs"
          />
          <IoChatbubblesOutline
            onClick={() => navigate("/forums")}
            className={`${styles.iconss} ${
              theme === "dark" ? styles.dark : ""
            }`}
            title="Forums"
          />
        </div>
      </div>

      <div>
        <nav className={`${styles.nav} ${theme === "dark" ? styles.dark : ""}`}>
          <div>
            <li onClick={toggleSidebar}>
              <GiHamburgerMenu
                className={`${styles.hamburgerIcon} ${
                  theme === "dark" ? styles.dark : ""
                }`}
              />
            </li>
          </div>

          <ul className={`${theme === "dark" ? styles.dark : ""}`}>
            <li
              className={`${styles.reqmenu} ${
                theme === "dark" ? styles.dark : ""
              }`}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onClick={handleClick}
            >
              <MdOutlineNotificationAdd />
              {showSubMenu && (
                <div
                  className={`${styles.reqsubmenus} ${
                    theme === "dark" ? styles.dark : ""
                  }`}
                >
                  <div
                    className={`${styles.friendRequest} ${
                      theme === "dark" ? styles.dark : ""
                    }`}
                  >
                    <p>John Doe sent you a friend request</p>
                    <button
                      className={`${styles.acceptBtn} ${
                        theme === "dark" ? styles.dark : ""
                      }`}
                    >
                      Accept
                    </button>
                    <button
                      className={`${styles.rejectBtn} ${
                        theme === "dark" ? styles.dark : ""
                      }`}
                    >
                      Reject
                    </button>
                  </div>
                  <div
                    className={`${styles.friendRequest} ${
                      theme === "dark" ? styles.dark : ""
                    }`}
                  >
                    <p>John Doe sent you a friend request</p>
                    <button
                      className={`${styles.acceptBtn} ${
                        theme === "dark" ? styles.dark : ""
                      }`}
                    >
                      Accept
                    </button>
                    <button
                      className={`${styles.rejectBtn} ${
                        theme === "dark" ? styles.dark : ""
                      }`}
                    >
                      Reject
                    </button>
                  </div>
                </div>
              )}
            </li>
            {!userId && (
              <li
                onClick={() => {
                  navigate("/");
                }}
                className={theme === "dark" ? styles.dark : ""}
              >
                Login
              </li>
            )}
          </ul>
        </nav>
        {/* Sidebar */}
        <div
          className={`${styles.sidebar2} ${
            theme === "dark" ? styles.dark : ""
          } ${isSidebarOpen ? styles.open : ""}`}
        >
          {isSidebarOpen && (
            <div
              className={`${styles.close} ${
                theme === "dark" ? styles.dark : ""
              }`}
              onClick={closeSidebar}
            >
              <ImCross />
            </div>
          )}
          <div
            className={`${styles.mainbox} ${
              theme === "dark" ? styles.dark : ""
            }`}
          >
            <div
              className={`${styles.sidelogin} ${
                theme === "dark" ? styles.dark : ""
              }`}
            >
              <div
                className={`${styles.img} ${
                  theme === "dark" ? styles.dark : ""
                }`}
              >
                <img src={side} alt="" />
                <p>My Otaku World</p>

                <div
                  className={`${styles.sideform} ${
                    theme === "dark" ? styles.dark : ""
                  }`}
                >
                  <h1>Login Now</h1>

                  <div
                    className={`${styles.input2} ${
                      theme === "dark" ? styles.dark : ""
                    }`}
                  >
                    <FontAwesomeIcon
                      className={`${styles.icons} ${
                        theme === "dark" ? styles.dark : ""
                      }`}
                      icon={faUsers}
                    />
                    <input
                      required
                      name="email"
                      type={"email"}
                      placeholder="Email"
                      className={theme === "dark" ? styles.dark : ""}
                    />
                  </div>
                  <div
                    className={`${styles.input2} ${
                      theme === "dark" ? styles.dark : ""
                    }`}
                  >
                    <FontAwesomeIcon
                      className={`${styles.icons} ${
                        theme === "dark" ? styles.dark : ""
                      }`}
                      icon={faKey}
                    />
                    <input
                      required
                      name="password"
                      type="password"
                      placeholder="Password"
                      className={theme === "dark" ? styles.dark : ""}
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
                    <button
                      className={`${styles.btn3} ${
                        theme === "dark" ? styles.dark : ""
                      }`}
                    >
                      Login into your Account
                    </button>
                    <button
                      className={`${styles.btn4} ${
                        theme === "dark" ? styles.dark : ""
                      }`}
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

            <div
              className={`${styles.Sideicons} ${
                theme === "dark" ? styles.dark : ""
              }`}
            >
              <div
                className={`${styles.sideTop} ${
                  theme === "dark" ? styles.dark : ""
                }`}
              >
                <div
                  className={`${styles.div1} ${
                    theme === "dark" ? styles.dark : ""
                  }`}
                >
                  <FontAwesomeIcon
                    onClick={() => {
                      navigate("/");
                    }}
                    icon={faHome}
                    className={theme === "dark" ? styles.dark : ""}
                  />
                  <h6 className={theme === "dark" ? styles.dark : ""}>Home</h6>
                </div>
                <div
                  className={`${styles.div1} ${
                    theme === "dark" ? styles.dark : ""
                  }`}
                >
                  <FontAwesomeIcon
                    icon={faUser}
                    className={theme === "dark" ? styles.dark : ""}
                  />
                  <h6 className={theme === "dark" ? styles.dark : ""}>
                    People
                  </h6>
                </div>
              </div>

              <div
                className={`${styles.sideTop2} ${
                  theme === "dark" ? styles.dark : ""
                }`}
              >
                <div
                  className={`${styles.div1} ${
                    theme === "dark" ? styles.dark : ""
                  }`}
                >
                  <FontAwesomeIcon
                    icon={faUser}
                    onClick={() => {
                      navigate("/blogs");
                    }}
                    className={theme === "dark" ? styles.dark : ""}
                  />
                  <h6 className={theme === "dark" ? styles.dark : ""}>Blog</h6>
                </div>

                <div
                  className={`${styles.div1} ${
                    theme === "dark" ? styles.dark : ""
                  }`}
                >
                  <FontAwesomeIcon
                    icon={faUser}
                    className={theme === "dark" ? styles.dark : ""}
                  />
                  <h6 className={theme === "dark" ? styles.dark : ""}>
                    Forums
                  </h6>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Overlay */}
        {isSidebarOpen && (
          <div
            className={`${styles.overlay} ${
              theme === "dark" ? styles.dark : ""
            }`}
            onClick={closeSidebar}
          ></div>
        )}

        <div
          className={`${styles.Profile} ${theme === "dark" ? styles.dark : ""}`}
        >
          <div
            className={`${styles.Empty} ${theme === "dark" ? styles.dark : ""}`}
          >
            {/* <img
              src={crossover}
              alt="Uploaded DP"
              style={{ width: "100%", height: "100%" }}
              className={styles.uploadedImage}
            /> */}
          </div>

          <div
            className={`${styles.DPsec} ${theme === "dark" ? styles.dark : ""}`}
          >
            <div
              className={`${styles.DP} ${theme === "dark" ? styles.dark : ""}`}
            >
              <div
                className={`${styles.imgs} ${
                  theme === "dark" ? styles.dark : ""
                }`}
              >
                {image ? (
                  <img
                    src={image}
                    alt="Uploaded DP"
                    className={`${styles.uploadedImage} ${
                      theme === "dark" ? styles.dark : ""
                    }`}
                  />
                ) : (
                  <img
                    src={zen}
                    alt=""
                    className={`${styles.defaultImage} ${
                      theme === "dark" ? styles.dark : ""
                    }`}
                  />
                )}

                <label
                  htmlFor="upload"
                  className={`${styles.uploadLabel} ${
                    theme === "dark" ? styles.dark : ""
                  }`}
                >
                  <LuImagePlus />
                </label>

                <input
                  type="file"
                  accept="image/*"
                  id="upload"
                  className={`${styles.uploadInput} ${
                    theme === "dark" ? styles.dark : ""
                  }`}
                  onChange={handleImageChange}
                />
                <h3 style={{ whiteSpace: "nowrap" }}>{tempProfile?.name}</h3>

                <div
                  className={`${styles.options} ${
                    theme === "dark" ? styles.dark : ""
                  }`}
                >
                  <button
                    onClick={() => handleTabClick("profile")}
                    className={`${
                      activeTab === "profile"
                        ? styles.activebtn
                        : styles.inactivebtn
                    } ${theme === "dark" ? styles.dark : ""}`}
                  >
                    Profile
                  </button>
                  <button
                    onClick={() => handleTabClick("users")}
                    className={`${
                      activeTab === "users"
                        ? styles.activebtn
                        : styles.inactivebtn
                    } ${theme === "dark" ? styles.dark : ""}`}
                  >
                    Users
                  </button>
                  <button
                    onClick={() => handleTabClick("blog")}
                    className={`${
                      activeTab === "blog"
                        ? styles.activebtn
                        : styles.inactivebtn
                    } ${theme === "dark" ? styles.dark : ""}`}
                  >
                    Blog
                  </button>
                  <button
                    style={{ whiteSpace: "nowrap" }}
                    onClick={() => window.open("/blogform", "_blank")}
                    className={`${
                      activeTab === "Uploadblog"
                        ? styles.activebtn
                        : styles.inactivebtn
                    } ${theme === "dark" ? styles.dark : ""}`}
                  >
                    Upload Blog
                  </button>
                </div>
              </div>
            </div>

            {activeTab === "profile" && (
              <div
                className={`${styles.contex} ${
                  theme === "dark" ? styles.dark : ""
                }`}
              >
                <div
                  className={`${styles.control} ${
                    theme === "dark" ? styles.dark : ""
                  }`}
                >
                  <h2
                    onClick={handleViewClick}
                    className={`${view === "view" ? styles.active : ""} ${
                      theme === "dark" ? styles.dark : ""
                    }`}
                  >
                    View
                  </h2>
                  <h2
                    onClick={handleEditClick}
                    className={`${view === "edit" ? styles.active : ""} ${
                      theme === "dark" ? styles.dark : ""
                    }`}
                  >
                    Edit
                  </h2>
                </div>

                {view === "edit" && (
                  <div
                    className={`${styles.fourm} ${
                      theme === "dark" ? styles.dark : ""
                    }`}
                  >
                    <h1>Edit Profile</h1>

                    <form
                      className={`${styles.editProfileForm} ${
                        theme === "dark" ? styles.dark : ""
                      }`}
                      onSubmit={handleSubmit2}
                    >
                      <div
                        className={`${styles.editProfileField} ${
                          theme === "dark" ? styles.dark : ""
                        }`}
                      >
                        <label className={theme === "dark" ? styles.dark : ""}>
                          Name:
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={tempProfile.name}
                          onChange={handleChange2}
                          placeholder="Name"
                          className={theme === "dark" ? styles.dark : ""}
                        />
                        {errors.name && (
                          <div
                            className={`${styles.errorMessage} ${
                              theme === "dark" ? styles.dark : ""
                            }`}
                          >
                            {errors.name}
                          </div>
                        )}
                      </div>
                      <div
                        className={`${styles.editProfileField} ${
                          theme === "dark" ? styles.dark : ""
                        }`}
                      >
                        <label className={theme === "dark" ? styles.dark : ""}>
                          Email:
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={tempProfile.email}
                          onChange={handleChange2}
                          placeholder="Email"
                          className={theme === "dark" ? styles.dark : ""}
                        />
                        {errors.email && (
                          <div
                            className={`${styles.errorMessage} ${
                              theme === "dark" ? styles.dark : ""
                            }`}
                          >
                            {errors.email}
                          </div>
                        )}
                      </div>
                      <div
                        className={`${styles.editProfileField} ${
                          theme === "dark" ? styles.dark : ""
                        }`}
                      >
                        <label className={theme === "dark" ? styles.dark : ""}>
                          Username:
                        </label>
                        <input
                          type="text"
                          name="username"
                          value={tempProfile.username}
                          onChange={handleChange2}
                          placeholder="Username"
                          className={theme === "dark" ? styles.dark : ""}
                        />
                        {errors.username && (
                          <div
                            className={`${styles.errorMessage} ${
                              theme === "dark" ? styles.dark : ""
                            }`}
                          >
                            {errors.username}
                          </div>
                        )}
                      </div>
                      <div
                        className={`${styles.editProfileButtons} ${
                          theme === "dark" ? styles.dark : ""
                        }`}
                      >
                        <button
                          type="button"
                          className={`${styles.cancelButton} ${
                            theme === "dark" ? styles.dark : ""
                          }`}
                          onClick={handleViewClick}
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className={`${styles.saveButton} ${
                            theme === "dark" ? styles.dark : ""
                          }`}
                        >
                          Save
                        </button>
                      </div>
                    </form>
                    {showToast && (
                      <div
                        className={`${styles.toast} ${
                          theme === "dark" ? styles.dark : ""
                        }`}
                      >
                        Please fill all required fields!
                      </div>
                    )}
                  </div>
                )}
                {view === "view" && (
                  <div
                    className={`${styles.tab} ${
                      theme === "dark" ? styles.dark : ""
                    }`}
                  >
                    <h1>View Profile</h1>

                    <div
                      className={`${styles.profileContainer} ${
                        theme === "dark" ? styles.dark : ""
                      }`}
                    >
                      {/* <div className={styles.profileImageContainer}>
                        <img
                          src={user?.profilePicture || zen}
                          alt="Profile"
                          className={styles.profileImage}
                        />
                        <label className={styles.uploadButton}>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                          />
                          <LuImagePlus />
                        </label>
                      </div> */}

                      <div
                        className={`${styles.profileInfo} ${
                          theme === "dark" ? styles.dark : ""
                        }`}
                      >
                        <h2>{tempProfile?.name}</h2>
                        <p>Email: {tempProfile?.email}</p>
                        <p>Username: {tempProfile?.username}</p>
                      </div>
                      <button
                        className={`${styles.editButton} ${
                          theme === "dark" ? styles.dark : ""
                        }`}
                        onClick={handleEditClick}
                      >
                        Edit Profile
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === "users" && (
              <div
                className={`${styles.contex} ${
                  theme === "dark" ? styles.dark : ""
                }`}
              >
                <UsersList />
              </div>
            )}

            {activeTab === "blog" && (
              <div
                className={`${styles.contex} ${
                  theme === "dark" ? styles.dark : ""
                }`}
              >
                <ProfileBlog />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
