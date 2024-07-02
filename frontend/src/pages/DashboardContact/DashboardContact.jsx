import React, { useState, useEffect, useRef, useContext } from "react";
import style from "./DashboardContact.module.css";
import Sidebar from "Component/DashboardSidebar/DashboardSidebar";
import DataTable from "react-data-table-component";
import { ImSearch } from "react-icons/im";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { ThemeContext } from "../../contexts/ThemeContext"; // Import ThemeContext

function DashboardContact() {
  const { theme } = useContext(ThemeContext); // Use ThemeContext to get the current theme
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchText, setSearchText] = useState("");
  const searchTimeoutRef = useRef(null);

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
    const fetchContacts = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/contact`);
        const data = response.data;
        setContacts(data);
        setFilteredContacts(data);
      } catch (error) {
        setError(error.message || "Failed to fetch contacts");
      } finally {
        setIsLoading(false);
      }
    };

    fetchContacts();
  }, []);

  useEffect(() => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    searchTimeoutRef.current = setTimeout(() => {
      if (searchText) {
        const filtered = contacts.filter((contact) => {
          const contactName = contact.name || "";
          return contactName.toLowerCase().includes(searchText.toLowerCase());
        });
        setFilteredContacts(filtered);
      } else {
        setFilteredContacts(contacts);
      }
    }, 300);

    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, [searchText, contacts]);

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  const handleDelete = async (contactId) => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_BACKEND_URL}/api/contact/${contactId}`
      );

      if (response.status === 204) {
        setContacts((prevContacts) =>
          prevContacts.filter((contact) => contact.contactId !== contactId)
        );
        setFilteredContacts((prevFilteredContacts) =>
          prevFilteredContacts.filter((contact) => contact.contactId !== contactId)
        );
        toast.success("Contact deleted successfully!");
      } else {
        throw new Error("Failed to delete contact");
      }
    } catch (error) {
      setError(error.message || "Failed to delete contact");
      toast.error("Failed to delete contact");
    }
  };

  const columns = [
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
      width: "150px",
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
      width: "250px",
    },
    {
      name: "Subject",
      selector: (row) => row.subject,
      sortable: true,
      width: "200px",
    },
    {
      name: "Message",
      selector: (row) => row.message,
      sortable: true,
      width: "400px",
      style: {
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
        maxWidth: "400px",
      },
    },
    {
      name: "Created Date",
      selector: (row) => {
        if (!row.createdAt) return "N/A"; 
        const createdAtParts = row.createdAt.split("T");
        return createdAtParts[0];
      },
      sortable: true,
      width: "150px",
    },
    {
      name: "Created Time",
      selector: (row) => {
        if (!row.createdAt) return "N/A"; 
        const createdAtParts = row.createdAt.split("T");
        return createdAtParts[1].split(".")[0];
      },
      sortable: true,
      width: "150px",
    },
    {
      name: "Actions",
      cell: (row) => (
        <button
          onClick={() => handleDelete(row.contactId)}
          style={{
            backgroundColor: "red",
            color: "white",
            border: "none",
            borderRadius: "5px",
            padding: "5px 10px",
            cursor: "pointer",
          }}
        >
          Delete
        </button>
      ),
      width: "150px",
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
          <div className={`${style.Searching} ${theme === "dark" ? style.dark : ""}`}>
            <ImSearch className={`${style.search} ${theme === "dark" ? style.dark : ""}`} />
            <input
              type="text"
              className={`${style.searchInput} ${theme === "dark" ? style.dark : ""}`}
              placeholder="Search contacts..."
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
              data={filteredContacts}
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
      </div>
    </div>
  );
}

export default DashboardContact;
