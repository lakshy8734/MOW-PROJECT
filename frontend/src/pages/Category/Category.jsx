import React, { useState, useEffect } from "react";
import style from "./Category.module.css";
import Sidebar from "Component/DashboardSidebar/DashboardSidebar";
import DataTable from "react-data-table-component";
import { ImSearch } from "react-icons/im";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Modal from "react-modal";

Modal.setAppElement("#root");

function Category() {
  const [categories, setCategories] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [currentCategory, setCurrentCategory] = useState({
    categoryName: "",
    slug: "",
    description: "",
    categoryId: "",
  });

  const customStyles = {
    header: {
      style: {
        backgroundColor: "#242424",
        color: "#ffffff",
      },
    },
    headRow: {
      style: {
        backgroundColor: "#242424",
      },
    },
    headCells: {
      style: {
        color: "#ffffff",
      },
    },
    rows: {
      style: {
        backgroundColor: "#242424",
        color: "#ffffff",
        "&:not(:last-of-type)": {
          borderBottomColor: "#3d3d3d",
        },
        zIndex: 0,
      },
      highlightOnHoverStyle: {
        backgroundColor: "#3d3d3d",
        color: "#ffffff",
        transitionDuration: "0.15s",
        transitionProperty: "background-color",
        borderBottomColor: "#3d3d3d",
        outline: "1px solid #3d3d3d",
        zIndex: 0,
      },
    },
    pagination: {
      style: {
        backgroundColor: "#242424",
        color: "#ffffff",
      },
    },
    table: {
      style: {
        backgroundColor: "#242424",
      },
    },
  };

  useEffect(() => {
    const fetchCategories = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/api/categories`
        );
        const data = await response.json();
        setCategories(data);
        setFilteredCategories(data);
      } catch (error) {
        setError(error.message || "Failed to fetch categories");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const filtered = categories.filter((category) =>
      category.categoryName.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredCategories(filtered);
  }, [searchText, categories]);

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  const handleDelete = async (categoryId) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/categories/editcategory${categoryId}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        setCategories((prevCategories) =>
          prevCategories.filter(
            (category) => category.categoryId !== categoryId
          )
        );
        setFilteredCategories((prevFilteredCategories) =>
          prevFilteredCategories.filter(
            (category) => category.categoryId !== categoryId
          )
        );
        toast.success("Category deleted successfully!");
      } else {
        throw new Error("Failed to delete category");
      }
    } catch (error) {
      setError(error.message || "Failed to delete category");
      toast.error("Failed to delete category");
    }
  };

  const handleEditClick = (category) => {
    setCurrentCategory(category);
    setEditModalIsOpen(true);
  };

  const handleEditSave = async () => {
    const { categoryName, slug, description, categoryId } = currentCategory;
    if (!categoryName) {
      toast.error("Category Name is required");
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
  
    console.log(currentCategory);
  
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/categories/editcategory/${categoryId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: categoryName,
            description: description,
            slug: slug,
          }),
        }
      );
  
      if (response.ok) {
        const updatedCategoryData = await response.json();
        setCategories((prevCategories) =>
          prevCategories.map((category) =>
            category.categoryId === updatedCategoryData.categoryId
              ? updatedCategoryData
              : category
          )
        );
        setFilteredCategories((prevFilteredCategories) =>
          prevFilteredCategories.map((category) =>
            category.categoryId === updatedCategoryData.categoryId
              ? updatedCategoryData
              : category
            )
        );
        toast.success("Category updated successfully!");
        setEditModalIsOpen(false);
      } else {
        const errorData = await response.json();
        console.error("Error updating category:", errorData);
        // Log all validation errors
        if (errorData.errors) {
          errorData.errors.forEach(err => toast.error(err.msg));
        } else {
          throw new Error(errorData.error || "Failed to update category");
        }
      }
    } catch (error) {
      setError(error.message || "Failed to update category");
      toast.error(error.message || "Failed to update category");
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
      name: "Category Name",
      selector: (row) => row.categoryName,
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
            onClick={() => handleDelete(row.categoryId)}
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
      <div className={style.div}>
        <Sidebar />
      </div>

      <div className={style.Blog}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "20px",
          }}
        >
          <div className={style.Searching}>
            <ImSearch className={style.search} />
            <input
              type="text"
              className="search-input"
              placeholder="Search category..."
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
              data={filteredCategories}
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
          contentLabel="Edit Category"
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
              backgroundColor: "#242424",
              color: "#ffffff",
              padding: "20px",
              borderRadius: "10px",
            },
          }}
        >
          <h2>Edit Category</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleEditSave();
            }}
          >
            <div style={{ marginBottom: "10px" }}>
              <label>Category Name:</label>
              <input
                type="text"
                value={currentCategory.categoryName}
                onChange={(e) =>
                  setCurrentCategory({
                    ...currentCategory,
                    categoryName: e.target.value,
                  })
                }
                required
                style={{
                  width: "100%",
                  padding: "8px",
                  borderRadius: "5px",
                  border: "none",
                }}
              />
            </div>
            <div style={{ marginBottom: "10px" }}>
              <label>Slug:</label>
              <input
                type="text"
                value={currentCategory.slug}
                onChange={(e) =>
                  setCurrentCategory({
                    ...currentCategory,
                    slug: e.target.value,
                  })
                }
                required
                style={{
                  width: "100%",
                  padding: "8px",
                  borderRadius: "5px",
                  border: "none",
                }}
              />
            </div>
            <div style={{ marginBottom: "10px" }}>
              <label>Description:</label>
              <textarea
                value={currentCategory.description}
                onChange={(e) =>
                  setCurrentCategory({
                    ...currentCategory,
                    description: e.target.value,
                  })
                }
                required
                style={{
                  width: "100%",
                  padding: "8px",
                  borderRadius: "5px",
                  border: "none",
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

export default Category;
