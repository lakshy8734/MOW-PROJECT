// src/components/CategoryForm.js
import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./CategoryForm.module.css";
import ReactPlayer from "react-player";

const CategoryForm = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [slug, setSlug] = useState("");
  const [errors, setErrors] = useState({});

  const validate = () => {
    let isValid = true;
    let tempErrors = {};
  
    if (!name) {
      tempErrors.name = "Category name is required.";
      isValid = false;
    }
    if (!description) {
      tempErrors.description = "Description is required.";
      isValid = false;
    }
    if (!slug) {
      tempErrors.slug = "Slug is required.";
      isValid = false;
    }
  
    setErrors(tempErrors);
  
    if (!isValid) {
      Object.values(tempErrors).forEach((error) => {
        toast.error(error);
      });
    }
  
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;

    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/categories`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, description, slug }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        if (errorData.errors) {
          Object.values(errorData.errors).forEach((error) => {
            toast.error(error.msg);
          });
        } else {
          throw new Error(errorData.message || "Failed to create category");
        }
      } else {
        toast.success("Category created successfully");
        setName("");
        setDescription("");
        setSlug("");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className={`${styles.formContainer} ${styles.shadow}`}>
      <ReactPlayer
        url="https://youtu.be/CY5WLrSYPzo?si=xzDWNHIwZuDXv5Xs"
        playing
        loop
        muted
        width="100%"
        height="100%"
        style={{ position: "fixed", top: 0, left: 0, zIndex: -1 }}
      />
      <form onSubmit={handleSubmit} className={styles.form}>
      <h2 className={styles.heading}>Create your new category</h2>
        <div className={styles.inputGroup}>
          <label htmlFor="name">Category Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {errors.name && <span className={styles.error}>{errors.name}</span>}
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
          {errors.description && (
            <span className={styles.error}>{errors.description}</span>
          )}
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="slug">Slug</label>
          <input
            type="text"
            id="slug"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
          />
          {errors.slug && <span className={styles.error}>{errors.slug}</span>}
        </div>
        <button type="submit" className={styles.submitButton}>Submit</button>
      </form>
    </div>
  );
};

export default CategoryForm;
