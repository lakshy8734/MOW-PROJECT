import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import style from "./PasswordReset.module.css"; // Import the CSS module

function PasswordReset() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false); // State to manage loading
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Start loading
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/reset-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      // Check if the response is ok (status in the range 200-299)
      if (!response.ok) {
        let errorMessage = "An error occurred while resetting the password.";
        try {
          // Attempt to parse the response body as JSON
          const data = await response.json();
          // If the response contains a specific error message, use it
          if (data && data.Message) {
            errorMessage = data.Message;
          }
        } catch (error) {
          // If parsing the response body fails, log the error and use the default message
          console.error("Error parsing response:", error);
        }
        toast.error(errorMessage);
        return;
      }

      toast.success("A new password has been sent to your email.");
      navigate("/"); // Redirect to login page after successful password reset
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred while resetting the password.");
    } finally {
      setIsLoading(false); // End loading
    }
  };

  return (
    <div className={style.container}>
      {" "}
      {/* Use the CSS module here */}
      <h2 className={style.h2}>Reset Password</h2>
      <div className={style.info}>
        Please enter your username or email address. You will receive an email
        message with instructions on how to reset your password.
      </div>
      <form onSubmit={handleSubmit}>
        <input
          className={style.input}
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button className={style.button}  type="submit" disabled={isLoading}>
          {isLoading ? "Processing..." : "Get New Password"}
        </button>
      </form>
      <div className={style.options}>
        <span
          onClick={() => {
            navigate("/");
          }}
        >
          Log in{" "}
        </span>{" "}
        |{" "}
        <span
          onClick={() => {
            navigate("/register");
          }}
        >
          {" "}
          Register{" "}
        </span>
        <br />
        <span
          onClick={() => {
            navigate("/");
          }}
        >
          ← Go to My Otaku World{" "}
        </span>
      </div>
    </div>
  );
}

export default PasswordReset;
