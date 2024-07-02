import React, { useState } from "react";
import style from "./Admin.module.css";
import Sidebar from "Component/DashboardSidebar/DashboardSidebar";
import { ImSearch } from "react-icons/im";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import adminicon from "../../assets/admin-icon.png"; // Import the default image
import axios from "axios"; // Ensure axios is properly imported
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import eye icons

function Admin() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
    role: "Admin",
    bio: "", // Add bio field to the state
  });

  const [profilePictureFile, setProfilePictureFile] = useState(null);
  const [profilePicturePreview, setProfilePicturePreview] = useState(adminicon);
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "profilePicture" && files[0]) {
      setProfilePictureFile(files[0]);
      setProfilePicturePreview(URL.createObjectURL(files[0]));
      console.log("Profile picture updated:", files[0]);
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
      console.log(`Form data updated: ${name} = ${value}`);
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name) {
      newErrors.name = "Name is required";
      toast.error("Name is required");
    }
    if (!formData.email) {
      newErrors.email = "Email is required";
      toast.error("Email is required");
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        newErrors.email = "Invalid email format";
        toast.error("Invalid email format");
      }
    }
    if (!formData.username) {
      newErrors.username = "Username is required";
      toast.error("Username is required");
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
      toast.error("Password is required");
    } else if (formData.password.length < 4) {
      newErrors.password = "Password must be at least 4 characters";
      toast.error("Password must be at least 4 characters");
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("username", formData.username);
    formDataToSend.append("password", formData.password);
    formDataToSend.append("role", formData.role);
    formDataToSend.append("bio", formData.bio); // Append bio to formData

    if (profilePictureFile) {
      formDataToSend.append("profilePicture", profilePictureFile);
      console.log(formDataToSend);
    } else {
      // Append the default admin icon image
      const response = await fetch(adminicon);
      const blob = await response.blob();
      formDataToSend.append("profilePicture", blob, "adminicon.jpg");
      console.log(formDataToSend);
    }

    try {
        console.log(formDataToSend);
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/register`,
        formDataToSend
      );
      toast.success("User added successfully");
      console.log("Success:", response.data);
      setFormData({
        name: "",
        email: "",
        username: "",
        password: "",
        role: "Admin",
        bio: "", // Reset bio field
      });
      setProfilePictureFile(null);
      setProfilePicturePreview(adminicon);
    } catch (error) {
      toast.error("Error adding user");
      console.error("Error:", error);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <div>
      <div className={style.div}>
        <Sidebar />
      </div>

      <div className={style.Blog}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div className={style.Searching}>
            <ImSearch className={style.search} />
            <input
              type="text"
              className="search-input"
              placeholder="Search..."
            />
            
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "20px",
          }}
        >
          <form className={style.form} onSubmit={handleSubmit}>
            <div className={style.imagePreview}>
              <img
                src={profilePicturePreview}
                alt="Profile Preview"
                className={style.profilePicture}
              />
            </div>
            <div className={style.formGroup}>
              <label htmlFor="profilePicture">Profile Picture</label>
              <input
                type="file"
                id="profilePicture"
                name="profilePicture"
                onChange={handleChange}
              />
            </div>

            <div className={style.formGroup}>
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
              />
            </div>
            <div className={style.formGroup}>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
              />
            </div>
            <div className={style.formGroup}>
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Enter your username"
              />
            </div>
            <div className={style.formGroup}>
              <label htmlFor="password">Password</label>
              <div className={style.passwordContainer}>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className={style.eyeButton}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>
            <div className={style.formGroup}>
              <label htmlFor="role">Role</label>
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
              >
                <option value="Admin">Admin</option>
                <option value="SubAdmin">SubAdmin</option>
              </select>
            </div>
            <div className={style.formGroup}>
              <label htmlFor="bio">Bio</label>
              <textarea
                id="bio"
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                placeholder="Enter your bio"
              />
            </div>

            <button type="submit" className={style.submitButton}>
              Submit
            </button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Admin;
