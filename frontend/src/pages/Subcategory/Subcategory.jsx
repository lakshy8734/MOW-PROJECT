import React, { useState, useEffect, useContext } from "react";
import style from "./Subcategory.module.css";
import Sidebar from "Component/DashboardSidebar/DashboardSidebar";
import DataTable from "react-data-table-component";
import { ImSearch } from "react-icons/im";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Modal from "react-modal";
import { ThemeContext } from "../../contexts/ThemeContext";

Modal.setAppElement("#root");

function Subcategory() {
  const { theme } = useContext(ThemeContext);

  const [subcategories, setSubcategories] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filteredSubcategories, setFilteredSubcategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [currentSubcategory, setCurrentSubcategory] = useState({
    subcategoryName: "",
    categoryId: "",
    slug: "",
    description: "",
    subcategoryId: "",
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
        zIndex: 0,
      },
      highlightOnHoverStyle: {
        backgroundColor: theme === "dark" ? "#3d3d3d" : "#f0f0f0",
        color: theme === "dark" ? "#ffffff" : "#000000",
        transitionDuration: "0.15s",
        transitionProperty: "background-color",
        borderBottomColor: theme === "dark" ? "#3d3d3d" : "#ddd",
        outline: `1px solid ${theme === "dark" ? "#3d3d3d" : "#ddd"}`,
        zIndex: 0,
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
    const fetchSubcategories = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/api/subcategories`
        );
        const data = await response.json();
        setSubcategories(data);
        setFilteredSubcategories(data);
      } catch (error) {
        setError(error.message || "Failed to fetch subcategories");
      } finally {
        setIsLoading(false);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/api/categories`
        );
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        setError(error.message || "Failed to fetch categories");
      }
    };

    fetchSubcategories();
    fetchCategories();
  }, []);

  useEffect(() => {
    const filtered = subcategories.filter((subcategory) =>
      subcategory.subcategoryName
        .toLowerCase()
        .includes(searchText.toLowerCase())
    );
    setFilteredSubcategories(filtered);
  }, [searchText, subcategories]);

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  const handleDelete = async (subcategoryId) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/subcategories/editcategory/${subcategoryId}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        setSubcategories((prevSubcategories) =>
          prevSubcategories.filter(
            (subcategory) => subcategory.subcategoryId !== subcategoryId
          )
        );
        setFilteredSubcategories((prevFilteredSubcategories) =>
          prevFilteredSubcategories.filter(
            (subcategory) => subcategory.subcategoryId !== subcategoryId
          )
        );
        toast.success("Subcategory deleted successfully!");
      } else {
        throw new Error("Failed to delete subcategory");
      }
    } catch (error) {
      setError(error.message || "Failed to delete subcategory");
      toast.error("Failed to delete subcategory");
    }
  };

  const handleEditClick = (subcategory) => {
    setCurrentSubcategory(subcategory);
    setEditModalIsOpen(true);
  };

  const handleEditSave = async () => {
    const { subcategoryName, categoryId, slug, description, subcategoryId } =
      currentSubcategory;
    if (!subcategoryName) {
      toast.error("Subcategory Name is required");
      return;
    }
    if (!slug) {
      toast.error("Slug is required");
      return;
    }
    if (!description) {
      toast.error("Description is required");
      return;
    }

    console.log(currentSubcategory);

    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/subcategories/editcategory/${subcategoryId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: subcategoryName,
            categoryId: categoryId,
            description: description,
            slug: slug,
          }),
        }
      );

      if (response.ok) {
        const updatedSubcategoryData = await response.json();
        setSubcategories((prevSubcategories) =>
          prevSubcategories.map((subcategory) =>
            subcategory.subcategoryId === updatedSubcategoryData.subcategoryId
              ? updatedSubcategoryData
              : subcategory
          )
        );
        setFilteredSubcategories((prevFilteredSubcategories) =>
          prevFilteredSubcategories.map((subcategory) =>
            subcategory.subcategoryId === updatedSubcategoryData.subcategoryId
              ? updatedSubcategoryData
              : subcategory
          )
        );
        toast.success("Subcategory updated successfully!");
        setEditModalIsOpen(false);
      } else {
        const errorData = await response.json();
        console.error("Error updating subcategory:", errorData);
        if (errorData.errors) {
          errorData.errors.forEach((err) => toast.error(err.msg));
        } else {
          throw new Error(errorData.error || "Failed to update subcategory");
        }
      }
    } catch (error) {
      setError(error.message || "Failed to update subcategory");
      toast.error(error.message || "Failed to update subcategory");
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
      name: "Subcategory Name",
      selector: (row) => row.subcategoryName,
      sortable: true,
      width: "300px",
    },
    {
      name: "Category Name",
      selector: (row) => {
        const category = categories.find(
          (cat) => cat.categoryId === row.categoryId
        );
        return category ? category.categoryName : "Unknown";
      },
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
            onClick={() => handleDelete(row.subcategoryId)}
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
              placeholder="Search subcategory..."
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
          <div
            className={`${style.chart} ${theme === "dark" ? style.dark : ""}`}
          >
            <DataTable
              columns={columns}
              data={filteredSubcategories}
              progressPending={isLoading}
              highlightOnHover
              striped
              pagination
              customStyles={customStyles}
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
          contentLabel="Edit Subcategory"
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
          <h2>Edit Subcategory</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleEditSave();
            }}
          >
            <div style={{ marginBottom: "10px" }}>
              <label>Subcategory Name:</label>
              <input
                type="text"
                value={currentSubcategory.subcategoryName}
                onChange={(e) =>
                  setCurrentSubcategory({
                    ...currentSubcategory,
                    subcategoryName: e.target.value,
                  })
                }
                required
                style={{
                  width: "100%",
                  padding: "8px",
                  borderRadius: "5px",
                  border: theme === "dark" ? "none" : "1px solid black",
                }}
              />
            </div>
            <div style={{ marginBottom: "10px" }}>
              <label>Category:</label>
              <select
                value={currentSubcategory.categoryId}
                onChange={(e) =>
                  setCurrentSubcategory({
                    ...currentSubcategory,
                    categoryId: e.target.value,
                  })
                }
                required
                style={{
                  width: "100%",
                  padding: "8px",
                  borderRadius: "5px",
                  border: theme === "dark" ? "none" : "1px solid black",
                }}
              >
                <option value="">Select Category</option>
                {categories.map((category) => (
                  <option key={category.categoryId} value={category.categoryId}>
                    {category.categoryName}
                  </option>
                ))}
              </select>
            </div>
            <div style={{ marginBottom: "10px" }}>
              <label>Slug:</label>
              <input
                type="text"
                value={currentSubcategory.slug}
                onChange={(e) =>
                  setCurrentSubcategory({
                    ...currentSubcategory,
                    slug: e.target.value,
                  })
                }
                required
                style={{
                  width: "100%",
                  padding: "8px",
                  borderRadius: "5px",
                  border: theme === "dark" ? "none" : "1px solid black",
                }}
              />
            </div>
            <div style={{ marginBottom: "10px" }}>
              <label>Description:</label>
              <textarea
                value={currentSubcategory.description}
                onChange={(e) =>
                  setCurrentSubcategory({
                    ...currentSubcategory,
                    description: e.target.value,
                  })
                }
                required
                style={{
                  width: "100%",
                  padding: "8px",
                  borderRadius: "5px",
                  border: theme === "dark" ? "none" : "1px solid black",
                }}
              />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
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
        </Modal>
      </div>
    </div>
  );
}

export default Subcategory;
