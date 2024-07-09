import React, { useState, useEffect, useContext } from "react";
import zen from "../../assets/Default.webp";
import axios from "axios";
import styles from "./UsersList.module.css";
import { ThemeContext } from "../../contexts/ThemeContext";

const UsersList = () => {
  const { theme } = useContext(ThemeContext);

  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 6;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/api/subadmin`
        ); // Replace with your actual API endpoint
        const subAdminUsers = response.data.map((user) => ({
          id: user.userId,
          name: user.name,
          profilePicture: user.profilePicture || zen,
          lastActive: calculateLastActive(user.lastLoggingTime),
          friendsCount: user.friendsCount || 0,
        }));
        setUsers(subAdminUsers);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const calculateLastActive = (lastLoggingTime) => {
    const [datePart, timePart] = lastLoggingTime.split(" ");
    const [day, month, year] = datePart.split("_");
    const [hours, minutes, seconds] = timePart.split(":");

    // Create a Date object in IST
    const lastLoginDate = new Date(
      Date.UTC(year, month - 1, day, hours - 5, minutes - 30, seconds)
    );
    const currentDate = new Date();
    const differenceInTime = currentDate - lastLoginDate;

    if (differenceInTime < 0) {
      console.error("Future date provided:", lastLoggingTime);
      return "Error in date";
    }

    const differenceInDays = Math.floor(differenceInTime / (1000 * 3600 * 24));
    const differenceInHours = Math.floor(
      (differenceInTime % (1000 * 3600 * 24)) / (1000 * 3600)
    );
    const differenceInMinutes = Math.floor(
      (differenceInTime % (1000 * 3600)) / (1000 * 60)
    );

    if (differenceInDays >= 1) {
      return `${differenceInDays} day${differenceInDays !== 1 ? "s" : ""} ago`;
    } else if (differenceInHours >= 1) {
      return `${differenceInHours} hour${
        differenceInHours !== 1 ? "s" : ""
      } ago`;
    } else {
      return `${differenceInMinutes} minute${
        differenceInMinutes !== 1 ? "s" : ""
      } ago`;
    }
  };

  const totalPages = Math.ceil(users.length / usersPerPage);

  const currentUsers = users.slice(
    (currentPage - 1) * usersPerPage,
    currentPage * usersPerPage
  );

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className={`${styles.contex} ${theme === "dark" ? styles.dark : ""}`}>
      <div className={`${styles.cards} ${theme === "dark" ? styles.dark : ""}`}>
        {currentUsers.map((user) => (
          <div
            key={user.id}
            className={`${styles.card} ${theme === "dark" ? styles.dark : ""}`}
          >
            <img
              src={user.profilePicture !== zen ? user.profilePicture : zen}
              alt="Profile"
              className={`${styles.profileImg} ${
                theme === "dark" ? styles.dark : ""
              }`}
              onError={(e) => {
                e.target.src = zen;
              }}
            />
            <h2
              className={`${styles.name} ${
                theme === "dark" ? styles.dark : ""
              }`}
            >
              {user.name}
            </h2>
            <p
              className={`${styles.lastActive} ${
                theme === "dark" ? styles.dark : ""
              }`}
            >
              {user.lastActive}
            </p>
            <p
              className={`${styles.friends} ${
                theme === "dark" ? styles.dark : ""
              }`}
            >
              {user.friendsCount} Friends
            </p>
            <button
              className={`${styles.addFriendBtn} ${
                theme === "dark" ? styles.dark : ""
              }`}
            >
              Add Friend
            </button>
          </div>
        ))}
      </div>
      <div
        className={`${styles.pagination} ${
          theme === "dark" ? styles.dark : ""
        }`}
      >
        <button onClick={handlePrevPage} disabled={currentPage === 1}>
          &larr;
        </button>
        <span>
          {currentPage} ... {totalPages}
        </span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          &rarr;
        </button>
      </div>
    </div>
  );
};

export default UsersList;
