import React, { useState } from "react";
import styles from "./Register.module.css";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import { faUsers, faKey } from "@fortawesome/free-solid-svg-icons";
import { FaCamera } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";
import side from "../../assets/mow.webp";
import { FaBolt } from "react-icons/fa";
import img from "../../assets/logo.webp";
import ReCAPTCHA from "react-google-recaptcha";
import { GiHamburgerMenu } from "react-icons/gi";
import { ImCross } from "react-icons/im";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { faHome, faUser, faCog, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";



import { IoChatbubblesOutline } from "react-icons/io5";
import { LuNewspaper } from "react-icons/lu";
import { FiHome } from "react-icons/fi";
import { LuUser2 } from "react-icons/lu";

const Register = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [submenus, setSubmenus] = useState({
    Recommendations: false,
    News: false,
    Gaming: false,
    Browse: false,
    More: false,
  });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
    profilePicture: null,
  });
  const [previewImage, setPreviewImage] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [captchaCompleted, setCaptchaCompleted] = useState(false);

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

  const handleGoogleSignInError = () => {
    console.log("Login Failed");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        profilePicture: file,
      });
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleRecaptchaChange = (value) => {
    setCaptchaCompleted(true);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (
      !formData.name ||
      !formData.email ||
      !formData.username ||
      !formData.password
    ) {
      toast.error("All fields are required.");
      return;
    }

    const nameRegex = /^[a-zA-Z]+$/;
    if (!nameRegex.test(formData.name)) {
      toast.error("Name should only contain alphabets.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    if (formData.password.length < 4) {
      toast.error("Password should be at least 4 characters.");
      return;
    }

    if (!captchaCompleted) {
      toast.error("Please complete the reCAPTCHA challenge.");
      return;
    }

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("username", formData.username);
      formDataToSend.append("password", formData.password);
      if (formData.profilePicture) {
        formDataToSend.append("profilePicture", formData.profilePicture);
      }

      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/register`,
        {
          method: "POST",
          body: formDataToSend,
        }
      );

      if (!response.ok) {
        const data = await response.json();
        if (data.errors) {
          data.errors.forEach((error) => {
            toast.error(error.msg);
          });
        } else {
          throw new Error("Network response was not ok");
        }
      } else {
        const data = await response.json();
        navigate("/");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleLogoClick = () => {
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
              onClick={() => {
                navigate("/");
              }}
            >
              Login
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
                      onSuccess={handleGoogleSignInSuccess}
                      onError={handleGoogleSignInError}
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
                  <LuUser2
                    onClick={() => {
                      navigate("/Members");
                    }}
                    icon={faUser} />
                  <h6>People</h6>
                </div>
              </div>

              <div className={styles.sideTop2}>
                <div className={styles.div1}>
                  <LuNewspaper icon={faUser}
                    onClick={() => {
                      navigate("/Blogs");
                    }}
                  />
                  <h6>Blog</h6>
                </div>

                <div className={styles.div1}>
                  <IoChatbubblesOutline
                    onClick={() => {
                      navigate("/forums");
                    }}
                    icon={faUser} />
                  <h6>Forums</h6>
                </div>
              </div>
            </div>
          </div>
        </div>
        {isSidebarOpen && <div className={styles.overlay} onClick={closeSidebar}></div>}

        <h1 className={styles.h1}>Create an Account</h1>
        <div className={styles.box1}>
          <span>
            <FaBolt />
          </span>
          <h6>
            Registering for this site is easy. Just fill in the fields below,
            and we’ll get a new account set up for you in no time
          </h6>
        </div>

        <div className={styles.container}>
          <h3 className={styles.heading}>Account Details</h3>
          <div className={styles.imageUploadContainer} onClick={() => document.getElementById("profilePicture").click()}>
            {previewImage ? (
              <img src={previewImage} alt="Profile" className={styles.previewImage} />
            ) : (
              <FaCamera className={styles.cameraIcon} />
            )}
            <input
              id="profilePicture"
              type="file"
              accept="image/*"
              name="profilePicture"
              onChange={handleFileChange}
            />
          </div>
          {formData.profilePicture && !previewImage && (
            <div className={styles.errorMessage}>
              Please upload a valid image file.
            </div>
          )}
          <label htmlFor="name" className={styles.label}>
            Name
          </label>
          <input
            id="name"
            className={styles.input}
            name="name"
            value={formData.name}
            onChange={handleChange}
            type="text"
            placeholder="Name"
            autoFocus
          />

          <label htmlFor="email" className={styles.label}>
            Email
          </label>
          <input
            id="email"
            className={styles.input}
            name="email"
            value={formData.email}
            onChange={handleChange}
            type="email"
            placeholder="Email"
          />

          <label htmlFor="username" className={styles.label}>
            Username *
          </label>
          <input
            id="username"
            className={styles.input}
            name="username"
            value={formData.username}
            onChange={handleChange}
            type="text"
            placeholder="Username"
          />

          <div className={styles.passwordInputContainer}>
            <label htmlFor="password" className={styles.label}>
              Password
            </label>
            <input
              id="password"
              className={styles.passwordInput}
              name="password"
              value={formData.password}
              onChange={handleChange}
              type={showPassword ? "text" : "password"}
              placeholder="Password"
            />

            <FontAwesomeIcon
              icon={showPassword ? faEyeSlash : faEye}
              className={styles.eyeIcon}
              onClick={togglePasswordVisibility}
            />
          </div>



          <button
            onClick={handleSubmit}
            disabled={!captchaCompleted}
            className={styles.button}
          >
            Create Account
          </button>
          <p className={styles.footer}>
            Already have an account?
            <span className={styles.underline} onClick={() => navigate("/")}>
              Sign in
            </span>
          </p>
        </div>

        <ReCAPTCHA
          className={styles.ReCAPTCHA}
          sitekey="6LfGisopAAAAAPZHJXeu8U5vxwzi65JmidkqtiHG"
          onChange={handleRecaptchaChange}
        />
      </div>
    </>
  );
};

export default Register;
