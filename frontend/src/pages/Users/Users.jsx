import React, { useState, useEffect } from "react";
import style from "./Users.module.css";
import Sidebar from "Component/DashboardSidebar/DashboardSidebar";
import DataTable from "react-data-table-component";
import { ImSearch } from "react-icons/im";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Modal from "react-modal";
import Swal from "sweetalert2"; // For alerts
import Loader from "pages/Loader/Loader";

Modal.setAppElement("#root");

function Users() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState({
    name: "",
    email: "",
    username: "",
    role: "User", // Default role set to 'User'
    userId: "",
    profilePicture: "",
    password: "",
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
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/`);
      const data = await response.json();
      console.log("Fetched users:", data);
      setUsers(data);
      setFilteredUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
      setError(error.message || "Failed to fetch users");
      toast.error(error.message || "Failed to fetch users");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const filtered = users.filter((user) =>
      user.name.toLowerCase().includes(searchText.toLowerCase())
    );
    console.log("Filtered users:", filtered);
    setFilteredUsers(filtered);
  }, [searchText, users]);

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  const handleDelete = async (userId) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to delete this user?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      setIsLoading(true); // Set loading to true
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/api/user/${userId}`,
          {
            method: "DELETE",
          }
        );

        if (response.ok) {
          setUsers((prevUsers) =>
            prevUsers.filter((user) => user.userId !== userId)
          );
          setFilteredUsers((prevFilteredUsers) =>
            prevFilteredUsers.filter((user) => user.userId !== userId)
          );
          toast.success("User deleted successfully!");
        } else {
          throw new Error("Failed to delete user");
        }
      } catch (error) {
        console.error("Error deleting user:", error);
        setError(error.message || "Failed to delete user");
        toast.error("Failed to delete user");
      } finally {
        setIsLoading(false); // Set loading to false
      }
    }
  };

  const handleEditClick = (user) => {
    setCurrentUser({ ...user, password: "" }); // Password should be empty by default
    setEditModalIsOpen(true);
  };

  const handleEditSave = async () => {
    if (!currentUser.name) {
      toast.error("Name is required");
      return;
    }
    if (!currentUser.email) {
      toast.error("Email is required");
      return;
    }
    if (!currentUser.username) {
      toast.error("Username is required");
      return;
    }
    if (!currentUser.role) {
      toast.error("Role is required");
      return;
    }

    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to save the changes?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, save it!",
    });

    if (result.isConfirmed) {
      setIsLoading(true); // Set loading to true
      try {
        const formData = new FormData();
        formData.append("name", currentUser.name);
        formData.append("email", currentUser.email);
        formData.append("username", currentUser.username);
        formData.append("role", currentUser.role);
        formData.append("password", currentUser.password);
        if (currentUser.profilePicture instanceof File) {
          formData.append("profilePicture", currentUser.profilePicture);
        }

        console.log(formData);

        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/api/user/${currentUser.userId}`,
          {
            method: "PUT",
            body: formData,
          }
        );

        if (response.ok) {
          const updatedUserData = await response.json();
          setEditModalIsOpen(false);
          toast.success("User updated successfully!");
          fetchUsers(); // Fetch the updated list of users
        } else {
          const errorData = await response.json();
          throw new Error(errorData.error || "Failed to update user");
        }
      } catch (error) {
        console.error("Error updating user:", error);
        setError(error.message || "Failed to update user");
        toast.error(error.message || "Failed to update user");
      } finally {
        setIsLoading(false); // Set loading to false
      }
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log("Selected file:", file);
      setCurrentUser((prevState) => ({
        ...prevState,
        profilePicture: file,
      }));
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
      name: "Profile Picture",
      selector: (row) => row.profilePicture,
      cell: (row) => (
        <img
          src={row.profilePicture}
          alt={`${row.name}'s profile`}
          style={{ width: "50px", height: "50px", borderRadius: "50%" }}
        />
      ),
      width: "80px",
      center: true,
    },
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
      width: "200px",
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
      width: "250px",
    },
    {
      name: "Username",
      selector: (row) => row.username,
      sortable: true,
      width: "200px",
    },
    {
      name: "Role",
      selector: (row) => row.role,
      sortable: true,
      width: "150px",
    },
    {
      name: "Last Login",
      selector: (row) => row.lastLoggingTime.split(" ")[0],
      sortable: true,
      width: "150px",
    },
    {
      name: "Last Login Time",
      selector: (row) => row.lastLoggingTime.split(" ")[1],
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
            onClick={() => handleDelete(row.userId)}
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
              placeholder="Search user..."
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
            {isLoading ? (
              <Loader />
            ) : (
              <DataTable
                columns={columns}
                data={filteredUsers}
                highlightOnHover
                striped
                customStyles={customStyles}
                pagination
              />
            )}
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
          contentLabel="Edit User"
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
          {currentUser && (
            <div>
              <h2>Edit User</h2>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleEditSave();
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginBottom: "10px",
                  }}
                >
                  <label htmlFor="profilePictureInput">
                    <img
                      src={
                        currentUser.profilePicture instanceof File
                          ? URL.createObjectURL(currentUser.profilePicture)
                          : currentUser.profilePicture
                      }
                      alt="Profile"
                      style={{
                        width: "100px",
                        height: "100px",
                        borderRadius: "50%",
                        cursor: "pointer",
                      }}
                    />
                  </label>
                  <input
                    id="profilePictureInput"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    style={{ display: "none" }}
                  />
                </div>
                <div style={{ marginBottom: "10px" }}>
                  <label>Name:</label>
                  <input
                    type="text"
                    value={currentUser.name}
                    onChange={(e) =>
                      setCurrentUser({ ...currentUser, name: e.target.value })
                    }
                    required
                    style={{ width: "100%", padding: "8px" }}
                  />
                </div>
                <div style={{ marginBottom: "10px" }}>
                  <label>Email:</label>
                  <input
                    type="email"
                    value={currentUser.email}
                    onChange={(e) =>
                      setCurrentUser({ ...currentUser, email: e.target.value })
                    }
                    required
                    style={{ width: "100%", padding: "8px" }}
                  />
                </div>
                <div style={{ marginBottom: "10px" }}>
                  <label>Username:</label>
                  <input
                    type="text"
                    value={currentUser.username}
                    onChange={(e) =>
                      setCurrentUser({
                        ...currentUser,
                        username: e.target.value,
                      })
                    }
                    required
                    style={{ width: "100%", padding: "8px" }}
                  />
                </div>
                <div style={{ marginBottom: "10px" }}>
                  <label>Role:</label>
                  <select
                    value={currentUser.role}
                    onChange={(e) =>
                      setCurrentUser({ ...currentUser, role: e.target.value })
                    }
                    required
                    style={{ width: "100%", padding: "8px" }}
                  >
                    <option value="User">User</option>
                    <option value="Admin">Admin</option>
                    <option value="Subadmin">Subadmin</option>
                  </select>
                </div>
                <div style={{ marginBottom: "10px" }}>
                  <label>Password:</label>
                  <input
                    type="password"
                    placeholder="Leave blank to keep current password"
                    value={currentUser.password}
                    onChange={(e) =>
                      setCurrentUser({
                        ...currentUser,
                        password: e.target.value,
                      })
                    }
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

export default Users;
