import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./SubcategoryForm.module.css";
import ReactPlayer from "react-player";

const SubcategoryForm = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [slug, setSlug] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null); // State to store the selected category
  const [errors, setErrors] = useState({});
  const [categories, setCategories] = useState([]); // State to store the list of categories

  useEffect(() => {
    // Fetch categories when the component mounts
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/categories`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch categories");
      }
      const data = await response.json();
      console.log(data);
      setCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
      toast.error("Failed to fetch categories");
    }
  };

  const handleCategoryChange = (event) => {
    const selectedCategoryId = event.target.value;
    const selectedCategory = categories.find(
      (category) => category.categoryId === selectedCategoryId
    );
    setSelectedCategory(selectedCategory); // Set the entire selected category object
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedCategory) {
      toast.error("Please select a category");
      return;
    }

    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/subcategories`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name,
            description,
            slug,
            categoryId: selectedCategory._id, // Pass the selected category ID
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.error);
        console.log(errorData);
        if (errorData.error) {
          Object.values(errorData.error).forEach((error) => {
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
        setSelectedCategory(null); // Reset selected category after successful submission
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className={`${styles.formContainer} ${styles.shadow}`}>
      <ReactPlayer
        url="https://youtu.be/q1bQ2LOUh6s?si=2kxmQlDSaqevtv72"
        playing
        loop
        muted
        width="100%"
        height="100%"
        style={{ position: "fixed", top: 0, left: 0, zIndex: -1 }}
      />
      <form onSubmit={handleSubmit} className={styles.form}>
        <h2 className={styles.heading}>Create your new Sub Category</h2>

        <div className={`${styles.inputGroup} ${styles.selectContainer}`}>
          <label htmlFor="category">Category</label>
          <select id="category" onChange={handleCategoryChange}>
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category.categoryId} value={category.categoryId}>
                {category.categoryName}
              </option>
            ))}
          </select>
        </div>
        {selectedCategory && (
          <div className={styles.selectedCategory}>
            Selected Category: {selectedCategory.categoryName}
          </div>
        )}
        <br/>
        <div className={styles.inputGroup}>
          <label htmlFor="name">Subcategory Name</label>
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
        <button type="submit" className={styles.submitButton}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default SubcategoryForm;
