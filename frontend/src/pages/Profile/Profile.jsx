import React, { useState, useEffect } from "react";
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

const Profile = () => {
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

          <ul>
            <li
              className={styles.reqmenu}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onClick={handleClick}
            >
              <MdOutlineNotificationAdd />
              {showSubMenu && (
                <div className={styles.reqsubmenus}>
                  <div className={styles.friendRequest}>
                    <p>John Doe sent you a friend request</p>
                    <button className={styles.acceptBtn}>Accept</button>
                    <button className={styles.rejectBtn}>Reject</button>
                  </div>
                  <div className={styles.friendRequest}>
                    <p>John Doe sent you a friend request</p>
                    <button className={styles.acceptBtn}>Accept</button>
                    <button className={styles.rejectBtn}>Reject</button>
                  </div>
                </div>
              )}
            </li>
            {!userId && (
              <li
                onClick={() => {
                  navigate("/");
                }}
              >
                Login
              </li>
            )}
          </ul>
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
            <div  className={styles.sidelogin}>
              <div className={styles.img}>
                <img  src={side} alt="" />
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
                  <FontAwesomeIcon
                    onClick={() => {
                      navigate("/");
                    }}
                    icon={faHome}
                  />
                  <h6>Home</h6>
                </div>
                <div className={styles.div1}>
                  <FontAwesomeIcon icon={faUser} />
                  <h6>People</h6>
                </div>
              </div>

              <div className={styles.sideTop2}>
                <div className={styles.div1}>
                  <FontAwesomeIcon
                    icon={faUser}
                    onClick={() => {
                      navigate("/blogs");
                    }}
                  />

                  <h6>Blog</h6>
                </div>

                <div className={styles.div1}>
                  <FontAwesomeIcon icon={faUser} />
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

        <div className={styles.Profile}>
          <div className={styles.Empty}>
            {/* <img
              src={crossover}
              alt="Uploaded DP"
              style={{ width: "100%", height: "100%" }}
              className={styles.uploadedImage}
            /> */}
          </div>

          <div className={styles.DPsec}>
            <div className={styles.DP}>
              <div className={styles.imgs}>
                {image ? (
                  <img
                    src={image}
                    alt="Uploaded DP"
                    className={styles.uploadedImage}
                  />
                ) : (
                  <img src={zen} alt="" className={styles.defaultImage} />
                )}

                <label htmlFor="upload" className={styles.uploadLabel}>
                  <LuImagePlus />
                </label>

                <input
                  type="file"
                  accept="image/*"
                  id="upload"
                  className={styles.uploadInput}
                  onChange={handleImageChange}
                />
                <h3 style={{whiteSpace:'nowrap'}}>{tempProfile?.name}</h3>

                <div className={styles.options}>
                  <button
                    onClick={() => handleTabClick("profile")}
                    className={
                      activeTab === "profile"
                        ? styles.activebtn
                        : styles.inactivebtn
                    }
                  >
                    Profile
                  </button>
                  <button
                    onClick={() => handleTabClick("users")}
                    className={
                      activeTab === "users"
                        ? styles.activebtn
                        : styles.inactivebtn
                    }
                  >
                    Users
                  </button>
                  <button
                    onClick={() => handleTabClick("blog")}
                    className={
                      activeTab === "blog"
                        ? styles.activebtn
                        : styles.inactivebtn
                    }
                  >
                    Blog
                  </button>
                  <button
                    style={{ whiteSpace: "nowrap" }}
                    onClick={() => window.open("/blogform", "_blank")}
                    className={
                      activeTab === "Uploadblog"
                        ? styles.activebtn
                        : styles.inactivebtn
                    }
                  >
                    Upload Blog
                  </button>
                </div>
              </div>
            </div>

            {activeTab === "profile" && (
              <div className={styles.contex}>
                <div className={styles.control}>
                  <h2
                    onClick={handleViewClick}
                    className={view === "view" ? styles.active : ""}
                  >
                    View
                  </h2>
                  <h2
                    onClick={handleEditClick}
                    className={view === "edit" ? styles.active : ""}
                  >
                    Edit
                  </h2>
                </div>

                {view === "edit" && (
                  <div className={styles.fourm}>
                    <h1>Edit Profile</h1>

                    <form
                      className={styles.editProfileForm}
                      onSubmit={handleSubmit2}
                    >
                      <div className={styles.editProfileField}>
                        <label>Name:</label>
                        <input
                          type="text"
                          name="name"
                          value={tempProfile.name}
                          onChange={handleChange2}
                          placeholder="Name"
                        />
                        {errors.name && (
                          <div className={styles.errorMessage}>
                            {errors.name}
                          </div>
                        )}
                      </div>
                      <div className={styles.editProfileField}>
                        <label>Email:</label>
                        <input
                          type="email"
                          name="email"
                          value={tempProfile.email}
                          onChange={handleChange2}
                          placeholder="Email"
                        />
                        {errors.email && (
                          <div className={styles.errorMessage}>
                            {errors.email}
                          </div>
                        )}
                      </div>
                      <div className={styles.editProfileField}>
                        <label>Username:</label>
                        <input
                          type="text"
                          name="username"
                          value={tempProfile.username}
                          onChange={handleChange2}
                          placeholder="Username"
                        />
                        {errors.username && (
                          <div className={styles.errorMessage}>
                            {errors.username}
                          </div>
                        )}
                      </div>
                      <div className={styles.editProfileButtons}>
                        <button
                          type="button"
                          className={styles.cancelButton}
                          onClick={handleViewClick}
                        >
                          Cancel
                        </button>
                        <button type="submit" className={styles.saveButton}>
                          Save
                        </button>
                      </div>
                    </form>
                    {showToast && (
                      <div className={styles.toast}>
                        Please fill all required fields!
                      </div>
                    )}
                  </div>
                )}
                {view === "view" && (
                  <div className={styles.tab}>
                    <h1>View Profile</h1>

                    <div className={styles.profileContainer}>
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

                      <div className={styles.profileInfo}>
                        <h2>{tempProfile?.name}</h2>
                        <p>Email: {tempProfile?.email}</p>
                        <p>Username: {tempProfile?.username}</p>
                      </div>
                      <button
                        className={styles.editButton}
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
              <div className={styles.contex}>
                <UsersList />
              </div>
            )}

            {activeTab === "blog" && (
              <div className={styles.contex}>
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
