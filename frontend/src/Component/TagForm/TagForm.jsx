import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./TagForm.module.css";
import ReactPlayer from "react-player";

const TagForm = () => {
  // State variables for tag functionality
  const [tagName, setTagName] = useState("");
  const [tagDescription, setTagDescription] = useState("");
  const [tagSlug, setTagSlug] = useState(""); // Add state for slug field
  const [errors, setErrors] = useState({});

  // Function to handle tag submission
  const handleSubmitTag = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/tags`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            tagName,
            description: tagDescription,
            slug: tagSlug, // Include slug in the request body
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        if (errorData.error) {
          toast.error(errorData.error); // Display the error message directly
        } else {
          // If there's no specific error message, iterate through the array of errors
          Object.values(errorData.errors).forEach((error) => {
            toast.error(error.msg); // Display each error message
          });
        }
      } else {
        toast.success("Tag created successfully");
        setTagName("");
        setTagDescription("");
        setTagSlug("");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className={`${styles.formContainer} ${styles.shadow}`}>
      <ReactPlayer
        url="https://youtu.be/eacDqj2C-IA?si=UmEIhA-K3eDpySMU"
        playing
        loop
        muted
        width="100%"
        height="100%"
        style={{ position: "fixed", top: 0, left: 0, zIndex: -1 }}
      />
      <form onSubmit={handleSubmitTag} className={styles.form}>
        <h2 className={styles.heading}>Create your new Tag</h2>

        <div className={styles.inputGroup}>
          <label htmlFor="tagName">Tag Name</label>
          <input
            type="text"
            id="tagName"
            value={tagName}
            onChange={(e) => setTagName(e.target.value)}
          />
          {errors.tagName && (
            <span className={styles.error}>{errors.tagName}</span>
          )}
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="tagDescription">Description</label>
          <textarea
            id="tagDescription"
            value={tagDescription}
            onChange={(e) => setTagDescription(e.target.value)}
          ></textarea>
          {errors.description && (
            <span className={styles.error}>{errors.description}</span>
          )}
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="tagSlug">Slug</label> {/* Add input field for slug */}
          <input
            type="text"
            id="tagSlug"
            value={tagSlug}
            onChange={(e) => setTagSlug(e.target.value)}
          />
          {errors.slug && <span className={styles.error}>{errors.slug}</span>}
        </div>
        <button type="submit" className={styles.submitButton}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default TagForm;
