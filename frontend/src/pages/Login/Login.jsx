import React from "react";
import { useState, useEffect } from "react";
import styles from "./Login.module.css";
import { useNavigate, NavLink } from "react-router-dom";
import anime from "../../assets/otako.webp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  faTv,
  faGamepad,
  faUsers,
  faKey,
} from "@fortawesome/free-solid-svg-icons";
import { GoogleLogin } from "@react-oauth/google";

function Login() {
  const navigate = useNavigate();

  const [scrolled, setScrolled] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Initialize Google Sign-In when the component mounts
    window.google.accounts.id.initialize({
      client_id: `114638637552-do012jlib3toflmb720l6auec0g5el31.apps.googleusercontent.com`,
      callback: handleCredentialResponse,
    });
  }, []);

  const handleCredentialResponse = (response) => {
    // Log the response to the console
    console.log("ID: " + response.credential);
    // Here, you would typically send the credential to your backend for verification
    // and then proceed with the login process.
    setIsVisible(false);
    toast.success("Logged in with Google");
    navigate("/"); // Navigate to the home page or dashboard after successful login
  };

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
        toast.error(data.Message || "An error occurred while logging in.");
        return;
      }

      const data = await response.json();
      // Assuming the API returns a success message or user data on successful login
      console.log(data);
      // Navigate to another page or show a success message
      navigate("/"); // Example: navigate to a dashboard page after successful login
      toast.success("User Logged in successfully");
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred while logging in.");
    }

    setIsVisible(false);
  };

  const showBox = () => {
    setIsVisible(true); // Step 3: Function to show 2Box
  };

  return (
    <div className={styles.container}>
      <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ""}`}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <img src={anime} alt="" width={"80px"} />
          <h1 style={{ color: "white", fontSize: "2rem" }}>My Otaku World</h1>
        </div>
        <div>
          <ul style={{ color: "white", display: "flex", gap: "1rem" }}>
            <li
              style={{ all: "unset", fontFamily: "cursive", cursor: "pointer" }}
              onClick={showBox}
            >
              Login
            </li>
            <li
              style={{ all: "unset", fontFamily: "cursive", cursor: "pointer" }}
              onClick={() => navigate("/")}
            >
              Register
            </li>
          </ul>
        </div>
      </nav>

      <div className={styles.videocontainer}>
        {/* <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/V_MX0HiIgRQ?autoplay=1&loop=1&controls=0&mute=1"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe> */}
        <video autoPlay loop muted className={styles.backgroundVideo}>
          <source src="/videoplayback.webm" type="video/webm" />
          Your browser does not support the video tag.
        </video>
      </div>
      {isVisible && (
        <div style={{ display: "flex" }} className="2Box">
          <div className={styles.RightContainer}>
            <div className={styles.heading}>
              <p
                style={{
                  fontSize: "1.8rem",
                  fontWeight: "600",
                  color: "white",
                  fontFamily: "cursive",
                }}
              >
                Join the club
              </p>
              <p
                style={{
                  fontWeight: "100",
                  color: "white",
                  lineHeight: "4rem",
                }}
              >
                We are a community of Otaku & Gamers
              </p>
            </div>

            <div className={styles.leftParaone}>
              <div className={styles.iconone}>
                <FontAwesomeIcon
                  icon={faTv}
                  style={{
                    color: "white",
                    fontSize: "1.4em",
                    border: "0.5px solid white",
                    padding: "15px",
                    borderRadius: "12px",
                  }}
                />

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "start",
                    gap: "1rem",
                    lineHeight: "0.8rem",
                  }}
                >
                  <p
                    style={{
                      color: "white",
                      fontWeight: "600",
                      fontFamily: "cursive",
                      fontSize: "1.2rem",
                    }}
                  >
                    Entertainment
                  </p>
                  <p style={{ color: "white", fontFamily: "cursive" }}>
                    Anime, TV shows, movies, cosplay,we{" "}
                  </p>
                  <p style={{ color: "white", fontFamily: "cursive" }}>
                    have it all.
                  </p>
                </div>
              </div>

              <div className={styles.icontwo}>
                <FontAwesomeIcon
                  icon={faGamepad}
                  style={{
                    color: "white",
                    fontSize: "1.4em",
                    border: "0.5px solid white",
                    padding: "15px",
                    borderRadius: "12px",
                  }}
                />

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "start",
                    gap: "1rem",
                    lineHeight: "0.8rem",
                  }}
                >
                  <p
                    style={{
                      color: "white",
                      fontWeight: "600",
                      fontFamily: "cursive",
                      fontSize: "1.2rem",
                    }}
                  >
                    Video Games
                  </p>
                  <p style={{ color: "white", fontFamily: "cursive" }}>
                    We cover your favorite games, and if
                  </p>
                  <p style={{ color: "white", fontFamily: "cursive" }}>
                    we haven't, we'll certainly do our best
                  </p>
                  <p style={{ color: "white", fontFamily: "cursive" }}>to!</p>
                </div>
              </div>

              <div className={styles.icontwo}>
                <FontAwesomeIcon
                  icon={faUsers}
                  style={{
                    color: "white",
                    fontSize: "1.4em",
                    border: "0.5px solid white",
                    padding: "15px",
                    borderRadius: "12px",
                    lineHeight: "0.8rem",
                  }}
                />

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "start",
                    gap: "1rem",
                  }}
                >
                  <p
                    style={{
                      color: "white",
                      fontWeight: "600",
                      fontFamily: "cursive",
                      fontSize: "1.2rem",
                    }}
                  >
                    community
                  </p>
                  <p style={{ color: "white", fontFamily: "cursive" }}>
                    Here, we discuss, exchange, embrace
                  </p>
                  <p style={{ color: "white", fontFamily: "cursive" }}>
                    all things anime & gaming!
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.LeftContainer}>
            <img src={anime} width={"180rem"} alt="Anime" />
            <div>
              <p className={styles.para}>Welcome</p>
              <p style={{ marginTop: "0.9rem", fontFamily: "cursive" }}>
                Dive into the worlds of Anime & Games.
              </p>
            </div>
            <div className={styles.input}>
              <div style={{ position: "relative" }}>
                <FontAwesomeIcon
                  style={{
                    position: "absolute",
                    zIndex: "1",
                    top: "4px",
                    left: "0px",
                    color: "grey",
                    background: "white",
                    borderRadius: "50px",
                    padding: "14px",
                  }}
                  icon={faUsers}
                />
                <input
                  style={{ width: "29vw", fontSize: "0.9rem", color: "gray" }}
                  required
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  type={"email"}
                  placeholder="Email"
                />
              </div>
              <div style={{ position: "relative" }}>
                <FontAwesomeIcon
                  style={{
                    position: "absolute",
                    zIndex: "1",
                    top: "4px",
                    left: "0px",  
                    color: "grey",
                    background: "white",
                    borderRadius: "50px",
                    padding: "14px",
                  }}
                  icon={faKey}
                />
                <input
                  style={{ width: "29vw", fontSize: "0.9rem", color: "gray" }}
                  required
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  type="password"
                  placeholder="Password"
                />
              </div>
            </div>
            <div className={styles.input2}>
              <div
                className={styles.check}
                style={{ display: "flex", alignItems: "center", gap: "5px" }}
              >
                <input
                  id="remember"
                  required
                  type="checkbox"
                  className={styles.checkbox}
                />
                <label htmlFor="remember">Remember</label>
              </div>
              <div>
                <a
                  className={styles.Pass}
                  href=""
                  onClick={(e) => {
                    e.preventDefault(); // Prevent the default action of the link
                    navigate("/password-reset"); // Navigate to the password reset page
                  }}
                >
                  Lost password?
                </a>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginTop: "2rem",
                gap: "1rem",
              }}
            >
              <button className={styles.btn1} onClick={handleSubmit}>
                Login into your Account
              </button>
              <button
                className={styles.btn2}
                onClick={() => navigate("/login")}
              >
                Create your Account
              </button>
            </div>
            <button className={styles.button} onClick={handleGoogleSignInClick}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="xMidYMid"
                viewBox="0 0 256 262"
              >
                <path
                  fill="#4285F4"
                  d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
                ></path>
                <path
                  fill="#34A853"
                  d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
                ></path>
                <path
                  fill="#FBBC05"
                  d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"
                ></path>
                <path
                  fill="#EB4335"
                  d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
                ></path>
              </svg>
              Continue with Google
            </button>
            <GoogleLogin
              onSuccess={(credentialResponse) => {
                console.log(credentialResponse);
              }}
              onError={() => {
                console.log("Login Failed");
              }}
            />
            ;
          </div>
        </div>
      )}
    </div>
  );
}

export default Login;
