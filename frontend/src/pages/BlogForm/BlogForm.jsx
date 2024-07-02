import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./BlogForm.module.css";
import ReactPlayer from "react-player";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import CategoryForm from "Component/CategoryForm/CategoryForm";
import SubcategoryForm from "Component/SubcategoryForm/SubcategoryForm";
import TagForm from "Component/TagForm/TagForm";
import Loader from "pages/Loader/Loader";
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

const BlogForm = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState(null);
  const [authorName, setAuthorName] = useState("");
  const [slug, setSlug] = useState("");
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubcategory, setSelectedSubcategory] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [imagePreview, setImagePreview] = useState(null);
  const [activeForm, setActiveForm] = useState("blog");
  const [loading, setLoading] = useState(false);
  const userId = localStorage.getItem("userId");

  const toolbarOptions = [
    ["bold", "italic", "underline", "strike"],
    ["blockquote", "code-block"],
    ["link", "image", "video", "formula"],

    [{ header: 1 }, { header: 2 }],
    [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
    [{ script: "sub" }, { script: "super" }],
    [{ indent: "-1" }, { indent: "+1" }],
    [{ direction: "rtl" }],

    [{ size: ["small", false, "large", "huge"] }],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],

    [{ color: [] }, { background: [] }],
    [{ font: [] }],
    [{ align: [] }],

    ["clean"],
  ];

  useEffect(() => {
    fetchCategories();
    fetchSubcategories();
    fetchTags();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/categories`
      );
      if (!response.ok) throw new Error("Failed to fetch categories");
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
      toast.error("Failed to fetch categories");
    }
  };

  const fetchSubcategories = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/subcategories`
      );
      if (!response.ok) throw new Error("Failed to fetch subcategories");
      const data = await response.json();
      setSubcategories(data);
    } catch (error) {
      console.error("Error fetching subcategories:", error);
      toast.error("Failed to fetch subcategories");
    }
  };

  const fetchTags = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/tags`
      );
      if (!response.ok) throw new Error("Failed to fetch tags");
      const data = await response.json();
      setTags(data);
    } catch (error) {
      console.error("Error fetching tags:", error);
      toast.error("Failed to fetch tags");
    }
  };

  const handleCategoryChange = (event) => {
    const selectedCategoryId = event.target.value;
    const selectedCategory = categories.find(
      (category) => category.categoryId === selectedCategoryId
    );
    setSelectedCategory(selectedCategory);
  };

  const handleSubcategoryChange = (event) => {
    const selectedSubCategoryId = event.target.value;
    const selectedSubCategory = subcategories.find(
      (subcategory) => subcategory.subcategoryId === selectedSubCategoryId
    );
    setSelectedSubcategory(selectedSubCategory);
  };

  const handleTagChange = (event) => {
    const selectedTagId = event.target.value;
    const selectedTag = tags.find((tag) => tag.tagId === selectedTagId);
    if (selectedTag && !selectedTags.includes(selectedTag)) {
      setSelectedTags([...selectedTags, selectedTag]);
    }
  };

  const removeTag = (tagToRemove) => {
    setSelectedTags(selectedTags.filter((tag) => tag !== tagToRemove));
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setImagePreview(URL.createObjectURL(e.target.files[0]));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!userId) {
      const errorMsg = "Login Again";
      console.error(errorMsg);
      toast.error("Login Again");
      return;
    }

    if (!title.trim()) {
      const errorMsg = "Title is required";
      console.error(errorMsg);
      toast.error(errorMsg);
      return;
    }

    if (!content.trim()) {
      const errorMsg = "Content is required";
      console.error(errorMsg);
      toast.error(errorMsg);
      return;
    }

    if (!file) {
      const errorMsg = "File is required";
      console.error(errorMsg);
      toast.error(errorMsg);
      return;
    }

    if (!selectedCategory) {
      const errorMsg = "Please select a category";
      console.error(errorMsg);
      toast.error(errorMsg);
      return;
    }

    if (!selectedSubcategory) {
      const errorMsg = "Please select a subcategory";
      console.error(errorMsg);
      toast.error(errorMsg);
      return;
    }

    if (selectedTags.length === 0) {
      const errorMsg = "Please select at least one tag";
      console.error(errorMsg);
      toast.error(errorMsg);
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    console.log(file);

    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/uploadmedia`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to upload file: ${errorText}`);
      }

      const data = await response.json();
      const downloadURL = data.url;
      console.log("File uploaded successfully. URL:", downloadURL);

      const blogData = {
        title,
        content,
        mediaUrl: downloadURL,
        categoryId: selectedCategory.categoryId,
        subcategoryId: selectedSubcategory.subcategoryId,
        tagIds: selectedTags.map((tag) => tag.tagId),
        authorName,
        slug,
        userId,
      };

      console.log(blogData);

      const blogResponse = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/blog`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(blogData),
        }
      );

      if (!blogResponse.ok) {
        const errorText = await blogResponse.text();
        throw new Error(`Failed to create blog: ${errorText}`);
      }

      const returndata = await blogResponse.json();
      console.log(returndata);

      setTitle("");
      setContent("");
      setFile(null);
      setSelectedCategory("");
      setSelectedSubcategory("");
      setSelectedTags([]);
      setAuthorName("");
      setSlug("");

      toast.success("Blog created successfully!");
    } catch (error) {
      console.error("Error:", error);
      toast.error(`Error: ${error.message}`);
    } finally {
      setLoading(false); // Hide loader
    }
  };

  return (
    <div className={`${styles.formContainer} ${styles.shadow}`}>
      {loading && <Loader />}
      <ReactPlayer
        url="https://youtu.be/WsnlrU1uWH0?si=BR1MD8CltI8kqQR2"
        playing
        loop
        muted
        width="100%"
        height="100%"
        style={{ position: "fixed", top: 0, left: 0, zIndex: -1 }}
      />

      <div className={styles.mainn}>
        <div className={styles.buttonGroup}>
          <button
            onClick={() => setActiveForm("blog")}
            className={`${styles.switchButton} ${
              activeForm === "blog" ? styles.active : ""
            }`}
          >
            Blog Form
          </button>
          <button
            onClick={() => setActiveForm("category")}
            className={`${styles.switchButton} ${
              activeForm === "category" ? styles.active : ""
            }`}
          >
            Category Form
          </button>
          <button
            onClick={() => setActiveForm("subcategory")}
            className={`${styles.switchButton} ${
              activeForm === "subcategory" ? styles.active : ""
            }`}
          >
            Subcategory Form
          </button>
          <button
            onClick={() => setActiveForm("tag")}
            className={`${styles.switchButton} ${
              activeForm === "tag" ? styles.active : ""
            }`}
          >
            Tag Form
          </button>
        </div>

        {activeForm === "blog" && (
          <form onSubmit={handleSubmit} className={styles.form}>
            <h2 className={styles.heading}>Create a New Blog</h2>

            <div className={styles.inputGroup}>
              <label htmlFor="title">Title</label>
              <input
                type="text"
                id="title"
                placeholder="Enter title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="content">Content</label>
              <ReactQuill
                theme="snow"
                value={content}
                onChange={(value) => setContent(value)}
                modules={{ toolbar: toolbarOptions }}
                style={{ height: "300px", overflowY: "auto" }}
                className="quill"
                placeholder="Write your content here..."
              />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="file">File</label>
              <input
                type="file"
                id="file"
                onChange={handleFileChange}
                placeholder="Choose file"
              />
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className={styles.imagePreview}
                />
              )}
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="authorName">Author Name</label>
              <input
                type="text"
                id="authorName"
                placeholder="Enter author name"
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
              />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="slug">Slug</label>
              <input
                type="text"
                id="slug"
                placeholder="Enter slug"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
              />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="category">Category</label>
              <select
                id="category"
                value={selectedCategory.categoryId || ""}
                onChange={handleCategoryChange}
              >
                <option value="">Select a category</option>
                {categories.map((category) => (
                  <option key={category.categoryId} value={category.categoryId}>
                    {category.categoryName}
                  </option>
                ))}
              </select>
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="subcategory">Subcategory</label>
              <select
                id="subcategory"
                value={selectedSubcategory.subcategoryId || ""}
                onChange={handleSubcategoryChange}
              >
                <option value="">Select a subcategory</option>
                {subcategories.map((subcategory) => (
                  <option
                    key={subcategory.subcategoryId}
                    value={subcategory.subcategoryId}
                  >
                    {subcategory.subcategoryName}
                  </option>
                ))}
              </select>
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="tag">Tag</label>
              <select id="tag" value="" onChange={handleTagChange}>
                <option value="">Select a tag</option>
                {tags.map((tag) => (
                  <option key={tag.tagId} value={tag.tagId}>
                    {tag.tagName}
                  </option>
                ))}
              </select>
            </div>
            <div className={styles.selectedTags}>
              {selectedTags.map((tag) => (
                <div key={tag.tagId} className={styles.tagBox}>
                  {tag.tagName}
                  <button
                    type="button"
                    className={styles.removeTagButton}
                    onClick={() => removeTag(tag)}
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>
            <button type="submit" className={styles.submitButton}>
              Submit
            </button>
          </form>
        )}

        {activeForm === "category" && <CategoryForm />}
        {activeForm === "subcategory" && <SubcategoryForm />}
        {activeForm === "tag" && <TagForm />}
      </div>
    </div>
  );
};

export default BlogForm;
