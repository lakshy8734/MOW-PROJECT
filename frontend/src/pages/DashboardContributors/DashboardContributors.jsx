import React, { useState, useEffect } from "react";
import style from "./DashboardContributors.module.css";
import Sidebar from "Component/DashboardSidebar/DashboardSidebar";
import DataTable from "react-data-table-component";
import { ImSearch } from "react-icons/im";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Modal from "react-modal";

Modal.setAppElement("#root");

function DashboardContributors() {
  const [contributors, setContributors] = useState([]);
  const [filteredContributors, setFilteredContributors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [currentContributor, setCurrentContributor] = useState({
    userName: "",
    email: "",
    name: "",
    id: "",
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
    const fetchContributors = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/api/contributors`
        );
        const data = await response.json();
        
        // Map _id to id for consistency
        const mappedData = data.map(contributor => ({
          ...contributor,
          id: contributor._id
        }));

        setContributors(mappedData);
        setFilteredContributors(mappedData);
      } catch (error) {
        setError(error.message || "Failed to fetch contributors");
      } finally {
        setIsLoading(false);
      }
    };

    fetchContributors();
  }, []);

  useEffect(() => {
    const filtered = contributors.filter((contributor) =>
      contributor.userName.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredContributors(filtered);
  }, [searchText, contributors]);

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  const handleDelete = async (id) => {
    if (!id) {
      toast.error("Invalid contributor ID");
      return;
    }

    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/contributors/${id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        setContributors((prevContributors) =>
          prevContributors.filter((contributor) => contributor.id !== id)
        );
        setFilteredContributors((prevFilteredContributors) =>
          prevFilteredContributors.filter((contributor) => contributor.id !== id)
        );
        toast.success("Contributor deleted successfully!");
      } else {
        throw new Error("Failed to delete contributor");
      }
    } catch (error) {
      setError(error.message || "Failed to delete contributor");
      toast.error("Failed to delete contributor");
    }
  };

  const handleEditClick = (contributor) => {
    console.log("Editing contributor:", contributor);
    setCurrentContributor(contributor);
    setEditModalIsOpen(true);
  };

  const handleEditSave = async () => {
    const { userName, email, name, _id } = currentContributor;
    if (!userName) {
      toast.error("Username is required");
      return;
    }
    if (!email) {
      toast.error("Email is required");
      return;
    }
    if (!name) {
      toast.error("Name is required");
      return;
    }

    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/contributors/${_id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userName,
            email,
            name,
          }),
        }
      );

      if (response.ok) {
        const updatedContributor = await response.json();
        
        // Map _id to id for consistency
        const updatedMappedContributor = {
          ...updatedContributor,
          id: updatedContributor._id
        };

        setContributors((prevContributors) =>
          prevContributors.map((contributor) =>
            contributor.id === updatedMappedContributor.id
              ? updatedMappedContributor
              : contributor
          )
        );
        setFilteredContributors((prevFilteredContributors) =>
          prevFilteredContributors.map((contributor) =>
            contributor.id === updatedMappedContributor.id
              ? updatedMappedContributor
              : contributor
          )
        );
        toast.success("Contributor updated successfully!");
        setEditModalIsOpen(false);
      } else {
        const errorData = await response.json();
        if (errorData.errors) {
          errorData.errors.forEach((err) => toast.error(err.msg));
        } else {
          throw new Error(errorData.error || "Failed to update contributor");
        }
      }
    } catch (error) {
      setError(error.message || "Failed to update contributor");
      toast.error(error.message || "Failed to update contributor");
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
      name: "Username",
      selector: (row) => row.userName,
      sortable: true,
      width: "200px",
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
      width: "300px",
    },
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
      width: "200px",
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
            onClick={() => handleDelete(row._id)}
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
              placeholder="Search contributor..."
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
              data={filteredContributors}
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
          contentLabel="Edit Contributor"
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
          <h2>Edit Contributor</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleEditSave();
            }}
          >
            <div style={{ marginBottom: "10px" }}>
              <label>Username:</label>
              <input
                type="text"
                value={currentContributor.userName}
                onChange={(e) =>
                  setCurrentContributor({
                    ...currentContributor,
                    userName: e.target.value,
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
              <label>Email:</label>
              <input
                type="email"
                value={currentContributor.email}
                onChange={(e) =>
                  setCurrentContributor({
                    ...currentContributor,
                    email: e.target.value,
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
              <label>Name:</label>
              <input
                type="text"
                value={currentContributor.name}
                onChange={(e) =>
                  setCurrentContributor({
                    ...currentContributor,
                    name: e.target.value,
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

export default DashboardContributors;
