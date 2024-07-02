import React from "react";
import { useState, useEffect } from "react";
import style from "./Login.module.css";
import { useNavigate } from "react-router-dom";
import img from "../../assets/otako.webp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import imgs from "../../assets/mow.webp";

import { FaDiscord, FaReddit, FaTelegram } from "react-icons/fa";

import Aos from "aos";
import "aos/dist/aos.css";

import {
  faTv,
  faGamepad,
  faUsers,
  faKey,
} from "@fortawesome/free-solid-svg-icons";

import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

function Login({ isVisible, onClose, onLoginSuccess }) {
  const navigate = useNavigate();

  const handleDiscordLogin = () => {
    const discordAuthUrl = `https://discord.com/api/oauth2/authorize?client_id=1236732850821267456&redirect_uri=http://localhost:3000/auth/discord/callback&response_type=code&scope=identify`;
    window.location.href = discordAuthUrl;
  };

  const [scrolled, setScrolled] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  React.useEffect(() => {
    window.google.accounts.id.initialize({
      client_id:
        "114638637552-do012jlib3toflmb720l6auec0g5el31.apps.googleusercontent.com",
      callback: handleCredentialResponse,
    });
  }, []);

  // Function to handle the response when a user signs in with Google
  const handleCredentialResponse = (response) => {
    console.log("ID: " + response.credential);
    toast.success("Logged in with Google");

    // Decode the JWT token
    var credentialResponseDecoded = jwtDecode(response.credential);
    console.log(credentialResponseDecoded);

    // Extract necessary information
    const { name, email, picture } = credentialResponseDecoded;

    // Set the username as the name
    const username = name;

    // Call the function to make a POST request to the backend
    postGoogleLoginData(username, name, email, picture);
  };

  // Function to make a POST request to the backend with Google login data
  const postGoogleLoginData = async (username, name, email, picture) => {
    console.log(username + name + email + picture);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/login/google`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, name, email, picture }),
        }
      );

      if (!response.ok) {
        const data = await response.json();
        toast.error(data.Message || "An error occurred while logging in.");
        return;
      }

      const data = await response.json();
      onLoginSuccess(data);
      console.log(data.token);
      console.log(data.user.userId);
      const roleKey = getRoleKey(data.user.role);
      console.log(roleKey);
      localStorage.setItem(roleKey, data.token);
      localStorage.setItem("userId", data.user.userId);

      // Navigate based on user role
      navigateBasedOnRole(data.user.role, data.user.userId);

      toast.success("User Logged in successfully");
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred while logging in.");
    }
  };

  // Function to get the role-specific key for local storage
  const getRoleKey = (role) => {
    switch (role) {
      case "Admin":
        return "adminToken";
      case "SubAdmin":
        return "subAdminToken";
      case "User":
      default:
        return "userToken";
    }
  };

  

  // Function to handle successful Google Sign-In
  const handleGoogleSignInSuccess = (credentialResponse) => {
    var credentialResponseDecoded = jwtDecode(credentialResponse.credential);
    console.log(credentialResponseDecoded);
  };

  // Function to handle Google Sign-In failure
  const handleGoogleSignInError = () => {
    console.log("Login Failed");
  };

  // useEffect(() => {

  //   window.google.accounts.id.initialize({
  //     client_id: `114638637552-do012jlib3toflmb720l6auec0g5el31.apps.googleusercontent.com`,
  //     callback: handleCredentialResponse,
  //   });
  // }, []);

  // const handleCredentialResponse = (response) => {
  //   console.log("ID: " + response.credential);
  //   toast.success("Logged in with Google");
  //   navigate("/");
  // };

  const handleGoogleSignInClick = () => {
    // Trigger Google Sign-In programmatically
    window.google.accounts.id.prompt();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    // Password length validation
    if (formData.password.length < 4) {
      toast.error("Password must be at least 8 characters long.");
      return;
    }

    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      console.log("hi");
      if (!response.ok) {
        const data = await response.json();
        data.errors.forEach((error) => {
          toast.error(`${error.param}: ${error.msg}`);
        });
        return;
      }

      const data = await response.json();
      onLoginSuccess(data);
      console.log(data);
      // Assuming the API returns a success message or user data on successful login
      console.log(data.user.userId);
      // Inside your Login component, after successful login
      const roleKey = getRoleKey(data.user.role);
      console.log(roleKey);
      localStorage.setItem(roleKey, data.token);
      localStorage.setItem("userId", data.user.userId);

     // Navigate based on user role
     navigateBasedOnRole(data.user.role, data.user.userId);

      toast.success("User Logged in successfully");
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred while logging in.");
    }
  };

  const navigateBasedOnRole = (role, userId) => {
    const roleKey = getRoleKey(role);
    const token = localStorage.getItem(roleKey);

    if (token && localStorage.getItem("userId") === userId) {
        switch (role) {
            case "Admin":
                console.log("Navigating to dashboard...");
                navigate("/Blogs");
                break;
            case "SubAdmin":
                console.log("Navigating to profile...");
                navigate("/Blogs");
                break;
            case "User":
            default:
                console.log("Navigating to homepage...");
                navigate("/Blogs");
        }
    } else {
        console.error("Role key or user ID mismatch.");
        toast.error("An error occurred with user authentication.");
    }
};


  return (
    <div style={{ position: "relative", minHeight: "100vh" }}>
      {isVisible && (
        <section className={style.Secone}>
          <div className={style.main}>
            <div className={style.left}>
              <div data-aos="fade-down" className={style.leftContainer}>
                <h3>Join the club</h3>
                <h6>We are a community of Otaku & Gamers</h6>

                <div className={style.lefttext}>
                  <div>
                    <div className={style.icon}>
                      <FontAwesomeIcon icon={faTv} />
                    </div>
                  </div>
                  <div style={{ textAlign: "justify" }}>
                    <h3>Entertainment</h3>
                    <h6>Anime, TV shows, movies, cosplay, we have it all.</h6>
                  </div>
                </div>

                <div className={style.lefttext}>
                  <div>
                    <div className={style.icon}>
                      <FontAwesomeIcon icon={faGamepad} />
                    </div>
                  </div>
                  <div style={{ textAlign: "justify" }}>
                    <h3>Video Games</h3>
                    <h6>
                      We cover your favorite games, and if we haven't, we'll
                      certainly do our best to!
                    </h6>
                  </div>
                </div>

                <div className={style.lefttext}>
                  <div>
                    <div className={style.icon}>
                      <FontAwesomeIcon icon={faUsers} />
                    </div>
                  </div>
                  <div style={{ textAlign: "justify" }}>
                    <h3>Community</h3>
                    <h6>
                      Here, we discuss, exchange, embrace all things anime &
                      gaming!
                    </h6>
                  </div>
                </div>
              </div>
            </div>

            <div className={style.right}>
              <button className={style.close} onClick={onClose}>
                X
              </button>
              <div className={style.rightContainer}>
                <img src={imgs} alt="" />
              </div>
              <h3>Welcome</h3>
              <h6>Dive into the worlds of Anime & Games.</h6>
              <div className={style.input}>
                <FontAwesomeIcon className={style.icons} icon={faUsers} />
                <input
                  required
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  type={"email"}
                  placeholder="Email"
                />
              </div>
              <div className={style.input}>
                <FontAwesomeIcon className={style.icons} icon={faKey} />
                <input
                  required
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  type="password"
                  placeholder="Password"
                />
              </div>
              <div className={style.bottom}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.2em",
                  }}
                >
                  <input
                    type="checkbox"
                    required
                    id="remember"
                    name="remember"
                  />
                  <label htmlFor="remember">Remember</label>
                </div>

                <a
                  onClick={(e) => {
                    e.preventDefault(); // Prevent the default action of the link
                    navigate("/password-reset"); // Navigate to the password reset page
                  }}
                >
                  Lost Password?
                </a>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginTop: "2rem",
                  gap: "1rem",
                }}
              >
                <button className={style.btn1} onClick={handleSubmit}>
                  Login into your Account
                </button>
                <button
                  className={style.btn2}
                  onClick={() => navigate("/register")}
                >
                  Create your Account
                </button>
              </div>

              <div style={{ marginTop: "2em" }}>
                <GoogleLogin
                  onSuccess={handleCredentialResponse}
                  onError={handleGoogleSignInError}
                />
              </div>

              <div className={style.logicon}>
                <FaDiscord
                  onClick={handleDiscordLogin}
                  className={style.loginicon}
                />
                <FaReddit className={`${style.loginicon} ${style.FaReddit}`} />
                <FaTelegram
                  className={`${style.loginicon} ${style.FaTelegram}`}
                />
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

export default Login;
