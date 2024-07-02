import React, { useState, useEffect, useRef } from "react";
import style from "./Links.module.css";
import Sidebar from "Component/DashboardSidebar/DashboardSidebar";
import DataTable from "react-data-table-component";
import { ImSearch } from "react-icons/im";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Modal from "react-modal";

Modal.setAppElement("#root");

function Links() {
  const [links, setLinks] = useState([]);
  const [filteredLinks, setFilteredLinks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [createModalIsOpen, setCreateModalIsOpen] = useState(false);
  const [currentLink, setCurrentLink] = useState({
    name: "",
    link: "",
    isActive: false,
  });
  const [newLink, setNewLink] = useState({
    linkName: "",
    link: "",
  });

  const searchTimeoutRef = useRef(null);

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
      },
      highlightOnHoverStyle: {
        backgroundColor: "#3d3d3d",
        color: "#ffffff",
        transitionDuration: "0.15s",
        transitionProperty: "background-color",
        borderBottomColor: "#3d3d3d",
        outline: "1px solid #3d3d3d",
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
    console.log("Fetching links...");
    const fetchLinks = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/api/links`
        );
        const data = await response.json();
        console.log("Links fetched successfully:", data);
        setLinks(data);
        setFilteredLinks(data);
      } catch (error) {
        console.error("Error fetching links:", error);
        setError(error.message || "Failed to fetch links");
      } finally {
        setIsLoading(false);
      }
    };

    fetchLinks();
  }, []);

  useEffect(() => {
    console.log("Filtering links based on search text:", searchText);

    // Debounce search input
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    searchTimeoutRef.current = setTimeout(() => {
      if (searchText) {
        const filtered = links.filter((link) => {
          const linkName = link.name || "";
          return linkName.toLowerCase().includes(searchText.toLowerCase());
        });
        console.log("Filtered links:", filtered);
        setFilteredLinks(filtered);
      } else {
        setFilteredLinks(links);
      }
    }, 300); // Adjust the debounce delay as needed

    // Cleanup function to clear the timeout if the component unmounts or the effect re-runs
    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, [searchText, links]);

  const handleSearch = (e) => {
    console.log("Search text changed:", e.target.value);
    setSearchText(e.target.value);
  };

  const handleDelete = async (linkId) => {
    console.log("Deleting link with ID:", linkId);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/links/${linkId}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        console.log("Link deleted successfully");
        setLinks((prevLinks) =>
          prevLinks.filter((link) => link.linkId !== linkId)
        );
        setFilteredLinks((prevFilteredLinks) =>
          prevFilteredLinks.filter((link) => link.linkId !== linkId)
        );
        toast.success("Link deleted successfully!");
      } else {
        throw new Error("Failed to delete link");
      }
    } catch (error) {
      console.error("Error deleting link:", error);
      setError(error.message || "Failed to delete link");
      toast.error("Failed to delete link");
    }
  };

  const handleEditClick = (link) => {
    console.log("Edit link clicked:", link);
    setCurrentLink({
      name: link.name || "",
      link: link.link || "",
      isActive: link.isActive || false,
      linkId: link.linkId,
    });
    setEditModalIsOpen(true);
  };

  const handleEditSave = async () => {
    if (!currentLink.name) {
      toast.error("Link Name is required");
      return;
    }
    if (!currentLink.link) {
      toast.error("Link is required");
      return;
    }

    console.log("Saving edited link:", currentLink);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/links/editlink/${currentLink.linkId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: currentLink.name,
            link: currentLink.link,
            isActive: currentLink.isActive,
          }),
        }
      );

      if (response.ok) {
        const updatedLinkData = await response.json();
        console.log("Link updated successfully:", updatedLinkData);
        setLinks((prevLinks) =>
          prevLinks.map((link) =>
            link.linkId === updatedLinkData.linkId ? updatedLinkData : link
          )
        );
        setFilteredLinks((prevFilteredLinks) =>
          prevFilteredLinks.map((link) =>
            link.linkId === updatedLinkData.linkId ? updatedLinkData : link
          )
        );
        toast.success("Link updated successfully!");
        setEditModalIsOpen(false);
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to update link");
      }
    } catch (error) {
      console.error("Error updating link:", error);
      setError(error.message || "Failed to update link");
      toast.error(error.message || "Failed to update link");
    }
  };

  const handleCreateLink = async () => {
    const userId = localStorage.getItem("userId");

    if (!newLink.linkName) {
      toast.error("Link Name is required");
      return;
    }
    if (!newLink.link) {
      toast.error("Link is required");
      return;
    }

    console.log("Creating new link:", newLink);

    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/links/addlink`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: newLink.linkName,
            link: newLink.link,
            userId: userId,
          }),
        }
      );

      if (response.ok) {
        const createdLink = await response.json();
        console.log("New link created successfully:", createdLink);
        setLinks((prevLinks) => [...prevLinks, createdLink]);
        setFilteredLinks((prevFilteredLinks) => [
          ...prevFilteredLinks,
          createdLink,
        ]);
        setNewLink({ linkName: "", link: "" });
        setCreateModalIsOpen(false);
        toast.success("Link created successfully!");
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create link");
      }
    } catch (error) {
      console.error("Error creating link:", error);
      setError(error.message || "Failed to create link");
      toast.error(error.message || "Failed to create link");
    }
  };

  const handleToggleChange = () => {
    setCurrentLink((prevLink) => ({
      ...prevLink,
      isActive: !prevLink.isActive,
    }));
  };

  const columns = [
    {
      name: "Link Name",
      selector: (row) => row.name,
      sortable: true,
      width: "150px",
    },
    {
      name: "Link ",
      selector: (row) => row.link,
      sortable: true,
      width: "400px",
    },
    {
      name: "Active Status",
      selector: (row) => row.isActive ? "Active" : "Inactive",
      sortable: true,
      width: "150px",
    },
    {
      name: "Created Date",
      selector: (row) => {
        if (!row.date) return "N/A"; // Handle undefined case
        const createdAtParts = row.date.split(" ");
        return createdAtParts[0];
      },
      sortable: true,
      width: "150px",
    },
    {
      name: "Created Time",
      selector: (row) => {
        if (!row.date) return "N/A"; // Handle undefined case
        const createdAtParts = row.date.split(" ");
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
            className={style["edit-button"]}
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
            className={style["delete-button"]}
            onClick={() => handleDelete(row.linkId)}
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
              className={style.searchInput}
              placeholder="Search link..."
              value={searchText}
              onChange={handleSearch}
            />
            <button
              onClick={() => setCreateModalIsOpen(true)}
              style={{
                marginLeft: "10px",
                backgroundColor: "#3d3d3d",
                color: "#ffffff",
                borderRadius: "5px",
                padding: "5px 10px",
                cursor: "pointer",
              }}
            >
              Create Link
            </button>
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
              data={filteredLinks}
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
          contentLabel="Edit Link"
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
          {currentLink && (
            <div>
              <h2>Edit Link</h2>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleEditSave();
                }}
              >
                <div style={{ marginBottom: "10px" }}>
                  <label>Link Name:</label>
                  <input
                    type="text"
                    value={currentLink.name}
                    onChange={(e) =>
                      setCurrentLink({
                        ...currentLink,
                        name: e.target.value,
                      })
                    }
                    required
                    style={{ width: "100%", padding: "8px" }}
                  />
                </div>
                <div style={{ marginBottom: "10px" }}>
                  <label>Link:</label>
                  <input
                    type="text"
                    value={currentLink.link}
                    onChange={(e) =>
                      setCurrentLink({
                        ...currentLink,
                        link: e.target.value,
                      })
                    }
                    required
                    style={{ width: "100%", padding: "8px" }}
                  />
                </div>
                <div className={style.formGroup}>
                  <label htmlFor="isActive">DO YOU WANT TO MAKE IT ACTIVE : </label>
                  <label className={style.toggle}>
                    <input
                      type="checkbox"
                      checked={currentLink.isActive}
                      onChange={handleToggleChange}
                    />
                    <span className={style.slider}></span>
                  </label>
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

        <Modal
          isOpen={createModalIsOpen}
          onRequestClose={() => setCreateModalIsOpen(false)}
          contentLabel="Create Link"
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
          <h2>Create Link</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleCreateLink();
            }}
          >
            <div style={{ marginBottom: "10px" }}>
              <label>Link Name:</label>
              <input
                type="text"
                value={newLink.linkName}
                onChange={(e) =>
                  setNewLink({ ...newLink, linkName: e.target.value })
                }
                required
                style={{ width: "100%", padding: "8px" }}
              />
            </div>
            <div style={{ marginBottom: "10px" }}>
              <label>Link:</label>
              <input
                type="text"
                value={newLink.link}
                onChange={(e) =>
                  setNewLink({ ...newLink, link: e.target.value })
                }
                required
                style={{ width: "100%", padding: "8px" }}
              />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <button
                type="button"
                onClick={() => setCreateModalIsOpen(false)}
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
                Create
              </button>
            </div>
          </form>
        </Modal>
      </div>
    </div>
  );
}

export default Links;
