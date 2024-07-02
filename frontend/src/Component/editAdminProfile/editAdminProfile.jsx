import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./editAdminProfile.module.css";
import { admin } from "../../assets/admin-icon.png";

const EditAdminProfile = ({ userDetails, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: userDetails.name || "",
    email: userDetails.email || "",
    username: userDetails.username || "",
    password: "", // Set initial password field to empty
    profilePicture: userDetails.profilePicture || "",
  });

  const [file, setFile] = useState(null);
  const [errors, setErrors] = useState({});
  const userId = localStorage.getItem("userId");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFormData((prevData) => ({
        ...prevData,
        profilePicture: URL.createObjectURL(selectedFile),
      }));
    }
  };

  const validateForm = () => {
    const { name, email, username, password } = formData;
    const newErrors = {};

    if (!name) newErrors.name = "Name is required";
    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email is not valid";
    }
    if (!username) newErrors.username = "Username is required";
    if (password && password.length < 4) {
      newErrors.password = "Password must be at least 4 characters long";
    }
    if (!file && !userDetails.profilePicture) {
      newErrors.profilePicture = "Profile picture is required";
      toast.error("Profile picture is required");
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      Object.values(errors).forEach((error) => toast.error(error));
      return;
    }

    if (window.confirm("Are you sure you want to save changes?")) {
      try {
        const formDataToSend = new FormData();
        formDataToSend.append("name", formData.name);
        formDataToSend.append("email", formData.email);
        formDataToSend.append("username", formData.username);
        formDataToSend.append("password", formData.password);

        if (file) {
          formDataToSend.append("profilePicture", file);
        }

        const response = await axios.put(
          `${process.env.REACT_APP_BACKEND_URL}/api/user/${userId}`,
          formDataToSend,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        toast.success("Profile updated successfully!");
        onSave(response.data.user);
        onClose();
      } catch (error) {
        console.error("Error updating profile:", error);
        if (error.response) {
          const { data } = error.response;
          if (data && data.errors) {
            const newErrors = {};
            data.errors.forEach((err) => {
              newErrors[err.param] = err.msg;
              toast.error(err.msg);
            });
            setErrors(newErrors);
          } else {
            toast.error(
              "Error updating profile: " + (data.Message || error.message)
            );
          }
        } else {
          toast.error("Network error: " + error.message);
        }
      }
    }
  };

  const triggerFileInput = () => {
    document.getElementById("profilePicture").click();
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        {formData.profilePicture && (
          <img
            src={formData.profilePicture}
            alt="Profile"
            className={styles.profilePicture}
            onClick={triggerFileInput}
          />
        )}
        <input
          type="file"
          id="profilePicture"
          name="profilePicture"
          accept="image/*"
          onChange={handleFileChange}
          style={{ display: "none" }}
        />
        <h2 className={styles.title}>Edit Profile</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            {errors.name && <span className={styles.error}>{errors.name}</span>}
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            {errors.email && (
              <span className={styles.error}>{errors.email}</span>
            )}
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
            {errors.username && (
              <span className={styles.error}>{errors.username}</span>
            )}
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && (
              <span className={styles.error}>{errors.password}</span>
            )}
          </div>
          <div className={styles.formActions}>
            <button type="submit">Save</button>
            <button type="button" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default EditAdminProfile;
