import React, { useState, useEffect, useContext } from "react";
import style from "./Blog.module.css";
import Sidebar from "Component/DashboardSidebar/DashboardSidebar";
import DataTable from "react-data-table-component";
import dayjs from "dayjs";
import { ImSearch } from "react-icons/im";
import { toast, ToastContainer } from "react-toastify"; // Import toast
import "react-toastify/dist/ReactToastify.css"; // Import toast styles
import Modal from "react-modal"; // Import react-modal
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Select from "react-select";
import Swal from "sweetalert2";
import { ThemeContext } from "../../contexts/ThemeContext";

Modal.setAppElement("#root"); // Set the root element for the modal

function Blog() {
  const { theme } = useContext(ThemeContext);

  const [blogs, setBlogs] = useState([]); // State to store fetched blogs data
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [categories, setCategories] = useState({});
  const [subcategories, setSubcategories] = useState({});
  const [tags, setTags] = useState({});
  const [isLoading, setIsLoading] = useState(false); // State to indicate loading status
  const [error, setError] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [searchBy, setSearchBy] = useState(""); // Default to empty string

  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [currentBlog, setCurrentBlog] = useState(null);
  const [file, setFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  // const userId = localStorage.getItem("userId");

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

  const customStyles = {
    header: {
      style: {
        backgroundColor: theme === "dark" ? "#242424" : "#ffffff",
        color: theme === "dark" ? "#ffffff" : "#000000",
      },
    },
    headRow: {
      style: {
        backgroundColor: theme === "dark" ? "#242424" : "#ffffff",
      },
    },
    headCells: {
      style: {
        color: theme === "dark" ? "#ffffff" : "#000000",
      },
    },
    rows: {
      style: {
        backgroundColor: theme === "dark" ? "#242424" : "#ffffff",
        color: theme === "dark" ? "#ffffff" : "#000000",
        "&:not(:last-of-type)": {
          borderBottomColor: theme === "dark" ? "#3d3d3d" : "#ddd",
        },
      },
      highlightOnHoverStyle: {
        backgroundColor: theme === "dark" ? "#3d3d3d" : "#f0f0f0",
        color: theme === "dark" ? "#ffffff" : "#000000",
        transitionDuration: "0.15s",
        transitionProperty: "background-color",
        borderBottomColor: theme === "dark" ? "#3d3d3d" : "#ddd",
        outline: `1px solid ${theme === "dark" ? "#3d3d3d" : "#ddd"}`,
      },
    },
    pagination: {
      style: {
        backgroundColor: theme === "dark" ? "#242424" : "#ffffff",
        color: theme === "dark" ? "#ffffff" : "#000000",
      },
    },
    table: {
      style: {
        backgroundColor: theme === "dark" ? "#242424" : "#ffffff",
      },
    },
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // Fetch blogs data from the GET route
        const blogsResponse = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/api/blog`
        );
        const blogsData = await blogsResponse.json();

        console.log(blogsData);

        // Fetch all categories, subcategories, and tags
        const [categoriesResponse, subcategoriesResponse, tagsResponse] =
          await Promise.all([
            fetch(`${process.env.REACT_APP_BACKEND_URL}/api/categories`),
            fetch(`${process.env.REACT_APP_BACKEND_URL}/api/subcategories`),
            fetch(`${process.env.REACT_APP_BACKEND_URL}/api/tags`),
          ]);

        const [categoriesData, subcategoriesData, tagsData] = await Promise.all(
          [
            categoriesResponse.json(),
            subcategoriesResponse.json(),
            tagsResponse.json(),
          ]
        );

        // Transform arrays to objects for quick lookup
        const categoriesMap = categoriesData.reduce((acc, category) => {
          acc[category.categoryId] = category.categoryName;
          return acc;
        }, {});

        const subcategoriesMap = subcategoriesData.reduce(
          (acc, subcategory) => {
            acc[subcategory.subcategoryId] = subcategory.subcategoryName;
            return acc;
          },
          {}
        );

        const tagsMap = tagsData.reduce((acc, tag) => {
          acc[tag.tagId] = tag.tagName;
          return acc;
        }, {});

        setCategories(categoriesMap);
        setSubcategories(subcategoriesMap);
        setTags(tagsMap);

        // Enrich blogs with category, subcategory, and tag names
        const enrichedBlogs = blogsData.map((blog, index) => ({
          ...blog,
          rowNumber: index + 1, // Assign a row number starting from 1
          categoryName: categoriesMap[blog.categoryId] || "Unknown",
          subcategoryName: subcategoriesMap[blog.subcategoryId] || "Unknown",
          tagNames: blog.tagIds.map((tagId) => tagsMap[tagId] || "Unknown"),
        }));

        setBlogs(enrichedBlogs);
        setFilteredBlogs(enrichedBlogs); // Initialize filteredBlogs with the same data
      } catch (error) {
        setError(error.message || "Failed to fetch data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (searchBy) {
      const filtered = blogs.filter((blog) => {
        let searchField = "";
        if (searchBy === "tagNames") {
          searchField = blog[searchBy].join(", ").toLowerCase();
        } else {
          searchField = (blog[searchBy] || "").toLowerCase();
        }
        return searchField.includes(searchText.toLowerCase());
      });
      setFilteredBlogs(filtered);
    } else {
      setFilteredBlogs(blogs);
    }
  }, [searchText, searchBy, blogs]);

  const handleSearchByChange = (criteria) => {
    setSearchBy(criteria);
  };

  const handleDelete = async (blogId) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/blog/editblog/${blogId}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        setBlogs((prevBlogs) =>
          prevBlogs.filter((blog) => blog.blogId !== blogId)
        );
        setFilteredBlogs((prevFilteredBlogs) =>
          prevFilteredBlogs.filter((blog) => blog.blogId !== blogId)
        );
        toast.success("Blog deleted successfully!");
      } else {
        throw new Error("Failed to delete blog");
      }
    } catch (error) {
      setError(error.message || "Failed to delete blog");
      toast.error("Failed to delete blog");
    }
  };

  const handleEditClick = (blog) => {
    setCurrentBlog(blog);
    setFile(null);
    setFilePreview(null);
    setEditModalIsOpen(true);
  };

  const handleEditSave = async () => {
    try {
      let updatedBlog = { ...currentBlog };

      if (file) {
        const formData = new FormData();
        formData.append("file", file);

        const uploadResponse = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/uploadmedia`,
          {
            method: "POST",
            body: formData,
          }
        );

        if (uploadResponse.ok) {
          const uploadData = await uploadResponse.json();
          updatedBlog.mediaUrl = uploadData.url;
          console.log(uploadData.url);
        } else {
          throw new Error("Failed to upload file");
        }
      }

      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/blog/editblog/${currentBlog.blogId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedBlog),
        }
      );

      if (response.ok) {
        const updatedBlogData = await response.json();
        setBlogs((prevBlogs) =>
          prevBlogs.map((blog) =>
            blog.blogId === updatedBlogData.blogId ? updatedBlogData : blog
          )
        );
        setFilteredBlogs((prevFilteredBlogs) =>
          prevFilteredBlogs.map((blog) =>
            blog.blogId === updatedBlogData.blogId ? updatedBlogData : blog
          )
        );
        toast.success("Blog updated successfully!");
        setEditModalIsOpen(false);
      } else {
        throw new Error("Failed to update blog");
      }
    } catch (error) {
      setError(error.message || "Failed to update blog");
      toast.error("Failed to update blog");
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setFilePreview(URL.createObjectURL(selectedFile));
  };

  const handlePublishStatusChange = async (blogId, newStatus) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: `Do you want to change the status to ${
        newStatus ? "Publish" : "Draft"
      }?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, change it!",
      cancelButtonText: "No, cancel!",
    });

    if (result.isConfirmed) {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/api/blog/${blogId}/publish`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ publish: newStatus }),
          }
        );

        if (response.ok) {
          const updatedBlog = await response.json();

          if (updatedBlog) {
            setBlogs((prevBlogs) =>
              prevBlogs.map((blog) =>
                blog.blogId === updatedBlog.blogId ? updatedBlog : blog
              )
            );
            setFilteredBlogs((prevFilteredBlogs) =>
              prevFilteredBlogs.map((blog) =>
                blog.blogId === updatedBlog.blogId ? updatedBlog : blog
              )
            );
            toast.success("Blog status updated successfully!");
          } else {
            throw new Error("Failed to update blog status");
          }
        } else {
          throw new Error("Failed to update blog status");
        }
      } catch (error) {
        setError(error.message || "Failed to update blog status");
        toast.error("Failed to update blog status");
      }
    }
  };

  const columns = [
    {
      name: "#",
      selector: (row) => row.rowNumber, // Use rowNumber for unique identification
      sortable: false, // Row number should not be sortable
      width: "60px",
      center: true,
    },
    {
      name: "Title",
      selector: (row) => row.title,
      sortable: true,
      width: "250px",
    },
    {
      name: "Image",
      selector: (row) => row.mediaUrl,
      sortable: false,
      width: "150px",
      cell: (row) => (
        <img
          src={row.mediaUrl}
          alt={row.title}
          style={{
            width: "80px",
            height: "80px",
            objectFit: "cover",
          }}
        />
      ),
    },
    {
      name: "Slug",
      selector: (row) => row.slug,
      sortable: true,
      width: "250px",
    },
    {
      name: "Author",
      selector: (row) => row.authorName,
      sortable: true,
      width: "200px",
    },
    {
      name: "Category",
      selector: (row) => row.categoryName,
      sortable: true,
      width: "200px",
    },
    {
      name: "Subcategory",
      selector: (row) => row.subcategoryName,
      sortable: true,
      width: "200px",
    },
    {
      name: "Tags",
      selector: (row) => row.tagNames.join(", "),
      sortable: true,
      width: "200px",
      cell: (row) => (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "5px",
            maxHeight: "100px",
            overflowY: "auto",
          }}
        >
          {row.tagNames.map((tag) => (
            <div
              key={tag}
              style={{
                backgroundColor: "#3d3d3d",
                color: "#ffffff",
                padding: "2px 8px",
                borderRadius: "12px",
                fontSize: "12px",
              }}
            >
              {tag}
            </div>
          ))}
        </div>
      ),
    },
    {
      name: "Published At",
      selector: (row) => row.createdAt,
      sortable: true,
      // format: (row) => dayjs(row.createdAt).format("YYYY-MM-DD"),
      width: "250px",
    },
    {
      name: "Likes",
      selector: (row) => row.likes,
      sortable: true,
      width: "120px",
      // right: true,
    },
    {
      name: "Views",
      selector: (row) => row.views,
      sortable: true,
      width: "120px",
      // right: true,
    },
    {
      name: "Status",
      selector: (row) => row.publish,
      sortable: true,
      width: "150px",
      // right: true,
      cell: (row) => (
        <button
          onClick={() => handlePublishStatusChange(row.blogId, !row.publish)}
          style={{
            background: row.publish
              ? "linear-gradient(to right, #00b09b, #96c93d)"
              : "linear-gradient(to right, #ff7e5f, #feb47b)",
            color: "#ffffff",
            borderRadius: "5px",
            padding: "5px 10px",
          }}
        >
          {row.publish ? "Publish" : "Draft"}
        </button>
      ),
    },
    {
      name: "Actions",
      cell: (row) => (
        <div style={{ display: "flex", gap: "10px" }}>
          <button
            onClick={() => handleEditClick(row)}
            style={{
              backgroundColor: "#3d3d3d",
              color: "#ffffff",
              borderRadius: "5px",
              padding: "5px 10px",
            }}
          >
            Edit
          </button>
          <button
            onClick={() => handleDelete(row.blogId)}
            style={{
              backgroundColor: "#ff3d3d",
              color: "#ffffff",
              borderRadius: "5px",
              padding: "5px 10px",
            }}
          >
            Delete
          </button>
        </div>
      ),
      width: "150px",
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  return (
    <div>
      <div className={`${style.div} ${theme === "dark" ? style.dark : ""}`}>
        <Sidebar />
      </div>

      <div className={`${style.Blog} ${theme === "dark" ? style.dark : ""}`}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "20px",
          }}
        >
          <div
            className={`${style.Searching} ${
              theme === "dark" ? style.dark : ""
            }`}
          >
            <ImSearch
              className={`${style.search} ${
                theme === "dark" ? style.dark : ""
              }`}
            />
            <input
              type="text"
              className={`${style.searchInput} ${
                theme === "dark" ? style.dark : ""
              }`}
              placeholder="Search..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
            <button
              className={`${style.searchbutton} ${
                searchBy === "title" ? style.active : ""
              } ${theme === "dark" ? style.dark : ""}`}
              onClick={() => handleSearchByChange("title")}
            >
              Title
            </button>
            <button
              className={`${style.searchbutton} ${
                searchBy === "authorName" ? style.active : ""
              } ${theme === "dark" ? style.dark : ""}`}
              onClick={() => handleSearchByChange("authorName")}
            >
              Author
            </button>
            <button
              className={`${style.searchbutton} ${
                searchBy === "tagNames" ? style.active : ""
              } ${theme === "dark" ? style.dark : ""}`}
              onClick={() => handleSearchByChange("tagNames")}
            >
              Tag
            </button>
            <button
              className={`${style.searchbutton} ${
                searchBy === "categoryName" ? style.active : ""
              } ${theme === "dark" ? style.dark : ""}`}
              onClick={() => handleSearchByChange("categoryName")}
            >
              Category
            </button>
          </div>
        </div>
        <DataTable
          columns={columns}
          data={filteredBlogs}
          progressPending={isLoading}
          customStyles={customStyles}
          pagination
          highlightOnHover
          pointerOnHover
        />
        {error && (
          <div
            style={{
              color: "red",
              textAlign: "center",
              marginTop: "20px",
            }}
          >
            {error}
          </div>
        )}
        <ToastContainer />

        <Modal
          isOpen={editModalIsOpen}
          onRequestClose={() => setEditModalIsOpen(false)}
          contentLabel="Edit Blog"
          style={{
            content: {
              top: "50%",
              left: "50%",
              right: "auto",
              bottom: "auto",
              width: "50%",
              maxHeight: "80vh", // Limit maximum height of modal content
              overflowY: "auto", // Enable vertical scrolling if content overflows
              marginRight: "-50%",
              transform: "translate(-50%, -50%)",
              backgroundColor: theme === "dark" ? "#242424" : "#ffffff",
              color: theme === "dark" ? "#ffffff" : "#000000",
              padding: "20px",
              borderRadius: "10px",
            },
          }}
        >
          {currentBlog && (
            <div>
              <h2>Edit Blog</h2>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleEditSave();
                }}
              >
                <div>
                  <label>Title</label>
                  <input
                    type="text"
                    value={currentBlog.title}
                    onChange={(e) =>
                      setCurrentBlog({ ...currentBlog, title: e.target.value })
                    }
                    style={{
                      width: "100%",
                      padding: "10px",
                      marginBottom: "10px",
                    }}
                  />
                </div>
                <div>
                  <label>Slug</label>
                  <input
                    type="text"
                    value={currentBlog.slug}
                    onChange={(e) =>
                      setCurrentBlog({ ...currentBlog, slug: e.target.value })
                    }
                    style={{
                      width: "100%",
                      padding: "10px",
                      marginBottom: "10px",
                    }}
                  />
                </div>
                <div style={{ maxHeight: "400px", overflowY: "auto" }}>
                  <label htmlFor="content">Content</label>
                  <ReactQuill
                    theme="snow"
                    value={currentBlog.content}
                    onChange={(value) =>
                      setCurrentBlog({ ...currentBlog, content: value })
                    }
                    modules={{ toolbar: toolbarOptions }}
                    style={{ height: "300px" }}
                    className="quill"
                    placeholder="Write your content here..."
                  />
                </div>

                <div>
                  <label>Author</label>
                  <input
                    type="text"
                    value={currentBlog.authorName}
                    onChange={(e) =>
                      setCurrentBlog({
                        ...currentBlog,
                        authorName: e.target.value,
                      })
                    }
                    style={{
                      width: "100%",
                      padding: "10px",
                      marginBottom: "10px",
                    }}
                  />
                </div>
                <div>
                  <label>Category</label>
                  <select
                    value={currentBlog.categoryId}
                    onChange={(e) =>
                      setCurrentBlog({
                        ...currentBlog,
                        categoryId: e.target.value,
                      })
                    }
                    style={{
                      width: "100%",
                      padding: "10px",
                      marginBottom: "10px",
                    }}
                  >
                    {Object.entries(categories).map(([id, name]) => (
                      <option key={id} value={id}>
                        {name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label>Tags</label>
                  <Select
                    isMulti
                    value={currentBlog.tagIds.map((tagId) => ({
                      value: tagId,
                      label: tags[tagId],
                    }))}
                    onChange={(selectedOptions) => {
                      const selectedTagIds = selectedOptions.map(
                        (option) => option.value
                      );
                      setCurrentBlog({
                        ...currentBlog,
                        tagIds: selectedTagIds,
                      });
                    }}
                    options={Object.entries(tags).map(([id, name]) => ({
                      value: id,
                      label: name,
                    }))}
                    styles={{
                      control: (base) => ({
                        ...base,
                        width: "100%",
                        padding: "10px",
                        marginBottom: "10px",
                        height: "auto",
                        borderColor: "#ccc", // Optional: Set border color for better visibility
                        borderRadius: "5px", // Optional: Rounded corners
                      }),
                      option: (base) => ({
                        ...base,
                        color: "black", // Set the text color of options to black
                        fontSize: "14px", // Increase font size for better readability
                        fontWeight: "500", // Set font weight for clarity
                        padding: "10px", // Increase padding for better spacing
                        backgroundColor: "#fff", // Set background color for better contrast
                        cursor: "pointer", // Change cursor to pointer for better UX
                        "&:hover": {
                          backgroundColor: "#f0f0f0", // Change background color on hover
                        },
                      }),
                      multiValue: (base) => ({
                        ...base,
                        backgroundColor: "#007bff", // Set background color for selected tags
                        color: "white", // Set text color for selected tags
                        borderRadius: "5px", // Optional: Rounded corners
                      }),
                      multiValueLabel: (base) => ({
                        ...base,
                        color: "white", // Set text color for labels in selected values
                      }),
                      menu: (base) => ({
                        ...base,
                        maxHeight: "300px", // Set the maximum height of the dropdown menu
                        overflowY: "auto", // Make the dropdown menu scrollable
                        // Ensure the dropdown menu appears above other elements
                        borderRadius: "5px", // Optional: Rounded corners
                        boxShadow: "0 2px 10px rgba(0,0,0,0.1)", // Optional: Add shadow for better visibility
                      }),
                    }}
                  />
                </div>
                <div>
                  <label>Subcategory</label>
                  <select
                    value={currentBlog.subcategoryId}
                    onChange={(e) =>
                      setCurrentBlog({
                        ...currentBlog,
                        subcategoryId: e.target.value,
                      })
                    }
                    style={{
                      width: "100%",
                      padding: "10px",
                      marginBottom: "10px",
                    }}
                  >
                    {Object.entries(subcategories).map(([id, name]) => (
                      <option key={id} value={id}>
                        {name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label>Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    style={{
                      width: "100%",
                      padding: "10px",
                      marginBottom: "10px",
                    }}
                  />
                  {filePreview && (
                    <img
                      src={filePreview}
                      alt="Preview"
                      style={{
                        width: "50%",
                        maxHeight: "200px",
                        marginBottom: "10px",
                      }}
                    />
                  )}
                </div>
                <button
                  type="submit"
                  style={{
                    backgroundColor: "#3d3d3d",
                    color: "#ffffff",
                    padding: "10px 20px",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                >
                  Save
                </button>
                <button
                  style={{
                    backgroundColor: "#3d3d3d",
                    color: "#ffffff",
                    padding: "10px 20px",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                  onClick={() => setEditModalIsOpen(false)}
                >
                  Cancel
                </button>
              </form>
            </div>
          )}
        </Modal>
      </div>
    </div>
  );
}

export default Blog;
