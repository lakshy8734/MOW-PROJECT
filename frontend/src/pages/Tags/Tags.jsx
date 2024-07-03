import React, { useState, useEffect, useContext } from "react";
import style from "./Tags.module.css";
import Sidebar from "Component/DashboardSidebar/DashboardSidebar";
import DataTable from "react-data-table-component";
import dayjs from "dayjs";
import { ImSearch } from "react-icons/im";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Modal from "react-modal";
import { ThemeContext } from "../../contexts/ThemeContext";

Modal.setAppElement("#root");

function Tags() {
  const { theme } = useContext(ThemeContext);

  const [tags, setTags] = useState([]);
  const [filteredTags, setFilteredTags] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [currentTag, setCurrentTag] = useState({
    tagName: "",
    slug: "",
    description: "",
    tagId: "",
  });

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
    const fetchTags = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/api/tags`
        );
        const data = await response.json();
        setTags(data);
        setFilteredTags(data); // Initialize filtered tags with all tags
      } catch (error) {
        setError(error.message || "Failed to fetch tags");
      } finally {
        setIsLoading(false);
      }
    };

    fetchTags();
  }, []);

  useEffect(() => {
    // Filter tags based on search text
    const filtered = tags.filter((tag) =>
      tag.tagName.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredTags(filtered);
  }, [searchText, tags]);

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  const handleDelete = async (tagId) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/tags/${tagId}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        setTags((prevTags) => prevTags.filter((tag) => tag.tagId !== tagId));
        setFilteredTags((prevFilteredTags) =>
          prevFilteredTags.filter((tag) => tag.tagId !== tagId)
        );
        toast.success("Tag deleted successfully!");
      } else {
        throw new Error("Failed to delete tag");
      }
    } catch (error) {
      setError(error.message || "Failed to delete tag");
      toast.error("Failed to delete tag");
    }
  };

  const handleEditClick = (tag) => {
    setCurrentTag(tag);
    setEditModalIsOpen(true);
  };

  const handleEditSave = async () => {
    if (!currentTag.tagName) {
      toast.error("Tag Name is required");
      return;
    }
    if (!currentTag.slug) {
      toast.error("Slug is required");
      return;
    }
    if (!currentTag.description) {
      toast.error("Description is required");
      return;
    }

    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/tags/edittag/${currentTag.tagId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            tagName: currentTag.tagName,
            description: currentTag.description,
            slug: currentTag.slug,
          }),
        }
      );

      if (response.ok) {
        const updatedTagData = await response.json();
        setTags((prevTags) =>
          prevTags.map((tag) =>
            tag.tagId === updatedTagData.tagId ? updatedTagData : tag
          )
        );
        setFilteredTags((prevFilteredTags) =>
          prevFilteredTags.map((tag) =>
            tag.tagId === updatedTagData.tagId ? updatedTagData : tag
          )
        );
        toast.success("Tag updated successfully!");
        setEditModalIsOpen(false);
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to update tag");
      }
    } catch (error) {
      setError(error.message || "Failed to update tag");
      toast.error(error.message || "Failed to update tag");
    }
  };

  const columns = [
    {
      name: "#",
      selector: (row, index) => index + 1,
      sortable: false,
      width: "60px",
      center: true,
    },
    {
      name: "Tag Name",
      selector: (row) => row.tagName,
      sortable: true,
      width: "300px",
    },
    {
      name: "Slug",
      selector: (row) => row.slug,
      sortable: true,
      width: "200px",
    },
    {
      name: "Description",
      selector: (row) => row.description,
      sortable: true,
      width: "300px",
    },
    {
      name: "Created Date",
      selector: (row) => {
        const createdAtParts = row.createdAt.split(" ");
        return createdAtParts[0];
      },
      sortable: true,
      width: "150px",
    },
    {
      name: "Created Time",
      selector: (row) => {
        const createdAtParts = row.createdAt.split(" ");
        return createdAtParts[1];
      },
      sortable: true,
      width: "150px",
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
            onClick={() => handleDelete(row.tagId)}
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
              placeholder="Search tag..."
              value={searchText}
              onChange={handleSearch}
            />
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div className={style.chart}>
            <DataTable
              columns={columns}
              data={filteredTags}
              progressPending={isLoading}
              highlightOnHover
              striped
              customStyles={customStyles}
              pagination
            />
          </div>
        </div>

        {error && (
          <div style={{ color: "red", textAlign: "center", marginTop: "20px" }}>
            {error}
          </div>
        )}

        <ToastContainer />

        <Modal
          isOpen={editModalIsOpen}
          onRequestClose={() => setEditModalIsOpen(false)}
          contentLabel="Edit Tag"
          style={{
            content: {
              top: "50%",
              left: "50%",
              right: "auto",
              bottom: "auto",
              width: "50%",
              maxHeight: "80vh",
              overflowY: "auto",
              marginRight: "-50%",
              transform: "translate(-50%, -50%)",
              backgroundColor: theme === "dark" ? "#242424" : "#ffffff",
              color: theme === "dark" ? "#ffffff" : "#000000",
              padding: "20px",
              borderRadius: "10px",
            },
          }}
        >
          {currentTag && (
            <div>
              <h2>Edit Tag</h2>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleEditSave();
                }}
              >
                <div style={{ marginBottom: "10px" }}>
                  <label>Tag Name:</label>
                  <input
                    type="text"
                    value={currentTag.tagName}
                    onChange={(e) =>
                      setCurrentTag({ ...currentTag, tagName: e.target.value })
                    }
                    required
                    style={{ width: "100%", padding: "8px" }}
                  />
                </div>
                <div style={{ marginBottom: "10px" }}>
                  <label>Slug:</label>
                  <input
                    type="text"
                    value={currentTag.slug}
                    onChange={(e) =>
                      setCurrentTag({ ...currentTag, slug: e.target.value })
                    }
                    required
                    style={{ width: "100%", padding: "8px" }}
                  />
                </div>
                <div style={{ marginBottom: "10px" }}>
                  <label>Description:</label>
                  <input
                    type="text"
                    value={currentTag.description}
                    onChange={(e) =>
                      setCurrentTag({
                        ...currentTag,
                        description: e.target.value,
                      })
                    }
                    required
                    style={{ width: "100%", padding: "8px" }}
                  />
                </div>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <button
                    type="button"
                    onClick={() => setEditModalIsOpen(false)}
                    style={{
                      backgroundColor: "#ff3d3d",
                      color: "#ffffff",
                      padding: "10px 20px",
                      borderRadius: "5px",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    style={{
                      backgroundColor: "#3d3d3d",
                      color: "#ffffff",
                      padding: "10px 20px",
                      borderRadius: "5px",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          )}
        </Modal>
      </div>
    </div>
  );
}

export default Tags;
